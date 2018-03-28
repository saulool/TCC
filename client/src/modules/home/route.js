route.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];

export default function route($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('home', {
        abstract: false,
        cache: false,
        url: "/",
        controller: 'HomeController',
        controllerAs: 'homeCtrl',
        template: require("./views/home.html")
    });
}