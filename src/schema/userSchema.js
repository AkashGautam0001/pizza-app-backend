const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First Name is required"],
			minlength: [5, "first name must be atleast 5 character long"],
			maxlength: [
				20,
				"first name should be less than or equal to 20 character",
			],
			lowercase: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: [true, "Last Name is required"],
			minlength: [5, "Last name must be atleast 5 character long"],
			maxlength: [
				20,
				"Last name should be less than or equal to 20 character",
			],
			lowercase: true,
			trim: true,
		},
		mobileNumber: {
			type: String,
			trim: true,
			minlength: [10, "Mobile length should be length 10"],
			maxlength: [10, "Mobile length should be length 10"],
			unique: [true, "Phone number is already in user"],
			required: [true, "Phone number should be provided"],
		},
		email: {
			type: String,
			trim: true,
			required: [true, "Email should be provided"],
			unique: [true, "Email is already in use"],
			match: [
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Please fill a valid email",
			],
		},
		password: {
			type: String,
			required: [true, "Password should be provided"],
			minlength: [6, "Password number should be provided"],
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
