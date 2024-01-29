import headerStylesStr from './gameHeader.styles.scss';

const headerStyles = document.createElement('style');
headerStyles.textContent = headerStylesStr;

const template = document.createElement('template');
template.innerHTML = `
  <p>Nonograms</p>
`;
class GameHeader extends HTMLElement {
	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.append(headerStyles);
		shadowRoot.append(template.content.cloneNode(true));
	}
}

export { GameHeader };
