class GameField extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      Game field
    `;
  }
}

export { GameField };
