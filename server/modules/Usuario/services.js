const errorHandler = require('../Utils/error-handler');

const usuarioIntegration = require('./integration');

const login = (email, senha) => {
	return new Promise((resolve, reject) => {
		usuarioIntegration.login(email, senha).then((response) => {
			if(response.length > 0){
				const usuario = {
				    id: response[0].id_usuario,
				    nome: response[0].nome,
				    sobrenome: response[0].sobrenome,
				    email: response[0].email,
				    novoUsuario: response[0].novo_usuario,
				    saldo: response[0].saldo
				}

				resolve(usuario);
			} else {
				reject(errorHandler.buildErrorMessage('Dados de acesso incorretos'));
			}
		}).catch((err) => {
			reject();
		});
	});
}

const cadastro = (dados) => {
	return new Promise((resolve, reject) => {
		usuarioIntegration.cadastro(dados).then((response) => {
			resolve({
				message: 'ok'
			})
		}).catch((err) => {
			if(err.code == '23505') reject (errorHandler.buildErrorMessage('E-mail já cadastrado'));
			reject(err);
		});
	});
}

const removeStatusNovoUsuario = (idUsuario) => {
	return new Promise((resolve, reject) => {
		usuarioIntegration.removeStatusNovoUsuario(idUsuario).then((response) => {
			resolve({
				message: 'ok'
			})
		});
	});
}

const recuperarDados = (email) => {
	return new Promise((resolve, reject) => {
		usuarioIntegration.recuperarDados(email).then((response) => {
			if(response.length == 0){
				reject(errorHandler.buildErrorMessage('Usuário não encontrado'));
			} else {
				const usuario = {
				    nome: response[0].nome,
				    sobrenome: response[0].sobrenome,
				    email: response[0].email,
				    senha: response[0].senha
				}

				resolve(usuario);
			}
		}).catch((err) => {
			reject(err);
		});
	});
}

const getSaldo = (idUsuario) => {
	return new Promise((resolve, reject) => {
		usuarioIntegration.getSaldo(idUsuario).then((response) => {
			resolve(response[0])
		});
	});
}

const atualizarSaldo = (idUsuario, tipo, valor) => {
	return new Promise((resolve, reject) => {
		getSaldo(idUsuario).then((response) => {
			const saldoAtual = response.saldo;
			const saldoNovo = tipo === 'D' ? saldoAtual - valor : saldoAtual + valor;

			usuarioIntegration.atualizarSaldo(idUsuario, saldoNovo).then((response) => {
				resolve({
					message: 'ok'
				})
			});
		});
	});
}

module.exports = {
	login,
	cadastro,
	removeStatusNovoUsuario,
	recuperarDados,
	getSaldo,
	atualizarSaldo
}