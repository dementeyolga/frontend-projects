import test from './test';
import './style.css';
import Lavender from './lavender.jpg';

function component() {
	const element = document.createElement('div');

	element.innerHTML = 'Hello';
	element.classList.add('hello');

	const lavender = new Image();
	lavender.src = Lavender;

	element.appendChild(lavender);

	test();

	return element;
}

document.body.appendChild(component());
