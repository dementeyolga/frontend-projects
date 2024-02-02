import nonogramStylesStr from './GameNonogram.styles.scss';
import { GameField } from './gameField/GameField';
import { RestartBtn } from './restartBtn/RestartBtn';
import { GameTimer } from './gameTimer/GameTimer';
import nonograms from '../../resources/nonograms.json';

customElements.define('game-field', GameField);
customElements.define('restart-btn', RestartBtn, { extends: 'button' });
customElements.define('game-timer', GameTimer);

const nonogramStyles = document.createElement('style');
nonogramStyles.textContent = nonogramStylesStr;

const template = document.createElement('template');
template.innerHTML = `
  <div class="actions">
    <slot name="restart-button"></slot>
    <a href="" data-link>Menu</a>
    <game-timer id="game-timer" minutes="0" seconds="0"></game-timer>
  </div>
	
  <div id="nonogram" class="nonogram">
    <div id="summary" class="summary">
    </div>
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

    shadowRoot.getElementById('summary').innerHTML = `
      <p class="summary__level">${level}</p>
      <p class="summary__name"> ${name[0].toUpperCase() + name.slice(1)}</p>
    `;

    const nonogram = shadowRoot.querySelector('#nonogram');
    nonogram.insertAdjacentHTML(
      'beforeend',
      `<game-field class="game-field" level="${level}"></game-field>`
    );

    const { matrix } = nonograms.find(
      (item) => item.name === name && item.level === level
    );

    const correctSolution = matrix.flat().join('').toString();

    // Draw matrix solution
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
    let maxLeftHints = 0;

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

      if (leftHint.children.length > maxLeftHints) {
        maxLeftHints = leftHint.children.length;
      }
    }

    // Calculate cell size
    const nonogramWidth = nonogram.offsetWidth;

    let cellSize = nonogramWidth / (maxLeftHints + matrix.length);
    document.documentElement.style.setProperty('--cell-size', cellSize + 'px');

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

    shadowRoot.addEventListener(
      'starttimer',
      () => {
        const timer = shadowRoot.querySelector('#game-timer');
        timer.launch();
      },
      {
        once: true,
      }
    );
  }
}

export { GameNonogram };
