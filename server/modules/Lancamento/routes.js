const lancamentoService = require('./services.js');

module.exports = (app) => {
    app.get('/api/lancamentos', (req, res) => {
    	const quantidade = req.query.quantidade;
    	const de = req.query.de;
    	const ate = req.query.ate;
    	const ordenacao = req.query.ordenacao;

        lancamentoService.getLancamentos(quantidade, de, ate, ordenacao).then((response) => {
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
}