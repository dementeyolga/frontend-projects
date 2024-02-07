import { GameMenu } from '../gameMenu/GameMenu';
import { GameNonogram } from '../gameNonogram/GameNonogram';
import { HighScoreTable } from '../highScoreTable/HighScoreTable';
import nonograms from '../../resources/nonograms.json';

customElements.define('game-menu', GameMenu);
customElements.define('game-nonogram', GameNonogram);
customElements.define('high-score-table', HighScoreTable);

class AppRouter {
  constructor(app) {
    this.app = app;

    this.routes = [
      {
        hash: '',
        view: () => '<game-menu main-page="true"></game-menu>',
      },
      {
        hash: 'nonogram',
        view: (name, level, savedSolution, crossed, minutes, seconds) => {
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
            <game-nonogram name="${resolvedName}" level="${resolvedLevel}"  savedsolution="${savedSolution || ''}" crossed="${crossed || ''}" minutes="${minutes || '0'}" seconds="${seconds || '0'}">
            </game-nonogram>
          `;
        },
      },
      {
        hash: 'high-score',
        view: () => '<high-score-table></high-score-table>',
      },
    ];
  }

  changeHash(url) {
    this.url = url;
    window.location.hash = url;
  }

  showRoute(params = []) {
    const header = document.querySelector('game-header').shadowRoot;
    const burgerMenu = header.querySelector('game-menu.absolute');
    if (burgerMenu) {
      burgerMenu.classList.add('hidden');
    }

    const burgerBtn = header
      .querySelector('burger-btn')
      .shadowRoot.querySelector('.burger-icon');
    burgerBtn.classList.remove('active');

    const newParams = [...params];

    if (params[0] === 'random') {
      const randomNum = Math.floor(Math.random() * nonograms.length);
      const randomNonogram = nonograms[randomNum];

      newParams[0] = randomNonogram.name;
      newParams[1] = randomNonogram.level;
    }

    if (params[0] === 'continue') {
      const saved = JSON.parse(localStorage.getItem('savedGame'));

      newParams[0] = saved.name;
      newParams[1] = saved.level;
      newParams[2] = saved.currentSolution;
      newParams[3] = saved.crossed;
      newParams[4] = saved.time.minutes;
      newParams[5] = saved.time.seconds;
    }

    let match = this.routes.find(
      (item) => item.hash === window.location.hash.slice(1)
    );

    if (!match) {
      match = this.routes.find((item) => item.hash === '');
    }

    this.app.innerHTML = match.view(...newParams);
  }
}

export { AppRouter };
