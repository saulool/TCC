import Login from '/src/modules/login';
import Home from '/src/modules/home';
import Lancamentos from '/src/modules/lancamentos';
import Informe from '/src/modules/informe';
import Cadastro from '/src/modules/cadastro';
import Investimentos from '/src/modules/investimentos';
import SituacaoFinanceira from '/src/modules/situacao-financeira';
import ConectarIF from '/src/modules/conectar-instituicao';
import LancamentosFuturos from '/src/modules/lancamentos-futuros';
import moment from 'moment';
import 'moment/locale/pt-br';
import './template.html';

moment().locale('pt-br');

angular
	.module('app', [Login, Home, Lancamentos, Informe, Cadastro, Investimentos, SituacaoFinanceira, ConectarIF, LancamentosFuturos, 'LocalStorageModule', 'chart.js', 'ui.utils.masks', 'ui.bootstrap'])
	.controller('generalController', ($scope, localStorageService, LancamentoService, $state, $rootScope, $sce) => {
		let usuario = localStorageService.get('usuario');
		$scope.numeroLancamentosProximos = 0;
		if(usuario){
			$scope.paginaLogin = false;
			$scope.bancoConectado = usuario.bancoConectado;
		}else{
			$scope.paginaLogin = true;
		}

		$rootScope.$on('LOGIN', () => {
			$scope.paginaLogin = false;
		});

		$rootScope.$on('LOGOUT', () => {
			$scope.paginaLogin = true;
		});

		$rootScope.$on('BANCO_CONECTADO', () => {
			$scope.bancoConectado = true;
			let usuario = localStorageService.get('usuario');
			usuario.bancoConectado = true;
			localStorageService.set('usuario', usuario);
		});

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
			LancamentoService.getLancamentos({
				ordenacao: 'DESC',
				de: moment().format('YYYY-MM-DD'),
				ate: moment().add(3, 'day').format('YYYY-MM-DD 23:59:59'),
				idUsuario: usuario.id
			}).then((lancamentos) => {
				$scope.numeroLancamentosProximos = lancamentos.data.length;

				$scope.test = $sce.trustAsHtml(`<b>Atenção:</b> Você possui ${$scope.numeroLancamentosProximos} lançamento(s) marcados para os próximos 3 dias, veja <a href="/#!/lancamentos-futuros">aqui</a>`);
			});
		});

		$scope.logout = () => {
			localStorageService.clearAll();
			$state.go('login');
			$rootScope.$broadcast('LOGOUT');
		}
	})
	.run(['$rootScope', 'localStorageService', '$state', ($rootScope, localStorageService, $state) => {
	  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
	  	switch(toState.name){
	  		case 'login': 
	  			if(localStorageService.get('usuario')) $state.go('home')
	  		case 'configuracao': return;
	  		case 'cadastro': return;
	  		case 'recuperarDados': break;
	  		default:
	  			if(!localStorageService.get('usuario')) $state.go('login')
	  	}
	  })
	}]);