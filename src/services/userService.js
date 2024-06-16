class UserService {
	constructor(_userRespository) {
		this.userRespository = _userRespository;
	}

	async registerUser(userDetails) {
		console.log("Hitting User Service");
		const user = await this.userRespository.findUser({
			email: userDetails.email,
			mobileNumber: userDetails.mobileNumber,
		});

		if (user) {
			throw {
				reason: "User with the given email and mobile already exit",
				statusCode: 400,
			};
		}

		const newUser = await this.userRespository.createUser({
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
}

module.exports = UserService;
