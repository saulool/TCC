const moment = require('moment');
const errorHandler = require('../Utils/error-handler');

const investimentoIntegration = require('./integration');

const getInvestimentos = (idUsuario) => {
	return new Promise((resolve, reject) => {
		investimentoIntegration.getInvestimentos().then((response) => {
			if(response.length == 0){
				resolve([])
			} else {
				const investimentos = response.map((investimento) => {
					return {
				        instituicao: investimento.nome_instituicao,
				        nome: investimento.nome,
				       	taxa: investimento.taxa,
				        vencimento: investimento.vencimento,
				        indexacao: investimento.nome_indice
				    }
				});

				resolve(investimentos);
			}
		}).catch((error) => {
			reject(error);
		});
	});
}

const juroCompostoSemMensalidade = (capital, taxa, tempo) => {
	return capital * Math.pow((1 + taxa), tempo);
}

const juroCompostoComMensalidade = (capital, taxa, tempo, mensalidade) => {
	return capital * Math.pow((1 + taxa), tempo) + mensalidade * (Math.pow((1 + taxa), tempo) - 1) / taxa;
}

const calcularImposto = (diferencaDias, lucro) => {
	let taxa = 0;

	if(diferencaDias <= 180) {
		taxa = 0.225
	} else if(diferencaDias > 180 && diferencaDias <= 360) {
		taxa = 0.2
	} else if(diferencaDias > 360 && diferencaDias <= 720) {
		taxa = 0.175
	} else {
		taxa = 0.15
	}

	return lucro * taxa;
}

const calcularValores = (aporteInicial, aporteMensal, vencimento, taxa) => {
	let diferencaMeses = Math.floor(moment(vencimento).diff(moment(), 'months', true));
	let diferencaDias = moment(vencimento).diff(moment(), 'days', true);
	let taxaMensal = Math.pow((1+(taxa/100)), (1/12))-1;
	let lucro = 0;
	let valorAplicado = aporteInicial + (aporteMensal * diferencaMeses);
	let valorBruto = 0;

	if(aporteMensal == 0){
		valorBruto = juroCompostoSemMensalidade(aporteInicial, taxaMensal, diferencaMeses);
		lucro = valorBruto - valorAplicado;
	} else {
		valorBruto = juroCompostoComMensalidade(aporteInicial, taxaMensal, diferencaMeses, aporteMensal);
		lucro = valorBruto - valorAplicado;
	}

	impostoPago = calcularImposto(diferencaDias, lucro);

	valorLiquido = valorBruto - impostoPago;

	return {
		valorAplicado,
		valorBruto,
		valorLiquido,
		impostoPago
	}
}

const calcularValores2 = (aporteInicial, aporteMensal, taxa, duracaoMeses) => {
	let diferencaDias = duracaoMeses*30;
	let taxaMensal = Math.pow((1+(taxa/100)), (1/12))-1;
	let lucro = 0;
	let valorAplicado = aporteInicial + (aporteMensal * duracaoMeses);
	let valorBruto = 0;

	if(aporteMensal == 0){
		valorBruto = juroCompostoSemMensalidade(aporteInicial, taxaMensal, duracaoMeses);
		lucro = valorBruto - valorAplicado;
	} else {
		valorBruto = juroCompostoComMensalidade(aporteInicial, taxaMensal, duracaoMeses, aporteMensal);
		lucro = valorBruto - valorAplicado;
	}

	impostoPago = calcularImposto(diferencaDias, lucro);

	valorLiquido = valorBruto - impostoPago;

	return valorBruto;
}

const calcularInvestimento = (aporteInicial, aporteMensal, vencimento, taxa, indexacao) => {
	return new Promise((resolve, reject) => {
		if(indexacao != 'SIMPLES') {
			investimentoIntegration.getMedianaIndices().then((response) => {
				let taxaIndexacao = response.find((element) => {
					if(element.nome == indexacao) return element;
				});

				if(taxaIndexacao) {
					indexacao == 'CDI' ? taxa = taxaIndexacao.media * (taxa/100) : taxa += taxaIndexacao.media;
					resolve(calcularValores(aporteInicial, aporteMensal, vencimento, taxa));
				}else{
					reject(errorHandler.buildErrorMessage('Indexação não encontrada'));
				}
			});
		} else {
			resolve(calcularValores(aporteInicial, aporteMensal, vencimento, taxa));
		}
	});
}

const calcularMesAMes = (aporteInicial, aporteMensal, vencimento, taxa, indexacao) => {
	return new Promise((resolve, reject) => {
		let diferencaMeses = Math.floor(moment(vencimento).diff(moment(), 'months', true));
		let retorno = [];

		for(let mes = 0; mes <= diferencaMeses; mes++ ) {
			retorno.push({
				mes,
				valor: calcularValores2(aporteInicial, aporteMensal, taxa, mes)
			})
		}

		resolve(retorno);
	});
}

module.exports = {
	getInvestimentos,
	calcularInvestimento,
	calcularMesAMes
}