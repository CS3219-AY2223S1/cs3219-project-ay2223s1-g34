import mongoose from "mongoose";
import crypto from "crypto";

var Schema = mongoose.Schema;

// Validation only done on backend
var validateEmail = function (email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

// resetToken is for authenticated password resets
// resetTokenExpiry is the valid time period of the resetToken (i.e. expiry time for reset link)
let UserModelSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: "Email address is required",
		validate: [validateEmail, "Please fill a valid email address"],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},
	password: {
		type: String,
		required: true,
	},
	resetToken: {
		type: String,
	},
	resetTokenExpiry: {
		type: String,
	},
	verified: {
		type: Boolean,
		default: false,
	},
});

UserModelSchema.methods.getResetPasswordToken = function () {
	const token = crypto.randomBytes(32).toString("hex");
	this.resetToken = crypto.createHash("sha256").update(token).digest("hex");
	this.resetTokenExpiry = Date.now() + 10 * 60 * 1000;
	return token;
};

export default mongoose.model("UserModel", UserModelSchema);
