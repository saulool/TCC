import SituacaoFinanceiraController from '/src/modules/situacao-financeira/controllers/situacaoFinanceiraController';
import route from '/src/modules/situacao-financeira/route';

import '../../styles/situacao-financeira.scss';

const SituacaoFinanceira = angular.module('app.situacaoFinanceira', ['ui.router']).
			controller('SituacaoFinanceiraController', SituacaoFinanceiraController).
			config(route);

export default SituacaoFinanceira.name;