import menuStyleStr from './gameMenu.styles.scss';
import nonograms from './../../resources/nonograms.json';

const menuStyles = document.createElement('style');
menuStyles.textContent = menuStyleStr;

const levels = [...new Set(nonograms.map((item) => item.level))];

const levelsHTML = levels
  .map((level) => {
    const gameNames = nonograms
      .filter((item) => item.level === level)
      .map((item) => `<div class="menu__item">${item.name}</div>\n`)
      .join('\n');

    return `
    <div class="level">
      <h3 className="level__title">${level}</h3>
      <div className="level__games">
        ${gameNames}
      </div>
    </div>
  `;
  })
  .join('\n');

const template = document.createElement('template');
template.innerHTML = levelsHTML;

class GameMenu extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.append(template.content.cloneNode(true));
    shadowRoot.append(menuStyles);
  }
}

export { GameMenu };
