const investimentoService = require('./services.js');

module.exports = (app) => {
    app.get('/api/investimentos', (req, res) => {
        investimentoService.getInvestimentos().then((response) => {
        	res.send(response);
        }).catch((error) => {
			res.status(500).send(error);
        });
    });
}