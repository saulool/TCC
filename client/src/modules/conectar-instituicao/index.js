import ConectarIFController from '/src/modules/conectar-instituicao/controllers/conectarIFController';
//import { LancamentoService } from '../../services';
import route from '/src/modules/conectar-instituicao/route';

import '../../styles/conectar-instituicao.scss';

const ConectarIF = angular.module('app.conectarIf', ['ui.router']).
			controller('ConectarIFController', ConectarIFController).
			//service('LancamentoService', LancamentoService).
			config(route);

export default ConectarIF.name;