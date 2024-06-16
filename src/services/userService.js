const { findUser, createUser } = require("../repositories/userRepository");

async function registerUser(userDetails) {
	console.log("Hitting User Service");
	const user = await findUser({
		email: userDetails.email,
		mobileNumber: userDetails.mobileNumber,
	});

	if (user) {
		throw {
			reason: "User with the given email and mobile already exit",
			statusCode: 400,
		};
	}

	const newUser = await createUser({
		email: userDetails.email,
		password: userDetails.password,
		mobileNumber: userDetails.mobileNumber,
		lastName: userDetails.lastName,
		firstName: userDetails.firstName,
	});

	if (!newUser) {
		throw {
			reason: "Error : createUser in userService",
			statusCode: 500,
		};
	}

	return newUser;
}

module.exports = {
	registerUser,
};
