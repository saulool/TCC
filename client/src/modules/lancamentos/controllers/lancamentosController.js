import moment from 'moment';
import * as errorUtils from '../../utils/errors';

LancamentosController.$inject = ['LancamentoService', 'TIPOS_LANCAMENTOS', 'CATEGORIAS_LANCAMENTOS', 'localStorageService'];

export default function LancamentosController(LancamentoService, TIPOS_LANCAMENTOS, CATEGORIAS_LANCAMENTOS, localStorageService) {
	const vm = this;
	const usuario = localStorageService.get('usuario');
	vm.TIPOS_LANCAMENTOS = TIPOS_LANCAMENTOS;
	vm.CATEGORIAS_LANCAMENTOS = CATEGORIAS_LANCAMENTOS;

	vm.error = null;

	const lancarErro = (error) => {
		vm.error = error;
	}

	const limparErro = () => {
		vm.error = {
			hasError: false,
			message: null
		};
	}

	vm.form = {
		descricao: null,
		tipo: TIPOS_LANCAMENTOS.D,
		data: moment().toDate(),
		hora: moment().seconds(0).milliseconds(0).toDate(),
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
		CATEGORIAS_LANCAMENTOS.INVESTIMENTOS,
		CATEGORIAS_LANCAMENTOS.CONTAS,
		CATEGORIAS_LANCAMENTOS.OUTROS
	]

	const limparForm = (form) => {
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

		form.$setPristine();
	}

	const converteValorKey = (object, valor) => {
		return Object.keys(object).find(key => object[key] === valor)
	}

	vm.limparNaturezaLancamento = () => {
		vm.form.naturezaLancamento = null;
	}

	const formatarData = (dia, hora, recorrencia) => {
		return `${moment(dia).add(recorrencia, 'month').format('YYYY-MM-DD')} ${moment(hora, 'h:mm').format('HH:mm:ss')}`;
	}

	const montarLancamento = (lancamento, recorrencia) => {
		return {
			idUsuario: usuario.id,
			descricao: lancamento.descricao,
			tipo: converteValorKey(TIPOS_LANCAMENTOS, lancamento.tipo),
			data: formatarData(lancamento.data, lancamento.hora, recorrencia),
			valor: lancamento.valor,
			natureza: converteValorKey(CATEGORIAS_LANCAMENTOS, lancamento.natureza),
			cnpj: lancamento.cnpj,
			nomeCnpj: lancamento.nomeCnpj
		}
	}

	const montarLancamentos = (lancamento, recorrencia = 1) => {
		let lancamentos = [];

		for(let recorrenciaAtual=0; recorrenciaAtual<recorrencia; recorrenciaAtual++){
			lancamentos.push(montarLancamento(lancamento, recorrenciaAtual))
		}

		return lancamentos;
	}

	vm.cadastrar = (form) => {
		limparErro();

		if(form.$valid){
			const lancamentos = vm.form.lancamentoRecorrente ? montarLancamentos(vm.form, vm.form.frequencia) : montarLancamentos(vm.form, 1);

			LancamentoService.cadastrar(lancamentos).then(() => {
				limparForm(form);
			}).catch((error) => {
				lancarErro(errorUtils.handleError(error));
			});
		}else{
			lancarErro(new errorUtils.Error(true, 'Preencha o formulário corretamente'));
		}
	}
}