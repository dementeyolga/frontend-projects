import menuStyleStr from './GameMenu.styles.scss';
import nonograms from '../../resources/nonograms.json';
import { RandomBtn } from './randomBtn/RandonBtn';
import { ContinueBtn } from './continueBtn/ContinueBtn';
import { TemplatesBtn } from './templatesBtn/TemplatesBtn';

customElements.define('random-btn', RandomBtn);
customElements.define('continue-btn', ContinueBtn);
customElements.define('templates-btn', TemplatesBtn);

const levels = [...new Set(nonograms.map((item) => item.level))];

let levelsHTML = levels
  .map((level) => {
    const gameNames = nonograms
      .filter((item) => item.level === level)
      .map(
        (item) =>
          `<a href="nonogram" class="menu__item" level="${level}" game-name="${item.name}" data-link>${item.name}</a>\n`
      )
      .join('\n');

    return `
      <div class="level">
        <h3 class="level__title">${level}</h3>
        <div class="level__games">
          ${gameNames}
        </div>
      </div>
    `;
  })
  .join('\n');

const template = document.createElement('template');
template.innerHTML = `
                      <div id="actions" class="actions">
                        <templates-btn></templates-btn>
                        <random-btn></random-btn>
                        <continue-btn></continue-btn>
                      </div>
`;

class GameMenu extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.append(template.content.cloneNode(true));

    const menuStyles = document.createElement('style');
    menuStyles.textContent = menuStyleStr;
    shadowRoot.append(menuStyles);

    const actions = shadowRoot.getElementById('actions');

    if (this.getAttribute('main-page')) {
      actions.style.display = 'none';
    }

    if (!this.isBurger) {
      shadowRoot.lastElementChild.insertAdjacentHTML('afterend', levelsHTML);
    } else if (this.isBurger) {
      actions.style.flexDirection = 'column';
      actions.style.alignItems = 'center';
    }
  }
}

export { GameMenu };
