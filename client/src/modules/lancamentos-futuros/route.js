route.$inject = ['$stateProvider', '$urlMatcherFactoryProvider'];

export default function route($stateProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('lancamentosFuturos', {
        abstract: false,
        cache: false,
        url: "/lancamentos-futuros",
        controller: 'LancamentosFuturosController',
        controllerAs: 'lancamentosFuturosCtrl',
        template: require("./views/lancamentos-futuros.html")
    });
}