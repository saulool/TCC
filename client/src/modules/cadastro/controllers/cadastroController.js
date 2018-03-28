import * as errorUtils from '../../utils/errors';

CadastroController.$inject = ['$state', 'UsuarioService'];

export default function CadastroController($state, UsuarioService) {
	const vm = this;

	vm.form = {
		nome: null,
		sobrenome: null,
		email: null,
		senha: null,
		confirmacaoSenha: null,
		error: {
			hasError: false,
			message: null
		}
	}

	const limparErro = () => {	
		vm.form.error.hasError = false;
		vm.form.error.message = null;
	}

	const lancarErro = (error) => {
		vm.form.error = error
	}
	
	vm.cadastrarUsuario = (form) => {
		limparErro();
		if(form.$valid && (form.senha == form.confirmacaoSenha))
			UsuarioService.cadastrarUsuario(vm.form).then(() => {
				$state.go('home');
			}).catch((error) => {
				lancarErro(errorUtils.handleError(error));
			});
		else
			lancarErro(new errorUtils.Error(true, 'Preencha o formulário corretamente'));
	}
}