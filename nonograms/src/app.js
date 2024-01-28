import './styles/main.scss';
import { GameHeader } from './components/gameHeader/gameHeader';
import { GameField } from './components/gameField/gameField';

customElements.define('game-header', GameHeader);
customElements.define('game-field', GameField);

document.body.insertAdjacentHTML(
  'afterbegin',
  `
		<game-header></game-header>
		<game-field></game-field>
	`
);
