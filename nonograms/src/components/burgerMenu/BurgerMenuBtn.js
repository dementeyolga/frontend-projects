import burgerMenuStylesStr from './BurgerMenuBtn.styles.scss';

class BurgerMenuBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const burgerBtnStyles = document.createElement('style');
    burgerBtnStyles.textContent = burgerMenuStylesStr;
    shadowRoot.append(burgerBtnStyles);

    const btn = document.createElement('div');
    btn.classList.add('burger-icon');
    btn.innerHTML = `
      <div class="burger-icon__stroke"></div>
      <div class="burger-icon__stroke"></div>
    `;

    const gameMenu = document.createElement('game-menu');
    gameMenu.isBurger = true;
    this.after(gameMenu);
    gameMenu.classList.add('hidden');
    gameMenu.classList.add('absolute');

    btn.onclick = () => {
      btn.classList.toggle('active');
      gameMenu.classList.toggle('hidden');
    };

    shadowRoot.append(btn);
  }
}

export { BurgerMenuBtn };
