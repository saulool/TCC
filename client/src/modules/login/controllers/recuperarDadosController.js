import * as errorUtils from '../../utils/errors';

RecuperarDadosController.$inject = ['$state', 'UsuarioService'];

export default function RecuperarDadosController($state, UsuarioService) {
	const vm = this;

	vm.email = null;
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

	vm.recuperarDados = (email) => {
		clearError();
		UsuarioService.recuperarDados(vm.email).then((response) => {
			alert(`email: ${response.data.email}, nome: ${response.data.nome} ${response.data.sobrenome}, senha: ${response.data.senha}`);
		}).catch((error) => {
			throwError(errorUtils.handleError(error));
		});
	}
}