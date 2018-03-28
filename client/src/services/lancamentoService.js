import { configuration } from '../configuration';

LancamentoService.$inject = ['$http'];

export default function LancamentoService($http) {
	const vm = this;

    vm.cadastrar = (lancamentos) => {
    	return $http.post(`${configuration.serverUrl}/api/lancamento`, {
    		lancamentos
    	});
    }

    vm.getUltimoSaldo = (idUsuario) => {
    	return $http.get(`${configuration.serverUrl}/api/lancamento/${idUsuario}/ultimo-saldo`);
    }

    vm.getLancamentosIR = (idUsuario) => {
        return $http.get(`${configuration.serverUrl}/api/lancamento/${idUsuario}/lancamentos-ir`);
    }
}