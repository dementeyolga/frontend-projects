import nonogramStylesStr from './gameNonogram.styles.scss';
import { GameField } from './gameField/gameField';
import nonograms from './../../resources/nonograms.json';

customElements.define('game-field', GameField);

const nonogramStyles = document.createElement('style');
nonogramStyles.textContent = nonogramStylesStr;

const matrix = nonograms[10].matrix;
const correctSolution = matrix.flat().join('').toString();
console.log(correctSolution);

const template = document.createElement('template');
template.innerHTML = `
	<div class="picture">Picture</div>
	<div class="top-pane"></div>
	<div class="left-pane"></div>
  <game-field level="${matrix.length}"></game-field>
`;

class GameNonogram extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.append(template.content.cloneNode(true));
    shadowRoot.append(nonogramStyles);

    const topPane = shadowRoot.querySelector('.top-pane');
    const leftPane = shadowRoot.querySelector('.left-pane');

    for (let i = 0; i < matrix.length; i += 1) {
      const leftHint = document.createElement('div');
      leftHint.classList.add('left-pane__hint');

      const topHint = document.createElement('div');
      topHint.classList.add('top-pane__hint');

      let counterLeft = 0;
      let counterTop = 0;
      for (let j = 0; j < matrix.length; j += 1) {
        if (matrix[i][j]) {
          counterLeft += 1;
        }

        if (
          (counterLeft && !matrix[i][j]) ||
          (counterLeft && j === matrix.length - 1)
        ) {
          leftHint.insertAdjacentHTML(
            'beforeend',
            `
							<div class="left-pane__number">${counterLeft}</div>
						`
          );

          counterLeft = 0;
        }

        if (matrix[j][i]) {
          counterTop += 1;
        }

        if (
          (counterTop && !matrix[j][i]) ||
          (counterTop && j === matrix.length - 1)
        ) {
          topHint.insertAdjacentHTML(
            'beforeend',
            `
						<div class="top-pane__number">${counterTop}</div>
						`
          );

          counterTop = 0;
        }
      }

      leftPane.append(leftHint);
      topPane.append(topHint);
    }

    shadowRoot.addEventListener('fill', (e) => {
      if (correctSolution === e.detail.currentSolution) {
        console.log('You WON!');
      }
    });
  }
}

export { GameNonogram };
