import continueBtnStylesStr from './ContinueBtn.styles.scss';

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

    const continueBtnStyles = document.createElement('style');
    continueBtnStyles.textContent = continueBtnStylesStr;
    shadowRoot.append(continueBtnStyles);
  }
}

export { ContinueBtn };
