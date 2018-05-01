import moment from 'moment';
import * as currencyFormatter from 'currencyFormatter.js';

InvestimentosController.$inject = ['$scope', 'InvestimentoService'];

export default function InvestimentosController($scope, InvestimentoService) {
	const vm = this;

	vm.investimentosCalculados = [];

	const calcularInvestimento = (investimento) => {
		InvestimentoService.calcularInvestimento(vm.aporteInicial, vm.aporteMensal, investimento.vencimento, investimento.taxa, investimento.indexacao).then((response) => {
			vm.investimentosCalculados.push({
				instituicao: investimento.instituicao,
				nome: investimento.nome,
				taxa: investimento.taxa,
				indexacao: investimento.indexacao,
				vencimento: investimento.vencimento,
				vencimentoFormatado: investimento.vencimentoFormatado,
				selecionado: investimento.selecionado,
				valorAplicado: currencyFormatter.format(response.data.valorAplicado, { currency: 'BRL' }),
				valorLiquido: currencyFormatter.format(response.data.valorLiquido, { currency: 'BRL' }),
				valorBruto: currencyFormatter.format(response.data.valorBruto, { currency: 'BRL' }),
				impostoPago: currencyFormatter.format(response.data.impostoPago, { currency: 'BRL' })
			});
		});
	}

	vm.aporteInicial = 10;
	vm.aporteMensal = 0;
	vm.todosSelecionados = false;

	vm.selecionarTodos = () => {
		vm.investimentos.forEach((investimento) => {
			if(vm.todosSelecionados)
				investimento.selecionado = true;
			else
				investimento.selecionado = false;
		})
	}

	vm.simular = () => {
		vm.investimentosCalculados = [];

		let investimentosSelecionados = vm.investimentos.filter((investimento) => investimento.selecionado).map((investimento) => {
			return {
				instituicao: investimento.instituicao,
				nome: investimento.nome,
				taxa: investimento.taxa,
				indexacao: investimento.indexacao,
				vencimento: investimento.vencimento,
				vencimentoFormatado: investimento.vencimentoFormatado,
				selecionado: investimento.selecionado,
				valorAplicado: 0,
				valorLiquido: 0,
				valorBruto: 0,
				impostoPago: 0
			}
		});

		investimentosSelecionados.forEach((investimento) => {
			calcularInvestimento(investimento);
		})
	}

	InvestimentoService.getInvestimentos().then((response) => {
		vm.investimentos = response.data.map((investimento) => {
			return {
				instituicao: investimento.instituicao,
				nome: investimento.nome,
				taxa: investimento.taxa,
				indexacao: investimento.indexacao,
				vencimento: investimento.vencimento,
				vencimentoFormatado: moment(investimento.vencimento).format('DD/MM/YYYY'),
				selecionado: false
			}
		});
	});
}