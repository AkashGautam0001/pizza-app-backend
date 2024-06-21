const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		productName: {
			type: String,
			required: true,
			minLength: [5, "Product name must be altest 5 character"],
			trim: true,
		},
		description: {
			type: String,
			required: true,
			minLength: [5, "Product Description must be altest 5 character"],
			trim: true,
		},
		productImage: {
			type: String,
		},
		quantity: {
			type: Number,
			required: true,
			default: 10,
		},
		price: {
			type: Number,
			required: [true, "Product price is required"],
		},
		category: {
			type: String,
			enum: ["veg", "non-veg", "drinks", "sides"],
			default: "veg",
		},
		inStock: {
			type: Boolean,
			required: [true, "In Stock status is required"],
			default: true,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
