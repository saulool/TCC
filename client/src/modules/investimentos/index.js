import InvestimentosController from '/src/modules/investimentos/controllers/investimentosController';
import route from '/src/modules/investimentos/route';
import { InvestimentoService } from '../../services';

//import '../../styles/investimentos.scss';

const Informe = angular.module('app.investimentos', ['ui.router']).
			controller('InvestimentosController', InvestimentosController).
			service('InvestimentoService', InvestimentoService).
			config(route);

export default Informe.name;