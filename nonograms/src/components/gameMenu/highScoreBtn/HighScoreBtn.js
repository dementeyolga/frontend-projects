import highScoreBtnStylesStr from './HighScoreBtn.styles.scss';

class HighScoreBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const btn = document.createElement('a');
    btn.href = 'high-score';
    btn.classList.add('button');
    btn.setAttribute('data-link', true);
    btn.innerText = 'Scores';

    shadowRoot.append(btn);

    const highScoreBtnStyles = document.createElement('style');
    highScoreBtnStyles.textContent = highScoreBtnStylesStr;
    shadowRoot.append(highScoreBtnStyles);
  }
}

export { HighScoreBtn };
