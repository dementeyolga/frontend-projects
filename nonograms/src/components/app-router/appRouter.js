import { GameMenu } from './../gameMenu/GameMenu';
import { GameNonogram } from './../gameNonogram/GameNonogram';
import nonograms from './../../resources/nonograms.json';

customElements.define('game-menu', GameMenu);
customElements.define('game-nonogram', GameNonogram);

class AppRouter {
  constructor(app) {
    this.app = app;

    this.routes = [
      {
        hash: '',
        view: () => '<game-menu></game-menu>',
      },
      {
        hash: 'nonogram',
        view: (name, level) => {
          let resolvedName;
          let resolvedLevel;

          if (name && level) {
            resolvedName = name;
            resolvedLevel = level;

            localStorage.setItem('game-name', name);
            localStorage.setItem('game-level', level);
          } else if (
            localStorage.getItem('game-name') &&
            localStorage.getItem('game-level')
          ) {
            resolvedName = localStorage.getItem('game-name');
            resolvedLevel = localStorage.getItem('game-level');
          } else {
            resolvedName = nonograms[0].name;
            resolvedLevel = nonograms[0].level;
          }

          return `
            <game-nonogram name="${resolvedName}" level="${resolvedLevel}">
            </game-nonogram>
          `;
        },
      },
    ];
  }

  changeHash(url) {
    this.url = url;
    window.location.hash = url;
  }

  showRoute(params = []) {
    const newParams = [...params];

    if (params[0] === 'random') {
      const randomNum = Math.floor(Math.random() * nonograms.length);
      const randomNonogram = nonograms[randomNum];

      newParams[0] = randomNonogram.name;
      newParams[1] = randomNonogram.level;
    }

    const match = this.routes.find(
      (item) => item.hash === window.location.hash.slice(1)
    );

    this.app.innerHTML = match.view(...newParams);
  }
}

export { AppRouter };
