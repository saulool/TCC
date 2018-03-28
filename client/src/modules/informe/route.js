route.$inject = ['$stateProvider', '$urlMatcherFactoryProvider'];

export default function route($stateProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('informe', {
        abstract: false,
        cache: false,
        url: "/informe",
        controller: 'InformeController',
        controllerAs: 'informeCtrl',
        template: require("./views/informe.html")
    });
}