const sliderBody = document.querySelector('.slider__body');
const sliderCardsWrapper = document.querySelector('.slider__cards');
const sliderCardsList = document.querySelectorAll('.slider__card');
const sliderArrowLeft = document.querySelector('.slider__arrow.left');
const sliderArrowRight = document.querySelector('.slider__arrow.right');
const sliderControlsList = document.querySelector('.slider__controls');

const cardsNumber = sliderCardsList.length;
let currCardNumber = 0;
let prevCardNumber;

sliderArrowLeft.addEventListener('click', (ev) => {
	prevCardNumber = currCardNumber;
	currCardNumber -= 1;
	currCardNumber = currCardNumber < 0 ? cardsNumber - 1 : currCardNumber;

	sliderCardsList[prevCardNumber].classList.remove('slide-in-right');
	sliderCardsList[prevCardNumber].classList.remove('slide-in-left');
	sliderCardsList[currCardNumber].classList.remove('slide-out-right');

	sliderCardsList[prevCardNumber].classList.add('slide-out-left');
	sliderCardsList[currCardNumber].classList.remove('slide-out-left');
	sliderCardsList[currCardNumber].classList.add('slide-in-left');

	sliderCardsList[prevCardNumber].style.display = 'none';
	sliderCardsList[currCardNumber].style.display = 'flex';
	console.log(prevCardNumber, currCardNumber);
});

sliderArrowRight.addEventListener('click', (ev) => {
	prevCardNumber = currCardNumber;
	currCardNumber += 1;
	currCardNumber = currCardNumber > cardsNumber - 1 ? 0 : currCardNumber;

	sliderCardsList[prevCardNumber].classList.remove('slide-in-right');
	sliderCardsList[prevCardNumber].classList.remove('slide-in-left');
	sliderCardsList[currCardNumber].classList.remove('slide-out-left');

	sliderCardsList[prevCardNumber].classList.add('slide-out-right');
	sliderCardsList[currCardNumber].classList.remove('slide-out-right');
	sliderCardsList[currCardNumber].classList.add('slide-in-right');

	sliderCardsList[prevCardNumber].style.display = 'none';
	sliderCardsList[currCardNumber].style.display = 'flex';
	console.log(prevCardNumber, currCardNumber);
});
