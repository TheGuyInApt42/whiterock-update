<script>
	//Components
	import NavBar from '$lib/components/NavBar.svelte';
	import About from '$lib/components/About.svelte';
	import Testimonials from '$lib/components/testimonials/Testimonials.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import Slideshow from '$lib/components/Slideshow.svelte';
	import Contact from '$lib/components/contact/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { onMount } from 'svelte';

	//variables
	let scrollButton = null;
	let goTop = null;

	onMount(async () => {
		scrollButton = document.getElementById('scrollTop');

		// When the user scrolls down 20px from the top of the document, show the button
		window.onscroll = function () {
			scrollFunction();
		};

		const scrollFunction = () => {
			if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				scrollButton.style.display = 'block';
			} else {
				scrollButton.style.display = 'none';
			}
		};

		goTop = () => {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		};
	});
</script>

<svelte:head>
	<title>White Rock Center</title>
</svelte:head>

<div class="grid-container">
	<header id="nav">
		<NavBar />
	</header>

	<section id="slideshow">
		<Slideshow />
	</section>

	<section id="about">
		<About />
	</section>

	<section id="testimonials">
		<Testimonials />
	</section>

	<section id="faq">
		<FAQ />
	</section>

	<section id="contact">
		<Contact />
	</section>

	<footer>
		<Footer />
	</footer>
</div>

<button on:click={goTop} id="scrollTop" title="Go to top"
	><img src="../../images/up-32.png" alt="Scroll Up" /></button
>

<style>
	.grid-container {
		/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#1e5799+0,207cca+68,2989d8+79,7db9e8+100 */
		background: #1e5799; /* Old browsers */
		background: -moz-linear-gradient(
			left,
			#1e5799 0%,
			#207cca 68%,
			#2989d8 79%,
			#7db9e8 100%
		); /* FF3.6-15 */
		background: -webkit-linear-gradient(
			left,
			#1e5799 0%,
			#207cca 68%,
			#2989d8 79%,
			#7db9e8 100%
		); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(
			to right,
			#1e5799 0%,
			#207cca 68%,
			#2989d8 79%,
			#7db9e8 100%
		); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

		display: grid;
		min-height: 100%;
		grid-template-columns: 100%;
		grid-template-rows: 70px 700px auto auto auto 1fr auto;
		grid-template-areas:
			'nav '
			'slideshow'
			'about'
			'testimonials'
			'faq'
			'contact'
			'footer';
	}

	header {
		grid-area: nav;
	}

	#about {
		grid-area: about;
		margin-bottom: 15%;
	}

	#testimonials {
		grid-area: testimonials;
		margin-bottom: 15%;
	}

	#faq {
		grid-area: faq;
		margin-bottom: 15%;
	}

	#contact {
		grid-area: contact;
		margin-bottom: 15%;
	}

	#slideshow {
		grid-area: slideshow;
	}

	footer {
		grid-area: footer;
	}

	#scrollTop {
		display: none;
		position: fixed;
		bottom: 20px;
		right: 30px;
		z-index: 99;
		font-size: 18px;
		border: none;
		outline: none;
		background-color: #0000a8;
		color: white;
		cursor: pointer;
		padding: 15px;
		border-radius: 4px;
	}

	#scrollTop:hover {
		background-color: #0000ff;
	}

	/* FIXME: redundant right now */
	@media screen and (max-width: 768px) {
		.grid-container {
			display: grid;
			min-height: 100%;
			grid-template-columns: auto;
			grid-template-rows: auto 700px auto auto auto 1fr auto;
			grid-template-areas:
				'nav '
				'slideshow'
				'about'
				'testimonials'
				'faq'
				'contact'
				'footer';
		}
	}
</style>
