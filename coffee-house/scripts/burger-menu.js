const burgerButton = document.querySelector('.header__burger-button');
const burgerMenu = document.querySelector('.header__burger');

burgerButton.addEventListener('click', () => burgerMenu.classList.toggle('active'));
