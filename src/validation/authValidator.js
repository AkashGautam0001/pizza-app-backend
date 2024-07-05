const jwt = require("jsonwebtoken");
const { JWT_SECRET, COOKIE_SECURE } = require("../config/serverConfig");
const UnAuthorisedError = require("../utils/unauthorisedError");
const serverConfig = require("../config/serverConfig");

async function isLoggedIn(req, res, next) {
	const token = req.cookies["authToken"];
	console.log(token);
	if (!token) {
		return res.status(401).json({
			success: false,
			data: {},
			error: "Not Authenticated",
			message: "No Auth Token Provided",
		});
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		console.log("Decoded", decoded);
		if (!decoded) {
			throw new UnAuthorisedError();
		}

		req.user = {
			email: decoded.email,
			id: decoded.id,
			role: decoded.role,
		};

		next();
	} catch (error) {
		console.log(error.name);
		if (error.name === "TokenExpiredError") {
			res.cookie("authToken", "", {
				httpOnly: true,
				secure: serverConfig.COOKIE_SECURE,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				sameSite: "None",
			});
			return res.status(200).json({
				success: true,
				message: "Log out successfully",
				error: {},
				data: {},
			});
		}

		return res.status(401).json({
			success: false,
			data: {},
			error: error,
			message: "Invalid Token Provided",
		});
	}
}

function isAdmin(req, res, next) {
	const loggedInUser = req.user;
	if (loggedInUser.role === "ADMIN") {
		next();
	} else {
		return res.status(401).json({
			success: false,
			data: {},
			message: "You are not authorised for this action",
			error: {
				statusCode: 401,
				reason: "Unauthorised user for this action",
			},
		});
	}
}

module.exports = {
	isLoggedIn,
	isAdmin,
};
