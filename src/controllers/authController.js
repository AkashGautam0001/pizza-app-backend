const { COOKIE_SECURE } = require("../config/serverConfig");
const { loginUser } = require("../services/authService");

async function login(req, res) {
	console.log("cookie from fronted", req.cookies);
	try {
		const loginPayload = req.body;
		const response = await loginUser(loginPayload);
		res.cookie("authToken", response.token, {
			httpOnly: true,
			secure: COOKIE_SECURE,
			maxAge: 7 * 24 * 60 * 60 * 1000,
			sameSite: "None",
		});
		return res.status(200).json({
			success: true,
			message: "Logged in Successfully",
			data: {
				userRole: response.userRole,
				userData: response.userData,
			},
			error: {},
		});
	} catch (error) {
		res.status(error.statusCode).json({
			success: false,
			message: error.message,
			data: {},
			error: error,
		});
	}
}

async function logout(req, res) {
	try {
		res.cookie("authToken", "", {
			httpOnly: true,
			secure: COOKIE_SECURE,
			sameSite: "None",
		});

		return res.status(200).json({
			success: true,
			message: "LogOut Successfully",
			data: {},
			error: {},
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
			data: {},
			error: error,
		});
	}
}

module.exports = {
	login,
	logout,
};
