import { configuration } from '../configuration';

LancamentoService.$inject = ['$http'];

export default function LancamentoService($http) {
	const vm = this;

    vm.cadastrar = (lancamentos) => {
    	return $http.post(`${configuration.serverUrl}/api/lancamento`, {
    		lancamentos
    	});
    }

    vm.getLancamentos = (filtros) => {
        return $http.get(`${configuration.serverUrl}/api/lancamentos`, {
            params: filtros
        });
    }

    vm.getLancamentosIR = (idUsuario) => {
        return $http.get(`${configuration.serverUrl}/api/lancamento/${idUsuario}/lancamentos-ir`);
    }

    vm.adicionarLancamentosBanco = (idUsuario, agencia, conta) => {
        return $http.post(`${configuration.serverUrl}/api/lancamento/${idUsuario}/lancamentos-banco`, {
            agencia,
            conta
        });
    }
}