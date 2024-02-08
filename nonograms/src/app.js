import './styles/main.scss';
import { AppRouter } from './components/app-router/AppRouter';
import { GameHeader } from './components/gameHeader/GameHeader';

customElements.define('game-header', GameHeader);

document.body.insertAdjacentHTML(
  'afterbegin',
  `
		<game-header></game-header>
		<main id="main" class="main wrapper">
		</main>
	`
);

const router = new AppRouter(document.getElementById('main'));

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const deepestEl = e.composedPath()[0];

    if (deepestEl.classList.contains('disabled')) {
      e.preventDefault();
      return;
    }

    if (deepestEl.matches('[data-link]')) {
      e.preventDefault();
      router.changeHash(deepestEl.getAttribute('href'));

      let params = [];
      if (deepestEl.getAttribute('href') === '') {
        if (deepestEl.getAttribute('game-name')) {
          params.push(deepestEl.getAttribute('game-name'));
        }
        if (deepestEl.getAttribute('game-size')) {
          params.push(deepestEl.getAttribute('game-size'));
        }
        if (deepestEl.getAttribute('game-level')) {
          params.push(deepestEl.getAttribute('game-level'));
        }
      }

      if (deepestEl.matches('[random]')) {
        params.push('random');
      }

      if (deepestEl.matches('[continue]')) {
        params.push('continue');
      }

      router.showRoute(params);
    }
  });

  window.onpopstate = () => {
    router.showRoute();
  };

  router.showRoute();
});
