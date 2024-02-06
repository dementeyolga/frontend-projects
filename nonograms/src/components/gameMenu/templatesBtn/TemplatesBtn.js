import templatesBtnStylesStr from './TemplatesBtn.styles.scss';

class TemplatesBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const btn = document.createElement('a');
    btn.href = '';
    btn.classList.add('button');
    btn.setAttribute('data-link', true);
    btn.innerText = 'Templates';

    shadowRoot.append(btn);

    const templatesBtnStyles = document.createElement('style');
    templatesBtnStyles.textContent = templatesBtnStylesStr;
    shadowRoot.append(templatesBtnStyles);
  }
}

export { TemplatesBtn };
