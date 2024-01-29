import nonogramStylesStr from './gameNonogram.styles.scss';
import { GameField } from './gameField/gameField';
import nonograms from './../../resources/nonograms.json';

customElements.define('game-field', GameField);

const nonogramStyles = document.createElement('style');
nonogramStyles.textContent = nonogramStylesStr;

const template = document.createElement('template');
template.innerHTML = `
  <game-field level="${nonograms[0].matrix.length}"></game-field>
`;

class GameNonogram extends HTMLElement {
	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.append(template.content.cloneNode(true));
		shadowRoot.append(nonogramStyles);
	}
}

export { GameNonogram };
