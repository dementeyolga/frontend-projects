import continueBtnStylesStr from './ContinueBtn.styles.scss';

const continueBtnStyles = document.createElement('style');
continueBtnStyles.textContent = continueBtnStylesStr;

class ContinueBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <a href="nonogram" class="button" continue data-link>Continue game</a>
    `;
    shadowRoot.append(continueBtnStyles);
  }
}

export { ContinueBtn };
