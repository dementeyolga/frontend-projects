import './styles/main.scss';
import { AppRouter } from './components/app-router/AppRouter';
import { GameHeader } from './components/gameHeader/GameHeader';
// import { GameMenu } from './components/gameMenu/gameMenu';
// import { GameNonogram } from './components/gameNonogram/gameNonogram';

customElements.define('game-header', GameHeader);
// customElements.define('game-menu', GameMenu);
// customElements.define('game-nonogram', GameNonogram);

document.body.insertAdjacentHTML(
  'afterbegin',
  `
		<game-header class="wrapper"></game-header>
		<main id="main" class="main wrapper">
			
		</main>
	`
);

// <game-menu></game-menu>
// <game-nonogram name="tree" level="10x10">
//   <button slot="button" class="button" is="restart-btn">Restart Game</button>
// </game-nonogram>

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
