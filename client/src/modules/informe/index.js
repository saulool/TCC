import InformeController from '/src/modules/informe/controllers/informeController';
import route from '/src/modules/informe/route';
import { LancamentoService } from '../../services';
import { CATEGORIAS_LANCAMENTOS } from '../lancamentos/constants/';

import '../../styles/informe.scss';

const Informe = angular.module('app.informe', ['ui.router']).
			controller('InformeController', InformeController).
			service('LancamentoService', LancamentoService).
			constant('CATEGORIAS_LANCAMENTOS', CATEGORIAS_LANCAMENTOS).
			config(route);

export default Informe.name;