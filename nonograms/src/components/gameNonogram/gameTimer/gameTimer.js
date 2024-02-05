import timerStylesStr from './GameTimer.styles.scss';

const timerStyles = document.createElement('style');
timerStyles.textContent = timerStylesStr;

class GameTimer extends HTMLElement {
  connectedCallback() {
    this.append(timerStyles);

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

    const duration = `${minutes}:${seconds}`;

    this.minutes = minutes;
    this.seconds = seconds;
    this.currentDuration = duration;
    this.innerHTML = duration;
  }

  static get observedAttributes() {
    return ['minutes', 'seconds'];
  }

  attributeChangedCallback() {
    this.render();
  }

  launch() {
    if (this.continue) {
      const time = this.currentDuration.split(':');
      const min = +time[0];
      const sec = +time[1];

      this.startTime = Date.now() - (min * 60 + sec) * 1000;
    } else {
      this.startTime = Date.now();
    }

    clearInterval(this.intervalID);

    this.intervalID = setInterval(() => {
      const now = Date.now();
      const duration = Math.trunc((now - this.startTime) / 1000);

      this.setAttribute('seconds', duration % 60);
      this.setAttribute('minutes', Math.floor(duration / 60));
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalID);
  }

  restart() {
    this.startTime = null;
    this.continue = false;

    this.setAttribute('seconds', '0');
    this.setAttribute('minutes', '0');

    this.stop();
  }

  disconnectedCallback() {
    this.stop();
  }
}

export { GameTimer };
