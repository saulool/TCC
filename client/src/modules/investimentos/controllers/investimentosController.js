import moment from 'moment';
import * as currencyFormatter from 'currencyFormatter.js';

InvestimentosController.$inject = ['InvestimentoService'];

export default function InvestimentosController(InvestimentoService) {
	const vm = this;

	vm.investimentoSelecionado = null;

	vm.selecionarInvestimento = (investimento) => vm.investimentoSelecionado = investimento;

	vm.passoSimulacao = 1;

	const juroCompostoSemMensalidade = (capital, taxa, tempo) => {
		return capital * Math.pow((1 + taxa), tempo);
	}

	const juroCompostoComMensalidade = (capital, taxa, tempo, mensalidade) => {
		return capital * Math.pow((1 + taxa), tempo) + mensalidade * (Math.pow((1 + taxa), tempo) - 1) / taxa;
	}

	const calcularInvestimento = () => {
		let investimento = vm.investimentoSelecionado;
		let diferencaMeses = Math.floor(moment(investimento.vencimento).diff(moment(), 'months', true));
		let diferencaDias = moment(investimento.vencimento).diff(moment(), 'days', true);
		let taxaMensal = Math.pow((1+(investimento.taxa/100)), (1/12))-1;
		let lucro = 0;
		console.log(diferencaMeses);
		vm.valorAplicado = vm.aporteInicial + (vm.aporteMensal * diferencaMeses)

		if(vm.aporteMensal == 0){
			vm.valorBruto = juroCompostoSemMensalidade(vm.aporteInicial, taxaMensal, diferencaMeses);
			lucro = vm.valorBruto - vm.valorAplicado;
		} else {
			vm.valorBruto = juroCompostoComMensalidade(vm.aporteInicial, taxaMensal, diferencaMeses, vm.aporteMensal);
			lucro = vm.valorBruto - vm.valorAplicado;
		}

		if(diferencaDias <= 180) {
			vm.impostoPago = lucro * 0.225
		} else if(diferencaDias > 180 && diferencaDias <= 360) {
			vm.impostoPago = lucro * 0.2
		} else if(diferencaDias > 360 && diferencaDias <= 720) {
			vm.impostoPago = lucro * 0.175
		} else {
			vm.impostoPago = lucro * 0.15
		}

		vm.valorLiquido = vm.valorBruto - vm.impostoPago;
		formatarValores();
	}

	const formatarValores = () => {
		vm.valorAplicado = currencyFormatter.format(vm.valorAplicado, { currency: 'BRL' });
		vm.valorBruto = currencyFormatter.format(vm.valorBruto, { currency: 'BRL' });;
		vm.impostoPago = currencyFormatter.format(vm.impostoPago, { currency: 'BRL' });;
		vm.valorLiquido = currencyFormatter.format(vm.valorLiquido, { currency: 'BRL' });;
	}

	vm.avancarPasso = () => {
		vm.passoSimulacao++;

		if(vm.passoSimulacao == 3) {
			calcularInvestimento();
		}
	}

	vm.aporteInicial = 0;
	vm.aporteMensal = 0;
	vm.valorAplicado = 0;
	vm.valorBruto = 0;
	vm.impostoPago = 0;
	vm.valorLiquido = 0;

	InvestimentoService.getInvestimentos().then((response) => {
		vm.investimentos = response.data.map((investimento) => {
			return {
				instituicao: investimento.instituicao,
				nome: investimento.nome,
				taxa: investimento.taxa,
				indexacao: investimento.indexacao,
				vencimento: moment(investimento.vencimento).format('DD/MM/YYYY'),
				vencimentoFormatado: moment(investimento.vencimento).format('DD/MM/YYYY')
			}
		});
	});
}