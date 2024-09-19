<script>
	import axios from 'axios';

	let name = '';
	let message = '';

	let chars = 350;
	let isSuccess = false;
	let errors = {};

	const charCount = () => {
		chars = 350 - message.length;
	};

	const validateForm = () => {
		errors = {};
		if (!name) {
			errors.name = 'Field should not be empty';
		} else if (name.length < 2) {
			errors.name = 'Field must be at least 2 characters';
		}

		if (!message) {
			errors.message = 'Field should not be empty';
		}

		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			try {
				await axios.post('api/testimonial', {
					Name: name,
					Message: message
				});
				isSuccess = true;
				// Reset form fields
				name = '';
				message = '';
				chars = 350; // Reset character count
			} catch (error) {
				console.error('Error sending testimonial:', error);
			}
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	{#if isSuccess}
		<div class="success">Testimonial sent. Thank you for your feedback!</div>
	{:else}
		<div class="input-wrap">
			<label class="input-label" for="name">Name</label>
			<input
				type="text"
				id="name"
				class="form-input"
				bind:value={name}
				placeholder="Name"
				maxlength="25"
				autocomplete="off"
			/>
			{#if errors.name}<span class="error">{errors.name}</span>{/if}
		</div>

		<div class="input-wrap">
			<label class="input-label" for="message">Message</label>
			<textarea
				id="message"
				bind:value={message}
				on:input={charCount}
				class="form-input"
				placeholder="What can we do for you?"
				cols="15"
				rows="5"
				maxlength="350"
			></textarea>
			<span id="characterCount">{chars}</span>
			{#if errors.message}<span class="error">{errors.message}</span>{/if}
		</div>

		<div class="input-wrap btn-wrap">
			<button id="submit_button">Enter Testimonial</button>
		</div>
	{/if}
</form>

<style>
	:root {
		--main-text-color: #555555;
	}

	form {
		padding: 50px;
		width: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 20px 14px 8px rgba(0, 0, 0, 0.58);
	}
	.input-wrap {
		width: 100%;
	}
	.form-input {
		cursor: pointer;
		border: none;
		border-bottom: 1px solid #ccc;
		margin-bottom: 20px;
		transition: all 300ms ease-in-out;
		width: 100%;
	}

	input:focus {
		outline: 0;
		border-bottom: 1px solid #666;
	}

	.input-label {
		align-self: flex-start;
		margin: 10px 0;
		font-size: 1.2rem;
		font-weight: 500;
		color: var(--main-text-color);
	}

	button {
		width: 75%;
		margin-top: 20px;
		background: black;
		color: white;
		padding: 10px 0;
		border-radius: 25px;
		text-transform: uppercase;
		font-weight: bold;
		cursor: pointer;
		transition: all 300ms ease-in-out;
	}

	button:hover {
		transform: translateY(-2.5px);
		box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.58);
	}

	.btn-wrap {
		text-align: center;
		margin-top: 25px;
		margin-bottom: 25px;
	}

	#characterCount {
		color: var(--main-text-color);
		position: relative;
		width: 95%;
		display: block;
		text-align: right;
	}

	.error {
		color: red;
		font-size: 0.9em;
	}
	.success {
		color: green;
		font-weight: bold;
	}

	/* Show red borders when filled, but invalid */
	input:not(:placeholder-shown) {
		border-color: hsl(0, 76%, 50%);
	}

	input:not(:placeholder-shown):valid {
		border-color: hsl(120, 76%, 50%);
	}

	@media screen and (max-width: 768px) {
		form {
			width: 75%;
		}
	}
</style>
