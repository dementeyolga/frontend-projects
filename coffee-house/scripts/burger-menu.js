const header = document.querySelector('.header');
const burgerButton = document.querySelector('.burger__button');
const burgerMenu = document.querySelector('.burger');
const burgerLinks = document.querySelectorAll('.burger .nav__link');

burgerButton.addEventListener('click', () => {
  header.classList.toggle('fixed');
  burgerButton.classList.toggle('active');
  burgerMenu.classList.toggle('active');
});

burgerLinks.forEach((link) =>
  link.addEventListener('click', () => {
    header.classList.remove('fixed');
    burgerButton.classList.remove('active');
    burgerMenu.classList.remove('active');
  })
);
