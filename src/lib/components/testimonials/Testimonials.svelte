<script>
	import TestimonialForm from './TestimonialForm.svelte';
</script>

<article>
	<h1>Testimonials</h1>
	<h2>See what others have said!</h2>

	<div class="container">
		<div class="content-box speech-bubble">
			<p>
				We had our wedding at White Rock and it was amazing. The ceremony was outdoors in the gazebo
				while the reception was inside the facility.
			</p>
			<p id="visitor">-JG</p>
		</div>
	</div>

	<div class="container form-container">
		<h2 id="testimonial-header">Send us your thoughts on your experience at White Rock!</h2>

		<div class="testimonial-form">
			<TestimonialForm />
		</div>
	</div>
</article>

<style>
	article {
		padding-top: 25px;
		color: black;
		font-family: 'Proxima', 'Helvetica', sans-serif;
	}

	h1 {
		font-size: 5rem;
		text-align: center;
		margin-top: 5px;
		font-weight: 100;
	}

	h2 {
		font-weight: bold;
		font-size: 1.5rem;
		text-align: center;
		margin-bottom: 40px;
		font-family: 'Proxima', 'Helvetica', sans-serif;
		color: black;
	}

	.container {
		width: 50%;
	}

	.content-box {
		position: relative;
		padding: 25px;
		width: 50%;
		min-height: 75%;
		border-radius: 5px;
		color: #555555;
		white-space: normal;
		background-color: #fff;
		box-shadow: 0 1px 3px 0 rgba(148, 164, 179, 0.2);
	}

	.speech-bubble {
		position: relative;
		background: #fff;
		border-radius: 0.4em;
		margin-bottom: 50px;
	}

	.speech-bubble:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 0;
		border: 42px solid transparent;
		border-top-color: #ffff;
		border-bottom: 0;
		border-left: 0;
		margin-left: -21px;
		margin-bottom: -42px;
	}

	#visitor {
		text-align: right;
	}
	#testimonial-header {
		margin-bottom: 40px;
	}

	@media screen and (max-width: 768px) {
		h1 {
			font-size: 4rem;
		}

		.content-box {
			width: 100%;
		}

		#testimonial-header {
			font-size: 1.3rem;
		}
		.form-container {
			margin-top: 30%;
			width: 100%;
		}

		.testimonial-form {
			display: flex;
			justify-content: center;
		}
	}
</style>
