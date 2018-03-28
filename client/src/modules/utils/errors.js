const Error = class {
	constructor(hasError, message) {
		this.hasError = hasError; 
		this.message = message;
	}
}

function handleError(error){
	if(error.message) {
		return new Error(true, message);
	}

	if(error.status >= 500) {
		return new Error(true, error.data.message);
	} else {
		return new Error(true, 'Houve um erro na sua requisição')
	}
}

module.exports = {
	Error,
	handleError
}