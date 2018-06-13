import moment from 'moment';
import * as errorUtils from '../../utils/errors';

ConectarIFController.$inject = ['LancamentoService', 'localStorageService', '$rootScope'];

export default function ConectarIFController(LancamentoService, localStorageService, $rootScope) {
	const vm = this;
	const usuario = localStorageService.get('usuario');
	
	vm.bancos = ['ITAÚ', 'BANCO DO BRASIL', 'SANTANDER', 'CAIXA ECONOMICA FEDERAL', 'BRADESCO']

	vm.form = {
		bancoSelecionado: vm.bancos[0],
		agencia: null,
		conta: null,
		senha: null
	}

	vm.conectar = () => {
		console.log(vm.form.agencia, vm.form.conta);
		LancamentoService.adicionarLancamentosBanco(usuario.id, vm.form.agencia, vm.form.conta).then(() => {
			$rootScope.$broadcast('BANCO_CONECTADO');
		});
	}
}