const sliderBody = document.querySelector('.slider__body');
const sliderCardsWrapper = document.querySelector('.slider__cards');
const sliderCardsList = document.querySelectorAll('.slider__card');
const sliderArrowLeft = document.querySelector('.slider__arrow.left');
const sliderArrowRight = document.querySelector('.slider__arrow.right');
const sliderControlsList = document.querySelectorAll('.slider__control');
const sliderProgressList = document.querySelectorAll('.slider__control-progress');

const slideToRight = createSlideToDirection('right');
const slideToLeft = createSlideToDirection('left');

const cardsNumber = sliderCardsList.length;
let currCardNumber = 0;
let prevCardNumber;

const autoScrollTime = 5000;
let sliderAutoScrollInterval = setInterval(slideToLeft, autoScrollTime);
let intervalTimeStart = Date.now();
let launchProgressInterval;
let resetProgressInterval;

let mouseEnterIntervalTime;

launchProgress(currCardNumber);

sliderArrowRight.addEventListener('click', slideToLeft);

sliderArrowLeft.addEventListener('click', slideToRight);

sliderCardsWrapper.addEventListener('mouseenter', function () {
	mouseEnterIntervalTime = Date.now() - intervalTimeStart;
	clearInterval(sliderAutoScrollInterval);
	console.log(mouseEnterIntervalTime);
});

sliderCardsWrapper.addEventListener('mouseleave', function () {
	sliderAutoScrollInterval = setInterval(() => {
		slideToLeft();
		sliderAutoScrollInterval = setInterval(slideToLeft, autoScrollTime);
		clearInterval(sliderAutoScrollInterval);
	}, autoScrollTime - mouseEnterIntervalTime);
	intervalTimeStart = Date.now();
});

function createSlideToDirection(direction) {
	return function () {
		clearInterval(sliderAutoScrollInterval);
		prevCardNumber = currCardNumber;

		if (direction === 'left') {
			currCardNumber += 1;
			currCardNumber = currCardNumber > cardsNumber - 1 ? 0 : currCardNumber;
		} else if (direction === 'right') {
			currCardNumber -= 1;
			currCardNumber = currCardNumber < 0 ? cardsNumber - 1 : currCardNumber;
		}

		switchControl(prevCardNumber, currCardNumber);

		console.log(currCardNumber);

		sliderCardsList[prevCardNumber].addEventListener(
			'animationend',
			function () {
				this.style.display = 'none';
				sliderAutoScrollInterval = setInterval(slideToLeft, 5000);
				intervalTimeStart = Date.now();
			},
			{ once: true }
		);

		sliderCardsList[currCardNumber].style.display = 'flex';

		sliderCardsList[prevCardNumber].classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
		sliderCardsList[currCardNumber].classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');

		sliderCardsList[prevCardNumber].classList.add(`slide-out-${direction}`);
		sliderCardsList[currCardNumber].classList.add(`slide-in-${direction}`);

		console.log(`slide-in-${direction}`);
	};
}

function switchControl(prevIndex, currIndex) {
	resetProgress(prevIndex);
	launchProgress(currIndex);
}

function resetProgress(prevIndex) {
	clearInterval(launchProgressInterval);
	const prevProgress = sliderProgressList[prevIndex];
	let width = prevProgress.style.width;
	width = width.slice(0, -1);

	resetProgressInterval = setInterval(clearProgress, 5);

	function clearProgress() {
		if (width < 0) {
			prevProgress.style.width = '0%';
			clearInterval(resetProgressInterval);
		} else {
			width -= 1;
			prevProgress.style.width = `${width}%`;
		}
	}
}

function launchProgress(currIndex) {
	const currProgress = sliderProgressList[currIndex];
	launchProgressInterval = setInterval(updateProgress, autoScrollTime / 1000);
	let width = 0;

	function updateProgress() {
		if (width <= 100) {
			width += 0.1;
			currProgress.style.width = `${width}%`;
		} else {
			clearInterval(launchProgressInterval);
		}
	}
}
