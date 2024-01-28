import { GameField } from './gameField/gameField';
customElements.define('game-field', GameField);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
    }
  </style>

  <div>Nonogram
    <game-field></game-field>
  </div> 
`;

class GameNonogram extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }
}

export { GameNonogram };
