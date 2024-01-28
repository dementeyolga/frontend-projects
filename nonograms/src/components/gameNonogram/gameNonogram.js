import { GameField } from './gameField/gameField';
import nonograms from './../../resources/nonograms.json';

customElements.define('game-field', GameField);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
    }
  </style>

  <div>
    <game-field level="${nonograms[0].matrix.length}"></game-field>
  </div> 
`;

class GameNonogram extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }
}

export { GameNonogram };
