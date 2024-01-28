const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
    }
  </style>

  <div>Game field</div> 
`;

class GameField extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }
}

export { GameField };
