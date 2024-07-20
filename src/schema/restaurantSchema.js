const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		noOfPeople: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		duration: {
			type: String,
		},
		status: {
			type: String,
			enum: ["VISITED", "NOT VISITED"],
			default: "VISITED",
		},
	},
	{
		timestamps: true,
	}
);

const RestaurantContact = mongoose.model("restaurant", restaurantSchema);

module.exports = RestaurantContact;
