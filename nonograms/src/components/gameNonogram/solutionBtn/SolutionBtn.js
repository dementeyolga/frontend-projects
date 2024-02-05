import solutionBtnStylesStr from './SolutionBtn.styles.scss';

const solutionBtnStyles = document.createElement('style');
solutionBtnStyles.textContent = solutionBtnStylesStr;

class SolutionBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="button">Solution</div>
    `;
    shadowRoot.append(solutionBtnStyles);

    shadowRoot.firstElementChild.onclick = (e) => {
      e.currentTarget.dispatchEvent(
        new CustomEvent('solution', {
          bubbles: true,
          composed: true,
        })
      );
    };
  }
}

export { SolutionBtn };
