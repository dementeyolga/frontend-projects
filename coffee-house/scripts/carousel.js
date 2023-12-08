const sliderBody = document.querySelector('.slider__body');
const sliderCardsWrapper = document.querySelector('.slider__cards');
const sliderCardsList = document.querySelectorAll('.slider__card');
const sliderCardImagesList = document.querySelectorAll('.card__image img');
const sliderArrowLeft = document.querySelector('.slider__arrow.left');
const sliderArrowRight = document.querySelector('.slider__arrow.right');
const sliderControlsList = document.querySelectorAll('.slider__control');
const sliderProgressList = document.querySelectorAll('.slider__control-progress');

const slideToRight = createSlideToDirection('right');
const slideToLeft = createSlideToDirection('left');

const cardsNumber = sliderCardsList.length;
let currCardNumber = 0;
let prevCardNumber;
let resettingProgressCardNumber;

const autoScrollTime = 5000;
let sliderAutoScrollIntervalID = setInterval(slideToLeft, autoScrollTime);
let sliderAutoScrollTimeoutID;
let scrollIntervalStartTime = Date.now();

let scrollIntervalContinueTime;
let scrollIntervalPauseValue = 0;

let launchProgressIntervalID;
let resetProgressIntervalID;

let pointerStartXCoordinate;

launchProgress(currCardNumber);

sliderCardImagesList.forEach((img) => (img.ondragstart = () => false));

sliderArrowRight.addEventListener('pointerdown', slideToLeft);

sliderArrowLeft.addEventListener('pointerdown', slideToRight);

sliderCardsWrapper.addEventListener('pointerenter', () => {
	pauseScroll();
	pauseProgress();
});

sliderCardsWrapper.addEventListener('pointerleave', () => {
	resumeScroll();
	launchProgress(currCardNumber);
});

sliderBody.addEventListener('pointerdown', (ev) => {
	ev.preventDefault();
	// sliderBody.setPointerCapture(ev.pointerId);
	pointerStartXCoordinate = ev.clientX;
	console.log('pointer down');
});

sliderBody.addEventListener('pointerup', (ev) => {
	console.log('pointer UP');

	let distanceX = ev.clientX - pointerStartXCoordinate;

	if (Math.abs(distanceX) > 10) {
		if (distanceX > 0) {
			slideToRight();
		} else if (distanceX < 0) {
			slideToLeft();
		}
	}
});

function createSlideToDirection(direction) {
	return function () {
		clearInterval(sliderAutoScrollIntervalID);
		clearTimeout(sliderAutoScrollTimeoutID);
		resetIntervalStoredValues();
		prevCardNumber = currCardNumber;

		if (direction === 'left') {
			currCardNumber += 1;
			currCardNumber = currCardNumber > cardsNumber - 1 ? 0 : currCardNumber;
		} else if (direction === 'right') {
			currCardNumber -= 1;
			currCardNumber = currCardNumber < 0 ? cardsNumber - 1 : currCardNumber;
		}

		switchControl(prevCardNumber, currCardNumber);
		sliderAutoScrollIntervalID = setInterval(createSlideToDirection('left'), 5000);
		scrollIntervalStartTime = Date.now();

		sliderCardsList[prevCardNumber].addEventListener(
			'animationend',
			function () {
				this.style.display = 'none';
			},
			{ once: true }
		);

		sliderCardsList[currCardNumber].style.display = 'flex';

		sliderCardsList[prevCardNumber].classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
		sliderCardsList[currCardNumber].classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');

		sliderCardsList[prevCardNumber].classList.add(`slide-out-${direction}`);
		sliderCardsList[currCardNumber].classList.add(`slide-in-${direction}`);
	};
}

function pauseScroll() {
	clearInterval(sliderAutoScrollIntervalID);
	clearInterval(sliderAutoScrollTimeoutID);

	const startTime = scrollIntervalContinueTime || scrollIntervalStartTime;
	scrollIntervalPauseValue += Date.now() - startTime;
	console.log(scrollIntervalPauseValue);
}

function resumeScroll() {
	scrollIntervalContinueTime = Date.now();
	sliderAutoScrollTimeoutID = setTimeout(() => {
		slideToLeft();
		sliderAutoScrollIntervalID = setInterval(slideToLeft, autoScrollTime);
	}, autoScrollTime - scrollIntervalPauseValue);
}

function switchControl(prevIndex, currIndex) {
	if (currIndex === resettingProgressCardNumber) {
		clearInterval(resetProgressIntervalID);
	}

	resetProgress(prevIndex);
	launchProgress(currIndex);
}

function resetIntervalStoredValues() {
	scrollIntervalStartTime = Date.now();
	scrollIntervalContinueTime = null;
	scrollIntervalPauseValue = 0;
}

function resetProgress(prevIndex) {
	resettingProgressCardNumber = prevIndex;
	clearInterval(launchProgressIntervalID);
	const prevProgress = sliderProgressList[prevIndex];
	let width = prevProgress.style.width;
	width = +width.slice(0, -1);

	resetProgressIntervalID = setInterval(clearProgress, 5);

	function clearProgress() {
		if (width < 0) {
			prevProgress.style.width = '0%';
			clearInterval(resetProgressIntervalID);
			resettingProgressCardNumber = null;
		} else {
			width -= 1;
			prevProgress.style.width = `${width}%`;
		}
	}
}

function launchProgress(currIndex) {
	console.log('launch progress');
	const currProgress = sliderProgressList[currIndex];
	let width = currProgress.style.width;
	width = +width.slice(0, -1);

	launchProgressIntervalID = setInterval(updateProgress, autoScrollTime / 1000);

	function updateProgress() {
		if (width <= 100) {
			width += 0.1;
			currProgress.style.width = `${width}%`;
		} else {
			clearInterval(launchProgressIntervalID);
		}
	}
}

function pauseProgress() {
	clearInterval(launchProgressIntervalID);
}
