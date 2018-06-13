route.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];

export default function route($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('popoverTemplate', {
        abstract: false,
        cache: false,
        url: "/template.html",
        template: require("./template.html")
    });
}