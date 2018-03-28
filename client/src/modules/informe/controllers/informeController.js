import moment from 'moment';
import * as currencyFormatter from 'currencyFormatter.js';

InformeController.$inject = ['LancamentoService', 'localStorageService', 'CATEGORIAS_LANCAMENTOS'];

export default function InformeController(LancamentoService, localStorageService, CATEGORIAS_LANCAMENTOS) {
	const vm = this;
	const usuario = localStorageService.get('usuario');

	vm.anoFiscal = moment().format('YYYY') - 1;

	LancamentoService.getLancamentosIR(usuario.id).then((response) => {
		vm.despesasRestituiveis = response.data.map((lancamento) => {
			return {
				data: moment(lancamento.data).format('DD/MM/YYYY - HH:mm:ss'),
				descricao: lancamento.descricao,
				natureza: CATEGORIAS_LANCAMENTOS[lancamento.natureza],
				cnpj: lancamento.cnpj ? lancamento.cnpj : '-',
				nomeCnpj: lancamento.nomeCnpj ? lancamento.nomeCnpj : '-',
				valor: currencyFormatter.format(lancamento.valor, { currency: 'BRL' }),
			}
		});
	})


	// vm.despesasRestituiveis = [
	// 	{
	// 		tipo: 'Saúde',
	// 		cnpj: '32.938.853/0001-65',
	// 		nomeCNPJ: 'ASSIST MED',
	// 		valor: currencyFormatter.format(12384.68, { currency: 'BRL' })
	// 	},
	// 	{
	// 		tipo: 'Saúde',
	// 		cnpj: '35.162.205/0001-58',
	// 		nomeCNPJ: 'ODONTOLOGIA MAURO GUEDES',
	// 		valor: currencyFormatter.format(4500.00, { currency: 'BRL' })
	// 	},
	// 	{
	// 		tipo: 'Educação',
	// 		cnpj: '25.606.983/0001-35',
	// 		nomeCNPJ: 'PUCRS',
	// 		valor: currencyFormatter.format(15739.30, { currency: 'BRL' })
	// 	}
	// ]
}