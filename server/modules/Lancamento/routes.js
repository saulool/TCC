const lancamentoService = require('./services.js');

module.exports = (app) => {
    app.get('/api/lancamentos', (req, res) => {
    	const quantidade = req.query.quantidade;
    	const de = req.query.de;
    	const ate = req.query.ate;
    	const ordenacao = req.query.ordenacao;
        const tipo = req.query.tipo;
        const idUsuario = req.query.idUsuario;

        lancamentoService.getLancamentos(idUsuario, quantidade, de, ate, ordenacao, tipo).then((response) => {
        	res.send(response);
        }).catch((error) => {
			res.status(500).send(error);
        });
    });

    app.post('/api/lancamento/', (req, res) => {
        lancamentoService.cadastrar(req.body.lancamentos).then((response) => {
        	console.log(123, response);
        	res.send(response);
        }).catch((error) => {
			res.status(500).send(error);
        });
    });

    app.get('/api/lancamento/:idUsuario/lancamentos-ir', (req, res) => {
        lancamentoService.getLancamentosIR(req.params.idUsuario).then((response) => {
            console.log(response);
            res.send(response);
        }).catch((error) => {
            res.status(500).send(error);
        });
    });

    app.post('/api/lancamento/:idUsuario/lancamentos-banco', (req, res) => {
        lancamentoService.adicionarLancamentosBanco(req.params.idUsuario, req.body.agencia, req.body.conta).then((response) => {
            res.send();
        }).catch((error) => {
            res.status(500).send(error);
        });
    });
}