import moment from 'moment';
import * as currencyFormatter from 'currencyFormatter.js';

SituacaoFinanceiraController.$inject = ['LancamentoService', 'localStorageService', 'CATEGORIAS_LANCAMENTOS'];

export default function SituacaoFinanceiraController(LancamentoService, localStorageService, CATEGORIAS_LANCAMENTOS) {
	const vm = this;
	const usuario = localStorageService.get('usuario');

	vm.pontuacao = 0;
	vm.dicas = [];

	LancamentoService.getLancamentos({
		de: moment().startOf('month').format('YYYY-MM-DD'),
		ate: moment().endOf('month').format('YYYY-MM-DD'),
		idUsuario: usuario.id
	}).then((response) => {
		let lancamentos = response.data.map((lancamento) => {
			return {
				data: lancamento.data,
				tipo: lancamento.tipo,
				natureza: CATEGORIAS_LANCAMENTOS[lancamento.natureza],
				descricao: lancamento.descricao,
				valor: lancamento.valor
			}
		});
		const valorDespesas = calcularValores(lancamentos, 'D');
		const valorInvestimentos = calcularValores(lancamentos, 'D', CATEGORIAS_LANCAMENTOS.INVESTIMENTOS);
		const valorReceitas = calcularValores(lancamentos, 'R');
		let pontuacao = calcularPontuacao(valorReceitas, valorDespesas);
		const despesasSegmentadas = ordenarDespesas(segmentarDespesas(lancamentos));

		if(pontuacao > 100) pontuacao = 100
		if(pontuacao < 0) pontuacao = 0

		vm.pontuacao = pontuacao;

		gerarDicas(pontuacao, valorReceitas, despesasSegmentadas, valorInvestimentos);
	});

	const gerarDicas = (pontuacao, valorReceitas, despesas, valorInvestimentos) => {	

		vm.dicas.push('Registre todas as suas despesas');
		vm.dicas.push('Crie metas para seus gastos');
		vm.dicas.push('Crie reservas de emergência');
		vm.dicas.push('Busque outras fontes de renda');

		if (pontuacao < 69) {
			gerarDicasSobreDespesas(despesas, valorReceitas);
		}

		gerarDicasInvestimentos(valorInvestimentos);
	}


	const gerarDicasSobreDespesas = (despesas, valorReceitas) => {
		despesas.forEach((despesa) => {
			if(vm.dicas.length > 5) return;
			if(Object.keys(despesa) != CATEGORIAS_LANCAMENTOS.SAUDE){
				let valorDespesa = Math.floor(Object.values(despesa) / valorReceitas * 100);
				vm.dicas.push(`Suas despesas com ${Object.keys(despesa)} representam ${valorDespesa}% do seu orçamento, tente reduzí-las`);
			}
		});
	}

	const gerarDicasInvestimentos = (valorInvestimentos) => {
		if(valorInvestimentos == 0) vm.dicas.push('Você deveria investir o dinheiro poupado para que ele não perca seu valor durante o tempo');
	}

	const ordenarDespesas = (despesas) => {
		return despesas.sort((a, b) => {
			if(Object.values(a)[0] < Object.values(b)[0]) return 1;
			if(Object.values(a)[0] > Object.values(b)[0]) return -1;
			return 0;
		});
	}

	const segmentarDespesas = (lancamentos) => {
		const despesasSegmentadas = lancamentos.reduce((acumulador, lancamento) => {
			if(lancamento.tipo == 'D')
				acumulador[lancamento.natureza] ? acumulador[lancamento.natureza] += lancamento.valor : acumulador[lancamento.natureza] = lancamento.valor;

			return acumulador;
		}, {});

		let despesas = [];

		Object.keys(despesasSegmentadas).map((key) => {
			let obj = {};

			obj[key] = despesasSegmentadas[key];

			despesas.push(obj);
		});

		return despesas;
	}

	const calcularPontuacao = (valorReceitas, valorDespesas) => Math.floor((((valorReceitas - valorDespesas) / valorReceitas) / 0.3) * 100);

	const calcularValores = (lancamentos, tipo, subtipo) => {
		return lancamentos.reduce((acumulador, lancamento) => {
			if(lancamento.tipo == tipo){
				if(subtipo){
					if(lancamento.natureza == subtipo)
						acumulador += lancamento.valor;
				} else {
					if(lancamento.natureza != CATEGORIAS_LANCAMENTOS.INVESTIMENTOS)
						acumulador += lancamento.valor;
				}
			}

			return acumulador;
		}, 0);
	}
}