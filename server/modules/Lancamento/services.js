const errorHandler = require('../Utils/error-handler');
const lancamentoIntegration = require('./integration');
const usuarioService = require('../Usuario/services');

const getLancamentos = (idUsuario, quantidade, de = '1900/01/01', ate = '2100/01/01', ordenacao = 'ASC', tipo) => {
	let filtros = {
		idUsuario,
		quantidade,
		ordenacao,
		de,
		ate,
		tipo
	}

	return new Promise((resolve, reject) => {
		lancamentoIntegration.getLancamentos(filtros).then((response) => {
			if(response.length > 0){
				const lancamentos = response.map((lancamento) => {
					return {
				        id: lancamento.id_lancamento,
				        descricao: lancamento.descricao,
				       	tipo: lancamento.tipo,
				        natureza: lancamento.natureza,
				        valor: lancamento.valor,
				        cnpj: lancamento.cnpj,
				        nomeCnpj: lancamento.nome_cnpj,
				        data: lancamento.data
				    }
				});

				resolve(lancamentos);
			} else {
				reject(errorHandler.buildErrorMessage('Não foram encontrados lançamentos para este período'));
			}
		}).catch((error) => {
			reject(error);
		});
	});
}

const cadastrar = (lancamentos) => {
	return new Promise((resolve, reject) => {
		let promises = [];

		lancamentos.forEach((lancamento) => {
			promises.push(lancamentoIntegration.cadastrar(lancamento));
		});

		Promise.all(promises).then((response) => {
			resolve({message: 'ok'});
		}).catch((error) => {
			reject(error);
		});
	});
}

const getLancamentosIR = (idUsuario) => {
	return new Promise((resolve, reject) => {
		lancamentoIntegration.getLancamentosIR(idUsuario).then((response) => {
			console.log(response.length);
			if(response.length == 0){
				resolve([])
			} else {
				const lancamentos = response.map((lancamento) => {
					return {
				        id: lancamento.id_lancamento,
				        descricao: lancamento.descricao,
				       	tipo: lancamento.tipo,
				        natureza: lancamento.natureza,
				        valor: lancamento.valor,
				        cnpj: lancamento.cnpj,
				        nomeCnpj: lancamento.nome_cnpj,
				        data: lancamento.data
				    }
				});

				resolve(lancamentos);
			}
		}).catch((error) => {
			reject(error);
		});
	});
}

const adicionarLancamentosBanco = (idUsuario, agencia, conta) => {
	return new Promise((resolve, reject) => {
		lancamentoIntegration.adicionarLancamentosBanco(idUsuario).then((response) => {
			usuarioService.setarBancoConectado(idUsuario, agencia, conta).then(() => {
				resolve();
			}).catch((error) => {
				console.log(error);
				reject(error);
			});
		}).catch((error) => {
			console.log(error, 2);
			reject(error);
		});
	});
}

module.exports = {
	getLancamentos,
	cadastrar,
	getLancamentosIR,
	adicionarLancamentosBanco
}