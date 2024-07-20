const {
	createTableResquest,
} = require("../repositories/restaurantRespository");
const { findUserById } = require("../repositories/userRepository");
const InternalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");

async function createTable(userId, requestDetails) {
	console.log("userId", userId);
	console.log("requestDetails", requestDetails);
	const user = await findUserById(userId);

	console.log("user", user);

	if (!user) {
		throw new NotFoundError("user");
	}

	const newObject = {};

	newObject.user = user._id;
	newObject.location = requestDetails.location;
	newObject.noOfPeople = requestDetails.noOfPeople;
	newObject.date = requestDetails.date;
	newObject.time = requestDetails.time;
	newObject.duration = requestDetails.duration;

	console.log(newObject);

	const response = await createTableResquest(newObject);
	console.log("response", response);
	if (!response) {
		throw new InternalServerError();
	}

	return response;
}

module.exports = {
	createTable,
};
