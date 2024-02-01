import nonogramStylesStr from './gameNonogram.styles.scss';
import { GameField } from './gameField/gameField';
import { RestartBtn } from './restartBtn/restartBtn';
import { GameTimer } from '../gameTimer/gameTimer';
import nonograms from './../../resources/nonograms.json';

customElements.define('game-field', GameField);
customElements.define('restart-btn', RestartBtn, { extends: 'button' });
customElements.define('game-timer', GameTimer);

const nonogramStyles = document.createElement('style');
nonogramStyles.textContent = nonogramStylesStr;

const template = document.createElement('template');
template.innerHTML = `
	<slot name="button"></slot>
  <game-timer></game-timer>
  
  <div class="nonogram">
    <div class="picture">Picture</div>
    <div class="top-pane"></div>
    <div class="left-pane"></div>
  </div>
`;

class GameNonogram extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.append(template.content.cloneNode(true));
    shadowRoot.append(nonogramStyles);

    const level = this.getAttribute('level');
    const name = this.getAttribute('name');

    shadowRoot
      .querySelector('.nonogram')
      .insertAdjacentHTML(
        'beforeend',
        `<game-field class="game-field" level="${level}"></game-field>`
      );

    const { matrix } = nonograms.find(
      (item) => item.name === name && item.level === level
    );

    console.log(matrix);

    const correctSolution = matrix.flat().join('').toString();
    console.log(correctSolution);

    // Show matrix solution
    let str = '';
    matrix.forEach((el) => {
      str += el.reduce((acc, curr) => {
        const square = curr ? '■' : '□';
        return acc + square;
      }, '');
      str += '\n';
    });
    console.log(str);

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

    shadowRoot.addEventListener('restart', () => {
      shadowRoot
        .querySelector('game-field')
        .shadowRoot.querySelectorAll('.cell')
        .forEach((cell) => {
          cell.classList.remove('filled');
          cell.classList.remove('crossed');
        });
    });
  }
}

export { GameNonogram };
