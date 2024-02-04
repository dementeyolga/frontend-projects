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
    if (deepestEl.matches('[data-link]')) {
      e.preventDefault();
      router.changeHash(deepestEl.getAttribute('href'));

      let params = [];
      if (deepestEl.getAttribute('href') === 'nonogram') {
        if (deepestEl.getAttribute('game-name')) {
          params.push(deepestEl.getAttribute('game-name'));
        }

        if (deepestEl.getAttribute('level')) {
          params.push(deepestEl.getAttribute('level'));
        }
      }

      if (deepestEl.matches('[random]')) {
        params.push('random');
      }

      router.showRoute(params);
    }
  });

  window.onpopstate = () => {
    router.showRoute();
  };

  router.showRoute();
});
