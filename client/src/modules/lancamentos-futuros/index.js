import LancamentosFuturosController from '/src/modules/lancamentos-futuros/controllers/lancamentosFuturosController';
import route from '/src/modules/lancamentos-futuros/route';
import { LancamentoService } from '../../services';
import { CATEGORIAS_LANCAMENTOS, TIPOS_LANCAMENTOS } from '../lancamentos/constants/';

import '../../styles/lancamentos-futuros.scss';

const LancamentosFuturos = angular.module('app.lancamentosFuturos', ['ui.router']).
			controller('LancamentosFuturosController', LancamentosFuturosController).
			service('LancamentoService', LancamentoService).
			constant('CATEGORIAS_LANCAMENTOS', CATEGORIAS_LANCAMENTOS).
			constant('TIPOS_LANCAMENTOS', TIPOS_LANCAMENTOS).
			config(route);

export default LancamentosFuturos.name;