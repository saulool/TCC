import moment from 'moment';
import * as currencyFormatter from 'currencyFormatter.js';

LancamentosFuturosController.$inject = ['LancamentoService', 'localStorageService', 'CATEGORIAS_LANCAMENTOS', 'TIPOS_LANCAMENTOS'];

export default function LancamentosFuturosController(LancamentoService, localStorageService, CATEGORIAS_LANCAMENTOS, TIPOS_LANCAMENTOS) {
	const vm = this;
	const usuario = localStorageService.get('usuario');

	vm.mesAtual = moment().format('MMMM/YYYY');
	vm.lancamentosFuturos = [];

	LancamentoService.getLancamentos({
		ordenacao: 'DESC',
		de: moment().format('YYYY-MM-DD'),
		ate: moment().endOf('month').format('YYYY-MM-DD'),
		idUsuario: usuario.id
	}).then((response) => {
		vm.lancamentosFuturos = response.data.map((lancamento) => {
			return {
				data: moment(lancamento.data).format('DD/MM/YYYY - HH:mm:ss'),
				tipo: TIPOS_LANCAMENTOS[lancamento.tipo],
				descricao: lancamento.descricao,
				natureza: CATEGORIAS_LANCAMENTOS[lancamento.natureza],
				valor: currencyFormatter.format(lancamento.valor, { currency: 'BRL' }),
			}
		});
	})
}