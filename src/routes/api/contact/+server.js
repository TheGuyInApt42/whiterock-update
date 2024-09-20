import nodemailer from 'nodemailer';
import { EMAIL_ADD } from '$env/static/private';
import { EMAIL_HOST } from '$env/static/private';
import { EMAIL_PORT } from '$env/static/private';
import { EMAIL_PW } from '$env/static/private';

export async function POST({ request }) {
	const data = await request.json();

	// Set up the email transporter
	const transporter = nodemailer.createTransport({
		host: EMAIL_HOST,
		port: EMAIL_PORT,
		secure: true,
		auth: {
			user: EMAIL_ADD,
			pass: EMAIL_PW
		}
	});

	const mailOptions = {
		to: 'ralphjgorham@gmail.com',
		subject: 'Website Contact',
		text: `${data.Name} ${data.Email} ${data.Phone} ${data.Message}`
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);
		return {
			status: 200,
			body: { message: 'Email sent successfully!' }
		};
	} catch (error) {
		console.error('Error sending email:', error);
		return {
			status: 500,
			body: { error: 'Failed to send email' }
		};
	}
}
