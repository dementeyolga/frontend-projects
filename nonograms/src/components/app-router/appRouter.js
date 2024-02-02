import { GameMenu } from './../gameMenu/GameMenu';
import { GameNonogram } from './../gameNonogram/GameNonogram';

customElements.define('game-menu', GameMenu);
customElements.define('game-nonogram', GameNonogram);

class AppRouter {
  constructor(app) {
    this.app = app;

    this.routes = [
      {
        hash: '',
        view: '<game-menu></game-menu>',
      },
      {
        hash: 'nonogram',
        view: `
          <game-nonogram name="tree" level="10x10">
            <button slot="button" class="button" is="restart-btn">Restart Game</button>
          </game-nonogram>`,
      },
    ];

    window.addEventListener('popstate', this.changeRoute);
  }

  changeRoute(url) {
    window.location.hash = url;
    this.showRoute();
  }

  async showRoute() {
    const match = this.routes.find(
      (item) => item.hash === window.location.hash
    );

    this.app.innerHTML = match.view;
  }
}

export { AppRouter };
