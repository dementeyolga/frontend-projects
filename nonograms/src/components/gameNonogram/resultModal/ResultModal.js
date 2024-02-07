import modalStylesStr from './ResultModal.styles.scss';

const modalStyles = document.createElement('style');
modalStyles.innerText = modalStylesStr;

class ResultModal extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(modalStyles);

    const wrapper = document.createElement('div');
    wrapper.className = 'modal__wrapper';

    const modal = document.createElement('div');
    modal.className = 'modal';

    if (this.message) {
      modal.textContent = this.message;
    }

    const close = document.createElement('div');
    close.className = 'modal__close';
    close.innerHTML = `
      <div class="modal__close-stroke"></div>
      <div class="modal__close-stroke"></div>
    `;

    modal.append(close);
    wrapper.append(modal);
    shadowRoot.append(wrapper);

    close.onclick = () => {
      wrapper.classList.add('hidden');
      wrapper.addEventListener('transitionend', () => wrapper.remove());
    };
  }
}

export { ResultModal };
