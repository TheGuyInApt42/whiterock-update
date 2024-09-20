import nodemailer from 'nodemailer';
import { env } from '$env/static/private'; // Use $env to access environment variables

export async function POST({ request }) {
	const data = await request.json();

	// Set up the email transporter
	const transporter = nodemailer.createTransport({
		host: env.EMAIL_HOST,
		port: env.EMAIL_PORT,
		secure: true,
		auth: {
			user: env.EMAIL_ADD,
			pass: env.EMAIL_PW
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
