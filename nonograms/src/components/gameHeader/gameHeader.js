import headerStylesStr from './GameHeader.styles.scss';
import { BurgerMenuBtn } from '../burgerMenu/BurgerMenuBtn';

customElements.define('burger-btn', BurgerMenuBtn);

const headerStyles = document.createElement('style');
headerStyles.textContent = headerStylesStr;

const template = document.createElement('template');
template.innerHTML = `
  <div id="wrapper" class="wrapper">
    <a href="" data-link>Nonograms</a>
    <burger-btn></burger-btn>
  </div>  
`;
class GameHeader extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.append(headerStyles);
    shadowRoot.append(template.content.cloneNode(true));

    const gameMenu = document.createElement('game-menu');
    gameMenu.inHeader = true;
    gameMenu.classList.add('header');
    shadowRoot.getElementById('wrapper').append(gameMenu);
  }
}

export { GameHeader };
