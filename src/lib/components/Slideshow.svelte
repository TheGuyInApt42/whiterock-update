<script>
	import gsap from 'gsap';

	import { onMount } from 'svelte';

	('use strict');
	function classReg(className) {
		return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
	}

	function classie() {
		function hasClass(el, cl) {
			if ('classList' in document.documentElement) {
				return el.classList.contains(cl);
			}

			return classReg(cl).test(el.className);
		}

		function addClass(el, cl) {
			if ('classList' in document.documentElement) {
				el.classList.add(cl);
			} else if (!hasClass(el, cl)) {
				el.className = el.className + ' ' + cl;
			}
		}

		function removeClass(el, cl) {
			if ('classList' in document.documentElement) {
				el.classList.remove(cl);
			} else if (!hasClass(el, cl)) {
				el.className = el.className.replace(classReg(cl), ' ');
			}
		}

		function toggleClass(el, cl) {
			var fn = hasClass(el, cl) ? removeClass : addClass;

			fn(el, cl);
		}

		return {
			hasClass: hasClass,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass
		};
	}

	classie = classie();

	function Slice(elements) {
		return Array.from(elements);
	}

	function pad(str, max) {
		str = str.toString();
		return str.length < max ? pad('0' + str, max) : str;
	}

	function css(element, property) {
		const _property = window.getComputedStyle(element, null).getPropertyValue(property);
		if (_property.indexOf('px') !== -1) {
			return parseInt(_property, 10);
		} else {
			return _property;
		}
	}

	class MySlider {
		constructor() {
			console.log('construction');
			this.isFF = !!navigator.userAgent.match(/firefox/i);
			this.evttype = 'click';
			this.Slider = document.getElementById('slider');
			this.imagesCount = Array.from(this.Slider.querySelectorAll('img')).length;
			this.sldInterval = 6000;
			this.isAnimating = false;
			this.current = 0;
			this.minScale = 0.7;
			this._createSlider();
		}

		_createSlider() {
			this.originalImgsEl = new Slice(this.Slider.querySelectorAll('img'));
			this.images = [];

			const _mainImagesEl = document.createElement('div');
			_mainImagesEl.classList.add('mainImages');
			this.Slider.appendChild(_mainImagesEl);

			const _backgroundImagesEl = document.createElement('div');
			_backgroundImagesEl.classList.add('backgroundImages');
			this.Slider.appendChild(_backgroundImagesEl);

			const _navigationEl = document.createElement('div');
			_navigationEl.classList.add('navigation');
			this.Slider.appendChild(_navigationEl);

			this.mainImages = this.Slider.querySelector('.mainImages');
			this.backgroundImages = this.Slider.querySelector('.backgroundImages');
			this.navigation = this.Slider.querySelector('.navigation');

			this.navigation.innerHTML = '<ul></ul>';

			this.originalImgsEl.forEach((el, i) => {
				const src = el.attributes.src.nodeValue;
				const alt = el.attributes.alt.nodeValue;
				const dataUrl = el.dataset.url;

				this.images.push({
					src: src,
					alt: alt,
					url: dataUrl,
					index: i
				});

				this.Slider.removeChild(el);
			});

			this.images.forEach((obj) => {
				this._createNewImgs(obj);
				this._createNavigation(obj);
			});

			this.sld = new Slice(this.Slider.querySelectorAll('.mi__img'));
			this.bgSld = new Slice(this.Slider.querySelectorAll('.bi__imgCont'));
			this.navItens = new Slice(this.navigation.querySelectorAll('li'));

			this._firstPosition();
		}

		_createNewImgs(obj) {
			const _miImgEl = document.createElement('div');
			const _biContImgEl = document.createElement('div');

			_miImgEl.classList.add('mi__img');
			_biContImgEl.classList.add('bi__imgCont');

			_miImgEl.style.background = `url(${obj.src}) no-repeat center center`;
			_miImgEl.style.backgroundSize = 'cover';
			_miImgEl.style.zIndex = this.imagesCount - (obj.index + 1);
			_biContImgEl.innerHTML = `<div class="bi__imgCont-img bi-${obj.index}" />`;

			this.mainImages.appendChild(_miImgEl);
			this.backgroundImages.appendChild(_biContImgEl);

			const bgImageSrc = obj.src.split('.jpg')[0];

			const bi = this.backgroundImages.querySelector(`.bi__imgCont .bi-${obj.index}`);

			bi.style.background = `url(${bgImageSrc}-blur.jpg) no-repeat center top`;
			bi.style.backgroundSize = 'cover';
			this.backgroundImages.style.display = 'none';
		}

		_createNavigation(obj) {
			const ul = this.navigation.querySelector('ul');
			const _li = document.createElement('li');
			const a = document.createElement('a');
			const liInfo = document.createElement('div');
			const mask = document.createElement('div');

			const number = pad(obj.index + 1, 2);

			_li.classList.add(`navItem-${obj.index}`);
			_li.innerHTML = `<a href="${obj.url}"></a>
            <div class="li__info">${number} - ${obj.alt}</div>
            <div class="li__info-mask">
                <div class="mask__infoContainer">${number} - ${obj.alt}</div>
            </div>
            <div class="li__hoverLine"><div class="l"></div></div>`;
			ul.appendChild(_li);

			const liItem = ul.querySelector(`.navItem-${obj.index}`);
			const info = liItem.querySelector('.li__info');
			const maskContainer = liItem.querySelector('.mask__infoContainer');

			maskContainer.style.width = `${css(_li, 'width')}px`;
			if (this.isFF) {
				maskContainer.style.width = `${css(_li, 'width') + 5}px`;
			}
		}

		_firstPosition() {
			gsap.set(this.navigation, { opacity: 0, y: 25 });

			this.sld.forEach((el, i) => {
				el.classList.add(`sld-${i}`);
				gsap.set(el, {
					scale: i === 0 ? 1.3 : this.minScale,
					opacity: i === 0 ? 0 : 1,
					y: i === 0 ? 0 : -window.innerHeight
				});
			});

			this.bgSld.forEach((el, i) => {
				el.classList.add(`bg-${i}`);
				gsap.set(el.querySelector('.bi__imgCont-img'), { scale: 1.35, y: 80 });
				el.style.zIndex = 0;

				if (i === this.current) {
					gsap.set(el.querySelector('.bi__imgCont-img'), { scale: 1.5, y: 0 });
					el.style.zIndex = this.current + 2;
				}

				if (i === this.current + 1) {
					el.style.zIndex = this.current + 1;
				}
			});

			setTimeout(() => {
				this._enterAnimation();
			}, 1200);
		}

		_enterAnimation() {
			const t = gsap.timeline({
				onComplete: () => {
					this._startSlider();
					this.backgroundImages.style.display = 'block';
				}
			});

			t.to(this.sld[this.current], { duration: 2.5, scale: 1, opacity: 1 });
			t.to(this.navigation, { duration: 1.2, opacity: 1, y: 0 }, 0.8);
		}

		_animateCurrNavItem = (el, currSlide, currBgSlide, currBgSldImage) => {
			el.classList.add('active');
			el.querySelector('.li__info').style.opacity = 0.3;
			el.querySelector('.li__info-mask').style.opacity = 1;

			gsap.to(el.querySelector('.li__info-mask'), {
				duration: this.sldInterval / 1000,
				width: '100%',
				ease: 'none',
				onComplete: () => {
					this.slidesTransitions(currSlide, el, currBgSlide, currBgSldImage);
				}
			});
		};

		slidesTransitions(currSlide, currNavItem, currBgSlide, currBgSldImage) {
			const nextIndex = this.current < this.imagesCount - 1 ? ++this.current : 0;

			currSlide.classList.remove('active-slide');
			currNavItem.classList.remove('active');

			gsap.set(currBgSlide, { top: 0, bottom: 'inherit' });

			currNavItem.querySelector('.li__info').style.opacity = 0.7;
			gsap.to(currNavItem.querySelector('.li__info-mask'), {
				duration: 0.5,
				opacity: 0,
				onComplete: () => {
					currNavItem.querySelector('.li__info-mask').style.width = '0%';
				}
			});

			gsap
				.timeline({
					onComplete: () => {
						gsap.set(currSlide, { scale: this.minScale, y: -window.innerHeight });
						gsap.set(currBgSlide, { height: '100%', top: 'inherit', bottom: 0 });
						gsap.set(currBgSldImage, { scale: 1.35, y: 80 });
						currBgSlide.style.zIndex = 0;

						this.bgSld[nextIndex].style.zIndex = 2;

						if (nextIndex + 1 >= this.imagesCount) {
							this.bgSld[0].style.zIndex = 1;
						} else {
							this.bgSld[nextIndex + 1].style.zIndex = 1;
						}

						this.current = nextIndex;
						this._startSlider();
					}
				})
				.to(currSlide, { duration: 1.5, scale: 0.8 })
				.to(currBgSldImage, { duration: 1.2, scale: 1.35 }, 0.15)
				.to(currSlide, { duration: 1.2, y: window.innerHeight }, 0.8)
				.to(currBgSlide, { duration: 1.2, height: '0%' }, 0.8)
				.to(this.sld[nextIndex], { duration: 1.2, y: 0 }, 0.8)
				.to(this.sld[nextIndex], { duration: 1.5, scale: 1 }, 1.8)
				.to(this.bgSld[nextIndex].querySelector('.bi__imgCont-img'), { duration: 1.5, y: 0 }, 1)
				.to(
					this.bgSld[nextIndex].querySelector('.bi__imgCont-img'),
					{ duration: 1.5, scale: 1.5 },
					1.8
				);
		}

		_startSlider() {
			const currSlide = this.sld[this.current];
			const currNavItem = this.navItens[this.current];
			const currBgSlide = this.bgSld[this.current];
			const currBgSldImage = currBgSlide.querySelector('.bi__imgCont-img');

			this._animateCurrNavItem(currNavItem, currSlide, currBgSlide, currBgSldImage);
			currSlide.classList.add('active-slide');

			const slidesTransitions = () => {
				const nextIndex = this.current < this.imagesCount - 1 ? ++this.current : 0;

				currSlide.classList.remove('active-slide');
				currNavItem.classList.remove('active');

				gsap.set(currBgSlide, { top: 0, bottom: 'inherit' });

				currNavItem.querySelector('.li__info').style.opacity = 0.7;
				gsap.to(currNavItem.querySelector('.li__info-mask'), {
					duration: 0.5,
					opacity: 0,
					onComplete: () => {
						currNavItem.querySelector('.li__info-mask').style.width = '0%';
					}
				});

				gsap
					.timeline({
						onComplete: () => {
							gsap.set(currSlide, { scale: this.minScale, y: -window.innerHeight });
							gsap.set(currBgSlide, { height: '100%', top: 'inherit', bottom: 0 });
							gsap.set(currBgSldImage, { scale: 1.35, y: 80 });
							currBgSlide.style.zIndex = 0;

							this.bgSld[nextIndex].style.zIndex = 2;

							if (nextIndex + 1 >= this.imagesCount) {
								this.bgSld[0].style.zIndex = 1;
							} else {
								this.bgSld[nextIndex + 1].style.zIndex = 1;
							}

							this.current = nextIndex;
							this._startSlider();
						}
					})
					.to(currSlide, { duration: 1.5, scale: 0.8 })
					.to(currBgSldImage, { duration: 1.2, scale: 1.35 }, 0.15)
					.to(currSlide, { duration: 1.2, y: window.innerHeight }, 0.8)
					.to(currBgSlide, { duration: 1.2, height: '0%' }, 0.8)
					.to(this.sld[nextIndex], { duration: 1.2, y: 0 }, 0.8)
					.to(this.sld[nextIndex], { duration: 1.5, scale: 1 }, 1.8)
					.to(this.bgSld[nextIndex].querySelector('.bi__imgCont-img'), { duration: 1.5, y: 0 }, 1)
					.to(
						this.bgSld[nextIndex].querySelector('.bi__imgCont-img'),
						{ duration: 1.5, scale: 1.5 },
						1.8
					);
			};
		}
	}

	onMount(async () => {
		create_slide();

		new MySlider();
	});

	// Start Slider code

	function create_slide() {
		'use strict';
		console.log('here');

		/*---------------*/

		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = (function () {
				return (
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function (callback) {
						window.setTimeout(callback, 1000 / 60);
					}
				);
			})();
		}

		// from http://stackoverflow.com/a/6466243/2011404
		function pad(str, max) {
			str = str.toString();
			return str.length < max ? pad('0' + str, max) : str;
		}

		function css(element, property) {
			const _property = window.getComputedStyle(element, null).getPropertyValue(property);
			if (_property.indexOf('px') !== -1) {
				return parseInt(_property, 10);
			} else {
				return _property;
			}
		}

		function Slice(elements) {
			return Array.from(elements);
		}

		// Initialize slider
		document.addEventListener('DOMContentLoaded', () => {
			new MySlider();
		});
	}
</script>

<!-- 

    Hi, this demo was based on www.hellothierry.com slider.
    Original concept by Jean-Christophe Suzanne.
    Coded by Gláuber Sampaio (@glauber_sampaio).

-->

<div id="content">
	<div id="slider">
		<img src="/images/interior1.jpg" alt="Interior" data-url="#1" />
		<img src="/images/stage1.jpg" alt="Indoor Stage" data-url="#2" />
		<img src="/images/exterior1.jpg" alt="Exterior" data-url="#3" />
		<img src="/images/reunion.jpg" alt="Reunions" data-url="#4" />
		<img src="/images/gazebomusic.jpg" alt="Live Music" data-url="#5" />
		<img src="/images/activities.jpg" alt="Family Fun" data-url="#6" />
		<img src="/images/wedding.jpg" alt="Weddings" data-url="#7" />
	</div>
</div>

<style>
	/* 
 Font style.
 Easier way to style fonts in one single line.
 */
	/* 
 Utilities
 */
	#content #slider,
	:global(#content #slider .navigation),
	:global(#content #slider .navigation ul li .li__info),
	:global(#content #slider .navigation ul li .li__info-mask .mask__infoContainer),
	:global(#content #slider .navigation ul li .li__hoverLine) {
		width: 100%;
	}
	#content #slider {
		height: 100%;
	}
	#content,
	:global(#content #slider .mainImages),
	:global(#content #slider .mainImages .mi__img),
	:global(#content #slider .backgroundImages),
	:global(#content #slider .backgroundImages .bi__imgCont),
	:global(#content #slider .backgroundImages .bi__imgCont .bi__imgCont-img),
	:global(#content #slider .navigation ul li a) {
		width: 100%;
		height: 100%;
	}
	:global(#content #slider .navigation ul),
	:global(#content #slider .navigation ul li) {
		width: auto;
		display: table;
	}

	:global(#content #slider .navigation ul li a),
	:global(#content #slider .navigation ul li .li__info),
	:global(#content #slider .navigation ul li .li__info-mask .mask__infoContainer) {
		-webkit-transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
		-moz-transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
		-ms-transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
		-o-transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
		transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
		/* easeOutExpo */
		-webkit-transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
		-moz-transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
		-ms-transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
		-o-transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
		transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
		/* easeOutExpo */
	}
	/* Styles */

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	ul,
	li {
		margin: 0;
		padding: 0;
	}

	:global(a.full) {
		width: 100%;
		height: 100%;
		display: block;
	}

	#content {
		/*height: 100vh;*/
		position: relative;
		overflow: hidden;
		background: #333;
		font-family: 'Lato', sans-serif;
		font-weight: 400;
	}
	:global(#content .c) {
		font-size: 10px;
		font-style: normal;
		font-weight: normal;
		letter-spacing: 0px;
		color: white;
		position: absolute;
		bottom: 15px;
		right: 15px;
		z-index: 99999;
		text-align: center;
	}
	:global(#content .c a) {
		color: white;
		text-decoration: underline;
	}
	#content #slider {
		position: relative;
	}
	#content #slider img {
		display: none;
		/* Main images navigation */
	}
	:global(#content #slider .mainImages) {
		position: relative;
		z-index: 1;
	}
	:global(#content #slider .mainImages .mi__img) {
		position: absolute;
		top: 0;
		left: 0;
		/* -webkit-transform: scale(0.7);
   transform: scale(0.7); */
		/* Background Images (Blur effect) */
	}
	:global(#content #slider .backgroundImages) {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}
	:global(#content #slider .backgroundImages .bi__imgCont) {
		position: absolute;
		bottom: 0;
		left: 0;
		overflow: hidden;
	}
	:global(#content #slider .backgroundImages .bi__imgCont .bi__imgCont-img) {
		position: relative;
		/* Navigation styles */
	}
	:global(#content #slider .navigation) {
		position: absolute;
		bottom: 0;
		left: 0;
		color: white;
		z-index: 2;
	}
	:global(#content #slider .navigation ul) {
		margin: 90px auto;
	}
	:global(#content #slider .navigation ul li) {
		float: left;
		margin-right: 30px;
		overflow: hidden;
		cursor: pointer;
		position: relative;
	}
	:global(#content #slider .navigation ul li:last-child) {
		margin-right: 0;
	}
	:global(#content #slider .navigation ul li:hover .li__info) {
		opacity: 0.9 !important;
	}
	:global(#content #slider .navigation ul li.active .li__hoverLine .l) {
		width: 100%;
	}
	:global(#content #slider .navigation ul li a) {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	:global(#content #slider .navigation ul li .li__info),
	:global(#content #slider .navigation ul li .li__info-mask .mask__infoContainer) {
		overflow: hidden;
		opacity: 0.7;
	}
	:global(#content #slider .navigation ul li .li__info h5),
	:global(#content #slider .navigation ul li .li__info-mask .mask__infoContainer h5) {
		font-size: 12px;
		font-style: normal;
		font-weight: 300;
		letter-spacing: 0px;
		color: white;
		float: left;
		transform: rotate(-90deg);
		-webkit-transform: rotate(-90deg);
		padding: 4px 0px 5px 0px;
	}
	:global(#content #slider .navigation ul li .li__info h4),
	:global(#content #slider .navigation ul li .li__info-mask .mask__infoContainer h4) {
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		letter-spacing: 0px;
		color: white;
		float: left;
		padding-left: 6px;
		text-transform: uppercase;
	}
	:global(#content #slider .navigation ul li .li__info-mask) {
		width: 0%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 1;
		overflow: hidden;
	}
	:global(#content #slider .navigation ul li .li__info-mask .mask__infoContainer) {
		opacity: 1;
	}
	:global(#content #slider .navigation ul li .li__hoverLine) {
		height: 1px;
		float: left;
		margin-top: 8px;
	}
	:global(#content #slider .navigation ul li .li__hoverLine .l) {
		width: 0%;
		height: 1px;
		background: #ccc;
		margin: 0 auto;
		transition-duration: 1s;
		-webkit-transition-duration: 1s;
	}

	:global(#content #slider .navigation ul li .li__info) {
		/* Existing styles for .li__info */
		position: relative; /* Add this to establish a stacking context */
		z-index: 1; /* Ensure .li__info is above other elements by default */
	}

	:global(#content #slider .navigation ul li .li__info-mask) {
		/* Existing styles for .li__info-mask */
		z-index: 2; /* Place .li__info-mask above .li__info */
	}

	:global(#content #slider .navigation ul li.active .li__info) {
		z-index: 0; /* Send .li__info behind .li__info-mask when active */
	}
</style>
