import LancamentosController from '/src/modules/lancamentos/controllers/lancamentosController';
import { TIPOS_LANCAMENTOS, CATEGORIAS_LANCAMENTOS } from '/src/modules/lancamentos/constants/';
import { LancamentoService } from '../../services';
import route from '/src/modules/lancamentos/route';

import '../../styles/lancamentos.scss';

const Lancamentos = angular.module('app.lancamentos', ['ui.router']).
			controller('LancamentosController', LancamentosController).
			service('LancamentoService', LancamentoService).
			constant('TIPOS_LANCAMENTOS', TIPOS_LANCAMENTOS).
			constant('CATEGORIAS_LANCAMENTOS', CATEGORIAS_LANCAMENTOS).
			config(route);

export default Lancamentos.name;