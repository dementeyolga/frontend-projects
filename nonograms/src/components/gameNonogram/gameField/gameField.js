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

    const level = this.getAttribute('level').split('x')[0];

    const field = document.createElement('div');
    field.id = 'field';
    for (let i = 0; i < level; i += 1) {
      let row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < level; j += 1) {
        row.insertAdjacentHTML('beforeend', `<div class="cell"></div>`);
      }
      field.append(row);
    }

    shadowRoot.append(field);

    function checkSolution() {
      const currentSolution = [...field.querySelectorAll('.cell')].reduce(
        (acc, curr) => {
          return curr.classList.contains('filled') ? acc + '1' : acc + '0';
        },
        ''
      );

      field.dispatchEvent(
        new CustomEvent('fill', {
          bubbles: true,
          composed: true,
          detail: { currentSolution },
        })
      );
    }

    field.addEventListener('click', (e) => {
      e.target.classList.remove('crossed');
      e.target.classList.toggle('filled');

      if (e.target.classList.contains('filled')) {
        new Audio(fillSoundFile).play();
      } else {
        new Audio(clearSoundFile).play();
      }

      checkSolution();
    });

    field.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.target.classList.remove('filled');
      e.target.classList.toggle('crossed');

      if (e.target.classList.contains('crossed')) {
        new Audio(crossSoundFile).play();
      } else {
        new Audio(clearSoundFile).play();
      }

      checkSolution();
    });

    field.addEventListener(
      'click',
      () => {
        field.dispatchEvent(
          new CustomEvent('starttimer', {
            bubbles: true,
            composed: true,
          })
        );
      },
      {
        once: true,
      }
    );

    field.addEventListener(
      'contextmenu',
      () => {
        field.dispatchEvent(
          new CustomEvent('starttimer', {
            bubbles: true,
            composed: true,
          })
        );
      },
      {
        once: true,
      }
    );
  }
}

export { GameField };
