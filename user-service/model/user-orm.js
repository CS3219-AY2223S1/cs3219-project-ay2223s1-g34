import { sendEmail } from "../middleware/sendEmail.js";
import {
	createUser,
	deleteUser,
	isExist,
	isValidSignIn,
	changePassword,
	logoutUser,
	isEmailExist,
	resetPassword,
	verifyEmail,
} from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, email, password) {
	try {
		// Check whether username / email already exist
		const isExistingUser = await isExist(username, email);
		if (isExistingUser) {
			return false;
		} else {
			try {
				// Create User
				const newUser = await createUser({ username, email, password });
				await newUser.save();
				return true;
			} catch (err) {
				console.log("ERROR: Invalid credentials");
				return { err };
			}
		}
	} catch (err) {
		console.log("ERROR: Could not create new user");
		console.log(err);
		return { err };
	}
}

export async function ormDeleteUser(email) {
	try {
		return deleteUser(email);
	} catch (err) {
		console.log("ERROR: Delete account unsuccessful");
		console.log(err);
		return { err };
	}
}

export async function ormChangePassword(email, oldPassword, newPassword) {
	try {
		return changePassword(email, oldPassword, newPassword);
	} catch (err) {
		console.log("ERROR: Change password unsuccessful");
		console.log(err);
		return { err };
	}
}

export async function ormVerifyEmail(token) {
	try {
		return verifyEmail(token);
	} catch (err) {
		console.log("ERROR: Email verify unsuccessful");
		console.log(err);
		return { err };
	}
}

export async function ormResetPassword(token, newPassword) {
	try {
		return resetPassword(token, newPassword);
	} catch (err) {
		console.log("ERROR: Reset password unsuccessful");
		console.log(err);
		return { err };
	}
}

export async function ormSignIn(email, password) {
	try {
		// Check whether correct email and password
		return await isValidSignIn(email, password);
	} catch (err) {
		console.log("ERROR: Username or email address incorrect!");
		console.log(err);
		return { err };
	}
}

export async function ormLogoutUser(token) {
	try {
		const newToken = await logoutUser(token);
		await newToken.save();
		return true;
	} catch (err) {
		console.log("ERROR: User logout unsuccessful!");
		console.log(err);
		return { err };
	}
}

export async function ormForgotPassword(email) {
	// Check whether email exist
	const user = await isEmailExist(email);
	const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
	if (user && user.verified) {
		const resetToken = user.getResetPasswordToken();
		await user.save();

		// Create and send Email
		const resetUrl = `${FRONTEND_URL}/resetpw/${resetToken}`;
		const text = `Click the link to reset your password: ${resetUrl}`;
		try {
			await sendEmail({
				email: email,
				subject: "Password Reset",
				text,
			});
			return resetToken;
		} catch (err) {
			console.log(err);
			user.resetToken = undefined;
			user.resetTokenExpiry = undefined;
			await user.save();
			console.log(err);
			return err;
		}
	} else {
		return null;
	}
}

export async function ormSendVerifyEmail(email, token) {
	// Create and send Email
	const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
	const resetUrl = `${FRONTEND_URL}/verify/${token}`;
	const text = `Click the link to verify your email: ${resetUrl}`;
	try {
		await sendEmail({
			email: email,
			subject: "Email Verification",
			text,
		});
		return true;
	} catch (err) {
		console.log(err);
		return err;
	}
}