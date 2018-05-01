import routeConfig from './routeConfig';
import Login from '/src/modules/login';
import Home from '/src/modules/home';
import Lancamentos from '/src/modules/lancamentos';
import Informe from '/src/modules/informe';
import Cadastro from '/src/modules/cadastro';
import Investimentos from '/src/modules/investimentos';
import SituacaoFinanceira from '/src/modules/situacao-financeira';
import moment from 'moment';

moment().locale('pt-br');

angular
	.module('app', [Login, Home, Lancamentos, Informe, Cadastro, Investimentos, SituacaoFinanceira, 'LocalStorageModule', 'chart.js', 'ui.utils.masks'])
	.controller('generalController', ($scope, localStorageService, $state, $rootScope) => {

		if(localStorageService.get('usuario')){
			//$scope.saldo = currencyFormatter.format(localStorageService.get('usuario').saldo, { currency: 'BRL' });
			
			//if(localStorageService.get('usuario').novoUsuario){
			//	$scope.paginaLogin = true;
			// }else{
			 	$scope.paginaLogin = false;
			// }
		}else{
			$scope.paginaLogin = true;
		}

		$rootScope.$on('LOGIN', () => {
			$scope.paginaLogin = false;
			//$scope.saldo = currencyFormatter.format(localStorageService.get('usuario').saldo, { currency: 'BRL' });
		});

		$rootScope.$on('LOGOUT', () => {
			$scope.paginaLogin = true;
			//$scope.saldo = null;
		})

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
	}])
	.config(routeConfig);