import { configuration } from '../configuration';

UsuarioService.$inject = ['$http'];

export default function UsuarioService($http) {
	const vm = this;

    vm.login = (email, senha) => {
    	return $http.post(`${configuration.serverUrl}/api/usuario/login`, {
    		email,
    		senha
    	});
    }

    vm.cadastrarUsuario = (dados) => {
    	return $http.post(`${configuration.serverUrl}/api/usuario/cadastro`, {
    		dados
    	});
    }

    vm.removerStatusNovoUsuario = (idUsuario) => {
    	return $http.get(`${configuration.serverUrl}/api/usuario/remover-status-novo-usuario/${idUsuario}`);
    }

    vm.recuperarDados = (email) => {
    	return $http.get(`${configuration.serverUrl}/api/usuario/recuperar-dados/${email}`);
    }
}