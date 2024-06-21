const {
	createOrder,
	getAllOrdersCreatedByUser,
	getOrdersDetailsById,
	updateOrder,
} = require("../services/orderService");
const AppError = require("../utils/appError");

async function placeNewOrder(req, res) {
	try {
		const order = await createOrder(req.user.id, req.body.paymentMethod);
		console.log("At Controller ", req.body);
		return res.status(201).json({
			success: true,
			message: "Successfully New Order created",
			error: {},
			data: order,
		});
	} catch (error) {
		console.log(error);
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

async function getAllOrdersByUser(req, res) {
	try {
		const order = await getAllOrdersCreatedByUser(req.user.id);
		console.log("At Controller ", req.body);
		return res.status(200).json({
			success: true,
			message: "Successfully fetched the all orders",
			error: {},
			data: order,
		});
	} catch (error) {
		console.log(error);
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

async function getOrder(req, res) {
	try {
		const order = await getOrdersDetailsById(req.params.orderId);
		console.log("At Controller ", req.body);
		return res.status(200).json({
			success: true,
			message: "Successfully fetched the order",
			error: {},
			data: order,
		});
	} catch (error) {
		console.log(error);
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

async function cancelOrder(req, res) {
	try {
		const order = await updateOrder(req.params.orderId, "CANCELLED");
		console.log("At Controller ", req.body);
		return res.status(200).json({
			success: true,
			message: "Successfully updated the order",
			error: {},
			data: order,
		});
	} catch (error) {
		console.log(error);
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

async function changeOrderStatus(req, res) {
	try {
		const order = await updateOrder(req.params.orderId, req.body.status);
		console.log("At Controller ", req.body);
		return res.status(200).json({
			success: true,
			message: "Successfully updated the order",
			error: {},
			data: order,
		});
	} catch (error) {
		console.log(error);
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
	placeNewOrder,
	getAllOrdersByUser,
	getOrder,
	cancelOrder,
	changeOrderStatus,
};
