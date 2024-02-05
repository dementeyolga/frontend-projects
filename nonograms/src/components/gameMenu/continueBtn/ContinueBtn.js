import continueBtnStylesStr from './ContinueBtn.styles.scss';

const continueBtnStyles = document.createElement('style');
continueBtnStyles.textContent = continueBtnStylesStr;

class ContinueBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const btn = document.createElement('a');
    btn.href = 'nonogram';
    btn.classList.add('button');
    btn.setAttribute('continue', true);
    btn.setAttribute('data-link', true);
    btn.innerText = 'Continue game';

    if (!localStorage.getItem('savedGame')) {
      btn.classList.add('disabled');
    }

    shadowRoot.append(btn);
    shadowRoot.append(continueBtnStyles);
  }
}

export { ContinueBtn };
