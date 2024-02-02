import timerStylesStr from './GameTimer.styles.scss';

const timerStyles = document.createElement('style');
timerStyles.textContent = timerStylesStr;

class GameTimer extends HTMLElement {
  connectedCallback() {
    this.append(this.style);

    if (!this.getAttribute('minutes')) this.setAttribute('minutes', '0');
    if (!this.getAttribute('seconds')) this.setAttribute('seconds', '0');

    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }

    this.addEventListener('win', () => this.stop());
  }

  render() {
    let minutes =
      this.getAttribute('minutes').length === 1
        ? `0${this.getAttribute('minutes')}`
        : this.getAttribute('minutes');

    let seconds =
      this.getAttribute('seconds').length === 1
        ? `0${this.getAttribute('seconds')}`
        : this.getAttribute('seconds');

    this.innerHTML = `${minutes}:${seconds}`;
  }

  static get observedAttributes() {
    return ['minutes', 'seconds'];
  }

  attributeChangedCallback() {
    this.render();
  }

  launch() {
    if (!this.startTime) {
      this.startTime = Date.now();

      this.intervalID = setInterval(() => {
        const now = Date.now();
        const duration = Math.trunc((now - this.startTime) / 1000);

        this.setAttribute('seconds', duration % 60);
        this.setAttribute('minutes', Math.floor(duration / 60));
      }, 1000);
    }
  }

  stop() {
    clearInterval(this.intervalID);
  }

  disconnectedCallback() {
    this.stop();
  }
}

export { GameTimer };
