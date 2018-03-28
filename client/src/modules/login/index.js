import LoginController from '/src/modules/login/controllers/loginController';
import ConfiguracaoController from '/src/modules/login/controllers/configuracaoController';
import RecuperarDadosController from '/src/modules/login/controllers/recuperarDadosController';
import route from '/src/modules/login/route';
import { UsuarioService, LancamentoService } from '../../services';

import '../../styles/login.scss';

const Login = angular.module('app.login', ['ui.router']).
			controller('LoginController', LoginController).
			controller('RecuperarDadosController', RecuperarDadosController).
			controller('ConfiguracaoController', ConfiguracaoController).
			service('UsuarioService', UsuarioService).
			service('LancamentoService', LancamentoService).
			config(route);

export default Login.name;