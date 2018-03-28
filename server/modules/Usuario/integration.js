const login = (email, senha) => {
	const query = 'SELECT * FROM usuario WHERE email = $1 AND senha = $2';

	return __db.any(query, [email, senha]);
}

const cadastro = ({ nome, sobrenome, email, senha }) => {
	const query = 'INSERT INTO usuario (nome, sobrenome, email, senha, novo_usuario) VALUES ($1, $2, $3, $4, true)';

	return __db.any(query, [nome, sobrenome, email, senha]);
}

const removeStatusNovoUsuario = (idUsuario) => {
	const query = 'UPDATE usuario SET novo_usuario = false WHERE id_usuario = $1';

	return __db.any(query, [idUsuario]);
}

const recuperarDados = (email) => {
	const query = 'SELECT nome, sobrenome, email, senha FROM usuario WHERE email = $1';

	return __db.any(query, [email]);
}

const getSaldo = (idUsuario) => {
	const query = 'SELECT saldo FROM usuario WHERE id_usuario = $1';

	return __db.any(query, [idUsuario]);
}

const atualizarSaldo = (idUsuario, valor) => {
	const query = 'UPDATE usuario SET saldo = $2 WHERE id_usuario = $1';

	return __db.any(query, [idUsuario, valor]);
}

module.exports = {
	login,
	cadastro,
	removeStatusNovoUsuario,
	recuperarDados,
	getSaldo,
	atualizarSaldo
}