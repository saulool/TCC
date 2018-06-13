route.$inject = ['$stateProvider', '$urlMatcherFactoryProvider'];

export default function route($stateProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('conectarIf', {
        abstract: false,
        cache: false,
        url: "/conectar-if",
        controller: 'ConectarIFController',
        controllerAs: 'conectarIFCtrl',
        template: require("./views/conectar-if.html")
    });
}