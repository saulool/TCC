import * as errorUtils from '../../utils/errors';

LoginController.$inject = ['$state', 'UsuarioService', 'localStorageService', '$rootScope'];

export default function LoginController($state, UsuarioService, localStorageService, $rootScope) {
	const vm = this;

	vm.email = "";
	vm.senha = "";
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

	vm.login = (email, senha) => {
		UsuarioService.login(email, senha).then((responseData) => {
			const usuario = responseData.data;
			localStorageService.set('usuario', usuario);
			$rootScope.$broadcast('LOGIN');
			$state.go('home');
		}).catch((error) => {
			throwError(errorUtils.handleError(error));
		});
	}
}