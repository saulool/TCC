const investimentoService = require('./services.js');

module.exports = (app) => {
    app.get('/api/investimentos', (req, res) => {
        investimentoService.getInvestimentos().then((response) => {
            res.send(response);
        }).catch((error) => {
            res.status(500).send(error);
        });
    });

    app.post('/api/investimentos/calcular', (req, res) => {
        investimentoService.calcularInvestimento(req.body.aporteInicial, req.body.aporteMensal, req.body.vencimento, req.body.taxa, req.body.indexacao).then((response) => {
            res.send(response);
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
    });

    app.post('/api/investimentos/calcularr', (req, res) => {
        investimentoService.calcularMesAMes(req.body.aporteInicial, req.body.aporteMensal, req.body.vencimento, req.body.taxa, req.body.indexacao).then((response) => {
            res.send(response);
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
    });
}