import moment from 'moment';
import * as errorUtils from '../../utils/errors';

LancamentosController.$inject = ['LancamentoService', 'TIPOS_LANCAMENTOS', 'CATEGORIAS_LANCAMENTOS', 'localStorageService'];

export default function LancamentosController(LancamentoService, TIPOS_LANCAMENTOS, CATEGORIAS_LANCAMENTOS, localStorageService) {
	const vm = this;
	const usuario = localStorageService.get('usuario');
	vm.TIPOS_LANCAMENTOS = TIPOS_LANCAMENTOS;
	vm.CATEGORIAS_LANCAMENTOS = CATEGORIAS_LANCAMENTOS;

	vm.error = null;

	const throwError = (error) => {
		vm.error = error;
	}

	const clearError = () => {
		vm.error = {
			hasError: false,
			message: null
		};
	}

	vm.form = {
		descricao: null,
		tipo: TIPOS_LANCAMENTOS.D,
		data: moment().toDate(),
		hora: moment().format('HH:mm'),
		valor: null,
		natureza: null,
		cnpj: null,
		nomeCnpj: null,
		lancamentoRecorrente: false,
		frequencia: null
	}

	vm.tiposLancamentos = [TIPOS_LANCAMENTOS.D, TIPOS_LANCAMENTOS.R];

	vm.tiposReceita = [
		CATEGORIAS_LANCAMENTOS.SALARIO,
		CATEGORIAS_LANCAMENTOS.INVESTIMENTOS,
		CATEGORIAS_LANCAMENTOS.ALUGUEL,
		CATEGORIAS_LANCAMENTOS.OUTROS
	]

	vm.tiposDespesas = [
		CATEGORIAS_LANCAMENTOS.SAUDE,
		CATEGORIAS_LANCAMENTOS.LAZER,
		CATEGORIAS_LANCAMENTOS.ALIMENTACAO,
		CATEGORIAS_LANCAMENTOS.EDUCACAO,
		CATEGORIAS_LANCAMENTOS.MORADIA,
		CATEGORIAS_LANCAMENTOS.LOCOMOCAO,
		CATEGORIAS_LANCAMENTOS.CONTAS,
		CATEGORIAS_LANCAMENTOS.OUTROS
	]

	const limparForm = () => {
		vm.form = {
			descricao: null,
			tipo: TIPOS_LANCAMENTOS.D,
			data: moment().toDate(),
			hora: moment().format('HH:mm'),
			valor: null,
			natureza: null,
			cnpj: null,
			nomeCnpj: null,
			lancamentoRecorrente: false,
			frequencia: null
		}
	}

	const converteValorKey = (object, valor) => {
		return Object.keys(object).find(key => object[key] === valor)
	}

	vm.limparNaturezaLancamento = () => {
		vm.form.naturezaLancamento = null;
	}

	const formatarData = (dia, hora) => {
		return `${moment(dia).format('YYYY-MM-DD')} ${moment(hora, 'h:mm').format('HH:mm:ss')}`;
	}

	const montarLancamento = (lancamento) => {
		return [{
			idUsuario: usuario.id,
			descricao: lancamento.descricao,
			tipo: converteValorKey(TIPOS_LANCAMENTOS, lancamento.tipo),
			data: formatarData(lancamento.data, lancamento.hora),
			valor: lancamento.valor,
			natureza: converteValorKey(CATEGORIAS_LANCAMENTOS, lancamento.natureza),
			cnpj: lancamento.cnpj,
			nomeCnpj: lancamento.nomeCnpj
		}]
	}

	vm.cadastrar = (form) => {
		if(form.$valid){
			const lancamentos = vm.form.lancamentoRecorrente ? montarLancamentos() : montarLancamento(vm.form);

			LancamentoService.cadastrar(lancamentos).then(() => {
				//limparForm();
			}).catch((error) => {
				throwError(errorUtils.handleError(error));
			});
		}
	}
}