<script>
	import ContactForm from './ContactForm.svelte';
</script>

<header>
	<h1>Contact Us</h1>
	<h2>We'd love to hear from you</h2>
	<h2>We can work within your budget to achieve the best possible experience for your occasion.</h2>
</header>

<div id="action">
	<span
		>Please call <strong><a href="tel:19146994386">914-699-4386</a></strong> or
		<strong><a href="tel:19145231699">914-523-1699</a></strong> today to get started!
	</span>
</div>

<div id="contact-wrapper">
	<div class="container directions">
		<h2 id="directions-header">Come Visit Us</h2>

		<div id="address-block">
			<p>162 Gorham Lane</p>
			<p>Garysburg, NC 27831</p>
		</div>

		<div class="content-box map-container">
			<p id="map-text">Click View larger map button on map for directions</p>
			<iframe
				title="Google Map"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3208.744964191656!2d-77.52028904617038!3d36.463719212522854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ae3d2ba73f7a2d%3A0xf67f1a3953755d2b!2s162%20Gorham%20Ln%2C%20Garysburg%2C%20NC%2027831!5e0!3m2!1sen!2sus!4v1572556383227!5m2!1sen!2sus"
				width="600"
				height="450"
				frameborder="0"
				style="border:0;"
				allowfullscreen=""
				id="map"
			></iframe>
		</div>
	</div>

	<div class="container">
		<h2 id="contact-header">Want to get in touch with us? Send us a message.</h2>

		<div class="contact-form">
			<ContactForm />
		</div>
	</div>
</div>

<style>
	:root {
		--main-text-color: #555555;
	}
	header {
		text-align: center;
		color: var(--main-text-color);
	}

	h1 {
		font-size: 5rem;
		font-weight: 100;
		font-family: 'Proxima', 'Helvetica', sans-serif;
		color: black;
	}

	h2 {
		font-weight: bold;
		font-size: 1.5rem;
		text-align: center;

		font-family: 'Proxima', 'Helvetica', sans-serif;
		color: black;
	}

	#directions-header {
		margin-bottom: 5px;
	}

	#contact-header {
		margin-bottom: 40px;
	}

	p {
		font-family: 'Proxima', 'Helvetica', sans-serif;
	}

	#map-text {
		margin-bottom: 25px;
	}

	#action {
		font-size: 2rem;
		text-align: center;
		margin-bottom: 50px;
		font-family: 'Proxima', 'Helvetica', sans-serif;
		color: black;
	}

	#action a {
		text-decoration: none;
		color: black;
	}

	#action a:hover {
		color: white;
	}

	.container {
		width: 50%;
	}

	.contact-form {
		margin: 0 auto;
	}

	.content-box {
		position: relative;
		padding: 25px;
		width: 75%;
		min-height: 75%;
		border-radius: 5px;
		color: #555555;
		background-color: #fff;
		box-shadow: 0 1px 3px 0 rgba(148, 164, 179, 0.2);
	}

	.map-container {
		position: relative;
		width: 100%;
		min-height: 100%;
		padding-bottom: 56.25%;
	}

	#map {
		position: absolute;
		height: 75%;
		width: 90%;
	}

	.directions {
		margin: 0 auto;
		min-height: 50%;
		margin-bottom: 10%;
	}

	#address-block {
		text-align: center;
		margin-bottom: 40px;
		color: black;
	}

	@media screen and (max-width: 768px) {
		h1 {
			font-size: 4rem;
		}

		.container {
			width: 100%;
		}

		header {
			margin-bottom: 50px;
		}

		#directions-header {
			margin-bottom: 40px;
		}

		#address-block {
			margin-bottom: 25px;
		}

		#map {
			height: 60%;
			width: 90%;
		}

		.contact-form {
			display: flex;
			justify-content: center;
		}
	}
</style>
