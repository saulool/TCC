const usuarioService = require('./services.js');

module.exports = (app) => {
    app.post('/api/usuario/login', (req, res) => {
        usuarioService.login(req.body.email, req.body.senha).then((response) => {
        	res.send(response);
        }).catch((error) => {
			res.status(500).send(error);
        });
    });

    app.post('/api/usuario/cadastro', (req, res) => {
        usuarioService.cadastro(req.body.dados).then((response) => {
        	res.send(response);
        }).catch((error) => {
			res.status(500).send(error);
        });
    });

    app.get('/api/usuario/remover-status-novo-usuario/:idUsuario', (req, res) => {
        usuarioService.removeStatusNovoUsuario(req.params.idUsuario).then((response) => {
        	res.send(response);
        }).catch((error) => {
			res.status(500).send(error);
        });
    });

    app.get('/api/usuario/recuperar-dados/:email', (req, res) => {
        usuarioService.recuperarDados(req.params.email).then((response) => {
        	res.send(response);
        }).catch((error) => {
			res.status(500).send(error);
        });
    });
}