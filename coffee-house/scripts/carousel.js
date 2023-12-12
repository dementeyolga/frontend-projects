const sliderBody = document.querySelector('.slider__body');
const sliderCardsWrapper = document.querySelector('.slider__cards');
const sliderCardsList = document.querySelectorAll('.slider__card');
const sliderCardImagesList = document.querySelectorAll('.card__image img');
const sliderArrowLeft = document.querySelector('.slider__arrow.left');
const sliderArrowRight = document.querySelector('.slider__arrow.right');
const arrowsList = [sliderArrowLeft, sliderArrowRight];
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
let scrollIntervalStartTime = Date.now();

let sliderAutoScrollTimeoutID;
let scrollIntervalContinueTime;
let scrollIntervalPauseValue = 0;

let launchProgressIntervalID;
launchProgress(currCardNumber);
let resetProgressIntervalID;

let pointerStartXCoordinate;

sliderCardImagesList.forEach((img) => (img.ondragstart = () => false));

sliderArrowRight.addEventListener('click', slideToLeft);

sliderArrowLeft.addEventListener('click', slideToRight);

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
	pointerStartXCoordinate = ev.clientX;
});

sliderBody.addEventListener('pointerup', (ev) => {
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

		arrowsList.forEach((arrow) => arrow.classList.add('disabled'));

		sliderCardsList[prevCardNumber].addEventListener(
			'animationend',
			function () {
				this.style.display = 'none';
				arrowsList.forEach((arrow) => arrow.classList.remove('disabled'));
			},
			{ once: true }
		);

		sliderCardsList[currCardNumber].style.display = 'flex';

		sliderCardsList[prevCardNumber].classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
		sliderCardsList[currCardNumber].classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');

		sliderCardsList[prevCardNumber].classList.add(`slide-out-${direction}`);
		sliderCardsList[currCardNumber].classList.add(`slide-in-${direction}`);

		switchControl(prevCardNumber, currCardNumber);
		sliderAutoScrollIntervalID = setInterval(createSlideToDirection('left'), autoScrollTime);
		scrollIntervalStartTime = Date.now();
	};
}

function resetIntervalStoredValues() {
	scrollIntervalContinueTime = null;
	scrollIntervalPauseValue = 0;
}

function pauseScroll() {
	clearInterval(sliderAutoScrollIntervalID);
	clearTimeout(sliderAutoScrollTimeoutID);

	const startTime = scrollIntervalContinueTime || scrollIntervalStartTime;
	scrollIntervalPauseValue += Date.now() - startTime;
}

function resumeScroll() {
	scrollIntervalContinueTime = Date.now();
	sliderAutoScrollTimeoutID = setTimeout(() => {
		slideToLeft();
	}, autoScrollTime - scrollIntervalPauseValue);
}

function switchControl(prevIndex, currIndex) {
	if (currIndex === resettingProgressCardNumber) {
		clearInterval(resetProgressIntervalID);
	}

	resetProgress(prevIndex);
	launchProgress(currIndex);
}

function resetProgress(prevIndex) {
	resettingProgressCardNumber = prevIndex;
	const prevProgress = sliderProgressList[prevIndex];
	let width = prevProgress.style.width;
	width = +width.slice(0, -1);

	resetProgressIntervalID = setInterval(clearProgress, 5);

	function clearProgress() {
		if (width <= 0) {
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
	clearInterval(launchProgressIntervalID);
	const currProgress = sliderProgressList[currIndex];
	let width = currProgress.style.width;
	width = +width.slice(0, -1);

	launchProgressIntervalID = setInterval(updateProgress, autoScrollTime / 1000);

	function updateProgress() {
		if (width <= 100) {
			width += 0.1;
			currProgress.style.width = `${width}%`;
		} else if (width > 100) {
			clearInterval(launchProgressIntervalID);
		}
	}
}

function pauseProgress() {
	clearInterval(launchProgressIntervalID);
}
