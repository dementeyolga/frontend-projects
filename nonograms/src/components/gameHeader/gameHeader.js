import headerStylesStr from './gameHeader.styles.scss';

const headerStyles = document.createElement('style');
headerStyles.textContent = headerStylesStr;

const template = document.createElement('template');
template.innerHTML = `
  <div class="wrapper">
    <p>Nonograms</p>
  </div>  

`;
class GameHeader extends HTMLElement {
	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.append(headerStyles);
		shadowRoot.append(template.content.cloneNode(true));
	}
}

export { GameHeader };
