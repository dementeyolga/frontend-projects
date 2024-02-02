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
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      router.changeRoute(e.target.href);
    }
  });

  router.showRoute();
});
