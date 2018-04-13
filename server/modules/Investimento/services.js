const investimentoIntegration = require('./integration');

const getInvestimentos = (idUsuario) => {
	return new Promise((resolve, reject) => {
		investimentoIntegration.getInvestimentos().then((response) => {
			console.log(response.length);
			if(response.length == 0){
				resolve([])
			} else {
				const investimentos = response.map((investimento) => {
					return {
				        instituicao: investimento.nome_instituicao,
				        nome: investimento.nome,
				       	taxa: investimento.taxa,
				        vencimento: investimento.vencimento,
				        indexacao: investimento.indexacao
				    }
				});

				resolve(investimentos);
			}
		}).catch((error) => {
			reject(error);
		});
	});
}

module.exports = {
	getInvestimentos
}