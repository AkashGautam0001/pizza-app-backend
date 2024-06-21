const Cart = require("../schema/cartSchema");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");

async function createCart(userId) {
	try {
		const newCart = await Cart.create({ user: userId });
		return newCart;
	} catch (error) {
		if (error.name === "ValidationError") {
			const errorMessageList = Object.keys(error.errors).map(
				(property) => {
					return error.errors[property].message;
				}
			);
			throw new BadRequestError(errorMessageList);
		}
		throw new InternalServerError();
	}
}

async function getCartByUserId(userId) {
	try {
		const cart = await Cart.findOne({
			user: userId,
		})
			.populate({
				path: "items.product",
				model: "product",
			})
			.exec();
		return cart;
	} catch (error) {
		console.log(error);
		throw new InternalServerError();
	}
}

module.exports = {
	createCart,
	getCartByUserId,
};
