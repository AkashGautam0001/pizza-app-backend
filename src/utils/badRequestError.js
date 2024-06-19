const AppError = require("./appError");

class BadRequestError extends AppError {
	constructor(invalidParams) {
		// properties: []
		let message = "";
		invalidParams.forEach((params) => (message += `${params}\n`));

		super(`The Request has following invalid parameter `, 400);
	}
}

module.exports = BadRequestError;
