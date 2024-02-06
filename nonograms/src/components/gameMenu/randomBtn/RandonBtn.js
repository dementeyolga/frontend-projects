import randomBtnStylesStr from './RandomBtn.styles.scss';

class RandomBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const btn = document.createElement('a');
    btn.href = 'nonogram';
    btn.classList.add('button');
    btn.setAttribute('random', true);
    btn.setAttribute('data-link', true);
    btn.innerText = 'Random';

    shadowRoot.append(btn);

    const randomBtnStyles = document.createElement('style');
    randomBtnStyles.textContent = randomBtnStylesStr;
    shadowRoot.append(randomBtnStyles);
  }
}

export { RandomBtn };
