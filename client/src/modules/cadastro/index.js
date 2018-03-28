import CadastroController from '/src/modules/cadastro/controllers/cadastroController';
import UsuarioService from '/src/services/usuarioService';
import route from '/src/modules/cadastro/route';

import '../../styles/cadastro.scss';

const Cadastro = angular.module('app.cadastro', ['ui.router']).
			controller('CadastroController', CadastroController).
			service('UsuarioService', UsuarioService).
			config(route);

export default Cadastro.name;