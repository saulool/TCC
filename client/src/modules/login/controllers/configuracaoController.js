import * as errorUtils from '../../utils/errors';
import moment from 'moment';

ConfiguracaoController.$inject = ['$state', 'UsuarioService', 'localStorageService', '$rootScope', 'LancamentoService'];

export default function ConfiguracaoController($state, UsuarioService, localStorageService, $rootScope, LancamentoService) {
	const vm = this;

	vm.valorInicial = null;
	vm.mostraForm = false;

	vm.mostrarForm = () => vm.mostraForm = true;

	vm.redirecionarHome = () => {
		let usuario = localStorageService.get('usuario');
		usuario.novoUsuario = false;

		localStorageService.set('usuario', usuario);
		$rootScope.$broadcast('LOGIN');
		$state.go('home');
	} 

	vm.configurar = (form) => {
		if(form.$valid){
			const idUsuario = localStorageService.get('usuario').id;

			const dadosLancamento = {
				idUsuario,
				descricao: 'Lançamento inicial',
				tipo: 'R',
				natureza: 'Outros',
				valor: vm.valorInicial,
				cnpj: null,
				nomeCnpj: null,
				data: moment().format('YYYY/MM/DD'),
				saldo: vm.valorInicial
			}

			LancamentoService.cadastrar(dadosLancamento).then(() => {
				UsuarioService.removerStatusNovoUsuario(idUsuario).then(() => {
					vm.redirecionarHome();
				})
			});
		}
			
	}
}