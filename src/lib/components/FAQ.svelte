<script>
	let faqs = [
		{
			question: 'How many people does White Rock hold?',
			answer: `White Rock's seating capacity is 200 people.`
		},
		{
			question: 'Do you allow outside catering?',
			answer: 'Yes, you can cook your own food or have it catered. We can also recommend a caterer.'
		},
		{
			question: 'What is your cancellation policy?',
			answer: 'Deposits are non-refundable.'
		},
		{
			question: 'Is alcohol allowed on site?',
			answer: 'No!'
		},
		{
			question: 'How much parking is available?',
			answer: 'There is adequate parking.'
		}
	];
</script>

<article>
	<h1>Frequently Asked Questions</h1>

	<h2>Commonly Asked Questions</h2>
	<div id="container">
		<div class="content-box">
			{#each faqs as faq}
				<p>Q: {faq.question}</p>
				<hr />
				<p class="answer-text">A: {faq.answer}</p>
			{/each}
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

		font-family: 'Proxima', 'Helvetica', sans-serif;
		color: black;
	}

	#container {
		display: flex;
		justify-content: center;
		margin-top: 25px;
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

	p {
		font-size: 1rem;
		text-align: center;
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
	}

	hr {
		display: block;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
		margin-left: auto;
		margin-right: auto;
		border-style: inset;
		border-width: 1px;
	}

	.answer-text {
		margin-bottom: 50px;
	}

	@media screen and (max-width: 768px) {
		h1 {
			font-size: 4rem;
		}

		.content-box {
			width: 75%;
		}
	}
</style>
