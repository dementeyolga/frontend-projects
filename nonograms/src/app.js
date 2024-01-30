import './styles/main.scss';
import { GameHeader } from './components/gameHeader/gameHeader';
import { GameMenu } from './components/gameMenu/gameMenu';
import { GameNonogram } from './components/gameNonogram/gameNonogram';

customElements.define('game-header', GameHeader);
customElements.define('game-menu', GameMenu);
customElements.define('game-nonogram', GameNonogram);

document.body.insertAdjacentHTML(
  'afterbegin',
  `
		<game-header></game-header>
		<main class="main">
			<game-menu></game-menu>
			<game-nonogram name="tree" level="10x10"></game-nonogram>
		</main>
	`
);
