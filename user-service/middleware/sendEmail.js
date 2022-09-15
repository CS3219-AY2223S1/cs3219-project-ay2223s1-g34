import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.FROM_EMAIL,
			pass: process.env.FROM_EMAIL_PW,
		},
	});

	let message = {
		from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
		to: options.email,
		subject: options.subject,
		text: options.text,
	};

	const info = await transporter.sendMail(message);

	console.log(`Email sent ${info.messageId}`);
};
