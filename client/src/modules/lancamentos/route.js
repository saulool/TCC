route.$inject = ['$stateProvider', '$urlMatcherFactoryProvider'];

export default function route($stateProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('lancamentos', {
        abstract: false,
        cache: false,
        url: "/lancamentos",
        controller: 'LancamentosController',
        controllerAs: 'lancamentosCtrl',
        template: require("./views/lancamentos.html")
    });
}