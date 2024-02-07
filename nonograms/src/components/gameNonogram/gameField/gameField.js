import fieldStylesStr from './GameField.styles.scss';
import fillSoundFile from './../../../assets/sound-effects/fill-cell.mp3';
import clearSoundFile from './../../../assets/sound-effects/clear-cell.mp3';
import crossSoundFile from './../../../assets/sound-effects/cross-cell.mp3';

const fieldStyles = document.createElement('style');
fieldStyles.textContent = fieldStylesStr;

class GameField extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.append(fieldStyles);

    this.level = this.getAttribute('level').split('x')[0];

    this.field = document.createElement('div');
    this.field.id = 'field';

    for (let i = 0; i < this.level; i += 1) {
      let row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < this.level; j += 1) {
        row.insertAdjacentHTML('beforeend', `<div class="cell"></div>`);
      }
      this.field.append(row);
    }

    shadowRoot.append(this.field);

    this.cells = this.field.querySelectorAll('.cell');

    this.currentSolution =
      this.savedSolution || new Array(this.cells.length).fill(0).join('');

    if (this.savedSolution) {
      this.cells.forEach((cell, i) => {
        if (this.savedSolution[i] === '1') {
          cell.classList.add('filled');
        }
      });
    }

    if (this.crossed) {
      this.cells.forEach((cell, i) => {
        if (this.crossed[i] === 'x') {
          cell.classList.add('crossed');
        }
      });
    }

    this.field.addEventListener('click', (e) => {
      if (this.clicksDisabled) {
        e.stopImmediatePropagation();
      }
    });

    this.field.addEventListener('contextmenu', (e) => {
      if (this.clicksDisabled) {
        e.stopImmediatePropagation();
      }
    });

    this.field.addEventListener('click', (e) => {
      e.target.classList.remove('crossed');
      e.target.classList.toggle('filled');

      if (localStorage.getItem('muted') !== 'true') {
        if (e.target.classList.contains('filled')) {
          new Audio(fillSoundFile).play();
        } else {
          new Audio(clearSoundFile).play();
        }
      }

      this.checkSolution();
    });

    this.field.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.target.classList.remove('filled');
      e.target.classList.toggle('crossed');

      if (localStorage.getItem('muted') !== 'true') {
        if (e.target.classList.contains('crossed')) {
          new Audio(crossSoundFile).play();
        } else {
          new Audio(clearSoundFile).play();
        }
      }

      this.checkSolution();
    });

    this.field.addEventListener('click', () => {
      if (this.timerStarted) return;
      this.timerStarted = true;

      this.field.dispatchEvent(
        new CustomEvent('starttimer', {
          bubbles: true,
          composed: true,
        })
      );
    });

    this.field.addEventListener('contextmenu', () => {
      if (this.timerStarted) return;
      this.timerStarted = true;

      this.dispatchEvent(
        new CustomEvent('starttimer', {
          bubbles: true,
          composed: true,
        })
      );
    });

    this.addEventListener('restart', () => {
      this.enableClicks();
      this.cells.forEach((cell) => cell.classList.remove('filled', 'crossed'));
    });

    this.addEventListener('solution', (e) => {
      this.disableClicks();

      const solution = e.detail;

      this.cells.forEach((cell, i) => {
        if (solution[i]) {
          cell.classList.remove('crossed');
          cell.classList.add('filled');
        } else {
          cell.classList.remove('crossed');
          cell.classList.remove('filled');
        }
      });
    });

    this.addEventListener('win', () => {
      this.disableClicks();
      this.cells.forEach((cell) => cell.classList.remove('crossed'));
    });
  }

  checkSolution() {
    this.currentSolution = [...this.cells].reduce((acc, curr) => {
      return curr.classList.contains('filled') ? acc + '1' : acc + '0';
    }, '');

    this.currentCrossed = [...this.cells].reduce((acc, curr) => {
      return curr.classList.contains('crossed') ? acc + 'x' : acc + '0';
    }, '');

    this.field.dispatchEvent(
      new CustomEvent('fill', {
        bubbles: true,
        composed: true,
      })
    );
  }

  disableClicks() {
    this.clicksDisabled = true;
  }

  enableClicks() {
    this.clicksDisabled = false;
  }
}

export { GameField };
