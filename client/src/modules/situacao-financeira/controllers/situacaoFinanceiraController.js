import moment from 'moment';
import * as currencyFormatter from 'currencyFormatter.js';

SituacaoFinanceiraController.$inject = ['LancamentoService', 'localStorageService'];

export default function SituacaoFinanceiraController(LancamentoService, localStorageService) {
	const vm = this;
	const usuario = localStorageService.get('usuario');

	vm.pontuacao = 0;

	LancamentoService.getLancamentos({
		de: moment().startOf('month').format('YYYY-MM-DD'),
		ate: moment().endOf('month').format('YYYY-MM-DD'),
		idUsuario: usuario.id
	}).then((response) => {
		let valorDespesas = response.data.filter((lancamento) => {
			if(lancamento.tipo == 'D') return lancamento
		}).reduce((total, lancamento) => {
			return total += lancamento.valor;
		}, 0);

		let valorReceitas = response.data.filter((lancamento) => {
			if(lancamento.tipo == 'R') return lancamento
		}).reduce((total, lancamento) => {
			return total += lancamento.valor;
		}, 0);

		let pontuacao = Math.floor((((valorReceitas - valorDespesas) / valorReceitas) / 0.3)*100);

		if(pontuacao > 100) pontuacao = 100
		if(pontuacao < 0) pontuacao = 0

		vm.pontuacao = pontuacao-45;
	});
}