const getLancamentos = (filtros) => {
	let query = `SELECT * FROM lancamentos WHERE data BETWEEN '${filtros.de}' AND '${filtros.ate}' ORDER BY data ${filtros.ordenacao}`;

	if(filtros.quantidade) query += ` LIMIT ${filtros.quantidade}`;
	
	return __db.any(query);
}

const cadastrar = ({ idUsuario, descricao, tipo, natureza, valor, cnpj, nomeCnpj, data }) => {
	console.log(idUsuario);
	console.log(descricao);
	console.log(tipo);
	console.log(natureza);
	console.log(valor);
	console.log(cnpj);
	console.log(nomeCnpj);
	console.log(data);

	let query = `INSERT INTO lancamentos (id_usuario, descricao, tipo, natureza, valor, cnpj, nome_cnpj, data) VALUES ($1, $2, $3, $4, $5, $6, $7, '${data}')`;

	console.log(query);
	
	return __db.any(query, [idUsuario, descricao, tipo, natureza, valor, cnpj, nomeCnpj]);
}

const getLancamentosIR = (idUsuario) => {
	let query = `SELECT * FROM lancamentos WHERE id_usuario = $1 AND tipo = 'D' AND natureza IN ('EDUCACAO', 'SAUDE') AND cnpj is not null AND data BETWEEN (date_trunc('year', now()) - INTERVAL '1 year') AND (date_trunc('year', now())-INTERVAL '1 day')`;
	
	return __db.any(query, [idUsuario]);
}

module.exports = {
	getLancamentos,
	cadastrar,
	getLancamentosIR
}