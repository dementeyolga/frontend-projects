import menuStyleStr from './GameMenu.styles.scss';
import nonograms from '../../resources/nonograms.json';
import { RandomBtn } from './randomBtn/RandonBtn';
import { ContinueBtn } from './continueBtn/ContinueBtn';
import { TemplatesBtn } from './templatesBtn/TemplatesBtn';
import { HighScoreBtn } from './highScoreBtn/HighScoreBtn';
import { ThemeBtn } from './themeBtn/ThemeBtn';
import { MuteBtn } from './muteBtn/MuteBtn';

customElements.define('random-btn', RandomBtn);
customElements.define('continue-btn', ContinueBtn);
customElements.define('templates-btn', TemplatesBtn);
customElements.define('high-score-btn', HighScoreBtn);
customElements.define('theme-btn', ThemeBtn);
customElements.define('mute-btn', MuteBtn);

const levels = [...new Set(nonograms.map((item) => item.level))];

let levelsHTML = levels
  .map((level) => {
    const gameNames = nonograms
      .filter((item) => item.level === level)
      .map(
        (item) =>
          `<a href="" class="menu__item" game-level="${item.level}" game-name="${item.name}" game-size="${item.size}" data-link>${item.name[0].toUpperCase() + item.name.slice(1)}</a>\n`
      )
      .join('\n');

    return `
      <div class="level">
        <h3 class="level__title">${level[0].toUpperCase() + level.slice(1)}</h3>
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
                        <mute-btn></mute-btn>
                        <theme-btn></theme-btn>
                        <templates-btn></templates-btn>
                        <random-btn></random-btn>
                        <continue-btn></continue-btn>
                        <high-score-btn></high-score-btn>
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

    if (!this.isBurger && !this.inHeader) {
      shadowRoot.lastElementChild.insertAdjacentHTML('afterend', levelsHTML);
    } else if (this.isBurger) {
      actions.style.flexDirection = 'column';
      actions.style.alignItems = 'center';
    }
  }
}

export { GameMenu };
