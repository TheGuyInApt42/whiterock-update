<article>
	<h1>About Us</h1>

	<h2>Welcome to the White Rock Center!</h2>
	<div id="container">
		<div class="content-box">
			<p class="announcement">SORRY, WE ARE CURRENTLY CLOSED UNTIL FURTHER NOTICE.</p>
		</div>

		<div class="content-box">
			<p>
				We would like to thank you for considering us at White Rock to host your special event.
				White Rock Center was started in 2005 by Ralph and Ernestine Gorham. We are a family owned
				and operated banquet hall located in Garysburg, NC. You can book your next wedding, family
				gathering, class reunion, birthday party, sweet sixteen, conference meeting or any event you
				may want. Inside our facility, we have a superb sound system, a stage for performances and a
				spacious interior. Outside, we have adequate free parking, a gazebo and a children play
				area. <!--Additionally, we have a list of vendors that we can 
                recommend to further enhance your event such as a florist, photographer, etc. -->
			</p>

			<p>
				We look forward to working with you and hosting your next event, making it a memorable one.
			</p>
		</div>
	</div>
</article>

<style>
	article {
		padding-top: 25px;
		color: black;
		font-family: 'Proxima', 'Helvetica', sans-serif;
	}

	.announcement {
		color: black;
		font-size: 2rem;
		font-weight: bold;
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
		align-items: center;
		margin-top: 25px;
		flex-direction: column;
		gap: 2rem;
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
		margin-bottom: 10px;
	}

	@media screen and (max-width: 768px) {
		.content-box {
			word-wrap: break-word;
			width: 75%;
		}

		h1 {
			font-size: 4rem;
		}
	}
</style>
