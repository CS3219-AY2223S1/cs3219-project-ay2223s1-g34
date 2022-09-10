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
				console.log("ERROR: Invalid email address");
				return { err };
			}
		}
	} catch (err) {
		console.log("ERROR: Could not create new user");
		return { err };
	}
}

export async function ormDeleteUser(email) {
	try {
		return deleteUser(email);
	} catch (err) {
		console.log("ERROR: Delete account unsuccessful");
		return { err };
	}
}

export async function ormChangePassword(email, oldPassword, newPassword) {
	try {
		return changePassword(email, oldPassword, newPassword);
	} catch (err) {
		console.log("ERROR: Change password unsuccessful");
		return { err };
	}
}

export async function ormResetPassword(token, newPassword) {
	try {
		return resetPassword(token, newPassword);
	} catch (err) {
		console.log("ERROR: Reset password unsuccessful");
		return { err };
	}
}

export async function ormSignIn(email, password) {
	try {
		// Check whether correct email and password
		return await isValidSignIn(email, password);
	} catch (err) {
		console.log("ERROR: Username or email address incorrect!");
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
		return { err };
	}
}

export async function ormForgotPassword(email) {
	// Check whether email exist
	const user = await isEmailExist(email);
	if (user) {
		const resetToken = user.getResetPasswordToken();
		await user.save();

		// Create and send Email
		const resetUrl = `http://localhost:3000/resetpw/${resetToken}`;
		const text = `Click the link to reset your password: ${resetUrl}`;
		try {
			// Put actual email address here to receive reset emails (as email addresses are not verified at creation)
			await sendEmail({
				email: process.env.TO_EMAIL,
				subject: "Password Reset",
				text,
			});
			return true;
		} catch (err) {
			console.log(err);
			user.resetToken = undefined;
			user.resetTokenExpiry = undefined;
			await user.save();
			return err;
		}
	} else {
		return false;
	}
}
