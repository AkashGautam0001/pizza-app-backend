const Product = require("../schema/productSchema");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");

async function createProduct(productDetails) {
	try {
		const response = await Product.create(productDetails);
		return response;
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

async function getProductById(productId) {
	try {
		const response = Product.findOne({ _id: productId });
		return response;
	} catch (error) {
		console.log(error);
	}
}

async function getAllProducts() {
	try {
		const products = Product.find({});
		return products;
	} catch (error) {
		console.log(error);
		throw new InternalServerError();
	}
}

async function deleteProductById(productId) {
	try {
		const response = Product.findByIdAndDelete({ _id: productId });
		return response;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	createProduct,
	getProductById,
	deleteProductById,
	getAllProducts,
};
