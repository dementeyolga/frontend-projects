import restartBtnStylesStr from './RestartBtn.styles.scss';

const restartBtnStyles = document.createElement('style');
restartBtnStyles.textContent = restartBtnStylesStr;

class RestartBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="button">Restart game</div>
    `;
    shadowRoot.append(restartBtnStyles);

    shadowRoot.firstElementChild.onclick = () => {
      this.dispatchEvent(
        new CustomEvent('restart', {
          bubbles: true,
          composed: true,
        })
      );
    };
  }
}

export { RestartBtn };
