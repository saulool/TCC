import moment from 'moment';
import * as currencyFormatter from 'currencyFormatter.js';

InformeController.$inject = ['LancamentoService', 'localStorageService', 'CATEGORIAS_LANCAMENTOS'];

export default function InformeController(LancamentoService, localStorageService, CATEGORIAS_LANCAMENTOS) {
	const vm = this;
	const usuario = localStorageService.get('usuario');

	vm.anoFiscal = moment().format('YYYY') - 1;

	const formatarCnpj = (cnpj) => {
		cnpj = ("00000000000000" + cnpj).slice(-14);
		return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
	}

	LancamentoService.getLancamentosIR(usuario.id).then((response) => {
		vm.despesasRestituiveis = response.data.map((lancamento) => {
			return {
				data: moment(lancamento.data).format('DD/MM/YYYY - HH:mm:ss'),
				descricao: lancamento.descricao,
				natureza: CATEGORIAS_LANCAMENTOS[lancamento.natureza],
				cnpj: lancamento.cnpj ? formatarCnpj(lancamento.cnpj) : '-',
				nomeCnpj: lancamento.nomeCnpj ? lancamento.nomeCnpj : '-',
				valor: currencyFormatter.format(lancamento.valor, { currency: 'BRL' }),
			}
		});
	})
}