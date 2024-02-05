import saveBtnStylesStr from './SaveBtn.styles.scss';

const saveBtnStyles = document.createElement('style');
saveBtnStyles.textContent = saveBtnStylesStr;

class SaveBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="button">Save game</div>
    `;
    shadowRoot.append(saveBtnStyles);
    shadowRoot.firstElementChild.addEventListener('click', (e) => {
      e.currentTarget.dispatchEvent(
        new CustomEvent('save-game', { bubbles: true, composed: true })
      );
    });
  }
}

export { SaveBtn };
