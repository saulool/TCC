const getInvestimentos = () => {
	let query = `SELECT iv.id_investimento, iv.nome_instituicao, iv.nome, iv.taxa, iv.vencimento, indx.nome AS nome_indice FROM investimento as iv INNER JOIN indices as indx ON iv.id_indice = indx.id_indice WHERE vencimento >= now() ORDER BY vencimento`;
	
	return __db.any(query);
}

const getMedianaIndices = () => {
	let query = `SELECT * FROM indices`;
	
	return __db.any(query);
}

module.exports = {
	getInvestimentos,
	getMedianaIndices
}