import fieldStylesStr from './gameField.styles.scss';

const fieldStyles = document.createElement('style');
fieldStyles.textContent = fieldStylesStr;

class GameField extends HTMLElement {
	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });

		shadowRoot.append(fieldStyles);

		const level = this.getAttribute('level').split('x')[0];

		console.log(level);

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
			const currentSolution = [...field.querySelectorAll('.cell')].reduce((acc, curr) => {
				return curr.classList.contains('filled') ? acc + '1' : acc + '0';
			}, '');

			field.dispatchEvent(
				new CustomEvent('fill', {
					bubbles: true,
					composed: true,
					detail: { currentSolution },
				})
			);
		}

		field.addEventListener('click', (e) => {
			console.log('fill');
			e.target.classList.remove('crossed');
			e.target.classList.toggle('filled');

			checkSolution();
		});

		field.addEventListener('contextmenu', (e) => {
			console.log('cross');
			e.preventDefault();
			e.target.classList.remove('filled');
			e.target.classList.toggle('crossed');

			checkSolution();
		});
	}
}

export { GameField };
