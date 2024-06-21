const Order = require("../schema/orderSchema");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");

async function createNewOrder(orderDetails) {
	try {
		const order = await Order.create(orderDetails);
		console.log("order", order);
		return order;
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

async function getOrdersByUserId(userId) {
	try {
		const orders = await Order.find({ user: userId }).populate({
			path: "items.product",
			model: "product",
		});
		return orders;
	} catch (error) {
		console.log(error);
		throw new InternalServerError();
	}
}
async function getOrderById(orderId) {
	try {
		const order = await Order.find(orderId).populate({
			path: "items.product",
			model: "product",
		});
		return order;
	} catch (error) {
		console.log(error);
		throw new InternalServerError();
	}
}

async function updateOrderStatus(orderId, status) {
	try {
		const order = await Order.findByIdAndUpdate(
			orderId,
			{ status: status },
			{ new: true }
		);
		return order;
	} catch (error) {
		console.log(error);
		throw new InternalServerError();
	}
}

module.exports = {
	createNewOrder,
	getOrdersByUserId,
	getOrderById,
	updateOrderStatus,
};
