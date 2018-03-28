const buildErrorMessage = (errorMessage) => {
	return {
		error: true,
		message: errorMessage
	}
}

module.exports = {
	buildErrorMessage
}