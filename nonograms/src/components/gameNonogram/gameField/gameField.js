import './gameField.scss';

const template = document.createElement('template');
template.innerHTML = `

`;

class GameField extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    const level = this.getAttribute('level');

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

    this.shadowRoot.append(field);

    field.addEventListener('click', (e) => {
      console.log('fill');
      e.target.classList.remove('crossed');
      e.target.classList.toggle('filled');
    });

    field.addEventListener('contextmenu', (e) => {
      console.log('cross');
      e.preventDefault();
      e.target.classList.remove('filled');
      e.target.classList.toggle('crossed');
    });
  }
}

export { GameField };
