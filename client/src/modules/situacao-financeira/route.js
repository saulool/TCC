route.$inject = ['$stateProvider', '$urlMatcherFactoryProvider'];

export default function route($stateProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('situacaoFinanceira', {
        abstract: false,
        cache: false,
        url: "/situacao-financeira",
        controller: 'SituacaoFinanceiraController',
        controllerAs: 'situacaoFinanceiraCtrl',
        template: require("./views/situacao-financeira.html")
    });
}