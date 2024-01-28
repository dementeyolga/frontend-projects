const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
      background: red;
    }
  </style>

  <div className="wrapper">Nonograms</div> 
`;
class GameHeader extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }
}

export { GameHeader };
