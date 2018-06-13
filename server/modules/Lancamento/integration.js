const getLancamentos = (filtros) => {
	console.log(filtros);
	let query = `SELECT * FROM lancamentos WHERE data BETWEEN '${filtros.de}' AND '${filtros.ate}' AND id_usuario = ${filtros.idUsuario}`;

	if(filtros.tipo) query += ` AND tipo = '${filtros.tipo}'`;

	query += ` ORDER BY data ${filtros.ordenacao}`;

	if(filtros.quantidade) query += ` LIMIT ${filtros.quantidade}`;
	
	return __db.any(query);
}

const cadastrar = ({ idUsuario, descricao, tipo, natureza, valor, cnpj, nomeCnpj, data }) => {
	let query = `INSERT INTO lancamentos (id_usuario, descricao, tipo, natureza, valor, cnpj, nome_cnpj, data) VALUES ($1, $2, $3, $4, $5, $6, $7, '${data}')`;
	
	return __db.any(query, [idUsuario, descricao, tipo, natureza, valor, cnpj, nomeCnpj]);
}

const getLancamentosIR = (idUsuario) => {
	let query = `SELECT * FROM lancamentos WHERE id_usuario = $1 AND tipo = 'D' AND natureza IN ('EDUCACAO', 'SAUDE') AND cnpj is not null AND data BETWEEN (date_trunc('year', now()) - INTERVAL '1 year') AND (date_trunc('year', now())-INTERVAL '1 day') ORDER BY data`;
	
	return __db.any(query, [idUsuario]);
}

const adicionarLancamentosBanco = (idUsuario) => {
	let query = 
		`INSERT INTO lancamentos(id_usuario, descricao, tipo, natureza, valor, data)	VALUES ($1, 'INSERIDO PELO BANCO - Mercado', 'D', 'ALIMENTACAO', 123.43, to_timestamp(CONCAT(to_char(NOW(),'YYYY-MM'), '-07'), 'YYYY MM DD'));
		INSERT INTO lancamentos(id_usuario, descricao, tipo, natureza, valor, data)	VALUES ($1, 'INSERIDO PELO BANCO - Gasolina', 'D', 'LOCOMOCAO', 155.33, to_timestamp(CONCAT(to_char(NOW(),'YYYY-MM'), '-10'), 'YYYY MM DD'));
		INSERT INTO lancamentos(id_usuario, descricao, tipo, natureza, valor, data)	VALUES ($1, 'INSERIDO PELO BANCO - Mercado', 'D', 'ALIMENTACAO', 123.43, to_timestamp(CONCAT(to_char(NOW() - INTERVAL '1 month','YYYY-MM'), '-07'), 'YYYY MM DD'));
		INSERT INTO lancamentos(id_usuario, descricao, tipo, natureza, valor, data)	VALUES ($1, 'INSERIDO PELO BANCO - Gasolina', 'D', 'LOCOMOCAO', 155.33, to_timestamp(CONCAT(to_char(NOW() - INTERVAL '1 month','YYYY-MM'), '-10'), 'YYYY MM DD'));
		INSERT INTO lancamentos(id_usuario, descricao, tipo, natureza, valor, data)	VALUES ($1, 'INSERIDO PELO BANCO - Mercado', 'D', 'ALIMENTACAO', 123.43, to_timestamp(CONCAT(to_char(NOW() - INTERVAL '2 month','YYYY-MM'), '-07'), 'YYYY MM DD'));
		INSERT INTO lancamentos(id_usuario, descricao, tipo, natureza, valor, data)	VALUES ($1, 'INSERIDO PELO BANCO - Gasolina', 'D', 'LOCOMOCAO', 155.33, to_timestamp(CONCAT(to_char(NOW() - INTERVAL '2 month','YYYY-MM'), '-10'), 'YYYY MM DD'));`;

	return __db.any(query, [idUsuario])
}

module.exports = {
	getLancamentos,
	cadastrar,
	getLancamentosIR,
	adicionarLancamentosBanco
}