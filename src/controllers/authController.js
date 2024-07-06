const serverConfig = require("../config/serverConfig");
const { COOKIE_SECURE } = require("../config/serverConfig");
const { loginUser } = require("../services/authService");

async function login(req, res) {
	console.log("cookie from fronted", res.cookies);
	try {
		const loginPayload = req.body;
		const response = await loginUser(loginPayload);
		console.log("authToken at authController", response.token);
		res.cookie("authToken", response.token, {
			// httpOnly: true,
			// secure: COOKIE_SECURE,
			// maxAge: 7 * 24 * 60 * 60 * 1000,
			// sameSite: "None",
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Adjust expiry as needed
			secure: serverConfig.COOKIE_SECURE, // Set to true if using HTTPS
			httpOnly: true,
			sameSite: "None",
			// domain: serverConfig.FRONTEND_URL,
		});

		console.log("response.userRole : ", response.userRole);
		console.log("response.userData : ", response.userData);
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
			secure: serverConfig.COOKIE_SECURE,
			sameSite: "None",
			// domain: serverConfig.FRONTEND_URL,
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
