class GameHeader extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      Nonograms
    `;
  }
}

export { GameHeader };
