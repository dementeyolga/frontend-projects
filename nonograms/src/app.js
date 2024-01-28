import './styles/main.scss';
import { GameHeader } from './components/gameHeader/gameHeader';
import { GameNonogram } from './components/gameNonogram/gameNonogram';

customElements.define('game-header', GameHeader);
customElements.define('game-nonogram', GameNonogram);

document.body.insertAdjacentHTML(
  'afterbegin',
  `
		<game-header class="wrapper"></game-header>
		<game-nonogram class="wrapper"></game-nonogram>
	`
);
