route.$inject = ['$stateProvider', '$urlMatcherFactoryProvider'];

export default function route($stateProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('investimentos', {
        abstract: false,
        cache: false,
        url: "/investimentos",
        controller: 'InvestimentosController',
        controllerAs: 'investimentosCtrl',
        template: require("./views/investimentos.html")
    });
}