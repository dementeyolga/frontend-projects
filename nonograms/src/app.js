import './styles/main.scss';
import { GameHeader } from './components/gameHeader';
import { GameField } from './components/gameField';

customElements.define('game-header', GameHeader);
customElements.define('game-field', GameField);

document.body.insertAdjacentHTML(
  'afterbegin',
  `
		<game-header></game-header>
		<game-field></game-field>
	`
);
