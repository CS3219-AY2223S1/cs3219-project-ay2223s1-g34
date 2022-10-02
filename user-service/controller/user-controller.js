import { ormCreateUser as _createUser } from "../model/user-orm.js";
import { ormSignIn as _signIn } from "../model/user-orm.js";
import { ormDeleteUser as _deleteUser } from "../model/user-orm.js";
import { ormChangePassword as _changePassword } from "../model/user-orm.js";
import { ormLogoutUser as _logoutUser } from "../model/user-orm.js";
import { ormForgotPassword as _forgotPassword } from "../model/user-orm.js";
import { ormResetPassword as _resetPassword } from "../model/user-orm.js";
import { ormVerifyEmail as _verifyEmail } from "../model/user-orm.js";
import { ormSendVerifyEmail as _sendVerifyEmail } from "../model/user-orm.js";
import jwt from "jsonwebtoken";

// [POST - Public] Create user with username, email and password
export async function createUser(req, res) {
	try {
		const { username, email, password } = req.body;
		if (username && email && password) {
			const resp = await _createUser(username, email, password);
			if (resp.err) {
				return res.status(400).json({ message: "Invalid email" });
			}
			if (resp) {
				console.log(`Created new user ${username} successfully!`);
				return res.status(201).json({
					message: `Created new user ${username} successfully!`,
				});
			} else {
				console.log(`Username or email address already in use!`);
				return res.status(400).json({
					message: "Username or email address already in use!",
				});
			}
		} else {
			return res
				.status(400)
				.json({ message: "Please fill up all fields!" });
		}
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Database failure when creating new user!" });
	}
}

// [POST - Public] Sign in with username and password
export async function signIn(req, res) {
	try {
		const { email, password } = req.body;
		if (email && password) {
			const resp = await _signIn(email, password);
			if (resp) {
				console.log(`Successfully signed in as ${resp}!`);
				// Generate auth token
				const token = generateToken(email);
				res.cookie("token", token, { httpOnly: true });
				return res.status(200).json({
					message: `Successfully signed in as ${resp}!`,
					token: `${token}`,
				});
			} else {
				console.log(`Username or email address incorrect/unverified!`);
				return res.status(400).json({
					message: "Email address or password incorrect/unverified!",
				});
			}
		} else {
			return res
				.status(400)
				.json({ message: "Please fill up all fields!" });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "Database failure when signing in!" });
	}
}

// [DELETE - Private] Delete account
export async function deleteUser(req, res) {
	try {
		// Auth done as middleware
		const email = req.params.email;
		if (email) {
			const resp = await _deleteUser(email);
			if (resp) {
				console.log(`Deleted ${email} successfull!`);
				return res
					.status(200)
					.json({ message: `Deleted ${email} successfull!` });
			} else {
				console.log(`Deleted ${email} unsuccessfull!`);
				return res
					.status(400)
					.json({ message: `Deleted ${email} unsuccessfull!` });
			}
		} else {
			return res
				.status(400)
				.json({ message: "Please fill up all fields!" });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "Database failure when deleting user!" });
	}
}

// [PUT - Private] Change password
export async function changePassword(req, res) {
	try {
		const email = req.params.email;
		const oldPassword = req.body.old;
		const newPassword = req.body.new;
		if (email && oldPassword && newPassword) {
			const resp = await _changePassword(email, oldPassword, newPassword);
			if (resp) {
				console.log(`Change password successfull!`);
				return res
					.status(200)
					.json({ message: `Change password successfull!` });
			} else {
				console.log(`Incorrect old password`);
				return res
					.status(400)
					.json({ message: `Incorrect old password` });
			}
		} else {
			return res
				.status(400)
				.json({ message: "Please fill up all fields!" });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "Database failure when deleting user!" });
	}
}

// [PUT - Private] Reset password
export async function resetPassword(req, res) {
	try {
		const token = req.params.token;
		const newPassword = req.body.new;
		if (token && newPassword) {
			const resp = await _resetPassword(token, newPassword);
			if (resp) {
				console.log(`Reset password successfull!`);
				return res
					.status(200)
					.json({ message: `Reset password successfull!` });
			} else {
				console.log(`Reset password failed!`);
				return res
					.status(400)
					.json({ message: `Reset password failed!` });
			}
		} else {
			return res
				.status(400)
				.json({ message: "Please fill up all fields!" });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Unknown Error" });
	}
}

// [POST - Public] Send Verify Email
export async function sendVerifyEmail(req, res) {
	try {
		const token = generateToken(req.params.email);
		const resp = await _sendVerifyEmail(req.params.email, token);
		if (resp.err) {
			return res.status(400).json({ message: "Invalid email" });
		}
		if (resp) {
			console.log(`Email verification email sent!`);
			return res.status(200).json({
				message: `Email verification email sent!`,
				token: token,
			});
		} else {
			console.log(`Email verification email failed to sent!`);
			return res.status(500).json({
				message: "Email verification email failed to sent!",
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Unknown error" });
	}
}

// [POST - Private] Verify Email
export async function verifyEmail(req, res) {
	try {
		const token = req.params.token;
		if (token) {
			const resp = await _verifyEmail(token);
			if (resp) {
				console.log(`Email verified successfull!`);
				return res
					.status(200)
					.json({ message: `Email verified successfull!` });
			} else {
				console.log(`Email verified failed!`);
				return res
					.status(400)
					.json({ message: `Email verified failed!` });
			}
		} else {
			return res
				.status(400)
				.json({ message: "Please fill up all fields!" });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Unknown Error" });
	}
}

// [POST - Private] Logout
export async function logout(req, res) {
	try {
		const resp = await _logoutUser(req.cookies.token);
		res.clearCookie("token");
		res.end();
	} catch (err) {}
}

// [POST - Public] Forgot Password
export async function forgotPassword(req, res) {
	try {
		const resp = await _forgotPassword(req.params.email);
		if (resp.err) {
			return res.status(400).json({ message: "Invalid email" });
		}
		if (resp) {
			console.log(`Password reset email sent!`);
			return res.status(200).json({
				message: `Password reset email sent!`,
			});
		} else {
			console.log(`Password reset email failed to sent!`);
			return res.status(500).json({
				message: "Password reset email failed to sent!",
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Unknown error" });
	}
}

export async function auth(req, res) {
	console.log(`User is authenticated!`);
	return res.status(200).json({
		message: `User is authenticated!`,
	});
}

// Generate JWT (Session)
const generateToken = (email) => {
	return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
