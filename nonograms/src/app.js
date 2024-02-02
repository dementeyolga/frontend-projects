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
        console.log(
          deepestEl.getAttribute('level'),
          deepestEl.getAttribute('game-name')
        );

        params.push(deepestEl.getAttribute('game-name'));
        params.push(deepestEl.getAttribute('level'));
      }

      router.showRoute(params);
      console.log(deepestEl.getAttribute('href'));
    }
  });

  router.showRoute();
});
