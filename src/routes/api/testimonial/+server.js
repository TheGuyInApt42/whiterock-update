import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
	const data = await request.json();

	const transporter = nodemailer.createTransport({
		host: event.platform?.env?.EMAIL_HOST,
		port: event.platform?.env?.EMAIL_PORT,
		secure: false,
		auth: {
			user: event.platform?.env?.EMAIL_ADD,
			pass: event.platform?.env?.EMAIL_PW
		}
	});

	const mailOptions = {
		to: 'ralphjgorham@gmail.com',
		subject: 'Testimonial',
		text: `${data.Name} ${data.Message}`
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);
		return new Response(JSON.stringify({ message: 'Testimonial sent successfully!' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error sending testimonial:', error);
		return new Response(JSON.stringify({ error: 'Failed to send testimonial' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
