import { configuration } from '../configuration';

InvestimentoService.$inject = ['$http'];

export default function InvestimentoService($http) {
	const vm = this;

    vm.getInvestimentos = () => {
    	return $http.get(`${configuration.serverUrl}/api/investimentos`);
    }

    vm.calcularInvestimento = (aporteInicial, aporteMensal, vencimento, taxa, indexacao) => {
        return $http.post(`${configuration.serverUrl}/api/investimentos/calcular`, {
            aporteInicial,
            aporteMensal,
            vencimento,
            taxa,
            indexacao
        });
    }
}