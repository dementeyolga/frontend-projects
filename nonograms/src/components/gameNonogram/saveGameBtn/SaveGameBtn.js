import saveGameBtnStylesStr from './SaveGameBtn.styles.scss';

const saveGameBtnStyles = document.createElement('style');
saveGameBtnStyles.textContent = saveGameBtnStylesStr;

class SaveGameBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="button">Save game</div>
    `;
    shadowRoot.append(saveGameBtnStyles);
  }
}

export { SaveGameBtn };
