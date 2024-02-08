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
        hash: 'templates',
        view: () => '<game-menu main-page="true"></game-menu>',
      },
      {
        hash: '',
        view: (name, size, level, savedSolution, crossed, minutes, seconds) => {
          let resolvedName;
          let resolvedSize;
          let resolvedLevel;

          if (name && size && level) {
            resolvedName = name;
            resolvedSize = size;
            resolvedLevel = level;

            // localStorage.setItem('game-name', name);
            // localStorage.setItem('game-size', size);
            // localStorage.setItem('game-level', level);
            // } else if (
            //   localStorage.getItem('game-name') &&
            //   localStorage.getItem('game-size') &&
            // localStorage.getItem('game-level')
            // ) {
            //   resolvedName = localStorage.getItem('game-name');
            //   resolvedSize = localStorage.getItem('game-size');
          } else {
            resolvedName = nonograms[0].name;
            resolvedSize = nonograms[0].size;
            resolvedLevel = nonograms[0].level;
          }

          return `
            <game-nonogram name="${resolvedName}" size="${resolvedSize}" level="${resolvedLevel}"  savedsolution="${savedSolution || ''}" crossed="${crossed || ''}" minutes="${minutes || '0'}" seconds="${seconds || '0'}">
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
      newParams[1] = randomNonogram.size;
      newParams[2] = randomNonogram.level;
    }

    if (params[0] === 'continue') {
      const saved = JSON.parse(localStorage.getItem('savedGame'));

      newParams[0] = saved.name;
      newParams[1] = saved.size;
      newParams[2] = saved.level;
      newParams[3] = saved.currentSolution;
      newParams[4] = saved.crossed;
      newParams[5] = saved.time.minutes;
      newParams[6] = saved.time.seconds;
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
