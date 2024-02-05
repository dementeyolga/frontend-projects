import nonogramStylesStr from './GameNonogram.styles.scss';
import { GameField } from './gameField/GameField';
import { RestartBtn } from './restartBtn/RestartBtn';
import { SolutionBtn } from './solutionBtn/SolutionBtn';
import { SaveBtn } from './saveBtn/SaveBtn';
import { GameTimer } from './gameTimer/GameTimer';
import nonograms from '../../resources/nonograms.json';
import winSoundFile from './../../assets/sound-effects/win-game.mp3';

customElements.define('game-field', GameField);
customElements.define('restart-btn', RestartBtn);
customElements.define('solution-btn', SolutionBtn);
customElements.define('save-btn', SaveBtn);
customElements.define('game-timer', GameTimer);

const nonogramStyles = document.createElement('style');
nonogramStyles.textContent = nonogramStylesStr;

const template = document.createElement('template');
template.innerHTML = `
  <div class="nonogram__container">
    <div class="actions">
      <restart-btn></restart-btn>
      <save-btn></save-btn>
      <solution-btn></solution-btn>
      <game-timer id="game-timer" minutes="0" seconds="0"></game-timer>
      <a href="" data-link>Menu</a>
    </div>
    
    <div id="nonogram" class="nonogram">
      <div id="summary" class="summary">
      </div>
      <div class="top-pane"></div>
      <div class="left-pane"></div>
    </div>
  </div>
`;

class GameNonogram extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.append(template.content.cloneNode(true));
    shadowRoot.append(nonogramStyles);

    const level = this.getAttribute('level');
    const name = this.getAttribute('name');
    // const savedSolution = this.getAttribute('savedsolution');

    const timer = shadowRoot.querySelector('#game-timer');
    console.log('nonogram added to the doc');

    if (
      this.getAttribute('minutes') !== '0' ||
      this.getAttribute('seconds') !== '0'
    ) {
      const savedMinutes = this.getAttribute('minutes');
      const savedSeconds = this.getAttribute('seconds');

      timer.setAttribute('minutes', savedMinutes);
      timer.setAttribute('seconds', savedSeconds);

      timer.continue = true;
    }

    shadowRoot.getElementById('summary').innerHTML = `
      <p class="summary__level">${level}</p>
      <p class="summary__name"> ${name[0].toUpperCase() + name.slice(1)}</p>
    `;

    const nonogram = shadowRoot.querySelector('#nonogram');
    nonogram.insertAdjacentHTML(
      'beforeend',
      `<game-field id="game-field" class="game-field" level="${level}"></game-field>`
    );
    const field = shadowRoot.querySelector('#game-field');

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

    shadowRoot.firstElementChild.addEventListener('fill', () => {
      if (correctSolution === field.currentSolution) {
        field.dispatchEvent(new CustomEvent('win'));
        timer.dispatchEvent(new CustomEvent('win'));
        const minutes = timer.getAttribute('minutes');

        let minutesStr = '';
        if (!+minutes) {
          minutesStr = '';
        } else if (+minutes > 1) {
          minutesStr += 'minutes ';
        } else {
          minutesStr += 'minute';
        }

        const seconds = timer.getAttribute('seconds');
        let secondsStr = !seconds || `${seconds} second`;
        secondsStr = +seconds > 1 ? secondsStr + 's' : secondsStr;

        new Audio(winSoundFile).play();

        console.log(
          `Great! You have solved the nonogram ${name[0].toUpperCase() + name.slice(1)} in ${minutesStr}${secondsStr}!`
        );
      }
    });

    shadowRoot.firstElementChild.addEventListener('restart', () => {
      field.dispatchEvent(new CustomEvent('restart'));
      timer.restart();
    });

    shadowRoot.firstElementChild.addEventListener('solution', () => {
      timer.stop();

      field.dispatchEvent(
        new CustomEvent('solution', {
          detail: matrix.flat(),
        })
      );
    });

    shadowRoot.firstElementChild.addEventListener('save-game', () => {
      const game = {
        level,
        name,
        currentSolution: field.currentSolution,
        time: {
          minutes: timer.minutes,
          seconds: timer.seconds,
        },
      };

      localStorage.setItem('savedGame', JSON.stringify(game));
    });

    shadowRoot.firstElementChild.addEventListener(
      'starttimer',
      () => {
        timer.launch();
      },
      {
        once: true,
      }
    );
  }
}

export { GameNonogram };
