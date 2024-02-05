/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 359:
/*!************************************************!*\
  !*** ./src/components/app-router/AppRouter.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRouter: () => (/* binding */ AppRouter)
/* harmony export */ });
/* harmony import */ var _gameMenu_GameMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gameMenu/GameMenu */ 974);
/* harmony import */ var _gameNonogram_GameNonogram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gameNonogram/GameNonogram */ 54);
/* harmony import */ var _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/nonograms.json */ 697);



customElements.define('game-menu', _gameMenu_GameMenu__WEBPACK_IMPORTED_MODULE_0__.GameMenu);
customElements.define('game-nonogram', _gameNonogram_GameNonogram__WEBPACK_IMPORTED_MODULE_1__.GameNonogram);
class AppRouter {
  constructor(app) {
    this.app = app;
    this.routes = [{
      hash: '',
      view: () => '<game-menu></game-menu>'
    }, {
      hash: 'nonogram',
      view: (name, level, savedSolution, minutes, seconds) => {
        let resolvedName;
        let resolvedLevel;
        if (name && level) {
          resolvedName = name;
          resolvedLevel = level;
          localStorage.setItem('game-name', name);
          localStorage.setItem('game-level', level);
        } else if (localStorage.getItem('game-name') && localStorage.getItem('game-level')) {
          resolvedName = localStorage.getItem('game-name');
          resolvedLevel = localStorage.getItem('game-level');
        } else {
          resolvedName = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_2__[0].name;
          resolvedLevel = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_2__[0].level;
        }
        return `
            <game-nonogram name="${resolvedName}" level="${resolvedLevel}"  savedsolution="${savedSolution || ''}" minutes="${minutes || '0'}" seconds="${seconds || '0'}">
            </game-nonogram>
          `;
      }
    }];
  }
  changeHash(url) {
    this.url = url;
    window.location.hash = url;
  }
  showRoute() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const newParams = [...params];
    if (params[0] === 'random') {
      const randomNum = Math.floor(Math.random() * _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_2__.length);
      const randomNonogram = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_2__[randomNum];
      newParams[0] = randomNonogram.name;
      newParams[1] = randomNonogram.level;
    }
    if (params[0] === 'continue') {
      const saved = JSON.parse(localStorage.getItem('savedGame'));
      console.log(saved);
      newParams[0] = saved.name;
      newParams[1] = saved.level;
      newParams[2] = saved.currentSolution;
      newParams[3] = saved.time.minutes;
      newParams[4] = saved.time.seconds;
    }
    let match = this.routes.find(item => item.hash === window.location.hash.slice(1));
    if (!match) {
      match = this.routes.find(item => item.hash === '');
    }
    this.app.innerHTML = match.view(...newParams);
  }
}


/***/ }),

/***/ 625:
/*!*************************************************!*\
  !*** ./src/components/gameHeader/GameHeader.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameHeader: () => (/* binding */ GameHeader)
/* harmony export */ });
/* harmony import */ var _GameHeader_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameHeader.styles.scss */ 443);

const headerStyles = document.createElement('style');
headerStyles.textContent = _GameHeader_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
const template = document.createElement('template');
template.innerHTML = `
  <div class="wrapper">
    <p>Nonograms</p>
  </div>  

`;
class GameHeader extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.append(headerStyles);
    shadowRoot.append(template.content.cloneNode(true));
  }
}


/***/ }),

/***/ 974:
/*!*********************************************!*\
  !*** ./src/components/gameMenu/GameMenu.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameMenu: () => (/* binding */ GameMenu)
/* harmony export */ });
/* harmony import */ var _GameMenu_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameMenu.styles.scss */ 133);
/* harmony import */ var _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/nonograms.json */ 697);
/* harmony import */ var _randomBtn_RandonBtn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./randomBtn/RandonBtn */ 734);
/* harmony import */ var _continueBtn_ContinueBtn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./continueBtn/ContinueBtn */ 368);




customElements.define('random-btn', _randomBtn_RandonBtn__WEBPACK_IMPORTED_MODULE_2__.RandomBtn);
customElements.define('continue-btn', _continueBtn_ContinueBtn__WEBPACK_IMPORTED_MODULE_3__.ContinueBtn);
const menuStyles = document.createElement('style');
menuStyles.textContent = _GameMenu_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
const levels = [...new Set(_resources_nonograms_json__WEBPACK_IMPORTED_MODULE_1__.map(item => item.level))];
const levelsHTML = levels.map(level => {
  const gameNames = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_1__.filter(item => item.level === level).map(item => `<a href="nonogram" class="menu__item" level="${level}" game-name="${item.name}" data-link>${item.name}</a>\n`).join('\n');
  return `
    <div class="level">
      <h3 class="level__title">${level}</h3>
      <div class="level__games">
        ${gameNames}
      </div>
    </div>
  `;
}).join('\n');
const template = document.createElement('template');
template.innerHTML = `
                      <div class="actions">
                        <random-btn></random-btn>
                        <continue-btn></continue-btn>
                      </div>
                      
                      ${levelsHTML}`;
class GameMenu extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.append(template.content.cloneNode(true));
    shadowRoot.append(menuStyles);
  }
}


/***/ }),

/***/ 368:
/*!************************************************************!*\
  !*** ./src/components/gameMenu/continueBtn/ContinueBtn.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContinueBtn: () => (/* binding */ ContinueBtn)
/* harmony export */ });
/* harmony import */ var _ContinueBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContinueBtn.styles.scss */ 522);

const continueBtnStyles = document.createElement('style');
continueBtnStyles.textContent = _ContinueBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
class ContinueBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
      <a href="nonogram" class="button" continue data-link>Continue game</a>
    `;
    shadowRoot.append(continueBtnStyles);
  }
}


/***/ }),

/***/ 734:
/*!********************************************************!*\
  !*** ./src/components/gameMenu/randomBtn/RandonBtn.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RandomBtn: () => (/* binding */ RandomBtn)
/* harmony export */ });
/* harmony import */ var _RandomBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RandomBtn.styles.scss */ 465);

const randomBtnStyles = document.createElement('style');
randomBtnStyles.textContent = _RandomBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
class RandomBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
      <a href="nonogram" class="button" random data-link>Random game</a>
    `;
    shadowRoot.append(randomBtnStyles);
  }
}


/***/ }),

/***/ 54:
/*!*****************************************************!*\
  !*** ./src/components/gameNonogram/GameNonogram.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameNonogram: () => (/* binding */ GameNonogram)
/* harmony export */ });
/* harmony import */ var _GameNonogram_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameNonogram.styles.scss */ 179);
/* harmony import */ var _gameField_GameField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameField/GameField */ 14);
/* harmony import */ var _restartBtn_RestartBtn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./restartBtn/RestartBtn */ 145);
/* harmony import */ var _solutionBtn_SolutionBtn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./solutionBtn/SolutionBtn */ 16);
/* harmony import */ var _saveBtn_SaveBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./saveBtn/SaveBtn */ 26);
/* harmony import */ var _gameTimer_GameTimer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gameTimer/GameTimer */ 554);
/* harmony import */ var _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/nonograms.json */ 697);
/* harmony import */ var _assets_sound_effects_win_game_mp3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../assets/sound-effects/win-game.mp3 */ 364);








customElements.define('game-field', _gameField_GameField__WEBPACK_IMPORTED_MODULE_1__.GameField);
customElements.define('restart-btn', _restartBtn_RestartBtn__WEBPACK_IMPORTED_MODULE_2__.RestartBtn);
customElements.define('solution-btn', _solutionBtn_SolutionBtn__WEBPACK_IMPORTED_MODULE_3__.SolutionBtn);
customElements.define('save-btn', _saveBtn_SaveBtn__WEBPACK_IMPORTED_MODULE_4__.SaveBtn);
customElements.define('game-timer', _gameTimer_GameTimer__WEBPACK_IMPORTED_MODULE_5__.GameTimer);
const nonogramStyles = document.createElement('style');
nonogramStyles.textContent = _GameNonogram_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
const template = document.createElement('template');
template.innerHTML = `
  <div class="nonogram__container">
    <div class="actions">
      <restart-btn></restart-btn>
      <save-btn></save-btn>
      <solution-btn></solution-btn>
      <game-timer id="game-timer" minutes="0" seconds="0"></game-timer>
      <a href="" data-link>Menu</a>
    </div>
    
    <div id="nonogram" class="nonogram">
      <div id="summary" class="summary">
      </div>
      <div class="top-pane"></div>
      <div class="left-pane"></div>
    </div>
  </div>
`;
class GameNonogram extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.append(template.content.cloneNode(true));
    shadowRoot.append(nonogramStyles);
    const level = this.getAttribute('level');
    const name = this.getAttribute('name');
    // const savedSolution = this.getAttribute('savedsolution');

    const timer = shadowRoot.querySelector('#game-timer');
    if (this.getAttribute('minutes') !== '0' || this.getAttribute('seconds') !== '0') {
      const savedMinutes = this.getAttribute('minutes');
      const savedSeconds = this.getAttribute('seconds');
      timer.setAttribute('minutes', savedMinutes);
      timer.setAttribute('seconds', savedSeconds);
      timer.startTime = Date.now() + (+savedMinutes * 60 + +savedSeconds) * 1000;
    }
    shadowRoot.getElementById('summary').innerHTML = `
      <p class="summary__level">${level}</p>
      <p class="summary__name"> ${name[0].toUpperCase() + name.slice(1)}</p>
    `;
    const nonogram = shadowRoot.querySelector('#nonogram');
    nonogram.insertAdjacentHTML('beforeend', `<game-field id="game-field" class="game-field" level="${level}"></game-field>`);
    const field = shadowRoot.querySelector('#game-field');
    const {
      matrix
    } = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_6__.find(item => item.name === name && item.level === level);
    const correctSolution = matrix.flat().join('').toString();

    // Draw matrix solution
    let str = '';
    matrix.forEach(el => {
      str += el.reduce((acc, curr) => {
        const square = curr ? '■' : '□';
        return acc + square;
      }, '');
      str += '\n';
    });
    console.log(str);
    const topPane = shadowRoot.querySelector('.top-pane');
    const leftPane = shadowRoot.querySelector('.left-pane');
    let maxLeftHints = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      const leftHint = document.createElement('div');
      leftHint.classList.add('left-pane__hint');
      const topHint = document.createElement('div');
      topHint.classList.add('top-pane__hint');
      let counterLeft = 0;
      let counterTop = 0;
      for (let j = 0; j < matrix.length; j += 1) {
        if (matrix[i][j]) {
          counterLeft += 1;
        }
        if (counterLeft && !matrix[i][j] || counterLeft && j === matrix.length - 1) {
          leftHint.insertAdjacentHTML('beforeend', `
							<div class="left-pane__number">${counterLeft}</div>
						`);
          counterLeft = 0;
        }
        if (matrix[j][i]) {
          counterTop += 1;
        }
        if (counterTop && !matrix[j][i] || counterTop && j === matrix.length - 1) {
          topHint.insertAdjacentHTML('beforeend', `
						<div class="top-pane__number">${counterTop}</div>
						`);
          counterTop = 0;
        }
      }
      leftPane.append(leftHint);
      topPane.append(topHint);
      if (leftHint.children.length > maxLeftHints) {
        maxLeftHints = leftHint.children.length;
      }
    }

    // Calculate cell size
    const nonogramWidth = nonogram.offsetWidth;
    let cellSize = nonogramWidth / (maxLeftHints + matrix.length);
    document.documentElement.style.setProperty('--cell-size', cellSize + 'px');
    shadowRoot.firstElementChild.addEventListener('fill', () => {
      if (correctSolution === field.currentSolution) {
        field.dispatchEvent(new CustomEvent('win'));
        timer.dispatchEvent(new CustomEvent('win'));
        const minutes = timer.getAttribute('minutes');
        let minutesStr = '';
        if (!+minutes) {
          minutesStr = '';
        } else if (+minutes > 1) {
          minutesStr += 'minutes ';
        } else {
          minutesStr += 'minute';
        }
        const seconds = timer.getAttribute('seconds');
        let secondsStr = !seconds || `${seconds} second`;
        secondsStr = +seconds > 1 ? secondsStr + 's' : secondsStr;
        new Audio(_assets_sound_effects_win_game_mp3__WEBPACK_IMPORTED_MODULE_7__).play();
        console.log(`Great! You have solved the nonogram ${name[0].toUpperCase() + name.slice(1)} in ${minutesStr}${secondsStr}!`);
      }
    });
    shadowRoot.firstElementChild.addEventListener('restart', () => {
      field.dispatchEvent(new CustomEvent('restart'));
      timer.restart();
    });
    shadowRoot.firstElementChild.addEventListener('solution', () => {
      timer.stop();
      field.dispatchEvent(new CustomEvent('solution', {
        detail: matrix.flat()
      }));
    });
    shadowRoot.firstElementChild.addEventListener('save-game', () => {
      const game = {
        level,
        name,
        currentSolution: field.currentSolution,
        time: {
          minutes: timer.minutes,
          seconds: timer.seconds
        }
      };
      localStorage.setItem('savedGame', JSON.stringify(game));
    });
    shadowRoot.firstElementChild.addEventListener('starttimer', () => {
      timer.launch();
    }, {
      once: true
    });
  }
}


/***/ }),

/***/ 14:
/*!************************************************************!*\
  !*** ./src/components/gameNonogram/gameField/GameField.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameField: () => (/* binding */ GameField)
/* harmony export */ });
/* harmony import */ var _GameField_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameField.styles.scss */ 121);
/* harmony import */ var _assets_sound_effects_fill_cell_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../assets/sound-effects/fill-cell.mp3 */ 992);
/* harmony import */ var _assets_sound_effects_clear_cell_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../assets/sound-effects/clear-cell.mp3 */ 210);
/* harmony import */ var _assets_sound_effects_cross_cell_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../assets/sound-effects/cross-cell.mp3 */ 313);




const fieldStyles = document.createElement('style');
fieldStyles.textContent = _GameField_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
class GameField extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.append(fieldStyles);
    this.level = this.getAttribute('level').split('x')[0];
    this.field = document.createElement('div');
    this.field.id = 'field';
    for (let i = 0; i < this.level; i += 1) {
      let row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < this.level; j += 1) {
        row.insertAdjacentHTML('beforeend', `<div class="cell"></div>`);
      }
      this.field.append(row);
    }
    shadowRoot.append(this.field);
    this.cells = this.field.querySelectorAll('.cell');
    this.currentSolution = new Array(this.cells.length).fill(0).join('');
    this.field.addEventListener('click', e => {
      if (this.clicksDisabled) {
        e.stopImmediatePropagation();
      }
    });
    this.field.addEventListener('contextmenu', e => {
      if (this.clicksDisabled) {
        e.stopImmediatePropagation();
      }
    });
    this.field.addEventListener('click', e => {
      e.target.classList.remove('crossed');
      e.target.classList.toggle('filled');
      if (e.target.classList.contains('filled')) {
        new Audio(_assets_sound_effects_fill_cell_mp3__WEBPACK_IMPORTED_MODULE_1__).play();
      } else {
        new Audio(_assets_sound_effects_clear_cell_mp3__WEBPACK_IMPORTED_MODULE_2__).play();
      }
      this.checkSolution();
    });
    this.field.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.target.classList.remove('filled');
      e.target.classList.toggle('crossed');
      if (e.target.classList.contains('crossed')) {
        new Audio(_assets_sound_effects_cross_cell_mp3__WEBPACK_IMPORTED_MODULE_3__).play();
      } else {
        new Audio(_assets_sound_effects_clear_cell_mp3__WEBPACK_IMPORTED_MODULE_2__).play();
      }
      this.checkSolution();
    });
    this.field.addEventListener('click', () => {
      this.field.dispatchEvent(new CustomEvent('starttimer', {
        bubbles: true,
        composed: true
      }));
    }, {
      once: true
    });
    this.field.addEventListener('contextmenu', () => {
      this.dispatchEvent(new CustomEvent('starttimer', {
        bubbles: true,
        composed: true
      }));
    }, {
      once: true
    });
    this.addEventListener('restart', () => {
      this.enableClicks();
      this.cells.forEach(cell => cell.classList.remove('filled', 'crossed'));
    });
    this.addEventListener('solution', e => {
      this.disableClicks();
      const solution = e.detail;
      this.cells.forEach((cell, i) => {
        if (solution[i]) {
          cell.classList.remove('crossed');
          cell.classList.add('filled');
        } else {
          cell.classList.remove('crossed');
          cell.classList.remove('filled');
        }
      });
    });
    this.addEventListener('win', () => {
      this.disableClicks();
      this.cells.forEach(cell => cell.classList.remove('crossed'));
    });
  }
  checkSolution() {
    this.currentSolution = [...this.cells].reduce((acc, curr) => {
      return curr.classList.contains('filled') ? acc + '1' : acc + '0';
    }, '');
    this.field.dispatchEvent(new CustomEvent('fill', {
      bubbles: true,
      composed: true
    }));
  }
  disableClicks() {
    this.clicksDisabled = true;
  }
  enableClicks() {
    this.clicksDisabled = false;
  }
}


/***/ }),

/***/ 554:
/*!************************************************************!*\
  !*** ./src/components/gameNonogram/gameTimer/GameTimer.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameTimer: () => (/* binding */ GameTimer)
/* harmony export */ });
/* harmony import */ var _GameTimer_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameTimer.styles.scss */ 795);

const timerStyles = document.createElement('style');
timerStyles.textContent = _GameTimer_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
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
    let minutes = this.getAttribute('minutes').length === 1 ? `0${this.getAttribute('minutes')}` : this.getAttribute('minutes');
    let seconds = this.getAttribute('seconds').length === 1 ? `0${this.getAttribute('seconds')}` : this.getAttribute('seconds');
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
  restart() {
    console.log('in restart');
    this.startTime = null;
    this.launch();
  }
  disconnectedCallback() {
    this.stop();
  }
}


/***/ }),

/***/ 145:
/*!**************************************************************!*\
  !*** ./src/components/gameNonogram/restartBtn/RestartBtn.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestartBtn: () => (/* binding */ RestartBtn)
/* harmony export */ });
/* harmony import */ var _RestartBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RestartBtn.styles.scss */ 441);

const restartBtnStyles = document.createElement('style');
restartBtnStyles.textContent = _RestartBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
class RestartBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
      <div class="button">Restart game</div>
    `;
    shadowRoot.append(restartBtnStyles);
    shadowRoot.firstElementChild.onclick = () => {
      this.dispatchEvent(new CustomEvent('restart', {
        bubbles: true,
        composed: true
      }));
    };
  }
}


/***/ }),

/***/ 26:
/*!********************************************************!*\
  !*** ./src/components/gameNonogram/saveBtn/SaveBtn.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SaveBtn: () => (/* binding */ SaveBtn)
/* harmony export */ });
/* harmony import */ var _SaveBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SaveBtn.styles.scss */ 645);

const saveBtnStyles = document.createElement('style');
saveBtnStyles.textContent = _SaveBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
class SaveBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
      <div class="button">Save game</div>
    `;
    shadowRoot.append(saveBtnStyles);
    shadowRoot.firstElementChild.addEventListener('click', e => {
      e.currentTarget.dispatchEvent(new CustomEvent('save-game', {
        bubbles: true,
        composed: true
      }));
    });
  }
}


/***/ }),

/***/ 16:
/*!****************************************************************!*\
  !*** ./src/components/gameNonogram/solutionBtn/SolutionBtn.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SolutionBtn: () => (/* binding */ SolutionBtn)
/* harmony export */ });
/* harmony import */ var _SolutionBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SolutionBtn.styles.scss */ 132);

const solutionBtnStyles = document.createElement('style');
solutionBtnStyles.textContent = _SolutionBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
class SolutionBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
      <div class="button">Solution</div>
    `;
    shadowRoot.append(solutionBtnStyles);
    shadowRoot.firstElementChild.onclick = e => {
      e.currentTarget.dispatchEvent(new CustomEvent('solution', {
        bubbles: true,
        composed: true
      }));
    };
  }
}


/***/ }),

/***/ 757:
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 443:
/*!**********************************************************!*\
  !*** ./src/components/gameHeader/GameHeader.styles.scss ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}*{box-sizing:border-box}html{scroll-behavior:smooth}body{background-color:#fbf3f2;user-select:none}body.scroll-disabled{height:100%;overflow:hidden}.wrapper{max-width:1440px;padding:0 40px;margin:0 auto}@media(max-width: 576px){.wrapper{padding:0 4.21052%}}.section{margin-bottom:100px}img{max-width:100%}.transparent{opacity:0}:host{display:block}:host{margin-bottom:20px;display:flex;background:#1c768f}:host *{color:#fbf3f2}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 133:
/*!******************************************************!*\
  !*** ./src/components/gameMenu/GameMenu.styles.scss ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `.actions{display:flex;gap:20px}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 522:
/*!*********************************************************************!*\
  !*** ./src/components/gameMenu/continueBtn/ContinueBtn.styles.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button{background-color:#fa1c66}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 465:
/*!*****************************************************************!*\
  !*** ./src/components/gameMenu/randomBtn/RandomBtn.styles.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 179:
/*!**************************************************************!*\
  !*** ./src/components/gameNonogram/GameNonogram.styles.scss ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}p{margin:0}a{display:block;background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}ul{margin:0;padding:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{display:block;border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button{outline:none;border:none}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:root{--cell-size: auto}:host *{box-sizing:border-box}.actions{margin-bottom:20px;width:100%;display:flex;justify-content:space-between;align-items:center}.nonogram{width:45%;display:grid;grid-template-columns:auto,1fr 1fr;grid-template-areas:"a b b" "c d d" "c d d"}.nonogram__container{width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}@media(max-width: 1200px){.nonogram{width:55%}}@media(orientation: portrait){.nonogram{width:100%}}@media(max-width: 768px){.nonogram{font-size:min(var(--cell-size)*.8,2rem)}}.summary{padding:10px;grid-area:a;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.top-pane{grid-area:b;width:fit-content;display:flex;border-top:1px #000 solid;border-right:1px #000 solid;border-left:1px #000 solid}.top-pane__hint{width:var(--cell-size);display:flex;flex-direction:column;justify-content:flex-end;border-top:1px #000 solid;border-right:1px #000 solid;border-left:1px #000 solid}.top-pane__hint:nth-child(5n):not(:last-child){border-right:2px #000 solid}.top-pane__number{height:var(--cell-size);display:flex;justify-content:center;align-items:center}.left-pane{width:100%;grid-area:c;border-top:1px #000 solid;border-bottom:1px #000 solid;border-left:1px #000 solid}.left-pane__hint{height:var(--cell-size);display:flex;justify-content:flex-end;border-top:1px #000 solid;border-bottom:1px #000 solid;border-left:1px #000 solid}.left-pane__hint:nth-child(5n):not(:last-child){border-bottom:2px #000 solid}.left-pane__number{width:var(--cell-size);display:flex;justify-content:center;align-items:center}game-field{grid-area:d}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 121:
/*!*********************************************************************!*\
  !*** ./src/components/gameNonogram/gameField/GameField.styles.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}p{margin:0}a{display:block;background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}ul{margin:0;padding:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{display:block;border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button{outline:none;border:none}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:host{width:fit-content;display:flex;flex-direction:column;border:1px #000 solid}:host *{box-sizing:border-box}.row{display:flex;height:var(--cell-size)}.row:nth-child(5n):not(:last-child){border-bottom:2px #000 solid}.cell{width:var(--cell-size);height:var(--cell-size);border:1px #000 solid;transition:.2s}.cell:nth-child(5n):not(:last-child){border-right:2px #000 solid}.cell.filled{background-color:#000}.cell.crossed{position:relative}.cell.crossed::before{content:"";position:absolute;top:50%;left:50%;width:calc(var(--cell-size)*.9);height:3px;background-color:#000;transform:translate(-50%, -50%) rotate(45deg)}.cell.crossed::after{content:"";position:absolute;top:50%;left:50%;width:calc(var(--cell-size)*.9);height:3px;background-color:#000;transform:translate(-50%, -50%) rotate(-45deg)}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 795:
/*!*********************************************************************!*\
  !*** ./src/components/gameNonogram/gameTimer/GameTimer.styles.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = ``;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 441:
/*!***********************************************************************!*\
  !*** ./src/components/gameNonogram/restartBtn/RestartBtn.styles.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 645:
/*!*****************************************************************!*\
  !*** ./src/components/gameNonogram/saveBtn/SaveBtn.styles.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button{background-color:#621cfa}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 132:
/*!*************************************************************************!*\
  !*** ./src/components/gameNonogram/solutionBtn/SolutionBtn.styles.scss ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button{background-color:#fa1c66}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 210:
/*!*************************************************!*\
  !*** ./src/assets/sound-effects/clear-cell.mp3 ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/90decdb4f0208331e71c.mp3";

/***/ }),

/***/ 313:
/*!*************************************************!*\
  !*** ./src/assets/sound-effects/cross-cell.mp3 ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/d76c4424bb702bebc665.mp3";

/***/ }),

/***/ 992:
/*!************************************************!*\
  !*** ./src/assets/sound-effects/fill-cell.mp3 ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/8736c97cd70ea664b930.mp3";

/***/ }),

/***/ 364:
/*!***********************************************!*\
  !*** ./src/assets/sound-effects/win-game.mp3 ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/fd2c2fea27379cbc44da.mp3";

/***/ }),

/***/ 697:
/*!**************************************!*\
  !*** ./src/resources/nonograms.json ***!
  \**************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"level":"5x5","name":"android","matrix":[[0,1,1,1,0],[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1]],"picture":"./"},{"level":"5x5","name":"flower","matrix":[[0,1,1,1,0],[1,0,1,0,1],[1,1,0,1,1],[1,0,1,0,1],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"rune","matrix":[[0,1,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,0,0]],"picture":"./"},{"level":"5x5","name":"smile","matrix":[[1,1,0,1,1],[1,1,0,1,1],[0,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"tower","matrix":[[1,0,1,0,1],[1,1,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"airplane","matrix":[[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,0,1,0,0],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"car","matrix":[[0,0,0,0,0],[0,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,0,1,0]],"picture":"./"},{"level":"5x5","name":"dog","matrix":[[0,0,0,1,0],[1,0,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,0,1,0]],"picture":"./"},{"level":"10x10","name":"mouse","matrix":[[0,0,1,1,0,0,0,1,1,0],[0,1,0,0,1,0,1,0,0,1],[0,1,0,1,1,1,1,1,0,1],[0,0,1,1,0,1,0,1,1,0],[0,0,0,1,1,1,1,1,0,0],[0,0,1,1,1,0,1,1,1,0],[1,0,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0]],"picture":"./"},{"level":"10x10","name":"alarm","matrix":[[0,1,1,0,0,0,0,1,1,0],[1,1,0,1,1,1,1,0,1,1],[1,0,1,1,1,0,1,1,0,1],[0,1,1,1,1,0,1,1,1,0],[0,1,1,1,1,0,1,1,0,0],[0,1,1,1,0,1,1,1,1,0],[0,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,0,0,1,1,0,0]],"picture":"./"},{"level":"10x10","name":"cup of coffee","matrix":[[0,0,1,0,1,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,0,0],[0,1,1,0,1,1,1,1,1,1],[0,1,1,0,1,1,1,1,0,1],[0,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,0,0],[1,0,1,1,1,1,1,0,0,1],[0,1,1,1,1,1,1,1,1,0]],"picture":"./"},{"level":"10x10","name":"leaf","matrix":[[0,0,0,0,1,1,1,1,1,1],[0,0,0,1,0,1,0,1,0,1],[0,0,1,1,0,1,0,1,1,0],[0,1,0,1,0,1,1,0,1,0],[0,1,0,1,0,1,1,1,1,0],[0,1,0,1,1,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,0,0,0,0,1,0,0],[0,1,0,1,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0]],"picture":"./"},{"level":"10x10","name":"TV","matrix":[[0,0,1,0,0,0,0,1,0,0],[0,0,0,1,0,0,1,0,0,0],[1,1,1,1,1,1,1,1,1,1],[1,0,1,1,0,0,0,0,1,1],[1,1,1,0,0,0,0,0,0,1],[1,0,1,0,0,0,0,0,0,1],[1,1,1,0,0,0,0,0,0,1],[1,1,1,1,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,0,0,0,0,0,0,1,0]],"picture":"./"},{"level":"10x10","name":"tree","matrix":[[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,0,1,1,1,0],[1,1,1,1,1,0,1,1,1,1],[1,1,0,1,1,1,0,0,1,1],[1,1,1,0,1,1,1,1,1,0],[0,1,1,1,1,1,0,0,0,0],[0,0,0,0,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,1,0,0,1,1,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"level":"10x10","name":"question","matrix":[[0,0,1,1,1,1,1,1,0,0],[0,1,1,0,0,0,0,1,1,0],[0,1,1,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,1,1,0],[0,0,0,0,0,0,1,1,1,0],[0,0,0,0,1,1,1,1,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0]],"picture":"./"},{"level":"10x10","name":"hot air balloon","matrix":[[1,1,1,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,1,0,1],[1,1,0,0,0,0,0,1,0,1],[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,0,1,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"level":"15x15","name":"deer","matrix":[[1,1,0,1,1,0,0,0,0,0,0,1,1,0,1],[1,1,0,1,1,0,1,0,0,1,0,1,1,0,1],[0,1,1,1,1,0,1,0,0,1,0,1,1,0,1],[0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],[0,0,0,0,1,1,0,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],[0,0,0,0,0,1,0,1,0,1,1,1,1,1,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1],[0,1,0,1,1,1,0,0,0,0,1,1,1,1,1],[0,1,1,1,1,1,0,0,0,0,1,1,1,1,1],[0,0,1,1,1,0,0,0,0,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1]],"picture":"./"}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ 757);
/* harmony import */ var _components_app_router_AppRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/app-router/AppRouter */ 359);
/* harmony import */ var _components_gameHeader_GameHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/gameHeader/GameHeader */ 625);



customElements.define('game-header', _components_gameHeader_GameHeader__WEBPACK_IMPORTED_MODULE_2__.GameHeader);
document.body.insertAdjacentHTML('afterbegin', `
		<game-header></game-header>
		<main id="main" class="main wrapper">
		</main>
	`);
const router = new _components_app_router_AppRouter__WEBPACK_IMPORTED_MODULE_1__.AppRouter(document.getElementById('main'));
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    const deepestEl = e.composedPath()[0];
    if (deepestEl.matches('[data-link]')) {
      e.preventDefault();
      router.changeHash(deepestEl.getAttribute('href'));
      let params = [];
      if (deepestEl.getAttribute('href') === 'nonogram') {
        if (deepestEl.getAttribute('game-name')) {
          params.push(deepestEl.getAttribute('game-name'));
        }
        if (deepestEl.getAttribute('level')) {
          params.push(deepestEl.getAttribute('level'));
        }
      }
      if (deepestEl.matches('[random]')) {
        params.push('random');
      }
      if (deepestEl.matches('[continue]')) {
        params.push('continue');
      }
      router.showRoute(params);
    }
  });
  window.onpopstate = () => {
    router.showRoute();
  };
  router.showRoute();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJNEcsU0FBUyxDQUFDRSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMxSyxNQUFNLENBQUMySyxJQUFJLENBQUMsUUFBUSxDQUFDO01BQ3ZCO01BRUEsSUFBSUgsU0FBUyxDQUFDRSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDbkMxSyxNQUFNLENBQUMySyxJQUFJLENBQUMsVUFBVSxDQUFDO01BQ3pCO01BRUFKLE1BQU0sQ0FBQ3hLLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDO0lBQzFCO0VBQ0YsQ0FBQyxDQUFDO0VBRUZILE1BQU0sQ0FBQytLLFVBQVUsR0FBRyxNQUFNO0lBQ3hCTCxNQUFNLENBQUN4SyxTQUFTLENBQUMsQ0FBQztFQUNwQixDQUFDO0VBRUR3SyxNQUFNLENBQUN4SyxTQUFTLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2FwcC1yb3V0ZXIvQXBwUm91dGVyLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVIZWFkZXIvR2FtZUhlYWRlci5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9HYW1lTWVudS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9jb250aW51ZUJ0bi9Db250aW51ZUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9yYW5kb21CdG4vUmFuZG9uQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9HYW1lTm9ub2dyYW0uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL2dhbWVGaWVsZC9HYW1lRmllbGQuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL2dhbWVUaW1lci9HYW1lVGltZXIuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3Jlc3RhcnRCdG4vUmVzdGFydEJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vc2F2ZUJ0bi9TYXZlQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zb2x1dGlvbkJ0bi9Tb2x1dGlvbkJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL21haW4uc2Nzcz9mYzc3Iiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvYWJzdHJhY3QvX3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvbGF5b3V0L19iYXNpYy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvYWJzdHJhY3QvX21peGlucy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVIZWFkZXIvR2FtZUhlYWRlci5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9HYW1lTWVudS5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2NvbXBvbmVudHMvX2J1dHRvbi5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L2NvbnRpbnVlQnRuL0NvbnRpbnVlQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvYmFzZS9fbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbS5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZUZpZWxkL0dhbWVGaWVsZC5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vc2F2ZUJ0bi9TYXZlQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zb2x1dGlvbkJ0bi9Tb2x1dGlvbkJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lTWVudSB9IGZyb20gJy4uL2dhbWVNZW51L0dhbWVNZW51JztcbmltcG9ydCB7IEdhbWVOb25vZ3JhbSB9IGZyb20gJy4uL2dhbWVOb25vZ3JhbS9HYW1lTm9ub2dyYW0nO1xuaW1wb3J0IG5vbm9ncmFtcyBmcm9tICcuLi8uLi9yZXNvdXJjZXMvbm9ub2dyYW1zLmpzb24nO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtbWVudScsIEdhbWVNZW51KTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS1ub25vZ3JhbScsIEdhbWVOb25vZ3JhbSk7XG5cbmNsYXNzIEFwcFJvdXRlciB7XG4gIGNvbnN0cnVjdG9yKGFwcCkge1xuICAgIHRoaXMuYXBwID0gYXBwO1xuXG4gICAgdGhpcy5yb3V0ZXMgPSBbXG4gICAgICB7XG4gICAgICAgIGhhc2g6ICcnLFxuICAgICAgICB2aWV3OiAoKSA9PiAnPGdhbWUtbWVudT48L2dhbWUtbWVudT4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaGFzaDogJ25vbm9ncmFtJyxcbiAgICAgICAgdmlldzogKG5hbWUsIGxldmVsLCBzYXZlZFNvbHV0aW9uLCBtaW51dGVzLCBzZWNvbmRzKSA9PiB7XG4gICAgICAgICAgbGV0IHJlc29sdmVkTmFtZTtcbiAgICAgICAgICBsZXQgcmVzb2x2ZWRMZXZlbDtcblxuICAgICAgICAgIGlmIChuYW1lICYmIGxldmVsKSB7XG4gICAgICAgICAgICByZXNvbHZlZE5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgcmVzb2x2ZWRMZXZlbCA9IGxldmVsO1xuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZS1uYW1lJywgbmFtZSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZS1sZXZlbCcsIGxldmVsKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUtbmFtZScpICYmXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1sZXZlbCcpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXNvbHZlZE5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1uYW1lJyk7XG4gICAgICAgICAgICByZXNvbHZlZExldmVsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUtbGV2ZWwnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZWROYW1lID0gbm9ub2dyYW1zWzBdLm5hbWU7XG4gICAgICAgICAgICByZXNvbHZlZExldmVsID0gbm9ub2dyYW1zWzBdLmxldmVsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8Z2FtZS1ub25vZ3JhbSBuYW1lPVwiJHtyZXNvbHZlZE5hbWV9XCIgbGV2ZWw9XCIke3Jlc29sdmVkTGV2ZWx9XCIgIHNhdmVkc29sdXRpb249XCIke3NhdmVkU29sdXRpb24gfHwgJyd9XCIgbWludXRlcz1cIiR7bWludXRlcyB8fCAnMCd9XCIgc2Vjb25kcz1cIiR7c2Vjb25kcyB8fCAnMCd9XCI+XG4gICAgICAgICAgICA8L2dhbWUtbm9ub2dyYW0+XG4gICAgICAgICAgYDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXTtcbiAgfVxuXG4gIGNoYW5nZUhhc2godXJsKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB1cmw7XG4gIH1cblxuICBzaG93Um91dGUocGFyYW1zID0gW10pIHtcbiAgICBjb25zdCBuZXdQYXJhbXMgPSBbLi4ucGFyYW1zXTtcblxuICAgIGlmIChwYXJhbXNbMF0gPT09ICdyYW5kb20nKSB7XG4gICAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBub25vZ3JhbXMubGVuZ3RoKTtcbiAgICAgIGNvbnN0IHJhbmRvbU5vbm9ncmFtID0gbm9ub2dyYW1zW3JhbmRvbU51bV07XG5cbiAgICAgIG5ld1BhcmFtc1swXSA9IHJhbmRvbU5vbm9ncmFtLm5hbWU7XG4gICAgICBuZXdQYXJhbXNbMV0gPSByYW5kb21Ob25vZ3JhbS5sZXZlbDtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zWzBdID09PSAnY29udGludWUnKSB7XG4gICAgICBjb25zdCBzYXZlZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkR2FtZScpKTtcblxuICAgICAgY29uc29sZS5sb2coc2F2ZWQpO1xuXG4gICAgICBuZXdQYXJhbXNbMF0gPSBzYXZlZC5uYW1lO1xuICAgICAgbmV3UGFyYW1zWzFdID0gc2F2ZWQubGV2ZWw7XG4gICAgICBuZXdQYXJhbXNbMl0gPSBzYXZlZC5jdXJyZW50U29sdXRpb247XG4gICAgICBuZXdQYXJhbXNbM10gPSBzYXZlZC50aW1lLm1pbnV0ZXM7XG4gICAgICBuZXdQYXJhbXNbNF0gPSBzYXZlZC50aW1lLnNlY29uZHM7XG4gICAgfVxuXG4gICAgbGV0IG1hdGNoID0gdGhpcy5yb3V0ZXMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLmhhc2ggPT09IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpXG4gICAgKTtcblxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIG1hdGNoID0gdGhpcy5yb3V0ZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5oYXNoID09PSAnJyk7XG4gICAgfVxuXG4gICAgdGhpcy5hcHAuaW5uZXJIVE1MID0gbWF0Y2gudmlldyguLi5uZXdQYXJhbXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEFwcFJvdXRlciB9O1xuIiwiaW1wb3J0IGhlYWRlclN0eWxlc1N0ciBmcm9tICcuL0dhbWVIZWFkZXIuc3R5bGVzLnNjc3MnO1xuXG5jb25zdCBoZWFkZXJTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuaGVhZGVyU3R5bGVzLnRleHRDb250ZW50ID0gaGVhZGVyU3R5bGVzU3RyO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgPHA+Tm9ub2dyYW1zPC9wPlxuICA8L2Rpdj4gIFxuXG5gO1xuY2xhc3MgR2FtZUhlYWRlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGhlYWRlclN0eWxlcyk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVIZWFkZXIgfTtcbiIsImltcG9ydCBtZW51U3R5bGVTdHIgZnJvbSAnLi9HYW1lTWVudS5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgbm9ub2dyYW1zIGZyb20gJy4uLy4uL3Jlc291cmNlcy9ub25vZ3JhbXMuanNvbic7XG5pbXBvcnQgeyBSYW5kb21CdG4gfSBmcm9tICcuL3JhbmRvbUJ0bi9SYW5kb25CdG4nO1xuaW1wb3J0IHsgQ29udGludWVCdG4gfSBmcm9tICcuL2NvbnRpbnVlQnRuL0NvbnRpbnVlQnRuJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyYW5kb20tYnRuJywgUmFuZG9tQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29udGludWUtYnRuJywgQ29udGludWVCdG4pO1xuXG5jb25zdCBtZW51U3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbm1lbnVTdHlsZXMudGV4dENvbnRlbnQgPSBtZW51U3R5bGVTdHI7XG5cbmNvbnN0IGxldmVscyA9IFsuLi5uZXcgU2V0KG5vbm9ncmFtcy5tYXAoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwpKV07XG5cbmNvbnN0IGxldmVsc0hUTUwgPSBsZXZlbHNcbiAgLm1hcCgobGV2ZWwpID0+IHtcbiAgICBjb25zdCBnYW1lTmFtZXMgPSBub25vZ3JhbXNcbiAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09IGxldmVsKVxuICAgICAgLm1hcChcbiAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgYDxhIGhyZWY9XCJub25vZ3JhbVwiIGNsYXNzPVwibWVudV9faXRlbVwiIGxldmVsPVwiJHtsZXZlbH1cIiBnYW1lLW5hbWU9XCIke2l0ZW0ubmFtZX1cIiBkYXRhLWxpbms+JHtpdGVtLm5hbWV9PC9hPlxcbmBcbiAgICAgIClcbiAgICAgIC5qb2luKCdcXG4nKTtcblxuICAgIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cImxldmVsXCI+XG4gICAgICA8aDMgY2xhc3M9XCJsZXZlbF9fdGl0bGVcIj4ke2xldmVsfTwvaDM+XG4gICAgICA8ZGl2IGNsYXNzPVwibGV2ZWxfX2dhbWVzXCI+XG4gICAgICAgICR7Z2FtZU5hbWVzfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG4gIH0pXG4gIC5qb2luKCdcXG4nKTtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cmFuZG9tLWJ0bj48L3JhbmRvbS1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Y29udGludWUtYnRuPjwvY29udGludWUtYnRuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICR7bGV2ZWxzSFRNTH1gO1xuXG5jbGFzcyBHYW1lTWVudSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICBzaGFkb3dSb290LmFwcGVuZChtZW51U3R5bGVzKTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lTWVudSB9O1xuIiwiaW1wb3J0IGNvbnRpbnVlQnRuU3R5bGVzU3RyIGZyb20gJy4vQ29udGludWVCdG4uc3R5bGVzLnNjc3MnO1xuXG5jb25zdCBjb250aW51ZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5jb250aW51ZUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IGNvbnRpbnVlQnRuU3R5bGVzU3RyO1xuXG5jbGFzcyBDb250aW51ZUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGEgaHJlZj1cIm5vbm9ncmFtXCIgY2xhc3M9XCJidXR0b25cIiBjb250aW51ZSBkYXRhLWxpbms+Q29udGludWUgZ2FtZTwvYT5cbiAgICBgO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGNvbnRpbnVlQnRuU3R5bGVzKTtcbiAgfVxufVxuXG5leHBvcnQgeyBDb250aW51ZUJ0biB9O1xuIiwiaW1wb3J0IHJhbmRvbUJ0blN0eWxlc1N0ciBmcm9tICcuL1JhbmRvbUJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHJhbmRvbUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5yYW5kb21CdG5TdHlsZXMudGV4dENvbnRlbnQgPSByYW5kb21CdG5TdHlsZXNTdHI7XG5cbmNsYXNzIFJhbmRvbUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGEgaHJlZj1cIm5vbm9ncmFtXCIgY2xhc3M9XCJidXR0b25cIiByYW5kb20gZGF0YS1saW5rPlJhbmRvbSBnYW1lPC9hPlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQocmFuZG9tQnRuU3R5bGVzKTtcbiAgfVxufVxuXG5leHBvcnQgeyBSYW5kb21CdG4gfTtcbiIsImltcG9ydCBub25vZ3JhbVN0eWxlc1N0ciBmcm9tICcuL0dhbWVOb25vZ3JhbS5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgeyBHYW1lRmllbGQgfSBmcm9tICcuL2dhbWVGaWVsZC9HYW1lRmllbGQnO1xuaW1wb3J0IHsgUmVzdGFydEJ0biB9IGZyb20gJy4vcmVzdGFydEJ0bi9SZXN0YXJ0QnRuJztcbmltcG9ydCB7IFNvbHV0aW9uQnRuIH0gZnJvbSAnLi9zb2x1dGlvbkJ0bi9Tb2x1dGlvbkJ0bic7XG5pbXBvcnQgeyBTYXZlQnRuIH0gZnJvbSAnLi9zYXZlQnRuL1NhdmVCdG4nO1xuaW1wb3J0IHsgR2FtZVRpbWVyIH0gZnJvbSAnLi9nYW1lVGltZXIvR2FtZVRpbWVyJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcbmltcG9ydCB3aW5Tb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy93aW4tZ2FtZS5tcDMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtZmllbGQnLCBHYW1lRmllbGQpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyZXN0YXJ0LWJ0bicsIFJlc3RhcnRCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdzb2x1dGlvbi1idG4nLCBTb2x1dGlvbkJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NhdmUtYnRuJywgU2F2ZUJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtdGltZXInLCBHYW1lVGltZXIpO1xuXG5jb25zdCBub25vZ3JhbVN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5ub25vZ3JhbVN0eWxlcy50ZXh0Q29udGVudCA9IG5vbm9ncmFtU3R5bGVzU3RyO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxkaXYgY2xhc3M9XCJub25vZ3JhbV9fY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgIDxyZXN0YXJ0LWJ0bj48L3Jlc3RhcnQtYnRuPlxuICAgICAgPHNhdmUtYnRuPjwvc2F2ZS1idG4+XG4gICAgICA8c29sdXRpb24tYnRuPjwvc29sdXRpb24tYnRuPlxuICAgICAgPGdhbWUtdGltZXIgaWQ9XCJnYW1lLXRpbWVyXCIgbWludXRlcz1cIjBcIiBzZWNvbmRzPVwiMFwiPjwvZ2FtZS10aW1lcj5cbiAgICAgIDxhIGhyZWY9XCJcIiBkYXRhLWxpbms+TWVudTwvYT5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGlkPVwibm9ub2dyYW1cIiBjbGFzcz1cIm5vbm9ncmFtXCI+XG4gICAgICA8ZGl2IGlkPVwic3VtbWFyeVwiIGNsYXNzPVwic3VtbWFyeVwiPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidG9wLXBhbmVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LXBhbmVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuXG5jbGFzcyBHYW1lTm9ub2dyYW0gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQobm9ub2dyYW1TdHlsZXMpO1xuXG4gICAgY29uc3QgbGV2ZWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKTtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICAvLyBjb25zdCBzYXZlZFNvbHV0aW9uID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NhdmVkc29sdXRpb24nKTtcblxuICAgIGNvbnN0IHRpbWVyID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS10aW1lcicpO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKSAhPT0gJzAnIHx8XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpICE9PSAnMCdcbiAgICApIHtcbiAgICAgIGNvbnN0IHNhdmVkTWludXRlcyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdtaW51dGVzJyk7XG4gICAgICBjb25zdCBzYXZlZFNlY29uZHMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpO1xuXG4gICAgICB0aW1lci5zZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnLCBzYXZlZE1pbnV0ZXMpO1xuICAgICAgdGltZXIuc2V0QXR0cmlidXRlKCdzZWNvbmRzJywgc2F2ZWRTZWNvbmRzKTtcblxuICAgICAgdGltZXIuc3RhcnRUaW1lID1cbiAgICAgICAgRGF0ZS5ub3coKSArICgrc2F2ZWRNaW51dGVzICogNjAgKyArc2F2ZWRTZWNvbmRzKSAqIDEwMDA7XG4gICAgfVxuXG4gICAgc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnc3VtbWFyeScpLmlubmVySFRNTCA9IGBcbiAgICAgIDxwIGNsYXNzPVwic3VtbWFyeV9fbGV2ZWxcIj4ke2xldmVsfTwvcD5cbiAgICAgIDxwIGNsYXNzPVwic3VtbWFyeV9fbmFtZVwiPiAke25hbWVbMF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSl9PC9wPlxuICAgIGA7XG5cbiAgICBjb25zdCBub25vZ3JhbSA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI25vbm9ncmFtJyk7XG4gICAgbm9ub2dyYW0uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICBgPGdhbWUtZmllbGQgaWQ9XCJnYW1lLWZpZWxkXCIgY2xhc3M9XCJnYW1lLWZpZWxkXCIgbGV2ZWw9XCIke2xldmVsfVwiPjwvZ2FtZS1maWVsZD5gXG4gICAgKTtcbiAgICBjb25zdCBmaWVsZCA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI2dhbWUtZmllbGQnKTtcblxuICAgIGNvbnN0IHsgbWF0cml4IH0gPSBub25vZ3JhbXMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IG5hbWUgJiYgaXRlbS5sZXZlbCA9PT0gbGV2ZWxcbiAgICApO1xuXG4gICAgY29uc3QgY29ycmVjdFNvbHV0aW9uID0gbWF0cml4LmZsYXQoKS5qb2luKCcnKS50b1N0cmluZygpO1xuXG4gICAgLy8gRHJhdyBtYXRyaXggc29sdXRpb25cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgbWF0cml4LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBzdHIgKz0gZWwucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gY3VyciA/ICfilqAnIDogJ+KWoSc7XG4gICAgICAgIHJldHVybiBhY2MgKyBzcXVhcmU7XG4gICAgICB9LCAnJyk7XG4gICAgICBzdHIgKz0gJ1xcbic7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coc3RyKTtcblxuICAgIGNvbnN0IHRvcFBhbmUgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy50b3AtcGFuZScpO1xuICAgIGNvbnN0IGxlZnRQYW5lID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubGVmdC1wYW5lJyk7XG4gICAgbGV0IG1heExlZnRIaW50cyA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbGVmdEhpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGxlZnRIaW50LmNsYXNzTGlzdC5hZGQoJ2xlZnQtcGFuZV9faGludCcpO1xuXG4gICAgICBjb25zdCB0b3BIaW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b3BIaW50LmNsYXNzTGlzdC5hZGQoJ3RvcC1wYW5lX19oaW50Jyk7XG5cbiAgICAgIGxldCBjb3VudGVyTGVmdCA9IDA7XG4gICAgICBsZXQgY291bnRlclRvcCA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4Lmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChtYXRyaXhbaV1bal0pIHtcbiAgICAgICAgICBjb3VudGVyTGVmdCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChjb3VudGVyTGVmdCAmJiAhbWF0cml4W2ldW2pdKSB8fFxuICAgICAgICAgIChjb3VudGVyTGVmdCAmJiBqID09PSBtYXRyaXgubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGVmdEhpbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAgICAgICBgXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsZWZ0LXBhbmVfX251bWJlclwiPiR7Y291bnRlckxlZnR9PC9kaXY+XG5cdFx0XHRcdFx0XHRgXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvdW50ZXJMZWZ0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRyaXhbal1baV0pIHtcbiAgICAgICAgICBjb3VudGVyVG9wICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgKGNvdW50ZXJUb3AgJiYgIW1hdHJpeFtqXVtpXSkgfHxcbiAgICAgICAgICAoY291bnRlclRvcCAmJiBqID09PSBtYXRyaXgubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdG9wSGludC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgICAgIGBcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ0b3AtcGFuZV9fbnVtYmVyXCI+JHtjb3VudGVyVG9wfTwvZGl2PlxuXHRcdFx0XHRcdFx0YFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb3VudGVyVG9wID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZWZ0UGFuZS5hcHBlbmQobGVmdEhpbnQpO1xuICAgICAgdG9wUGFuZS5hcHBlbmQodG9wSGludCk7XG5cbiAgICAgIGlmIChsZWZ0SGludC5jaGlsZHJlbi5sZW5ndGggPiBtYXhMZWZ0SGludHMpIHtcbiAgICAgICAgbWF4TGVmdEhpbnRzID0gbGVmdEhpbnQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSBjZWxsIHNpemVcbiAgICBjb25zdCBub25vZ3JhbVdpZHRoID0gbm9ub2dyYW0ub2Zmc2V0V2lkdGg7XG5cbiAgICBsZXQgY2VsbFNpemUgPSBub25vZ3JhbVdpZHRoIC8gKG1heExlZnRIaW50cyArIG1hdHJpeC5sZW5ndGgpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jZWxsLXNpemUnLCBjZWxsU2l6ZSArICdweCcpO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdmaWxsJywgKCkgPT4ge1xuICAgICAgaWYgKGNvcnJlY3RTb2x1dGlvbiA9PT0gZmllbGQuY3VycmVudFNvbHV0aW9uKSB7XG4gICAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd3aW4nKSk7XG4gICAgICAgIHRpbWVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd3aW4nKSk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSB0aW1lci5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKTtcblxuICAgICAgICBsZXQgbWludXRlc1N0ciA9ICcnO1xuICAgICAgICBpZiAoISttaW51dGVzKSB7XG4gICAgICAgICAgbWludXRlc1N0ciA9ICcnO1xuICAgICAgICB9IGVsc2UgaWYgKCttaW51dGVzID4gMSkge1xuICAgICAgICAgIG1pbnV0ZXNTdHIgKz0gJ21pbnV0ZXMgJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtaW51dGVzU3RyICs9ICdtaW51dGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVyLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpO1xuICAgICAgICBsZXQgc2Vjb25kc1N0ciA9ICFzZWNvbmRzIHx8IGAke3NlY29uZHN9IHNlY29uZGA7XG4gICAgICAgIHNlY29uZHNTdHIgPSArc2Vjb25kcyA+IDEgPyBzZWNvbmRzU3RyICsgJ3MnIDogc2Vjb25kc1N0cjtcblxuICAgICAgICBuZXcgQXVkaW8od2luU291bmRGaWxlKS5wbGF5KCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYEdyZWF0ISBZb3UgaGF2ZSBzb2x2ZWQgdGhlIG5vbm9ncmFtICR7bmFtZVswXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKX0gaW4gJHttaW51dGVzU3RyfSR7c2Vjb25kc1N0cn0hYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdyZXN0YXJ0JywgKCkgPT4ge1xuICAgICAgZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3Jlc3RhcnQnKSk7XG4gICAgICB0aW1lci5yZXN0YXJ0KCk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NvbHV0aW9uJywgKCkgPT4ge1xuICAgICAgdGltZXIuc3RvcCgpO1xuXG4gICAgICBmaWVsZC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NvbHV0aW9uJywge1xuICAgICAgICAgIGRldGFpbDogbWF0cml4LmZsYXQoKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NhdmUtZ2FtZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGdhbWUgPSB7XG4gICAgICAgIGxldmVsLFxuICAgICAgICBuYW1lLFxuICAgICAgICBjdXJyZW50U29sdXRpb246IGZpZWxkLmN1cnJlbnRTb2x1dGlvbixcbiAgICAgICAgdGltZToge1xuICAgICAgICAgIG1pbnV0ZXM6IHRpbWVyLm1pbnV0ZXMsXG4gICAgICAgICAgc2Vjb25kczogdGltZXIuc2Vjb25kcyxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzYXZlZEdhbWUnLCBKU09OLnN0cmluZ2lmeShnYW1lKSk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnc3RhcnR0aW1lcicsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRpbWVyLmxhdW5jaCgpO1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb25jZTogdHJ1ZSxcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVOb25vZ3JhbSB9O1xuIiwiaW1wb3J0IGZpZWxkU3R5bGVzU3RyIGZyb20gJy4vR2FtZUZpZWxkLnN0eWxlcy5zY3NzJztcbmltcG9ydCBmaWxsU291bmRGaWxlIGZyb20gJy4vLi4vLi4vLi4vYXNzZXRzL3NvdW5kLWVmZmVjdHMvZmlsbC1jZWxsLm1wMyc7XG5pbXBvcnQgY2xlYXJTb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy9jbGVhci1jZWxsLm1wMyc7XG5pbXBvcnQgY3Jvc3NTb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy9jcm9zcy1jZWxsLm1wMyc7XG5cbmNvbnN0IGZpZWxkU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbmZpZWxkU3R5bGVzLnRleHRDb250ZW50ID0gZmllbGRTdHlsZXNTdHI7XG5cbmNsYXNzIEdhbWVGaWVsZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoZmllbGRTdHlsZXMpO1xuXG4gICAgdGhpcy5sZXZlbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdsZXZlbCcpLnNwbGl0KCd4JylbMF07XG5cbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5maWVsZC5pZCA9ICdmaWVsZCc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsOyBpICs9IDEpIHtcbiAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdyb3cnKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZXZlbDsgaiArPSAxKSB7XG4gICAgICAgIHJvdy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PmApO1xuICAgICAgfVxuICAgICAgdGhpcy5maWVsZC5hcHBlbmQocm93KTtcbiAgICB9XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZCh0aGlzLmZpZWxkKTtcblxuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmZpZWxkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG5cbiAgICB0aGlzLmN1cnJlbnRTb2x1dGlvbiA9IG5ldyBBcnJheSh0aGlzLmNlbGxzLmxlbmd0aCkuZmlsbCgwKS5qb2luKCcnKTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2xpY2tzRGlzYWJsZWQpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2xpY2tzRGlzYWJsZWQpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpO1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZmlsbGVkJyk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpbGxlZCcpKSB7XG4gICAgICAgIG5ldyBBdWRpbyhmaWxsU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgQXVkaW8oY2xlYXJTb3VuZEZpbGUpLnBsYXkoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja1NvbHV0aW9uKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcpO1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnY3Jvc3NlZCcpO1xuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjcm9zc2VkJykpIHtcbiAgICAgICAgbmV3IEF1ZGlvKGNyb3NzU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgQXVkaW8oY2xlYXJTb3VuZEZpbGUpLnBsYXkoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja1NvbHV0aW9uKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmZpZWxkLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzdGFydHRpbWVyJywge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBvbmNlOiB0cnVlLFxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY29udGV4dG1lbnUnLFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzdGFydHRpbWVyJywge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBvbmNlOiB0cnVlLFxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc3RhcnQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmVuYWJsZUNsaWNrcygpO1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcsICdjcm9zc2VkJykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdzb2x1dGlvbicsIChlKSA9PiB7XG4gICAgICB0aGlzLmRpc2FibGVDbGlja3MoKTtcblxuICAgICAgY29uc3Qgc29sdXRpb24gPSBlLmRldGFpbDtcblxuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgIGlmIChzb2x1dGlvbltpXSkge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJyk7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3dpbicsICgpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUNsaWNrcygpO1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nyb3NzZWQnKSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NvbHV0aW9uKCkge1xuICAgIHRoaXMuY3VycmVudFNvbHV0aW9uID0gWy4uLnRoaXMuY2VsbHNdLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICByZXR1cm4gY3Vyci5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpbGxlZCcpID8gYWNjICsgJzEnIDogYWNjICsgJzAnO1xuICAgIH0sICcnKTtcblxuICAgIHRoaXMuZmllbGQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnZmlsbCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBkaXNhYmxlQ2xpY2tzKCkge1xuICAgIHRoaXMuY2xpY2tzRGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZW5hYmxlQ2xpY2tzKCkge1xuICAgIHRoaXMuY2xpY2tzRGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lRmllbGQgfTtcbiIsImltcG9ydCB0aW1lclN0eWxlc1N0ciBmcm9tICcuL0dhbWVUaW1lci5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHRpbWVyU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnRpbWVyU3R5bGVzLnRleHRDb250ZW50ID0gdGltZXJTdHlsZXNTdHI7XG5cbmNsYXNzIEdhbWVUaW1lciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5hcHBlbmQodGltZXJTdHlsZXMpO1xuXG4gICAgaWYgKCF0aGlzLnJlbmRlcmVkKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5yZW5kZXJlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd3aW4nLCAoKSA9PiB0aGlzLnN0b3AoKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IG1pbnV0ZXMgPVxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKS5sZW5ndGggPT09IDFcbiAgICAgICAgPyBgMCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKX1gXG4gICAgICAgIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKTtcblxuICAgIGxldCBzZWNvbmRzID1cbiAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJykubGVuZ3RoID09PSAxXG4gICAgICAgID8gYDAke3RoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyl9YFxuICAgICAgICA6IHRoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyk7XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IGAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xuXG4gICAgdGhpcy5taW51dGVzID0gbWludXRlcztcbiAgICB0aGlzLnNlY29uZHMgPSBzZWNvbmRzO1xuICAgIHRoaXMuY3VycmVudER1cmF0aW9uID0gZHVyYXRpb247XG4gICAgdGhpcy5pbm5lckhUTUwgPSBkdXJhdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ21pbnV0ZXMnLCAnc2Vjb25kcyddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBsYXVuY2goKSB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0VGltZSkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICB0aGlzLmludGVydmFsSUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gTWF0aC50cnVuYygobm93IC0gdGhpcy5zdGFydFRpbWUpIC8gMTAwMCk7XG5cbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlY29uZHMnLCBkdXJhdGlvbiAlIDYwKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnLCBNYXRoLmZsb29yKGR1cmF0aW9uIC8gNjApKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xuICB9XG5cbiAgcmVzdGFydCgpIHtcbiAgICBjb25zb2xlLmxvZygnaW4gcmVzdGFydCcpO1xuICAgIHRoaXMuc3RhcnRUaW1lID0gbnVsbDtcblxuICAgIHRoaXMubGF1bmNoKCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnN0b3AoKTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lVGltZXIgfTtcbiIsImltcG9ydCByZXN0YXJ0QnRuU3R5bGVzU3RyIGZyb20gJy4vUmVzdGFydEJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHJlc3RhcnRCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xucmVzdGFydEJ0blN0eWxlcy50ZXh0Q29udGVudCA9IHJlc3RhcnRCdG5TdHlsZXNTdHI7XG5cbmNsYXNzIFJlc3RhcnRCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIj5SZXN0YXJ0IGdhbWU8L2Rpdj5cbiAgICBgO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHJlc3RhcnRCdG5TdHlsZXMpO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3Jlc3RhcnQnLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBSZXN0YXJ0QnRuIH07XG4iLCJpbXBvcnQgc2F2ZUJ0blN0eWxlc1N0ciBmcm9tICcuL1NhdmVCdG4uc3R5bGVzLnNjc3MnO1xuXG5jb25zdCBzYXZlQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnNhdmVCdG5TdHlsZXMudGV4dENvbnRlbnQgPSBzYXZlQnRuU3R5bGVzU3RyO1xuXG5jbGFzcyBTYXZlQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+U2F2ZSBnYW1lPC9kaXY+XG4gICAgYDtcbiAgICBzaGFkb3dSb290LmFwcGVuZChzYXZlQnRuU3R5bGVzKTtcbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUuY3VycmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NhdmUtZ2FtZScsIHsgYnViYmxlczogdHJ1ZSwgY29tcG9zZWQ6IHRydWUgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgU2F2ZUJ0biB9O1xuIiwiaW1wb3J0IHNvbHV0aW9uQnRuU3R5bGVzU3RyIGZyb20gJy4vU29sdXRpb25CdG4uc3R5bGVzLnNjc3MnO1xuXG5jb25zdCBzb2x1dGlvbkJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5zb2x1dGlvbkJ0blN0eWxlcy50ZXh0Q29udGVudCA9IHNvbHV0aW9uQnRuU3R5bGVzU3RyO1xuXG5jbGFzcyBTb2x1dGlvbkJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvblwiPlNvbHV0aW9uPC9kaXY+XG4gICAgYDtcbiAgICBzaGFkb3dSb290LmFwcGVuZChzb2x1dGlvbkJ0blN0eWxlcyk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgZS5jdXJyZW50VGFyZ2V0LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc29sdXRpb24nLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBTb2x1dGlvbkJ0biB9O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gQ29sb3JzXG5cbiRjb2xvci1iYWNrZ3JvdW5kOiAjZmJmM2YyO1xuJGNvbG9yLWFjY2VudDogIzFjNzY4ZjtcbiRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTE6ICNmYTk5MWM7XG4kY29sb3ItYWNjZW50LXNlY29uZGFyeS0yOiAjZmExYzY2O1xuJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMzogIzYyMWNmYTtcblxuJGNvbG9yLXRleHQtbWFpbjogIzI2MjYyNjtcbiRjb2xvci10ZXh0LXJldmVyc2U6ICNmZmZmZmY7XG5cbi8vIFNpemVzXG5cbjpyb290IHtcbiAgLS1jZWxsLXNpemU6IGF1dG87XG59XG5cbi8vIEZvbnRzXG5cbiRmb250LW1haW46ICdTaWduaWthIE5lZ2F0aXZlJywgc2Fucy1zZXJpZjtcbiIsIkB1c2UgJy4vLi4vYWJzdHJhY3QvbWl4aW5zJyBhcyAqO1xuQHVzZSAnLi8uLi9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbioge1xuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5odG1sIHtcblx0c2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XG59XG5cbmJvZHkge1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYmFja2dyb3VuZDtcblx0dXNlci1zZWxlY3Q6IG5vbmU7XG5cblx0Ji5zY3JvbGwtZGlzYWJsZWQge1xuXHRcdGhlaWdodDogMTAwJTtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHR9XG59XG5cbi53cmFwcGVyIHtcblx0bWF4LXdpZHRoOiAxNDQwcHg7XG5cdHBhZGRpbmc6IDAgNDBweDtcblx0bWFyZ2luOiAwIGF1dG87XG5cblx0QGluY2x1ZGUgbWF4LTU3NiB7XG5cdFx0cGFkZGluZzogMCA0LjIxMDUyJTtcblx0fVxufVxuXG4uc2VjdGlvbiB7XG5cdG1hcmdpbi1ib3R0b206IDEwMHB4O1xufVxuXG5pbWcge1xuXHRtYXgtd2lkdGg6IDEwMCU7XG59XG5cbi50cmFuc3BhcmVudCB7XG5cdG9wYWNpdHk6IDA7XG59XG5cbjpob3N0IHtcblx0ZGlzcGxheTogYmxvY2s7XG59XG4iLCIvKiBGb3IgbWVkaWEgcXVlcmllcyAqL1xuXG5AbWl4aW4gbWF4LTEyMDAge1xuICBAbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1pbi0xMDI0IHtcbiAgQG1lZGlhIChtaW4td2lkdGg6IDEwMjRweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtYXgtMTAyNCB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMDI0cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTc2OCB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtYXgtNTc2IHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1heC0zODAge1xuICBAbWVkaWEgKG1heC13aWR0aDogMzgwcHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gcG9ydHJhaXQge1xuICBAbWVkaWEgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG4iLCJAdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uL3N0eWxlcy9sYXlvdXQvYmFzaWMnIGFzICo7XG5cbjpob3N0IHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBiYWNrZ3JvdW5kOiAkY29sb3ItYWNjZW50O1xuXG4gICoge1xuICAgIGNvbG9yOiAkY29sb3ItYmFja2dyb3VuZDtcbiAgfVxufVxuIiwiLmFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDIwcHg7XG59XG4iLCJAdXNlICcuLy4uL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmJ1dHRvbiB7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuXG4gIGNvbG9yOiAkY29sb3ItdGV4dC1yZXZlcnNlO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTE7XG5cbiAgYm9yZGVyLXJhZGl1czogMTBweDtcblxuICB0cmFuc2l0aW9uOiAwLjNzO1xuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMTIwJSk7XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMjtcbn1cbiIsIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cblxuLyogRG9jdW1lbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXG4gKi9cblxuaHRtbCB7XG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xufVxuXG4vKiBTZWN0aW9uc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cbiAqL1xuXG5tYWluIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cbiAqL1xuXG5oMSB7XG4gIGZvbnQtc2l6ZTogMmVtO1xuICBtYXJnaW46IDAuNjdlbSAwO1xufVxuXG4vKiBHcm91cGluZyBjb250ZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cbiAqL1xuXG5ociB7XG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXG4gIGhlaWdodDogMDsgLyogMSAqL1xuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxucHJlIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXG59XG5cbnAge1xuICBtYXJnaW46IDA7XG59XG5cbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cbiAqL1xuXG5hIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuXG51bCB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuLyoqXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5hYmJyW3RpdGxlXSB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5iLFxuc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmNvZGUsXG5rYmQsXG5zYW1wIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc21hbGwge1xuICBmb250LXNpemU6IDgwJTtcbn1cblxuLyoqXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cbiAqIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdWIsXG5zdXAge1xuICBmb250LXNpemU6IDc1JTtcbiAgbGluZS1oZWlnaHQ6IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG5zdWIge1xuICBib3R0b206IC0wLjI1ZW07XG59XG5cbnN1cCB7XG4gIHRvcDogLTAuNWVtO1xufVxuXG4vKiBFbWJlZGRlZCBjb250ZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbn1cblxuLyogRm9ybXNcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXG4gKi9cblxuYnV0dG9uLFxuaW5wdXQsXG5vcHRncm91cCxcbnNlbGVjdCxcbnRleHRhcmVhIHtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIG1hcmdpbjogMDsgLyogMiAqL1xufVxuXG5idXR0b24ge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG59XG5cbi8qKlxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxuICovXG5cbmJ1dHRvbixcbmlucHV0IHtcbiAgLyogMSAqL1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b24sXG5zZWxlY3Qge1xuICAvKiAxICovXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXG4gKi9cblxuYnV0dG9uLFxuW3R5cGU9J2J1dHRvbiddLFxuW3R5cGU9J3Jlc2V0J10sXG5bdHlwZT0nc3VibWl0J10ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcbiAgYXBwZWFyYW5jZTogYnV0dG9uO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9J2J1dHRvbiddOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9J3Jlc2V0J106Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT0nc3VibWl0J106Oi1tb3otZm9jdXMtaW5uZXIge1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi8qKlxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxuICovXG5cbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcblt0eXBlPSdidXR0b24nXTotbW96LWZvY3VzcmluZyxcblt0eXBlPSdyZXNldCddOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9J3N1Ym1pdCddOi1tb3otZm9jdXNyaW5nIHtcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cbiAqL1xuXG5maWVsZHNldCB7XG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxubGVnZW5kIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cbiAgcGFkZGluZzogMDsgLyogMyAqL1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cbiAqL1xuXG5wcm9ncmVzcyB7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cbiAqL1xuXG50ZXh0YXJlYSB7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxuICovXG5cblt0eXBlPSdjaGVja2JveCddLFxuW3R5cGU9J3JhZGlvJ10ge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXG4gKi9cblxuW3R5cGU9J251bWJlciddOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuW3R5cGU9J251bWJlciddOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXG4gKi9cblxuW3R5cGU9J3NlYXJjaCddIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxuICovXG5cblt0eXBlPSdzZWFyY2gnXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxuICovXG5cbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xuICBmb250OiBpbmhlcml0OyAvKiAyICovXG59XG5cbi8qIEludGVyYWN0aXZlXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cbiAqL1xuXG5kZXRhaWxzIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3VtbWFyeSB7XG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcbn1cblxuLyogTWlzY1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXG4gKi9cblxudGVtcGxhdGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxuICovXG5cbltoaWRkZW5dIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Jhc2Uvbm9ybWFsaXplJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvbWl4aW5zJyBhcyAqO1xuXG46aG9zdCB7XG4gICoge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cbn1cblxuLmFjdGlvbnMge1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuXG4gIHdpZHRoOiAxMDAlO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLm5vbm9ncmFtIHtcbiAgJl9fY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxuXG4gIHdpZHRoOiA0NSU7XG5cbiAgQGluY2x1ZGUgbWF4LTEyMDAge1xuICAgIHdpZHRoOiA1NSU7XG4gIH1cblxuICBAaW5jbHVkZSBwb3J0cmFpdCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICBAaW5jbHVkZSBtYXgtNzY4IHtcbiAgICBmb250LXNpemU6IG1pbihjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAwLjgpLCAycmVtKTtcbiAgfVxuXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczpcbiAgICBhdXRvLFxuICAgIDFmciAxZnI7XG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XG4gICAgJ2EgYiBiJ1xuICAgICdjIGQgZCdcbiAgICAnYyBkIGQnO1xufVxuXG4uc3VtbWFyeSB7XG4gIHBhZGRpbmc6IDEwcHg7XG5cbiAgZ3JpZC1hcmVhOiBhO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRvcC1wYW5lIHtcbiAgZ3JpZC1hcmVhOiBiO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG5cbiAgZGlzcGxheTogZmxleDtcblxuICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLWxlZnQ6IDFweCAjMDAwIHNvbGlkO1xuXG4gICZfX2hpbnQge1xuICAgIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuXG4gICAgYm9yZGVyLXRvcDogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggIzAwMCBzb2xpZDtcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICBib3JkZXItcmlnaHQ6IDJweCAjMDAwMDAwIHNvbGlkO1xuICAgIH1cbiAgfVxuXG4gICZfX251bWJlciB7XG4gICAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxufVxuXG4ubGVmdC1wYW5lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGdyaWQtYXJlYTogYztcblxuICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4ICMwMDAgc29saWQ7XG4gIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICAmX19oaW50IHtcbiAgICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuXG4gICAgYm9yZGVyLXRvcDogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCAjMDAwIHNvbGlkO1xuXG4gICAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4ICMwMDAwMDAgc29saWQ7XG4gICAgfVxuICB9XG5cbiAgJl9fbnVtYmVyIHtcbiAgICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cbn1cblxuZ2FtZS1maWVsZCB7XG4gIGdyaWQtYXJlYTogZDtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Jhc2Uvbm9ybWFsaXplJyBhcyAqO1xuXG46aG9zdCB7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYm9yZGVyOiAxcHggIzAwMDAwMCBzb2xpZDtcblxuICAqIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG59XG5cbi5yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XG5cbiAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgIGJvcmRlci1ib3R0b206IDJweCAjMDAwMDAwIHNvbGlkO1xuICB9XG59XG5cbi5jZWxsIHtcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcbiAgYm9yZGVyOiAxcHggIzAwMDAwMCBzb2xpZDtcblxuICB0cmFuc2l0aW9uOiAwLjJzO1xuXG4gICY6bnRoLWNoaWxkKDVuKTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICBib3JkZXItcmlnaHQ6IDJweCAjMDAwMDAwIHNvbGlkO1xuICB9XG5cbiAgJi5maWxsZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gIH1cblxuICAmLmNyb3NzZWQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICY6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbGVmdDogNTAlO1xuXG4gICAgICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC45KTtcbiAgICAgIGhlaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcblxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgcm90YXRlKDQ1ZGVnKTtcbiAgICB9XG4gICAgJjo6YWZ0ZXIge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIGxlZnQ6IDUwJTtcblxuICAgICAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDAuOSk7XG4gICAgICBoZWlnaHQ6IDNweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG5cbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHJvdGF0ZSgtNDVkZWcpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYWNjZW50LXNlY29uZGFyeS0zO1xufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYWNjZW50LXNlY29uZGFyeS0yO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAnLi9zdHlsZXMvbWFpbi5zY3NzJztcbmltcG9ydCB7IEFwcFJvdXRlciB9IGZyb20gJy4vY29tcG9uZW50cy9hcHAtcm91dGVyL0FwcFJvdXRlcic7XG5pbXBvcnQgeyBHYW1lSGVhZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2dhbWVIZWFkZXIvR2FtZUhlYWRlcic7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS1oZWFkZXInLCBHYW1lSGVhZGVyKTtcblxuZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoXG4gICdhZnRlcmJlZ2luJyxcbiAgYFxuXHRcdDxnYW1lLWhlYWRlcj48L2dhbWUtaGVhZGVyPlxuXHRcdDxtYWluIGlkPVwibWFpblwiIGNsYXNzPVwibWFpbiB3cmFwcGVyXCI+XG5cdFx0PC9tYWluPlxuXHRgXG4pO1xuXG5jb25zdCByb3V0ZXIgPSBuZXcgQXBwUm91dGVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCBkZWVwZXN0RWwgPSBlLmNvbXBvc2VkUGF0aCgpWzBdO1xuICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW2RhdGEtbGlua10nKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcm91dGVyLmNoYW5nZUhhc2goZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcblxuICAgICAgbGV0IHBhcmFtcyA9IFtdO1xuICAgICAgaWYgKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSA9PT0gJ25vbm9ncmFtJykge1xuICAgICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnZ2FtZS1uYW1lJykpIHtcbiAgICAgICAgICBwYXJhbXMucHVzaChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdnYW1lLW5hbWUnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKSkge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2xldmVsJykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW3JhbmRvbV0nKSkge1xuICAgICAgICBwYXJhbXMucHVzaCgncmFuZG9tJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW2NvbnRpbnVlXScpKSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKCdjb250aW51ZScpO1xuICAgICAgfVxuXG4gICAgICByb3V0ZXIuc2hvd1JvdXRlKHBhcmFtcyk7XG4gICAgfVxuICB9KTtcblxuICB3aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHtcbiAgICByb3V0ZXIuc2hvd1JvdXRlKCk7XG4gIH07XG5cbiAgcm91dGVyLnNob3dSb3V0ZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiR2FtZU1lbnUiLCJHYW1lTm9ub2dyYW0iLCJub25vZ3JhbXMiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIkFwcFJvdXRlciIsImNvbnN0cnVjdG9yIiwiYXBwIiwicm91dGVzIiwiaGFzaCIsInZpZXciLCJuYW1lIiwibGV2ZWwiLCJzYXZlZFNvbHV0aW9uIiwibWludXRlcyIsInNlY29uZHMiLCJyZXNvbHZlZE5hbWUiLCJyZXNvbHZlZExldmVsIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJjaGFuZ2VIYXNoIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJzaG93Um91dGUiLCJwYXJhbXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJuZXdQYXJhbXMiLCJyYW5kb21OdW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21Ob25vZ3JhbSIsInNhdmVkIiwiSlNPTiIsInBhcnNlIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRTb2x1dGlvbiIsInRpbWUiLCJtYXRjaCIsImZpbmQiLCJpdGVtIiwic2xpY2UiLCJpbm5lckhUTUwiLCJoZWFkZXJTdHlsZXNTdHIiLCJoZWFkZXJTdHlsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRlbXBsYXRlIiwiR2FtZUhlYWRlciIsIkhUTUxFbGVtZW50IiwiY29ubmVjdGVkQ2FsbGJhY2siLCJzaGFkb3dSb290IiwiYXR0YWNoU2hhZG93IiwibW9kZSIsImFwcGVuZCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJtZW51U3R5bGVTdHIiLCJSYW5kb21CdG4iLCJDb250aW51ZUJ0biIsIm1lbnVTdHlsZXMiLCJsZXZlbHMiLCJTZXQiLCJtYXAiLCJsZXZlbHNIVE1MIiwiZ2FtZU5hbWVzIiwiZmlsdGVyIiwiam9pbiIsImNvbnRpbnVlQnRuU3R5bGVzU3RyIiwiY29udGludWVCdG5TdHlsZXMiLCJyYW5kb21CdG5TdHlsZXNTdHIiLCJyYW5kb21CdG5TdHlsZXMiLCJub25vZ3JhbVN0eWxlc1N0ciIsIkdhbWVGaWVsZCIsIlJlc3RhcnRCdG4iLCJTb2x1dGlvbkJ0biIsIlNhdmVCdG4iLCJHYW1lVGltZXIiLCJ3aW5Tb3VuZEZpbGUiLCJub25vZ3JhbVN0eWxlcyIsImdldEF0dHJpYnV0ZSIsInRpbWVyIiwicXVlcnlTZWxlY3RvciIsInNhdmVkTWludXRlcyIsInNhdmVkU2Vjb25kcyIsInNldEF0dHJpYnV0ZSIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJnZXRFbGVtZW50QnlJZCIsInRvVXBwZXJDYXNlIiwibm9ub2dyYW0iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaWVsZCIsIm1hdHJpeCIsImNvcnJlY3RTb2x1dGlvbiIsImZsYXQiLCJ0b1N0cmluZyIsInN0ciIsImZvckVhY2giLCJlbCIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJzcXVhcmUiLCJ0b3BQYW5lIiwibGVmdFBhbmUiLCJtYXhMZWZ0SGludHMiLCJpIiwibGVmdEhpbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0b3BIaW50IiwiY291bnRlckxlZnQiLCJjb3VudGVyVG9wIiwiaiIsImNoaWxkcmVuIiwibm9ub2dyYW1XaWR0aCIsIm9mZnNldFdpZHRoIiwiY2VsbFNpemUiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwibWludXRlc1N0ciIsInNlY29uZHNTdHIiLCJBdWRpbyIsInBsYXkiLCJyZXN0YXJ0Iiwic3RvcCIsImRldGFpbCIsImdhbWUiLCJzdHJpbmdpZnkiLCJsYXVuY2giLCJvbmNlIiwiZmllbGRTdHlsZXNTdHIiLCJmaWxsU291bmRGaWxlIiwiY2xlYXJTb3VuZEZpbGUiLCJjcm9zc1NvdW5kRmlsZSIsImZpZWxkU3R5bGVzIiwic3BsaXQiLCJpZCIsInJvdyIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiZmlsbCIsImUiLCJjbGlja3NEaXNhYmxlZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInRhcmdldCIsInJlbW92ZSIsInRvZ2dsZSIsImNvbnRhaW5zIiwiY2hlY2tTb2x1dGlvbiIsInByZXZlbnREZWZhdWx0IiwiYnViYmxlcyIsImNvbXBvc2VkIiwiZW5hYmxlQ2xpY2tzIiwiY2VsbCIsImRpc2FibGVDbGlja3MiLCJzb2x1dGlvbiIsInRpbWVyU3R5bGVzU3RyIiwidGltZXJTdHlsZXMiLCJyZW5kZXJlZCIsInJlbmRlciIsImR1cmF0aW9uIiwiY3VycmVudER1cmF0aW9uIiwib2JzZXJ2ZWRBdHRyaWJ1dGVzIiwiYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIiwiaW50ZXJ2YWxJRCIsInNldEludGVydmFsIiwidHJ1bmMiLCJjbGVhckludGVydmFsIiwiZGlzY29ubmVjdGVkQ2FsbGJhY2siLCJyZXN0YXJ0QnRuU3R5bGVzU3RyIiwicmVzdGFydEJ0blN0eWxlcyIsIm9uY2xpY2siLCJzYXZlQnRuU3R5bGVzU3RyIiwic2F2ZUJ0blN0eWxlcyIsImN1cnJlbnRUYXJnZXQiLCJzb2x1dGlvbkJ0blN0eWxlc1N0ciIsInNvbHV0aW9uQnRuU3R5bGVzIiwiYm9keSIsInJvdXRlciIsImRlZXBlc3RFbCIsImNvbXBvc2VkUGF0aCIsIm1hdGNoZXMiLCJwdXNoIiwib25wb3BzdGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=