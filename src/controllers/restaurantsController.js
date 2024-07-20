const { createTable } = require("../services/restaurantServices");
const AppError = require("../utils/appError");

async function bookTable(req, res) {
	try {
		console.log(req.body);
		const table = await createTable(req.params.id, req.body);

		console.log("table", table);
		return res.status(201).json({
			success: true,
			message: "Table Booked Successfully",
			data: table,
			error: {},
		});
	} catch (error) {
		if (error instanceof AppError) {
			return res.status(error.statusCode).json({
				success: false,
				message: error.message,
				data: {},
				error: error,
			});
		}
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Something went wrong",
			data: {},
			error: error,
		});
	}
}

module.exports = {
	bookTable,
};
