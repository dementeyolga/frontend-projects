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
      view: (name, level, savedSolution, crossed, minutes, seconds) => {
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
            <game-nonogram name="${resolvedName}" level="${resolvedLevel}"  savedsolution="${savedSolution || ''}" crossed="${crossed || ''}" minutes="${minutes || '0'}" seconds="${seconds || '0'}">
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
      newParams[3] = saved.crossed;
      newParams[4] = saved.time.minutes;
      newParams[5] = saved.time.seconds;
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
    const btn = document.createElement('a');
    btn.href = 'nonogram';
    btn.classList.add('button');
    btn.setAttribute('continue', true);
    btn.setAttribute('data-link', true);
    btn.innerText = 'Continue game';
    if (!localStorage.getItem('savedGame')) {
      btn.classList.add('disabled');
    }
    shadowRoot.append(btn);
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
    const btn = document.createElement('a');
    btn.href = 'nonogram';
    btn.classList.add('button');
    btn.setAttribute('random', true);
    btn.setAttribute('data-link', true);
    btn.innerText = 'Random';
    shadowRoot.append(btn);
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

    <div id="summary" class="summary">
      </div>  
    
    <div class="nonogram__wrapper">
      <div id="nonogram" class="nonogram">
      
        <div class="top-pane"></div>
        <div class="left-pane"></div>
      </div>
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
    const savedSolution = this.getAttribute('savedsolution');
    const crossed = this.getAttribute('crossed');
    const timer = shadowRoot.querySelector('#game-timer');
    console.log('nonogram added to the doc');
    if (this.getAttribute('minutes') !== '0' || this.getAttribute('seconds') !== '0') {
      const savedMinutes = this.getAttribute('minutes');
      const savedSeconds = this.getAttribute('seconds');
      timer.setAttribute('minutes', savedMinutes);
      timer.setAttribute('seconds', savedSeconds);
      timer.continue = true;
    }
    shadowRoot.getElementById('summary').innerHTML = `
      <p class="summary__level">${level}</p>
      <p class="summary__name"> ${name[0].toUpperCase() + name.slice(1)}</p>
    `;
    const nonogram = shadowRoot.querySelector('#nonogram');
    const field = document.createElement('game-field');
    field.id = 'game-field';
    field.classList.add('game-field');
    field.savedSolution = savedSolution;
    field.crossed = crossed;
    field.setAttribute('level', level);
    nonogram.append(field);
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
      field.timerStarted = false;
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
        crossed: field.currentCrossed,
        time: {
          minutes: timer.minutes,
          seconds: timer.seconds
        }
      };
      localStorage.setItem('savedGame', JSON.stringify(game));
    });
    shadowRoot.firstElementChild.addEventListener('starttimer', () => {
      timer.launch();
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
    this.currentSolution = this.savedSolution || new Array(this.cells.length).fill(0).join('');
    if (this.savedSolution) {
      this.cells.forEach((cell, i) => {
        if (this.savedSolution[i] === '1') {
          cell.classList.add('filled');
        }
      });
    }
    if (this.crossed) {
      this.cells.forEach((cell, i) => {
        if (this.crossed[i] === 'x') {
          cell.classList.add('crossed');
        }
      });
    }
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
      if (this.timerStarted) return;
      this.timerStarted = true;
      this.field.dispatchEvent(new CustomEvent('starttimer', {
        bubbles: true,
        composed: true
      }));
    });
    this.field.addEventListener('contextmenu', () => {
      if (this.timerStarted) return;
      this.timerStarted = true;
      this.dispatchEvent(new CustomEvent('starttimer', {
        bubbles: true,
        composed: true
      }));
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
    this.currentCrossed = [...this.cells].reduce((acc, curr) => {
      return curr.classList.contains('crossed') ? acc + 'x' : acc + '0';
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

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:#fa1c66}`;
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

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}`;
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

        const styles = `/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}p{margin:0}a{display:block;background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}ul{margin:0;padding:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{display:block;border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button{outline:none;border:none}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:root{--cell-size: auto}:host *{box-sizing:border-box}.actions{margin-bottom:20px;width:100%;display:flex;justify-content:space-between;align-items:center}.nonogram{width:40%;display:grid;grid-template-columns:auto 1fr 1fr;grid-template-areas:"a b b" "c d d" "c d d"}.nonogram__container{min-height:100%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:flex-start}.nonogram__wrapper{width:100%;flex-grow:1;display:flex;justify-content:center;align-items:center}@media(max-width: 1200px){.nonogram{width:50%}}@media(orientation: portrait){.nonogram{width:100%}}@media(max-width: 768px){.nonogram{font-size:min(var(--cell-size)*.8,2rem)}}.summary{padding:10px;grid-area:a;display:flex;justify-content:center;gap:16px;text-align:center}.top-pane{grid-area:b;width:fit-content;display:flex;border-top:1px #000 solid;border-right:1px #000 solid;border-left:1px #000 solid;background-color:rgba(0,0,0,.1215686275)}.top-pane__hint{width:var(--cell-size);display:flex;flex-direction:column;justify-content:flex-end;border-top:1px #000 solid;border-right:1px #000 solid;border-left:1px #000 solid}.top-pane__hint:nth-child(5n):not(:last-child){border-right:2px #000 solid}.top-pane__number{height:var(--cell-size);display:flex;justify-content:center;align-items:center}.left-pane{width:100%;grid-area:c;border-top:1px #000 solid;border-bottom:1px #000 solid;border-left:1px #000 solid;background-color:rgba(0,0,0,.1215686275)}.left-pane__hint{height:var(--cell-size);display:flex;justify-content:flex-end;border-top:1px #000 solid;border-bottom:1px #000 solid;border-left:1px #000 solid}.left-pane__hint:nth-child(5n):not(:last-child){border-bottom:2px #000 solid}.left-pane__number{width:var(--cell-size);display:flex;justify-content:center;align-items:center}game-field{grid-area:d}`;
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

        const styles = `:root{--cell-size: auto}/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}p{margin:0}a{display:block;background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}ul{margin:0;padding:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{display:block;border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button{outline:none;border:none}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:host{width:fit-content;display:flex;flex-direction:column;border:1px #000 solid;background-color:rgba(255,255,255,.6745098039)}:host *{box-sizing:border-box}.row{display:flex;height:var(--cell-size)}.row:nth-child(5n):not(:last-child){border-bottom:2px #000 solid}.cell{width:var(--cell-size);height:var(--cell-size);border:1px #000 solid;transition:.2s}.cell:nth-child(5n):not(:last-child){border-right:2px #000 solid}.cell.filled{background-color:#000}.cell.crossed{position:relative}.cell.crossed::before{content:"";position:absolute;top:50%;left:50%;width:calc(var(--cell-size)*.9);height:3px;background-color:#000;transform:translate(-50%, -50%) rotate(45deg)}.cell.crossed::after{content:"";position:absolute;top:50%;left:50%;width:calc(var(--cell-size)*.9);height:3px;background-color:#000;transform:translate(-50%, -50%) rotate(-45deg)}`;
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

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}`;
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

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:#621cfa}`;
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

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:#fa1c66}`;
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

module.exports = /*#__PURE__*/JSON.parse('[{"level":"5x5","name":"android","matrix":[[0,1,1,1,0],[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1]],"picture":"./"},{"level":"5x5","name":"flower","matrix":[[0,1,1,1,0],[1,0,1,0,1],[1,1,0,1,1],[1,0,1,0,1],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"rune","matrix":[[0,1,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,0,0]],"picture":"./"},{"level":"5x5","name":"smile","matrix":[[1,1,0,1,1],[1,1,0,1,1],[0,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"tower","matrix":[[1,0,1,0,1],[1,1,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"airplane","matrix":[[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,0,1,0,0],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"car","matrix":[[0,0,0,0,0],[0,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,0,1,0]],"picture":"./"},{"level":"5x5","name":"dog","matrix":[[0,0,0,1,0],[1,0,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,0,1,0]],"picture":"./"},{"level":"10x10","name":"mouse","matrix":[[0,0,1,1,0,0,0,1,1,0],[0,1,0,0,1,0,1,0,0,1],[0,1,0,1,1,1,1,1,0,1],[0,0,1,1,0,1,0,1,1,0],[0,0,0,1,1,1,1,1,0,0],[0,0,1,1,1,0,1,1,1,0],[1,0,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0]],"picture":"./"},{"level":"10x10","name":"alarm","matrix":[[0,1,1,0,0,0,0,1,1,0],[1,1,0,1,1,1,1,0,1,1],[1,0,1,1,1,0,1,1,0,1],[0,1,1,1,1,0,1,1,1,0],[0,1,1,1,1,0,1,1,0,0],[0,1,1,1,0,1,1,1,1,0],[0,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,0,0,1,1,0,0]],"picture":"./"},{"level":"10x10","name":"cup of coffee","matrix":[[0,0,1,0,1,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,0,0],[0,1,1,0,1,1,1,1,1,1],[0,1,1,0,1,1,1,1,0,1],[0,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,0,0],[1,0,1,1,1,1,1,0,0,1],[0,1,1,1,1,1,1,1,1,0]],"picture":"./"},{"level":"10x10","name":"leaf","matrix":[[0,0,0,0,1,1,1,1,1,1],[0,0,0,1,0,1,0,1,0,1],[0,0,1,1,0,1,0,1,1,0],[0,1,0,1,0,1,1,0,1,0],[0,1,0,1,0,1,1,1,1,0],[0,1,0,1,1,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,0,0,0,0,1,0,0],[0,1,0,1,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0]],"picture":"./"},{"level":"10x10","name":"TV","matrix":[[0,0,1,0,0,0,0,1,0,0],[0,0,0,1,0,0,1,0,0,0],[1,1,1,1,1,1,1,1,1,1],[1,0,1,1,0,0,0,0,1,1],[1,1,1,0,0,0,0,0,0,1],[1,0,1,0,0,0,0,0,0,1],[1,1,1,0,0,0,0,0,0,1],[1,1,1,1,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,0,0,0,0,0,0,1,0]],"picture":"./"},{"level":"10x10","name":"tree","matrix":[[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,0,1,1,1,0],[1,1,1,1,1,0,1,1,1,1],[1,1,0,1,1,1,0,0,1,1],[1,1,1,0,1,1,1,1,1,0],[0,1,1,1,1,1,0,0,0,0],[0,0,0,0,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,1,0,0,1,1,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"level":"10x10","name":"question","matrix":[[0,0,1,1,1,1,1,1,0,0],[0,1,1,0,0,0,0,1,1,0],[0,1,1,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,1,1,0],[0,0,0,0,0,0,1,1,1,0],[0,0,0,0,1,1,1,1,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0]],"picture":"./"},{"level":"10x10","name":"hot air balloon","matrix":[[1,1,1,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,1,0,1],[1,1,0,0,0,0,0,1,0,1],[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,0,1,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"level":"15x15","name":"deer","matrix":[[1,1,0,1,1,0,0,0,0,0,0,1,1,0,1],[1,1,0,1,1,0,1,0,0,1,0,1,1,0,1],[0,1,1,1,1,0,1,0,0,1,0,1,1,0,1],[0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],[0,0,0,0,1,1,0,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],[0,0,0,0,0,1,0,1,0,1,1,1,1,1,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1],[0,1,0,1,1,1,0,0,0,0,1,1,1,1,1],[0,1,1,1,1,1,0,0,0,0,1,1,1,1,1],[0,0,1,1,1,0,0,0,0,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1]],"picture":"./"},{"level":"15x15","name":"flower","matrix":[[0,0,0,1,1,0,1,1,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,1,1,1,1,1,0,0,0],[0,1,1,1,0,0,0,0,1,0,0,1,1,0,0],[1,1,0,0,1,1,1,0,0,0,0,0,1,0,0],[1,0,0,0,0,1,1,0,1,0,0,1,1,0,0],[1,1,1,0,1,0,0,0,0,1,1,1,0,0,0],[0,1,1,1,0,0,1,0,0,0,1,0,0,0,0],[0,0,1,0,0,1,1,1,0,0,1,0,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,0,0,1,0],[1,1,0,0,1,1,0,1,1,0,0,0,0,0,1],[1,1,1,0,0,1,0,1,0,0,1,1,1,1,1],[1,0,1,0,0,1,1,1,0,1,1,1,1,1,1],[0,1,1,1,0,0,1,0,0,1,1,1,0,1,1],[0,0,1,1,1,1,1,0,1,1,1,0,1,1,0],[0,0,0,0,0,1,1,1,0,0,1,1,1,0,0]],"picture":"./"},{"level":"15x15","name":"alarm","matrix":[[0,0,1,1,1,0,0,0,0,0,1,1,1,0,0],[0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],[1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],[1,1,0,1,1,1,1,0,1,1,1,1,0,1,1],[1,0,1,1,1,1,1,1,1,1,0,1,1,0,1],[0,0,1,1,1,1,1,1,1,0,1,1,1,0,0],[0,1,1,1,1,1,1,1,0,1,1,1,1,1,0],[0,1,0,0,1,0,0,0,1,1,1,0,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,1,1,1,1,0,0,0],[0,0,1,0,0,1,1,1,1,1,0,0,1,0,0],[0,1,0,0,1,0,1,1,1,0,1,0,0,1,0],[0,0,1,1,0,0,0,0,0,0,0,1,1,0,0]],"picture":"./"},{"level":"15x15","name":"castle","matrix":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],[1,1,0,1,1,0,1,0,0,0,1,1,0,1,1],[1,1,1,1,1,0,1,0,0,0,1,1,1,1,1],[1,0,0,0,1,0,1,0,0,0,1,0,0,0,1],[1,0,1,0,1,0,1,0,0,0,1,0,1,0,1],[1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,0,0,0,1,0,0,1],[1,0,1,1,1,0,0,1,0,0,1,1,1,0,1],[1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],[1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],[1,0,0,0,0,0,1,1,1,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"level":"15x15","name":"dolphin","matrix":[[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,1,1,0,1,1,1,1],[1,1,1,0,0,0,0,1,1,0,0,0,1,1,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,1,0,0,0,0,0,1,1,0,1,0,1,0,1],[0,0,0,1,1,0,1,1,0,1,0,1,1,0,0],[0,0,1,0,0,1,1,0,1,1,0,1,1,1,0],[1,1,1,0,1,1,1,0,1,1,1,0,1,1,1]],"picture":"./"},{"level":"15x15","name":"duck","matrix":[[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,1,1,1,1,0,1,1,1],[0,0,0,0,0,0,0,1,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],[1,0,0,0,0,0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,1,1,1,0,0,0,1,1,1,0],[1,1,1,1,1,1,1,0,1,1,1,0,1,1,0],[0,1,1,1,1,1,0,1,1,1,1,0,1,1,0],[0,1,1,1,1,1,1,1,1,0,0,1,1,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,1,1,1,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,1,1,1,0,0,0]],"picture":"./"},{"level":"15x15","name":"clover","matrix":[[0,0,0,0,0,1,1,0,1,1,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,1,1,1,0,1,1,1,1,1,0,1,1,1,0],[1,1,1,1,1,0,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],[0,1,1,1,1,1,1,0,1,1,1,1,1,1,0],[1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],[1,1,1,1,1,0,0,1,0,0,1,1,1,1,1],[0,1,1,1,0,0,0,1,0,0,0,1,1,1,0],[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0,0,0,0,0,0]],"picture":"./"}]');

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
    if (deepestEl.classList.contains('disabled')) {
      e.preventDefault();
      return;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO0FBQ3BCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvYXBwLXJvdXRlci9BcHBSb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZUhlYWRlci9HYW1lSGVhZGVyLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L0dhbWVNZW51LmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L2NvbnRpbnVlQnRuL0NvbnRpbnVlQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L3JhbmRvbUJ0bi9SYW5kb25CdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZUZpZWxkL0dhbWVGaWVsZC5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZVRpbWVyL0dhbWVUaW1lci5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vcmVzdGFydEJ0bi9SZXN0YXJ0QnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zYXZlQnRuL1NhdmVCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NvbHV0aW9uQnRuL1NvbHV0aW9uQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvbWFpbi5zY3NzP2ZjNzciLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9hYnN0cmFjdC9fdmFyaWFibGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9sYXlvdXQvX2Jhc2ljLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9hYnN0cmFjdC9fbWl4aW5zLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZUhlYWRlci9HYW1lSGVhZGVyLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L0dhbWVNZW51LnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvY29tcG9uZW50cy9fYnV0dG9uLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvY29udGludWVCdG4vQ29udGludWVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9iYXNlL19ub3JtYWxpemUuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vR2FtZU5vbm9ncmFtLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9nYW1lRmllbGQvR2FtZUZpZWxkLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zYXZlQnRuL1NhdmVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NvbHV0aW9uQnRuL1NvbHV0aW9uQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNZW51IH0gZnJvbSAnLi4vZ2FtZU1lbnUvR2FtZU1lbnUnO1xuaW1wb3J0IHsgR2FtZU5vbm9ncmFtIH0gZnJvbSAnLi4vZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbSc7XG5pbXBvcnQgbm9ub2dyYW1zIGZyb20gJy4uLy4uL3Jlc291cmNlcy9ub25vZ3JhbXMuanNvbic7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS1tZW51JywgR2FtZU1lbnUpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLW5vbm9ncmFtJywgR2FtZU5vbm9ncmFtKTtcblxuY2xhc3MgQXBwUm91dGVyIHtcbiAgY29uc3RydWN0b3IoYXBwKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG5cbiAgICB0aGlzLnJvdXRlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgaGFzaDogJycsXG4gICAgICAgIHZpZXc6ICgpID0+ICc8Z2FtZS1tZW51PjwvZ2FtZS1tZW51PicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBoYXNoOiAnbm9ub2dyYW0nLFxuICAgICAgICB2aWV3OiAobmFtZSwgbGV2ZWwsIHNhdmVkU29sdXRpb24sIGNyb3NzZWQsIG1pbnV0ZXMsIHNlY29uZHMpID0+IHtcbiAgICAgICAgICBsZXQgcmVzb2x2ZWROYW1lO1xuICAgICAgICAgIGxldCByZXNvbHZlZExldmVsO1xuXG4gICAgICAgICAgaWYgKG5hbWUgJiYgbGV2ZWwpIHtcbiAgICAgICAgICAgIHJlc29sdmVkTmFtZSA9IG5hbWU7XG4gICAgICAgICAgICByZXNvbHZlZExldmVsID0gbGV2ZWw7XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLW5hbWUnLCBuYW1lKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLWxldmVsJywgbGV2ZWwpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1uYW1lJykgJiZcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLWxldmVsJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc29sdmVkTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLW5hbWUnKTtcbiAgICAgICAgICAgIHJlc29sdmVkTGV2ZWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1sZXZlbCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlZE5hbWUgPSBub25vZ3JhbXNbMF0ubmFtZTtcbiAgICAgICAgICAgIHJlc29sdmVkTGV2ZWwgPSBub25vZ3JhbXNbMF0ubGV2ZWw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxnYW1lLW5vbm9ncmFtIG5hbWU9XCIke3Jlc29sdmVkTmFtZX1cIiBsZXZlbD1cIiR7cmVzb2x2ZWRMZXZlbH1cIiAgc2F2ZWRzb2x1dGlvbj1cIiR7c2F2ZWRTb2x1dGlvbiB8fCAnJ31cIiBjcm9zc2VkPVwiJHtjcm9zc2VkIHx8ICcnfVwiIG1pbnV0ZXM9XCIke21pbnV0ZXMgfHwgJzAnfVwiIHNlY29uZHM9XCIke3NlY29uZHMgfHwgJzAnfVwiPlxuICAgICAgICAgICAgPC9nYW1lLW5vbm9ncmFtPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF07XG4gIH1cblxuICBjaGFuZ2VIYXNoKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gdXJsO1xuICB9XG5cbiAgc2hvd1JvdXRlKHBhcmFtcyA9IFtdKSB7XG4gICAgY29uc3QgbmV3UGFyYW1zID0gWy4uLnBhcmFtc107XG5cbiAgICBpZiAocGFyYW1zWzBdID09PSAncmFuZG9tJykge1xuICAgICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbm9ub2dyYW1zLmxlbmd0aCk7XG4gICAgICBjb25zdCByYW5kb21Ob25vZ3JhbSA9IG5vbm9ncmFtc1tyYW5kb21OdW1dO1xuXG4gICAgICBuZXdQYXJhbXNbMF0gPSByYW5kb21Ob25vZ3JhbS5uYW1lO1xuICAgICAgbmV3UGFyYW1zWzFdID0gcmFuZG9tTm9ub2dyYW0ubGV2ZWw7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1swXSA9PT0gJ2NvbnRpbnVlJykge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZEdhbWUnKSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKHNhdmVkKTtcblxuICAgICAgbmV3UGFyYW1zWzBdID0gc2F2ZWQubmFtZTtcbiAgICAgIG5ld1BhcmFtc1sxXSA9IHNhdmVkLmxldmVsO1xuICAgICAgbmV3UGFyYW1zWzJdID0gc2F2ZWQuY3VycmVudFNvbHV0aW9uO1xuICAgICAgbmV3UGFyYW1zWzNdID0gc2F2ZWQuY3Jvc3NlZDtcbiAgICAgIG5ld1BhcmFtc1s0XSA9IHNhdmVkLnRpbWUubWludXRlcztcbiAgICAgIG5ld1BhcmFtc1s1XSA9IHNhdmVkLnRpbWUuc2Vjb25kcztcbiAgICB9XG5cbiAgICBsZXQgbWF0Y2ggPSB0aGlzLnJvdXRlcy5maW5kKFxuICAgICAgKGl0ZW0pID0+IGl0ZW0uaGFzaCA9PT0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSlcbiAgICApO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgbWF0Y2ggPSB0aGlzLnJvdXRlcy5maW5kKChpdGVtKSA9PiBpdGVtLmhhc2ggPT09ICcnKTtcbiAgICB9XG5cbiAgICB0aGlzLmFwcC5pbm5lckhUTUwgPSBtYXRjaC52aWV3KC4uLm5ld1BhcmFtcyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQXBwUm91dGVyIH07XG4iLCJpbXBvcnQgaGVhZGVyU3R5bGVzU3RyIGZyb20gJy4vR2FtZUhlYWRlci5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IGhlYWRlclN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5oZWFkZXJTdHlsZXMudGV4dENvbnRlbnQgPSBoZWFkZXJTdHlsZXNTdHI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICA8cD5Ob25vZ3JhbXM8L3A+XG4gIDwvZGl2PiAgXG5cbmA7XG5jbGFzcyBHYW1lSGVhZGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoaGVhZGVyU3R5bGVzKTtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZUhlYWRlciB9O1xuIiwiaW1wb3J0IG1lbnVTdHlsZVN0ciBmcm9tICcuL0dhbWVNZW51LnN0eWxlcy5zY3NzJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcbmltcG9ydCB7IFJhbmRvbUJ0biB9IGZyb20gJy4vcmFuZG9tQnRuL1JhbmRvbkJ0bic7XG5pbXBvcnQgeyBDb250aW51ZUJ0biB9IGZyb20gJy4vY29udGludWVCdG4vQ29udGludWVCdG4nO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3JhbmRvbS1idG4nLCBSYW5kb21CdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb250aW51ZS1idG4nLCBDb250aW51ZUJ0bik7XG5cbmNvbnN0IG1lbnVTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xubWVudVN0eWxlcy50ZXh0Q29udGVudCA9IG1lbnVTdHlsZVN0cjtcblxuY29uc3QgbGV2ZWxzID0gWy4uLm5ldyBTZXQobm9ub2dyYW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5sZXZlbCkpXTtcblxuY29uc3QgbGV2ZWxzSFRNTCA9IGxldmVsc1xuICAubWFwKChsZXZlbCkgPT4ge1xuICAgIGNvbnN0IGdhbWVOYW1lcyA9IG5vbm9ncmFtc1xuICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5sZXZlbCA9PT0gbGV2ZWwpXG4gICAgICAubWFwKFxuICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICBgPGEgaHJlZj1cIm5vbm9ncmFtXCIgY2xhc3M9XCJtZW51X19pdGVtXCIgbGV2ZWw9XCIke2xldmVsfVwiIGdhbWUtbmFtZT1cIiR7aXRlbS5uYW1lfVwiIGRhdGEtbGluaz4ke2l0ZW0ubmFtZX08L2E+XFxuYFxuICAgICAgKVxuICAgICAgLmpvaW4oJ1xcbicpO1xuXG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwibGV2ZWxcIj5cbiAgICAgIDxoMyBjbGFzcz1cImxldmVsX190aXRsZVwiPiR7bGV2ZWx9PC9oMz5cbiAgICAgIDxkaXYgY2xhc3M9XCJsZXZlbF9fZ2FtZXNcIj5cbiAgICAgICAgJHtnYW1lTmFtZXN9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYDtcbiAgfSlcbiAgLmpvaW4oJ1xcbicpO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxyYW5kb20tYnRuPjwvcmFuZG9tLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjb250aW51ZS1idG4+PC9jb250aW51ZS1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgJHtsZXZlbHNIVE1MfWA7XG5cbmNsYXNzIEdhbWVNZW51IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKG1lbnVTdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVNZW51IH07XG4iLCJpbXBvcnQgY29udGludWVCdG5TdHlsZXNTdHIgZnJvbSAnLi9Db250aW51ZUJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IGNvbnRpbnVlQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbmNvbnRpbnVlQnRuU3R5bGVzLnRleHRDb250ZW50ID0gY29udGludWVCdG5TdHlsZXNTdHI7XG5cbmNsYXNzIENvbnRpbnVlQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJ0bi5ocmVmID0gJ25vbm9ncmFtJztcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnY29udGludWUnLCB0cnVlKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnLCB0cnVlKTtcbiAgICBidG4uaW5uZXJUZXh0ID0gJ0NvbnRpbnVlIGdhbWUnO1xuXG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWRHYW1lJykpIHtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoY29udGludWVCdG5TdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IENvbnRpbnVlQnRuIH07XG4iLCJpbXBvcnQgcmFuZG9tQnRuU3R5bGVzU3RyIGZyb20gJy4vUmFuZG9tQnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3QgcmFuZG9tQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnJhbmRvbUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IHJhbmRvbUJ0blN0eWxlc1N0cjtcblxuY2xhc3MgUmFuZG9tQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJ0bi5ocmVmID0gJ25vbm9ncmFtJztcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgncmFuZG9tJywgdHJ1ZSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rJywgdHJ1ZSk7XG4gICAgYnRuLmlubmVyVGV4dCA9ICdSYW5kb20nO1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcbiAgICBzaGFkb3dSb290LmFwcGVuZChyYW5kb21CdG5TdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IFJhbmRvbUJ0biB9O1xuIiwiaW1wb3J0IG5vbm9ncmFtU3R5bGVzU3RyIGZyb20gJy4vR2FtZU5vbm9ncmFtLnN0eWxlcy5zY3NzJztcbmltcG9ydCB7IEdhbWVGaWVsZCB9IGZyb20gJy4vZ2FtZUZpZWxkL0dhbWVGaWVsZCc7XG5pbXBvcnQgeyBSZXN0YXJ0QnRuIH0gZnJvbSAnLi9yZXN0YXJ0QnRuL1Jlc3RhcnRCdG4nO1xuaW1wb3J0IHsgU29sdXRpb25CdG4gfSBmcm9tICcuL3NvbHV0aW9uQnRuL1NvbHV0aW9uQnRuJztcbmltcG9ydCB7IFNhdmVCdG4gfSBmcm9tICcuL3NhdmVCdG4vU2F2ZUJ0bic7XG5pbXBvcnQgeyBHYW1lVGltZXIgfSBmcm9tICcuL2dhbWVUaW1lci9HYW1lVGltZXInO1xuaW1wb3J0IG5vbm9ncmFtcyBmcm9tICcuLi8uLi9yZXNvdXJjZXMvbm9ub2dyYW1zLmpzb24nO1xuaW1wb3J0IHdpblNvdW5kRmlsZSBmcm9tICcuLy4uLy4uL2Fzc2V0cy9zb3VuZC1lZmZlY3RzL3dpbi1nYW1lLm1wMyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS1maWVsZCcsIEdhbWVGaWVsZCk7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3Jlc3RhcnQtYnRuJywgUmVzdGFydEJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NvbHV0aW9uLWJ0bicsIFNvbHV0aW9uQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc2F2ZS1idG4nLCBTYXZlQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS10aW1lcicsIEdhbWVUaW1lcik7XG5cbmNvbnN0IG5vbm9ncmFtU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbm5vbm9ncmFtU3R5bGVzLnRleHRDb250ZW50ID0gbm9ub2dyYW1TdHlsZXNTdHI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPGRpdiBjbGFzcz1cIm5vbm9ncmFtX19jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPlxuICAgICAgPHJlc3RhcnQtYnRuPjwvcmVzdGFydC1idG4+XG4gICAgICA8c2F2ZS1idG4+PC9zYXZlLWJ0bj5cbiAgICAgIDxzb2x1dGlvbi1idG4+PC9zb2x1dGlvbi1idG4+XG4gICAgICA8Z2FtZS10aW1lciBpZD1cImdhbWUtdGltZXJcIiBtaW51dGVzPVwiMFwiIHNlY29uZHM9XCIwXCI+PC9nYW1lLXRpbWVyPlxuICAgICAgPGEgaHJlZj1cIlwiIGRhdGEtbGluaz5NZW51PC9hPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBpZD1cInN1bW1hcnlcIiBjbGFzcz1cInN1bW1hcnlcIj5cbiAgICAgIDwvZGl2PiAgXG4gICAgXG4gICAgPGRpdiBjbGFzcz1cIm5vbm9ncmFtX193cmFwcGVyXCI+XG4gICAgICA8ZGl2IGlkPVwibm9ub2dyYW1cIiBjbGFzcz1cIm5vbm9ncmFtXCI+XG4gICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvcC1wYW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LXBhbmVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PiAgXG4gICAgXG4gIDwvZGl2PlxuYDtcblxuY2xhc3MgR2FtZU5vbm9ncmFtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKG5vbm9ncmFtU3R5bGVzKTtcblxuICAgIGNvbnN0IGxldmVsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xldmVsJyk7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gICAgY29uc3Qgc2F2ZWRTb2x1dGlvbiA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzYXZlZHNvbHV0aW9uJyk7XG4gICAgY29uc3QgY3Jvc3NlZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdjcm9zc2VkJyk7XG5cbiAgICBjb25zdCB0aW1lciA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI2dhbWUtdGltZXInKTtcbiAgICBjb25zb2xlLmxvZygnbm9ub2dyYW0gYWRkZWQgdG8gdGhlIGRvYycpO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKSAhPT0gJzAnIHx8XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpICE9PSAnMCdcbiAgICApIHtcbiAgICAgIGNvbnN0IHNhdmVkTWludXRlcyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdtaW51dGVzJyk7XG4gICAgICBjb25zdCBzYXZlZFNlY29uZHMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpO1xuXG4gICAgICB0aW1lci5zZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnLCBzYXZlZE1pbnV0ZXMpO1xuICAgICAgdGltZXIuc2V0QXR0cmlidXRlKCdzZWNvbmRzJywgc2F2ZWRTZWNvbmRzKTtcblxuICAgICAgdGltZXIuY29udGludWUgPSB0cnVlO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ3N1bW1hcnknKS5pbm5lckhUTUwgPSBgXG4gICAgICA8cCBjbGFzcz1cInN1bW1hcnlfX2xldmVsXCI+JHtsZXZlbH08L3A+XG4gICAgICA8cCBjbGFzcz1cInN1bW1hcnlfX25hbWVcIj4gJHtuYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpfTwvcD5cbiAgICBgO1xuXG4gICAgY29uc3Qgbm9ub2dyYW0gPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNub25vZ3JhbScpO1xuICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ2FtZS1maWVsZCcpO1xuICAgIGZpZWxkLmlkID0gJ2dhbWUtZmllbGQnO1xuICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2dhbWUtZmllbGQnKTtcbiAgICBmaWVsZC5zYXZlZFNvbHV0aW9uID0gc2F2ZWRTb2x1dGlvbjtcbiAgICBmaWVsZC5jcm9zc2VkID0gY3Jvc3NlZDtcbiAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2xldmVsJywgbGV2ZWwpO1xuXG4gICAgbm9ub2dyYW0uYXBwZW5kKGZpZWxkKTtcblxuICAgIGNvbnN0IHsgbWF0cml4IH0gPSBub25vZ3JhbXMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IG5hbWUgJiYgaXRlbS5sZXZlbCA9PT0gbGV2ZWxcbiAgICApO1xuXG4gICAgY29uc3QgY29ycmVjdFNvbHV0aW9uID0gbWF0cml4LmZsYXQoKS5qb2luKCcnKS50b1N0cmluZygpO1xuXG4gICAgLy8gRHJhdyBtYXRyaXggc29sdXRpb25cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgbWF0cml4LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBzdHIgKz0gZWwucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gY3VyciA/ICfilqAnIDogJ+KWoSc7XG4gICAgICAgIHJldHVybiBhY2MgKyBzcXVhcmU7XG4gICAgICB9LCAnJyk7XG4gICAgICBzdHIgKz0gJ1xcbic7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coc3RyKTtcblxuICAgIGNvbnN0IHRvcFBhbmUgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy50b3AtcGFuZScpO1xuICAgIGNvbnN0IGxlZnRQYW5lID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubGVmdC1wYW5lJyk7XG4gICAgbGV0IG1heExlZnRIaW50cyA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbGVmdEhpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGxlZnRIaW50LmNsYXNzTGlzdC5hZGQoJ2xlZnQtcGFuZV9faGludCcpO1xuXG4gICAgICBjb25zdCB0b3BIaW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b3BIaW50LmNsYXNzTGlzdC5hZGQoJ3RvcC1wYW5lX19oaW50Jyk7XG5cbiAgICAgIGxldCBjb3VudGVyTGVmdCA9IDA7XG4gICAgICBsZXQgY291bnRlclRvcCA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4Lmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChtYXRyaXhbaV1bal0pIHtcbiAgICAgICAgICBjb3VudGVyTGVmdCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChjb3VudGVyTGVmdCAmJiAhbWF0cml4W2ldW2pdKSB8fFxuICAgICAgICAgIChjb3VudGVyTGVmdCAmJiBqID09PSBtYXRyaXgubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGVmdEhpbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAgICAgICBgXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsZWZ0LXBhbmVfX251bWJlclwiPiR7Y291bnRlckxlZnR9PC9kaXY+XG5cdFx0XHRcdFx0XHRgXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvdW50ZXJMZWZ0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRyaXhbal1baV0pIHtcbiAgICAgICAgICBjb3VudGVyVG9wICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgKGNvdW50ZXJUb3AgJiYgIW1hdHJpeFtqXVtpXSkgfHxcbiAgICAgICAgICAoY291bnRlclRvcCAmJiBqID09PSBtYXRyaXgubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdG9wSGludC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgICAgIGBcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ0b3AtcGFuZV9fbnVtYmVyXCI+JHtjb3VudGVyVG9wfTwvZGl2PlxuXHRcdFx0XHRcdFx0YFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb3VudGVyVG9wID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZWZ0UGFuZS5hcHBlbmQobGVmdEhpbnQpO1xuICAgICAgdG9wUGFuZS5hcHBlbmQodG9wSGludCk7XG5cbiAgICAgIGlmIChsZWZ0SGludC5jaGlsZHJlbi5sZW5ndGggPiBtYXhMZWZ0SGludHMpIHtcbiAgICAgICAgbWF4TGVmdEhpbnRzID0gbGVmdEhpbnQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSBjZWxsIHNpemVcbiAgICBjb25zdCBub25vZ3JhbVdpZHRoID0gbm9ub2dyYW0ub2Zmc2V0V2lkdGg7XG5cbiAgICBsZXQgY2VsbFNpemUgPSBub25vZ3JhbVdpZHRoIC8gKG1heExlZnRIaW50cyArIG1hdHJpeC5sZW5ndGgpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jZWxsLXNpemUnLCBjZWxsU2l6ZSArICdweCcpO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdmaWxsJywgKCkgPT4ge1xuICAgICAgaWYgKGNvcnJlY3RTb2x1dGlvbiA9PT0gZmllbGQuY3VycmVudFNvbHV0aW9uKSB7XG4gICAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd3aW4nKSk7XG4gICAgICAgIHRpbWVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd3aW4nKSk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSB0aW1lci5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKTtcblxuICAgICAgICBsZXQgbWludXRlc1N0ciA9ICcnO1xuICAgICAgICBpZiAoISttaW51dGVzKSB7XG4gICAgICAgICAgbWludXRlc1N0ciA9ICcnO1xuICAgICAgICB9IGVsc2UgaWYgKCttaW51dGVzID4gMSkge1xuICAgICAgICAgIG1pbnV0ZXNTdHIgKz0gJ21pbnV0ZXMgJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtaW51dGVzU3RyICs9ICdtaW51dGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVyLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpO1xuICAgICAgICBsZXQgc2Vjb25kc1N0ciA9ICFzZWNvbmRzIHx8IGAke3NlY29uZHN9IHNlY29uZGA7XG4gICAgICAgIHNlY29uZHNTdHIgPSArc2Vjb25kcyA+IDEgPyBzZWNvbmRzU3RyICsgJ3MnIDogc2Vjb25kc1N0cjtcblxuICAgICAgICBuZXcgQXVkaW8od2luU291bmRGaWxlKS5wbGF5KCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYEdyZWF0ISBZb3UgaGF2ZSBzb2x2ZWQgdGhlIG5vbm9ncmFtICR7bmFtZVswXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKX0gaW4gJHttaW51dGVzU3RyfSR7c2Vjb25kc1N0cn0hYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdyZXN0YXJ0JywgKCkgPT4ge1xuICAgICAgZmllbGQudGltZXJTdGFydGVkID0gZmFsc2U7XG4gICAgICBmaWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgncmVzdGFydCcpKTtcbiAgICAgIHRpbWVyLnJlc3RhcnQoKTtcbiAgICB9KTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignc29sdXRpb24nLCAoKSA9PiB7XG4gICAgICB0aW1lci5zdG9wKCk7XG5cbiAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc29sdXRpb24nLCB7XG4gICAgICAgICAgZGV0YWlsOiBtYXRyaXguZmxhdCgpLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignc2F2ZS1nYW1lJywgKCkgPT4ge1xuICAgICAgY29uc3QgZ2FtZSA9IHtcbiAgICAgICAgbGV2ZWwsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGN1cnJlbnRTb2x1dGlvbjogZmllbGQuY3VycmVudFNvbHV0aW9uLFxuICAgICAgICBjcm9zc2VkOiBmaWVsZC5jdXJyZW50Q3Jvc3NlZCxcbiAgICAgICAgdGltZToge1xuICAgICAgICAgIG1pbnV0ZXM6IHRpbWVyLm1pbnV0ZXMsXG4gICAgICAgICAgc2Vjb25kczogdGltZXIuc2Vjb25kcyxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzYXZlZEdhbWUnLCBKU09OLnN0cmluZ2lmeShnYW1lKSk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3N0YXJ0dGltZXInLCAoKSA9PiB7XG4gICAgICB0aW1lci5sYXVuY2goKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lTm9ub2dyYW0gfTtcbiIsImltcG9ydCBmaWVsZFN0eWxlc1N0ciBmcm9tICcuL0dhbWVGaWVsZC5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgZmlsbFNvdW5kRmlsZSBmcm9tICcuLy4uLy4uLy4uL2Fzc2V0cy9zb3VuZC1lZmZlY3RzL2ZpbGwtY2VsbC5tcDMnO1xuaW1wb3J0IGNsZWFyU291bmRGaWxlIGZyb20gJy4vLi4vLi4vLi4vYXNzZXRzL3NvdW5kLWVmZmVjdHMvY2xlYXItY2VsbC5tcDMnO1xuaW1wb3J0IGNyb3NzU291bmRGaWxlIGZyb20gJy4vLi4vLi4vLi4vYXNzZXRzL3NvdW5kLWVmZmVjdHMvY3Jvc3MtY2VsbC5tcDMnO1xuXG5jb25zdCBmaWVsZFN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5maWVsZFN0eWxlcy50ZXh0Q29udGVudCA9IGZpZWxkU3R5bGVzU3RyO1xuXG5jbGFzcyBHYW1lRmllbGQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZChmaWVsZFN0eWxlcyk7XG5cbiAgICB0aGlzLmxldmVsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xldmVsJykuc3BsaXQoJ3gnKVswXTtcblxuICAgIHRoaXMuZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmZpZWxkLmlkID0gJ2ZpZWxkJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZXZlbDsgaSArPSAxKSB7XG4gICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGV2ZWw7IGogKz0gMSkge1xuICAgICAgICByb3cuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5gKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmllbGQuYXBwZW5kKHJvdyk7XG4gICAgfVxuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGhpcy5maWVsZCk7XG5cbiAgICB0aGlzLmNlbGxzID0gdGhpcy5maWVsZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuXG4gICAgdGhpcy5jdXJyZW50U29sdXRpb24gPVxuICAgICAgdGhpcy5zYXZlZFNvbHV0aW9uIHx8IG5ldyBBcnJheSh0aGlzLmNlbGxzLmxlbmd0aCkuZmlsbCgwKS5qb2luKCcnKTtcblxuICAgIGlmICh0aGlzLnNhdmVkU29sdXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zYXZlZFNvbHV0aW9uW2ldID09PSAnMScpIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jcm9zc2VkKSB7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY3Jvc3NlZFtpXSA9PT0gJ3gnKSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjcm9zc2VkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2xpY2tzRGlzYWJsZWQpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2xpY2tzRGlzYWJsZWQpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpO1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZmlsbGVkJyk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpbGxlZCcpKSB7XG4gICAgICAgIG5ldyBBdWRpbyhmaWxsU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgQXVkaW8oY2xlYXJTb3VuZEZpbGUpLnBsYXkoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja1NvbHV0aW9uKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcpO1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnY3Jvc3NlZCcpO1xuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjcm9zc2VkJykpIHtcbiAgICAgICAgbmV3IEF1ZGlvKGNyb3NzU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgQXVkaW8oY2xlYXJTb3VuZEZpbGUpLnBsYXkoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja1NvbHV0aW9uKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGltZXJTdGFydGVkKSByZXR1cm47XG4gICAgICB0aGlzLnRpbWVyU3RhcnRlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuZmllbGQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzdGFydHRpbWVyJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRpbWVyU3RhcnRlZCkgcmV0dXJuO1xuICAgICAgdGhpcy50aW1lclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc3RhcnR0aW1lcicsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigncmVzdGFydCcsICgpID0+IHtcbiAgICAgIHRoaXMuZW5hYmxlQ2xpY2tzKCk7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJywgJ2Nyb3NzZWQnKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3NvbHV0aW9uJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUNsaWNrcygpO1xuXG4gICAgICBjb25zdCBzb2x1dGlvbiA9IGUuZGV0YWlsO1xuXG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgICAgaWYgKHNvbHV0aW9uW2ldKSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJyk7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nyb3NzZWQnKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignd2luJywgKCkgPT4ge1xuICAgICAgdGhpcy5kaXNhYmxlQ2xpY2tzKCk7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrU29sdXRpb24oKSB7XG4gICAgdGhpcy5jdXJyZW50U29sdXRpb24gPSBbLi4udGhpcy5jZWxsc10ucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgIHJldHVybiBjdXJyLmNsYXNzTGlzdC5jb250YWlucygnZmlsbGVkJykgPyBhY2MgKyAnMScgOiBhY2MgKyAnMCc7XG4gICAgfSwgJycpO1xuXG4gICAgdGhpcy5jdXJyZW50Q3Jvc3NlZCA9IFsuLi50aGlzLmNlbGxzXS5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgcmV0dXJuIGN1cnIuY2xhc3NMaXN0LmNvbnRhaW5zKCdjcm9zc2VkJykgPyBhY2MgKyAneCcgOiBhY2MgKyAnMCc7XG4gICAgfSwgJycpO1xuXG4gICAgdGhpcy5maWVsZC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdmaWxsJywge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGRpc2FibGVDbGlja3MoKSB7XG4gICAgdGhpcy5jbGlja3NEaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICBlbmFibGVDbGlja3MoKSB7XG4gICAgdGhpcy5jbGlja3NEaXNhYmxlZCA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVGaWVsZCB9O1xuIiwiaW1wb3J0IHRpbWVyU3R5bGVzU3RyIGZyb20gJy4vR2FtZVRpbWVyLnN0eWxlcy5zY3NzJztcblxuY29uc3QgdGltZXJTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xudGltZXJTdHlsZXMudGV4dENvbnRlbnQgPSB0aW1lclN0eWxlc1N0cjtcblxuY2xhc3MgR2FtZVRpbWVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmFwcGVuZCh0aW1lclN0eWxlcyk7XG5cbiAgICBpZiAoIXRoaXMucmVuZGVyZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLnJlbmRlcmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3dpbicsICgpID0+IHRoaXMuc3RvcCgpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgbWludXRlcyA9XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpLmxlbmd0aCA9PT0gMVxuICAgICAgICA/IGAwJHt0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpfWBcbiAgICAgICAgOiB0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpO1xuXG4gICAgbGV0IHNlY29uZHMgPVxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKS5sZW5ndGggPT09IDFcbiAgICAgICAgPyBgMCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKX1gXG4gICAgICAgIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKTtcblxuICAgIGNvbnN0IGR1cmF0aW9uID0gYCR7bWludXRlc306JHtzZWNvbmRzfWA7XG5cbiAgICB0aGlzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICAgIHRoaXMuc2Vjb25kcyA9IHNlY29uZHM7XG4gICAgdGhpcy5jdXJyZW50RHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICB0aGlzLmlubmVySFRNTCA9IGR1cmF0aW9uO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnbWludXRlcycsICdzZWNvbmRzJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGxhdW5jaCgpIHtcbiAgICBpZiAodGhpcy5jb250aW51ZSkge1xuICAgICAgY29uc3QgdGltZSA9IHRoaXMuY3VycmVudER1cmF0aW9uLnNwbGl0KCc6Jyk7XG4gICAgICBjb25zdCBtaW4gPSArdGltZVswXTtcbiAgICAgIGNvbnN0IHNlYyA9ICt0aW1lWzFdO1xuXG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCkgLSAobWluICogNjAgKyBzZWMpICogMTAwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKTtcblxuICAgIHRoaXMuaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGgudHJ1bmMoKG5vdyAtIHRoaXMuc3RhcnRUaW1lKSAvIDEwMDApO1xuXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2Vjb25kcycsIGR1cmF0aW9uICUgNjApO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnLCBNYXRoLmZsb29yKGR1cmF0aW9uIC8gNjApKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xuICB9XG5cbiAgcmVzdGFydCgpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XG4gICAgdGhpcy5jb250aW51ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlY29uZHMnLCAnMCcpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtaW51dGVzJywgJzAnKTtcblxuICAgIHRoaXMuc3RvcCgpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZVRpbWVyIH07XG4iLCJpbXBvcnQgcmVzdGFydEJ0blN0eWxlc1N0ciBmcm9tICcuL1Jlc3RhcnRCdG4uc3R5bGVzLnNjc3MnO1xuXG5jb25zdCByZXN0YXJ0QnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnJlc3RhcnRCdG5TdHlsZXMudGV4dENvbnRlbnQgPSByZXN0YXJ0QnRuU3R5bGVzU3RyO1xuXG5jbGFzcyBSZXN0YXJ0QnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+UmVzdGFydCBnYW1lPC9kaXY+XG4gICAgYDtcbiAgICBzaGFkb3dSb290LmFwcGVuZChyZXN0YXJ0QnRuU3R5bGVzKTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQub25jbGljayA9ICgpID0+IHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdyZXN0YXJ0Jywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IHsgUmVzdGFydEJ0biB9O1xuIiwiaW1wb3J0IHNhdmVCdG5TdHlsZXNTdHIgZnJvbSAnLi9TYXZlQnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3Qgc2F2ZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5zYXZlQnRuU3R5bGVzLnRleHRDb250ZW50ID0gc2F2ZUJ0blN0eWxlc1N0cjtcblxuY2xhc3MgU2F2ZUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvblwiPlNhdmUgZ2FtZTwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoc2F2ZUJ0blN0eWxlcyk7XG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLmN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzYXZlLWdhbWUnLCB7IGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IFNhdmVCdG4gfTtcbiIsImltcG9ydCBzb2x1dGlvbkJ0blN0eWxlc1N0ciBmcm9tICcuL1NvbHV0aW9uQnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3Qgc29sdXRpb25CdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuc29sdXRpb25CdG5TdHlsZXMudGV4dENvbnRlbnQgPSBzb2x1dGlvbkJ0blN0eWxlc1N0cjtcblxuY2xhc3MgU29sdXRpb25CdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIj5Tb2x1dGlvbjwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoc29sdXRpb25CdG5TdHlsZXMpO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgIGUuY3VycmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NvbHV0aW9uJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IHsgU29sdXRpb25CdG4gfTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIENvbG9yc1xuXG4kY29sb3ItYmFja2dyb3VuZDogI2ZiZjNmMjtcbiRjb2xvci1hY2NlbnQ6ICMxYzc2OGY7XG4kY29sb3ItYWNjZW50LXNlY29uZGFyeS0xOiAjZmE5OTFjO1xuJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMjogI2ZhMWM2NjtcbiRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTM6ICM2MjFjZmE7XG5cbiRjb2xvci10ZXh0LW1haW46ICMyNjI2MjY7XG4kY29sb3ItdGV4dC1yZXZlcnNlOiAjZmZmZmZmO1xuXG4vLyBTaXplc1xuXG46cm9vdCB7XG4gIC0tY2VsbC1zaXplOiBhdXRvO1xufVxuXG4vLyBGb250c1xuXG4kZm9udC1tYWluOiAnU2lnbmlrYSBOZWdhdGl2ZScsIHNhbnMtc2VyaWY7XG4iLCJAdXNlICcuLy4uL2Fic3RyYWN0L21peGlucycgYXMgKjtcbkB1c2UgJy4vLi4vYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuXG4qIHtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuaHRtbCB7XG5cdHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xufVxuXG5ib2R5IHtcblx0YmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWJhY2tncm91bmQ7XG5cdHVzZXItc2VsZWN0OiBub25lO1xuXG5cdCYuc2Nyb2xsLWRpc2FibGVkIHtcblx0XHRoZWlnaHQ6IDEwMCU7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0fVxufVxuXG4ud3JhcHBlciB7XG5cdG1heC13aWR0aDogMTQ0MHB4O1xuXHRwYWRkaW5nOiAwIDQwcHg7XG5cdG1hcmdpbjogMCBhdXRvO1xuXG5cdEBpbmNsdWRlIG1heC01NzYge1xuXHRcdHBhZGRpbmc6IDAgNC4yMTA1MiU7XG5cdH1cbn1cblxuLnNlY3Rpb24ge1xuXHRtYXJnaW4tYm90dG9tOiAxMDBweDtcbn1cblxuaW1nIHtcblx0bWF4LXdpZHRoOiAxMDAlO1xufVxuXG4udHJhbnNwYXJlbnQge1xuXHRvcGFjaXR5OiAwO1xufVxuXG46aG9zdCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufVxuIiwiLyogRm9yIG1lZGlhIHF1ZXJpZXMgKi9cblxuQG1peGluIG1heC0xMjAwIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtaW4tMTAyNCB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMDI0cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTEwMjQge1xuICBAbWVkaWEgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1heC03Njgge1xuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTU3NiB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtYXgtMzgwIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDM4MHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIHBvcnRyYWl0IHtcbiAgQG1lZGlhIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuIiwiQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi9zdHlsZXMvbGF5b3V0L2Jhc2ljJyBhcyAqO1xuXG46aG9zdCB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgYmFja2dyb3VuZDogJGNvbG9yLWFjY2VudDtcblxuICAqIHtcbiAgICBjb2xvcjogJGNvbG9yLWJhY2tncm91bmQ7XG4gIH1cbn1cbiIsIi5hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAyMHB4O1xufVxuIiwiQHVzZSAnLi8uLi9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbi5idXR0b24ge1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcblxuICBjb2xvcjogJGNvbG9yLXRleHQtcmV2ZXJzZTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYWNjZW50LXNlY29uZGFyeS0xO1xuXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG5cbiAgdHJhbnNpdGlvbjogMC4zcztcblxuICAmOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDEyMCUpO1xuICB9XG5cbiAgJi5kaXNhYmxlZCB7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIGZpbHRlcjogb3BhY2l0eSgwLjYpIGdyYXlzY2FsZSgwLjUpO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICBmaWx0ZXI6IG9wYWNpdHkoMC42KSBncmF5c2NhbGUoMC41KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMjtcbn1cbiIsIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cblxuLyogRG9jdW1lbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXG4gKi9cblxuaHRtbCB7XG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xufVxuXG4vKiBTZWN0aW9uc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cbiAqL1xuXG5tYWluIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cbiAqL1xuXG5oMSB7XG4gIGZvbnQtc2l6ZTogMmVtO1xuICBtYXJnaW46IDAuNjdlbSAwO1xufVxuXG4vKiBHcm91cGluZyBjb250ZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cbiAqL1xuXG5ociB7XG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXG4gIGhlaWdodDogMDsgLyogMSAqL1xuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxucHJlIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXG59XG5cbnAge1xuICBtYXJnaW46IDA7XG59XG5cbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cbiAqL1xuXG5hIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuXG51bCB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuLyoqXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5hYmJyW3RpdGxlXSB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5iLFxuc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmNvZGUsXG5rYmQsXG5zYW1wIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc21hbGwge1xuICBmb250LXNpemU6IDgwJTtcbn1cblxuLyoqXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cbiAqIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdWIsXG5zdXAge1xuICBmb250LXNpemU6IDc1JTtcbiAgbGluZS1oZWlnaHQ6IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG5zdWIge1xuICBib3R0b206IC0wLjI1ZW07XG59XG5cbnN1cCB7XG4gIHRvcDogLTAuNWVtO1xufVxuXG4vKiBFbWJlZGRlZCBjb250ZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbn1cblxuLyogRm9ybXNcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXG4gKi9cblxuYnV0dG9uLFxuaW5wdXQsXG5vcHRncm91cCxcbnNlbGVjdCxcbnRleHRhcmVhIHtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIG1hcmdpbjogMDsgLyogMiAqL1xufVxuXG5idXR0b24ge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG59XG5cbi8qKlxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxuICovXG5cbmJ1dHRvbixcbmlucHV0IHtcbiAgLyogMSAqL1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b24sXG5zZWxlY3Qge1xuICAvKiAxICovXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXG4gKi9cblxuYnV0dG9uLFxuW3R5cGU9J2J1dHRvbiddLFxuW3R5cGU9J3Jlc2V0J10sXG5bdHlwZT0nc3VibWl0J10ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcbiAgYXBwZWFyYW5jZTogYnV0dG9uO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9J2J1dHRvbiddOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9J3Jlc2V0J106Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT0nc3VibWl0J106Oi1tb3otZm9jdXMtaW5uZXIge1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi8qKlxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxuICovXG5cbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcblt0eXBlPSdidXR0b24nXTotbW96LWZvY3VzcmluZyxcblt0eXBlPSdyZXNldCddOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9J3N1Ym1pdCddOi1tb3otZm9jdXNyaW5nIHtcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cbiAqL1xuXG5maWVsZHNldCB7XG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxubGVnZW5kIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cbiAgcGFkZGluZzogMDsgLyogMyAqL1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cbiAqL1xuXG5wcm9ncmVzcyB7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cbiAqL1xuXG50ZXh0YXJlYSB7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxuICovXG5cblt0eXBlPSdjaGVja2JveCddLFxuW3R5cGU9J3JhZGlvJ10ge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXG4gKi9cblxuW3R5cGU9J251bWJlciddOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuW3R5cGU9J251bWJlciddOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXG4gKi9cblxuW3R5cGU9J3NlYXJjaCddIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxuICovXG5cblt0eXBlPSdzZWFyY2gnXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxuICovXG5cbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xuICBmb250OiBpbmhlcml0OyAvKiAyICovXG59XG5cbi8qIEludGVyYWN0aXZlXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cbiAqL1xuXG5kZXRhaWxzIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3VtbWFyeSB7XG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcbn1cblxuLyogTWlzY1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXG4gKi9cblxudGVtcGxhdGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxuICovXG5cbltoaWRkZW5dIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Jhc2Uvbm9ybWFsaXplJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvbWl4aW5zJyBhcyAqO1xuXG46aG9zdCB7XG4gICoge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cbn1cblxuLmFjdGlvbnMge1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuXG4gIHdpZHRoOiAxMDAlO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLm5vbm9ncmFtIHtcbiAgJl9fY29udGFpbmVyIHtcbiAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMCUpO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgfVxuXG4gICZfX3dyYXBwZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZsZXgtZ3JvdzogMTtcblxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gIHdpZHRoOiA0MCU7XG5cbiAgQGluY2x1ZGUgbWF4LTEyMDAge1xuICAgIHdpZHRoOiA1MCU7XG4gIH1cblxuICBAaW5jbHVkZSBwb3J0cmFpdCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICBAaW5jbHVkZSBtYXgtNzY4IHtcbiAgICBmb250LXNpemU6IG1pbihjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAwLjgpLCAycmVtKTtcbiAgfVxuXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczpcbiAgICBhdXRvXG4gICAgMWZyIDFmcjtcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcbiAgICAnYSBiIGInXG4gICAgJ2MgZCBkJ1xuICAgICdjIGQgZCc7XG59XG5cbi5zdW1tYXJ5IHtcbiAgcGFkZGluZzogMTBweDtcblxuICBncmlkLWFyZWE6IGE7XG5cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMTZweDtcblxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi50b3AtcGFuZSB7XG4gIGdyaWQtYXJlYTogYjtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuXG4gIGRpc3BsYXk6IGZsZXg7XG5cbiAgYm9yZGVyLXRvcDogMXB4ICMwMDAgc29saWQ7XG4gIGJvcmRlci1yaWdodDogMXB4ICMwMDAgc29saWQ7XG4gIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwMWY7XG5cbiAgJl9faGludCB7XG4gICAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cbiAgICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgICBib3JkZXItcmlnaHQ6IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICAgICY6bnRoLWNoaWxkKDVuKTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICAgIGJvcmRlci1yaWdodDogMnB4ICMwMDAwMDAgc29saWQ7XG4gICAgfVxuICB9XG5cbiAgJl9fbnVtYmVyIHtcbiAgICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG59XG5cbi5sZWZ0LXBhbmUge1xuICB3aWR0aDogMTAwJTtcbiAgZ3JpZC1hcmVhOiBjO1xuXG4gIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItYm90dG9tOiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLWxlZnQ6IDFweCAjMDAwIHNvbGlkO1xuXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDAxZjtcblxuICAmX19oaW50IHtcbiAgICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuXG4gICAgYm9yZGVyLXRvcDogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCAjMDAwIHNvbGlkO1xuXG4gICAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4ICMwMDAwMDAgc29saWQ7XG4gICAgfVxuICB9XG5cbiAgJl9fbnVtYmVyIHtcbiAgICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cbn1cblxuZ2FtZS1maWVsZCB7XG4gIGdyaWQtYXJlYTogZDtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Jhc2Uvbm9ybWFsaXplJyBhcyAqO1xuXG46aG9zdCB7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYm9yZGVyOiAxcHggIzAwMDAwMCBzb2xpZDtcblxuICAqIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZmFjO1xufVxuXG4ucm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuXG4gICY6bnRoLWNoaWxkKDVuKTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICBib3JkZXItYm90dG9tOiAycHggIzAwMDAwMCBzb2xpZDtcbiAgfVxufVxuXG4uY2VsbCB7XG4gIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XG4gIGJvcmRlcjogMXB4ICMwMDAwMDAgc29saWQ7XG5cbiAgdHJhbnNpdGlvbjogMC4ycztcblxuICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgYm9yZGVyLXJpZ2h0OiAycHggIzAwMDAwMCBzb2xpZDtcbiAgfVxuXG4gICYuZmlsbGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICB9XG5cbiAgJi5jcm9zc2VkIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAmOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIGxlZnQ6IDUwJTtcblxuICAgICAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDAuOSk7XG4gICAgICBoZWlnaHQ6IDNweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG5cbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHJvdGF0ZSg0NWRlZyk7XG4gICAgfVxuICAgICY6OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICBsZWZ0OiA1MCU7XG5cbiAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAwLjkpO1xuICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSByb3RhdGUoLTQ1ZGVnKTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMztcbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4vc3R5bGVzL21haW4uc2Nzcyc7XG5pbXBvcnQgeyBBcHBSb3V0ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvYXBwLXJvdXRlci9BcHBSb3V0ZXInO1xuaW1wb3J0IHsgR2FtZUhlYWRlciB9IGZyb20gJy4vY29tcG9uZW50cy9nYW1lSGVhZGVyL0dhbWVIZWFkZXInO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtaGVhZGVyJywgR2FtZUhlYWRlcik7XG5cbmRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAnYWZ0ZXJiZWdpbicsXG4gIGBcblx0XHQ8Z2FtZS1oZWFkZXI+PC9nYW1lLWhlYWRlcj5cblx0XHQ8bWFpbiBpZD1cIm1haW5cIiBjbGFzcz1cIm1haW4gd3JhcHBlclwiPlxuXHRcdDwvbWFpbj5cblx0YFxuKTtcblxuY29uc3Qgcm91dGVyID0gbmV3IEFwcFJvdXRlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgZGVlcGVzdEVsID0gZS5jb21wb3NlZFBhdGgoKVswXTtcblxuICAgIGlmIChkZWVwZXN0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRlZXBlc3RFbC5tYXRjaGVzKCdbZGF0YS1saW5rXScpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByb3V0ZXIuY2hhbmdlSGFzaChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuXG4gICAgICBsZXQgcGFyYW1zID0gW107XG4gICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnaHJlZicpID09PSAnbm9ub2dyYW0nKSB7XG4gICAgICAgIGlmIChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdnYW1lLW5hbWUnKSkge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2dhbWUtbmFtZScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdsZXZlbCcpKSB7XG4gICAgICAgICAgcGFyYW1zLnB1c2goZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGRlZXBlc3RFbC5tYXRjaGVzKCdbcmFuZG9tXScpKSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKCdyYW5kb20nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRlZXBlc3RFbC5tYXRjaGVzKCdbY29udGludWVdJykpIHtcbiAgICAgICAgcGFyYW1zLnB1c2goJ2NvbnRpbnVlJyk7XG4gICAgICB9XG5cbiAgICAgIHJvdXRlci5zaG93Um91dGUocGFyYW1zKTtcbiAgICB9XG4gIH0pO1xuXG4gIHdpbmRvdy5vbnBvcHN0YXRlID0gKCkgPT4ge1xuICAgIHJvdXRlci5zaG93Um91dGUoKTtcbiAgfTtcblxuICByb3V0ZXIuc2hvd1JvdXRlKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJHYW1lTWVudSIsIkdhbWVOb25vZ3JhbSIsIm5vbm9ncmFtcyIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiQXBwUm91dGVyIiwiY29uc3RydWN0b3IiLCJhcHAiLCJyb3V0ZXMiLCJoYXNoIiwidmlldyIsIm5hbWUiLCJsZXZlbCIsInNhdmVkU29sdXRpb24iLCJjcm9zc2VkIiwibWludXRlcyIsInNlY29uZHMiLCJyZXNvbHZlZE5hbWUiLCJyZXNvbHZlZExldmVsIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJjaGFuZ2VIYXNoIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJzaG93Um91dGUiLCJwYXJhbXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJuZXdQYXJhbXMiLCJyYW5kb21OdW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21Ob25vZ3JhbSIsInNhdmVkIiwiSlNPTiIsInBhcnNlIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRTb2x1dGlvbiIsInRpbWUiLCJtYXRjaCIsImZpbmQiLCJpdGVtIiwic2xpY2UiLCJpbm5lckhUTUwiLCJoZWFkZXJTdHlsZXNTdHIiLCJoZWFkZXJTdHlsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRlbXBsYXRlIiwiR2FtZUhlYWRlciIsIkhUTUxFbGVtZW50IiwiY29ubmVjdGVkQ2FsbGJhY2siLCJzaGFkb3dSb290IiwiYXR0YWNoU2hhZG93IiwibW9kZSIsImFwcGVuZCIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJtZW51U3R5bGVTdHIiLCJSYW5kb21CdG4iLCJDb250aW51ZUJ0biIsIm1lbnVTdHlsZXMiLCJsZXZlbHMiLCJTZXQiLCJtYXAiLCJsZXZlbHNIVE1MIiwiZ2FtZU5hbWVzIiwiZmlsdGVyIiwiam9pbiIsImNvbnRpbnVlQnRuU3R5bGVzU3RyIiwiY29udGludWVCdG5TdHlsZXMiLCJidG4iLCJocmVmIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiaW5uZXJUZXh0IiwicmFuZG9tQnRuU3R5bGVzU3RyIiwicmFuZG9tQnRuU3R5bGVzIiwibm9ub2dyYW1TdHlsZXNTdHIiLCJHYW1lRmllbGQiLCJSZXN0YXJ0QnRuIiwiU29sdXRpb25CdG4iLCJTYXZlQnRuIiwiR2FtZVRpbWVyIiwid2luU291bmRGaWxlIiwibm9ub2dyYW1TdHlsZXMiLCJnZXRBdHRyaWJ1dGUiLCJ0aW1lciIsInF1ZXJ5U2VsZWN0b3IiLCJzYXZlZE1pbnV0ZXMiLCJzYXZlZFNlY29uZHMiLCJjb250aW51ZSIsImdldEVsZW1lbnRCeUlkIiwidG9VcHBlckNhc2UiLCJub25vZ3JhbSIsImZpZWxkIiwiaWQiLCJtYXRyaXgiLCJjb3JyZWN0U29sdXRpb24iLCJmbGF0IiwidG9TdHJpbmciLCJzdHIiLCJmb3JFYWNoIiwiZWwiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwic3F1YXJlIiwidG9wUGFuZSIsImxlZnRQYW5lIiwibWF4TGVmdEhpbnRzIiwiaSIsImxlZnRIaW50IiwidG9wSGludCIsImNvdW50ZXJMZWZ0IiwiY291bnRlclRvcCIsImoiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJjaGlsZHJlbiIsIm5vbm9ncmFtV2lkdGgiLCJvZmZzZXRXaWR0aCIsImNlbGxTaXplIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImZpcnN0RWxlbWVudENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsIm1pbnV0ZXNTdHIiLCJzZWNvbmRzU3RyIiwiQXVkaW8iLCJwbGF5IiwidGltZXJTdGFydGVkIiwicmVzdGFydCIsInN0b3AiLCJkZXRhaWwiLCJnYW1lIiwiY3VycmVudENyb3NzZWQiLCJzdHJpbmdpZnkiLCJsYXVuY2giLCJmaWVsZFN0eWxlc1N0ciIsImZpbGxTb3VuZEZpbGUiLCJjbGVhclNvdW5kRmlsZSIsImNyb3NzU291bmRGaWxlIiwiZmllbGRTdHlsZXMiLCJzcGxpdCIsInJvdyIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiZmlsbCIsImNlbGwiLCJlIiwiY2xpY2tzRGlzYWJsZWQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJyZW1vdmUiLCJ0b2dnbGUiLCJjb250YWlucyIsImNoZWNrU29sdXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImJ1YmJsZXMiLCJjb21wb3NlZCIsImVuYWJsZUNsaWNrcyIsImRpc2FibGVDbGlja3MiLCJzb2x1dGlvbiIsInRpbWVyU3R5bGVzU3RyIiwidGltZXJTdHlsZXMiLCJyZW5kZXJlZCIsInJlbmRlciIsImR1cmF0aW9uIiwiY3VycmVudER1cmF0aW9uIiwib2JzZXJ2ZWRBdHRyaWJ1dGVzIiwiYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIiwibWluIiwic2VjIiwic3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsImNsZWFySW50ZXJ2YWwiLCJpbnRlcnZhbElEIiwic2V0SW50ZXJ2YWwiLCJ0cnVuYyIsImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwicmVzdGFydEJ0blN0eWxlc1N0ciIsInJlc3RhcnRCdG5TdHlsZXMiLCJvbmNsaWNrIiwic2F2ZUJ0blN0eWxlc1N0ciIsInNhdmVCdG5TdHlsZXMiLCJjdXJyZW50VGFyZ2V0Iiwic29sdXRpb25CdG5TdHlsZXNTdHIiLCJzb2x1dGlvbkJ0blN0eWxlcyIsImJvZHkiLCJyb3V0ZXIiLCJkZWVwZXN0RWwiLCJjb21wb3NlZFBhdGgiLCJtYXRjaGVzIiwicHVzaCIsIm9ucG9wc3RhdGUiXSwic291cmNlUm9vdCI6IiJ9