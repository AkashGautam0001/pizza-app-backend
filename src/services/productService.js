const cloudinary = require("../config/cloudinaryConfig");
const ProductRespository = require("../repositories/productRepository");
const fs = require("fs/promises");
const InternalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");

async function createProduct(productDetails) {
	const imagePath = productDetails.imagePath;

	if (imagePath) {
		try {
			const cloudinaryResponse = await cloudinary.uploader.upload(
				imagePath
			);
			var productImage = cloudinaryResponse.secure_url;
			fs.unlink(imagePath);
		} catch (error) {
			throw new InternalServerError();
		}
	}

	const product = await ProductRespository.createProduct({
		...productDetails,
		productImage: productImage,
	});

	if (!product) {
		throw {
			reason: "Not able to create Product",
			statusCode: 500,
		};
	}

	return product;
}

async function getProductById(productId) {
	const response = await ProductRespository.getProductById(productId);
	if (!response) {
		throw new NotFoundError("Product");
	}
	return response;
}

async function deleteProductById(productId) {
	const response = await ProductRespository.deleteProductById(productId);
	if (!response) {
		throw new NotFoundError("Product");
	}
	return response;
}

module.exports = {
	createProduct,
	getProductById,
	deleteProductById,
};
