const getInvestimentos = () => {
	let query = `SELECT * FROM investimento WHERE vencimento >= now() ORDER BY vencimento`;
	
	return __db.any(query);
}

module.exports = {
	getInvestimentos
}