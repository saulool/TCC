route.$inject = ['$stateProvider', '$urlMatcherFactoryProvider'];

export default function route($stateProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('cadastro', {
        abstract: false,
        cache: false,
        url: "/cadastro",
        controller: 'CadastroController',
        controllerAs: 'cadastroCtrl',
        template: require("./views/cadastro.html")
    });
}