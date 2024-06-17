const cloudinary = require("../config/cloudinaryConfig");
const ProductRespository = require("../repositories/productRepository");
const fs = require("fs/promises");

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
			throw {
				reason: "Not able to upload image to cloudinary",
				statusCode: 500,
			};
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

module.exports = {
	createProduct,
};
