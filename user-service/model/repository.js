import UserModel from "./user-model.js";
import JWTModel from "./jwt-model.js";
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

//Set up mongoose connection
let mongoDB =
	process.env.ENV == "PROD"
		? process.env.DB_CLOUD_URI
		: process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create new account
export async function createUser(params) {
	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(params.password, salt);

	return new UserModel({
		username: params.username,
		email: params.email,
		password: hashedPassword,
	});
}

// Delete account
export async function deleteUser(email) {
	return await UserModel.findOneAndRemove({ email: email });
}

// Change password
export async function changePassword(email, oldPassword, newPassword) {
	const account = await UserModel.findOne({ email: email });

	if (await bcrypt.compare(oldPassword, account.password)) {
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		account.password = hashedPassword;
		await account.save();
		return account;
	} else {
		return null;
	}
}

// Reset password
export async function resetPassword(token, newPassword) {
	const resetToken = crypto.createHash("sha256").update(token).digest("hex");
	const account = await UserModel.findOne({
		resetToken,
		resetTokenExpiry: { $gt: Date.now() },
	});

	if (account) {
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		account.password = hashedPassword;
		account.resetToken = undefined;
		account.resetTokenExpiry = undefined;
		await account.save();
		return account;
	} else {
		return null;
	}
}

// Verify Email
export async function verifyEmail(token) {
	try {
		const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
		const account = await UserModel.findOne({
			email: verifiedToken.email,
		});
		if (account) {
			account.verified = true;
			account.save();
			return account;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

// Check username / email already exists for create account
export async function isExist(username, email) {
	const usernameExist = await UserModel.findOne({ username: username });
	const emailExist = await UserModel.findOne({ email: email });
	return usernameExist || emailExist;
}

// Check email already exists for forgot password
export async function isEmailExist(email) {
	return await UserModel.findOne({ email: email });
}

// Check email and password valid for sign in
export async function isValidSignIn(email, password) {
	const account = await UserModel.findOne({ email: email });
	// Email registered
	if (account) {
		// Check email verified
		if (account.verified) {
			// Check email and hashed password match
			if (await bcrypt.compare(password, account.password)) {
				return account.username;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
	// Email is not registered
	else {
		return null;
	}
}

// Logout Blacklist JWT
export async function logoutUser(token) {
	return new JWTModel({
		token: token,
		expireAfterSeconds: 86400,
	});
}

// Verify token - Is blacklist?
export async function isBlacklist(token) {
	return await JWTModel.findOne({ token: token });
}
