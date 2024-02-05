import randomBtnStylesStr from './RandomBtn.styles.scss';

const randomBtnStyles = document.createElement('style');
randomBtnStyles.textContent = randomBtnStylesStr;

class RandomBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <a href="nonogram" class="button" random data-link>Random game</a>
    `;
    shadowRoot.append(randomBtnStyles);
  }
}

export { RandomBtn };
