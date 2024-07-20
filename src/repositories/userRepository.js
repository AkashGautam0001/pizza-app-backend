const User = require("../schema/userSchema");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");

async function findUser(parameters) {
	try {
		const response = await User.findOne({ ...parameters });
		return response;
	} catch (error) {
		if (error.name === "ValidationError") {
			const errorMessageList = Object.keys(error.errors).map(
				(property) => {
					return error.errors[property].message;
				}
			);
			throw new BadRequestError(errorMessageList);
		}
		console.log(error);
		throw new InternalServerError();
	}
}

async function findUserById(userId) {
	try {
		const response = await User.findOne({ _id: userId });
		console.log("response", response);
		return response;
	} catch (error) {
		if (error.name === "ValidationError") {
			const errorMessageList = Object.keys(error.errors).map(
				(property) => {
					return error.errors[property].message;
				}
			);
			throw new BadRequestError(errorMessageList);
		}
		console.log(error);
		throw new InternalServerError();
	}
}

async function createUser(userDetails) {
	console.log("Hitting User Repository");
	try {
		const response = await User.create(userDetails);
		return response;
	} catch (error) {
		if (error.name === "ValidationError") {
			const errorMessageList = Object.keys(error.errors).map(
				(property) => {
					return error.errors[property].message;
				}
			);
			throw new BadRequestError(errorMessageList);
		}
		console.log(error);
		throw new InternalServerError();
	}
}

module.exports = {
	findUser,
	createUser,
	findUserById,
};
