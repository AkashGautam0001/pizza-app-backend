const RestaurantContact = require("../schema/restaurantSchema.js");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");

async function createTableResquest(userDetails) {
	try {
		console.log(userDetails);
		const response = await RestaurantContact.create(userDetails);
		console.log(response);
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
	createTableResquest,
};
