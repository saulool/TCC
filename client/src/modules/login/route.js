route.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];

export default function route($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
		.state('login', {
	        abstract: false,
	        cache: false,
	        url: "/login",
	        controller: 'LoginController',
	        controllerAs: 'loginCtrl',
	        template: require("./views/login.html")
	    })
	    .state('configuracao', {
	        abstract: false,
	        cache: false,
	        url: "/configuracao",
	        controller: 'ConfiguracaoController',
	        controllerAs: 'configuracaoCtrl',
	        template: require("./views/configuracao.html")
	    })
	    .state('recuperarDados', {
	        abstract: false,
	        cache: false,
	        url: "/recuperar-dados",
	        controller: 'RecuperarDadosController',
	        controllerAs: 'recuperarDadosCtrl',
	        template: require("./views/recuperar-dados.html")
	    });
}