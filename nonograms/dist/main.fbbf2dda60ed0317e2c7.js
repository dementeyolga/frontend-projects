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
      view: () => '<game-menu main-page="true"></game-menu>'
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
    const header = document.querySelector('game-header');
    const burgerMenu = header.shadowRoot.querySelector('game-menu.absolute');
    if (burgerMenu) {
      burgerMenu.classList.add('hidden');
    }
    const newParams = [...params];
    if (params[0] === 'random') {
      const randomNum = Math.floor(Math.random() * _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_2__.length);
      const randomNonogram = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_2__[randomNum];
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
    let match = this.routes.find(item => item.hash === window.location.hash.slice(1));
    if (!match) {
      match = this.routes.find(item => item.hash === '');
    }
    this.app.innerHTML = match.view(...newParams);
  }
}


/***/ }),

/***/ 302:
/*!****************************************************!*\
  !*** ./src/components/burgerMenu/BurgerMenuBtn.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BurgerMenuBtn: () => (/* binding */ BurgerMenuBtn)
/* harmony export */ });
/* harmony import */ var _BurgerMenuBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BurgerMenuBtn.styles.scss */ 130);

class BurgerMenuBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    const burgerBtnStyles = document.createElement('style');
    burgerBtnStyles.textContent = _BurgerMenuBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
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
/* harmony import */ var _burgerMenu_BurgerMenuBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../burgerMenu/BurgerMenuBtn */ 302);


customElements.define('burger-btn', _burgerMenu_BurgerMenuBtn__WEBPACK_IMPORTED_MODULE_1__.BurgerMenuBtn);
const headerStyles = document.createElement('style');
headerStyles.textContent = _GameHeader_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
const template = document.createElement('template');
template.innerHTML = `
  <div id="wrapper" class="wrapper">
    <a href="" data-link>Nonograms</a>
    <burger-btn></burger-btn>
  </div>  
`;
class GameHeader extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.append(headerStyles);
    shadowRoot.append(template.content.cloneNode(true));
    const gameMenu = document.createElement('game-menu');
    gameMenu.inHeader = true;
    gameMenu.classList.add('header');
    shadowRoot.getElementById('wrapper').append(gameMenu);
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
/* harmony import */ var _templatesBtn_TemplatesBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templatesBtn/TemplatesBtn */ 213);





customElements.define('random-btn', _randomBtn_RandonBtn__WEBPACK_IMPORTED_MODULE_2__.RandomBtn);
customElements.define('continue-btn', _continueBtn_ContinueBtn__WEBPACK_IMPORTED_MODULE_3__.ContinueBtn);
customElements.define('templates-btn', _templatesBtn_TemplatesBtn__WEBPACK_IMPORTED_MODULE_4__.TemplatesBtn);
const levels = [...new Set(_resources_nonograms_json__WEBPACK_IMPORTED_MODULE_1__.map(item => item.level))];
let levelsHTML = levels.map(level => {
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
                      <div id="actions" class="actions">
                        <templates-btn></templates-btn>
                        <random-btn></random-btn>
                        <continue-btn></continue-btn>
                      </div>
`;
class GameMenu extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.append(template.content.cloneNode(true));
    const menuStyles = document.createElement('style');
    menuStyles.textContent = _GameMenu_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
    shadowRoot.append(menuStyles);
    const actions = shadowRoot.getElementById('actions');
    if (this.getAttribute('main-page')) {
      actions.style.display = 'none';
    }
    if (!this.isBurger) {
      shadowRoot.lastElementChild.insertAdjacentHTML('afterend', levelsHTML);
    } else if (this.isBurger) {
      actions.style.flexDirection = 'column';
      actions.style.alignItems = 'center';
    }
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
    const continueBtnStyles = document.createElement('style');
    continueBtnStyles.textContent = _ContinueBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
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
    const randomBtnStyles = document.createElement('style');
    randomBtnStyles.textContent = _RandomBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
    shadowRoot.append(randomBtnStyles);
  }
}


/***/ }),

/***/ 213:
/*!**************************************************************!*\
  !*** ./src/components/gameMenu/templatesBtn/TemplatesBtn.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplatesBtn: () => (/* binding */ TemplatesBtn)
/* harmony export */ });
/* harmony import */ var _TemplatesBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplatesBtn.styles.scss */ 850);

class TemplatesBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    const btn = document.createElement('a');
    btn.href = '';
    btn.classList.add('button');
    btn.setAttribute('data-link', true);
    btn.innerText = 'Templates';
    shadowRoot.append(btn);
    const templatesBtnStyles = document.createElement('style');
    templatesBtnStyles.textContent = _TemplatesBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
    shadowRoot.append(templatesBtnStyles);
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
/* harmony import */ var _resultModal_ResultModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resultModal/ResultModal */ 600);
/* harmony import */ var _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../resources/nonograms.json */ 697);
/* harmony import */ var _assets_sound_effects_win_game_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../assets/sound-effects/win-game.mp3 */ 364);









customElements.define('game-field', _gameField_GameField__WEBPACK_IMPORTED_MODULE_1__.GameField);
customElements.define('restart-btn', _restartBtn_RestartBtn__WEBPACK_IMPORTED_MODULE_2__.RestartBtn);
customElements.define('solution-btn', _solutionBtn_SolutionBtn__WEBPACK_IMPORTED_MODULE_3__.SolutionBtn);
customElements.define('save-btn', _saveBtn_SaveBtn__WEBPACK_IMPORTED_MODULE_4__.SaveBtn);
customElements.define('game-timer', _gameTimer_GameTimer__WEBPACK_IMPORTED_MODULE_5__.GameTimer);
customElements.define('result-modal', _resultModal_ResultModal__WEBPACK_IMPORTED_MODULE_6__.ResultModal);
const nonogramStyles = document.createElement('style');
nonogramStyles.textContent = _GameNonogram_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
const template = document.createElement('template');
template.innerHTML = `
  <div class="nonogram__container">
    <div class="actions">
      <restart-btn></restart-btn>
      <save-btn></save-btn>
      <game-timer id="game-timer" minutes="0" seconds="0"></game-timer>
      <solution-btn></solution-btn>
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
    } = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_7__.find(item => item.name === name && item.level === level);
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
        new Audio(_assets_sound_effects_win_game_mp3__WEBPACK_IMPORTED_MODULE_8__).play();
        console.log(`Great! You have solved the nonogram ${name[0].toUpperCase() + name.slice(1)} in ${minutesStr}${secondsStr}!`);
        const modal = document.createElement('result-modal');
        modal.message = `Great! You have solved the nonogram ${name[0].toUpperCase() + name.slice(1)} in ${minutesStr}${secondsStr}!`;
        shadowRoot.append(modal);
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

/***/ 600:
/*!****************************************************************!*\
  !*** ./src/components/gameNonogram/resultModal/ResultModal.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResultModal: () => (/* binding */ ResultModal)
/* harmony export */ });
/* harmony import */ var _ResultModal_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResultModal.styles.scss */ 215);

const modalStyles = document.createElement('style');
modalStyles.innerText = _ResultModal_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
class ResultModal extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
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

/***/ 130:
/*!*************************************************************!*\
  !*** ./src/components/burgerMenu/BurgerMenuBtn.styles.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}.burger-icon{display:none;width:44px;height:44px}@media(max-width: 768px){.burger-icon{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}}.burger-icon:hover{cursor:pointer}.burger-icon.active .burger-icon__stroke:nth-child(1){transform:translateY(5px) rotate(45deg)}.burger-icon.active .burger-icon__stroke:nth-child(2){transform:translateY(-5px) rotate(-45deg)}.burger-icon__stroke{width:24px;height:2px;background-color:#fbf3f2;border-radius:2px;transition:.3s}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

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

        const styles = `:root{--cell-size: auto}*{box-sizing:border-box}html{scroll-behavior:smooth}body{background-color:#fbf3f2;user-select:none}body.scroll-disabled{height:100%;overflow:hidden}.wrapper{max-width:1440px;padding:0 40px;margin:0 auto}@media(max-width: 576px){.wrapper{padding:0 4.21052%}}.section{margin-bottom:100px}img{max-width:100%}.transparent{opacity:0}:host{display:block}:host{margin-bottom:20px;display:flex;background:#1c768f}:host *{color:#fbf3f2}a{display:block;padding:10px;text-decoration:none;text-transform:uppercase;font-weight:600}game-menu{display:flex;transition:.3s}@media(max-width: 768px){game-menu.header{display:none}}game-menu.hidden{visibility:hidden;opacity:0}game-menu.absolute{position:absolute;top:76px;left:0;right:0;padding:0 16px 20px 16px;flex-direction:column;background-color:#1c768f}.wrapper{padding:16px;width:100%;display:flex;justify-content:space-between;align-items:center}`;
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

/***/ 850:
/*!***********************************************************************!*\
  !*** ./src/components/gameMenu/templatesBtn/TemplatesBtn.styles.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:#fff;text-decoration:none;background-color:#fa991c;border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:#621cfa}`;
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

/***/ 215:
/*!*************************************************************************!*\
  !*** ./src/components/gameNonogram/resultModal/ResultModal.styles.scss ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}.modal{position:relative;padding:40px;border-radius:20px;background-color:#fbf3f2}.modal__wrapper{position:fixed;z-index:100;top:0;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:center;background-color:rgba(0,0,0,.2470588235);transition:.3s}.modal__wrapper.hidden{visibility:hidden;opacity:0}.modal__close{position:absolute;top:5px;right:5px;width:34px;height:34px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}.modal__close:hover{cursor:pointer}.modal__close-stroke{width:24px;height:2px;background-color:#262626;border-radius:2px;transition:.3s}.modal__close-stroke:nth-child(1){transform:translateY(5px) rotate(45deg)}.modal__close-stroke:nth-child(2){transform:translateY(-5px) rotate(-45deg)}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7RUFFRkgsTUFBTSxDQUFDZ04sVUFBVSxHQUFHLE1BQU07SUFDeEJMLE1BQU0sQ0FBQ3pNLFNBQVMsQ0FBQyxDQUFDO0VBQ3BCLENBQUM7RUFFRHlNLE1BQU0sQ0FBQ3pNLFNBQVMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvYXBwLXJvdXRlci9BcHBSb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvYnVyZ2VyTWVudS9CdXJnZXJNZW51QnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVIZWFkZXIvR2FtZUhlYWRlci5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9HYW1lTWVudS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9jb250aW51ZUJ0bi9Db250aW51ZUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9yYW5kb21CdG4vUmFuZG9uQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L3RlbXBsYXRlc0J0bi9UZW1wbGF0ZXNCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZUZpZWxkL0dhbWVGaWVsZC5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZVRpbWVyL0dhbWVUaW1lci5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vcmVzdGFydEJ0bi9SZXN0YXJ0QnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9yZXN1bHRNb2RhbC9SZXN1bHRNb2RhbC5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vc2F2ZUJ0bi9TYXZlQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zb2x1dGlvbkJ0bi9Tb2x1dGlvbkJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL21haW4uc2Nzcz9mYzc3Iiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvYWJzdHJhY3QvX3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2J1cmdlck1lbnUvQnVyZ2VyTWVudUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2Fic3RyYWN0L19taXhpbnMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2xheW91dC9fYmFzaWMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lSGVhZGVyL0dhbWVIZWFkZXIuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvR2FtZU1lbnUuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9jb21wb25lbnRzL19idXR0b24uc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9jb250aW51ZUJ0bi9Db250aW51ZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS90ZW1wbGF0ZXNCdG4vVGVtcGxhdGVzQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvYmFzZS9fbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbS5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZUZpZWxkL0dhbWVGaWVsZC5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vcmVzdWx0TW9kYWwvUmVzdWx0TW9kYWwuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NhdmVCdG4vU2F2ZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vc29sdXRpb25CdG4vU29sdXRpb25CdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZU1lbnUgfSBmcm9tICcuLi9nYW1lTWVudS9HYW1lTWVudSc7XG5pbXBvcnQgeyBHYW1lTm9ub2dyYW0gfSBmcm9tICcuLi9nYW1lTm9ub2dyYW0vR2FtZU5vbm9ncmFtJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLW1lbnUnLCBHYW1lTWVudSk7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtbm9ub2dyYW0nLCBHYW1lTm9ub2dyYW0pO1xuXG5jbGFzcyBBcHBSb3V0ZXIge1xuICBjb25zdHJ1Y3RvcihhcHApIHtcbiAgICB0aGlzLmFwcCA9IGFwcDtcblxuICAgIHRoaXMucm91dGVzID0gW1xuICAgICAge1xuICAgICAgICBoYXNoOiAnJyxcbiAgICAgICAgdmlldzogKCkgPT4gJzxnYW1lLW1lbnUgbWFpbi1wYWdlPVwidHJ1ZVwiPjwvZ2FtZS1tZW51PicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBoYXNoOiAnbm9ub2dyYW0nLFxuICAgICAgICB2aWV3OiAobmFtZSwgbGV2ZWwsIHNhdmVkU29sdXRpb24sIGNyb3NzZWQsIG1pbnV0ZXMsIHNlY29uZHMpID0+IHtcbiAgICAgICAgICBsZXQgcmVzb2x2ZWROYW1lO1xuICAgICAgICAgIGxldCByZXNvbHZlZExldmVsO1xuXG4gICAgICAgICAgaWYgKG5hbWUgJiYgbGV2ZWwpIHtcbiAgICAgICAgICAgIHJlc29sdmVkTmFtZSA9IG5hbWU7XG4gICAgICAgICAgICByZXNvbHZlZExldmVsID0gbGV2ZWw7XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLW5hbWUnLCBuYW1lKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLWxldmVsJywgbGV2ZWwpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1uYW1lJykgJiZcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLWxldmVsJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc29sdmVkTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLW5hbWUnKTtcbiAgICAgICAgICAgIHJlc29sdmVkTGV2ZWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1sZXZlbCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlZE5hbWUgPSBub25vZ3JhbXNbMF0ubmFtZTtcbiAgICAgICAgICAgIHJlc29sdmVkTGV2ZWwgPSBub25vZ3JhbXNbMF0ubGV2ZWw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxnYW1lLW5vbm9ncmFtIG5hbWU9XCIke3Jlc29sdmVkTmFtZX1cIiBsZXZlbD1cIiR7cmVzb2x2ZWRMZXZlbH1cIiAgc2F2ZWRzb2x1dGlvbj1cIiR7c2F2ZWRTb2x1dGlvbiB8fCAnJ31cIiBjcm9zc2VkPVwiJHtjcm9zc2VkIHx8ICcnfVwiIG1pbnV0ZXM9XCIke21pbnV0ZXMgfHwgJzAnfVwiIHNlY29uZHM9XCIke3NlY29uZHMgfHwgJzAnfVwiPlxuICAgICAgICAgICAgPC9nYW1lLW5vbm9ncmFtPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF07XG4gIH1cblxuICBjaGFuZ2VIYXNoKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gdXJsO1xuICB9XG5cbiAgc2hvd1JvdXRlKHBhcmFtcyA9IFtdKSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZ2FtZS1oZWFkZXInKTtcbiAgICBjb25zdCBidXJnZXJNZW51ID0gaGVhZGVyLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignZ2FtZS1tZW51LmFic29sdXRlJyk7XG4gICAgaWYgKGJ1cmdlck1lbnUpIHtcbiAgICAgIGJ1cmdlck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV3UGFyYW1zID0gWy4uLnBhcmFtc107XG5cbiAgICBpZiAocGFyYW1zWzBdID09PSAncmFuZG9tJykge1xuICAgICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbm9ub2dyYW1zLmxlbmd0aCk7XG4gICAgICBjb25zdCByYW5kb21Ob25vZ3JhbSA9IG5vbm9ncmFtc1tyYW5kb21OdW1dO1xuXG4gICAgICBuZXdQYXJhbXNbMF0gPSByYW5kb21Ob25vZ3JhbS5uYW1lO1xuICAgICAgbmV3UGFyYW1zWzFdID0gcmFuZG9tTm9ub2dyYW0ubGV2ZWw7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1swXSA9PT0gJ2NvbnRpbnVlJykge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZEdhbWUnKSk7XG5cbiAgICAgIG5ld1BhcmFtc1swXSA9IHNhdmVkLm5hbWU7XG4gICAgICBuZXdQYXJhbXNbMV0gPSBzYXZlZC5sZXZlbDtcbiAgICAgIG5ld1BhcmFtc1syXSA9IHNhdmVkLmN1cnJlbnRTb2x1dGlvbjtcbiAgICAgIG5ld1BhcmFtc1szXSA9IHNhdmVkLmNyb3NzZWQ7XG4gICAgICBuZXdQYXJhbXNbNF0gPSBzYXZlZC50aW1lLm1pbnV0ZXM7XG4gICAgICBuZXdQYXJhbXNbNV0gPSBzYXZlZC50aW1lLnNlY29uZHM7XG4gICAgfVxuXG4gICAgbGV0IG1hdGNoID0gdGhpcy5yb3V0ZXMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLmhhc2ggPT09IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpXG4gICAgKTtcblxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIG1hdGNoID0gdGhpcy5yb3V0ZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5oYXNoID09PSAnJyk7XG4gICAgfVxuXG4gICAgdGhpcy5hcHAuaW5uZXJIVE1MID0gbWF0Y2gudmlldyguLi5uZXdQYXJhbXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEFwcFJvdXRlciB9O1xuIiwiaW1wb3J0IGJ1cmdlck1lbnVTdHlsZXNTdHIgZnJvbSAnLi9CdXJnZXJNZW51QnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgQnVyZ2VyTWVudUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ1cmdlckJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgYnVyZ2VyQnRuU3R5bGVzLnRleHRDb250ZW50ID0gYnVyZ2VyTWVudVN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChidXJnZXJCdG5TdHlsZXMpO1xuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1cmdlci1pY29uJyk7XG4gICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXJnZXItaWNvbl9fc3Ryb2tlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnVyZ2VyLWljb25fX3N0cm9rZVwiPjwvZGl2PlxuICAgIGA7XG5cbiAgICBjb25zdCBnYW1lTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dhbWUtbWVudScpO1xuICAgIGdhbWVNZW51LmlzQnVyZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLmFmdGVyKGdhbWVNZW51KTtcbiAgICBnYW1lTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBnYW1lTWVudS5jbGFzc0xpc3QuYWRkKCdhYnNvbHV0ZScpO1xuXG4gICAgYnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICBnYW1lTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9O1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcbiAgfVxufVxuXG5leHBvcnQgeyBCdXJnZXJNZW51QnRuIH07XG4iLCJpbXBvcnQgaGVhZGVyU3R5bGVzU3RyIGZyb20gJy4vR2FtZUhlYWRlci5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgeyBCdXJnZXJNZW51QnRuIH0gZnJvbSAnLi4vYnVyZ2VyTWVudS9CdXJnZXJNZW51QnRuJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdidXJnZXItYnRuJywgQnVyZ2VyTWVudUJ0bik7XG5cbmNvbnN0IGhlYWRlclN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5oZWFkZXJTdHlsZXMudGV4dENvbnRlbnQgPSBoZWFkZXJTdHlsZXNTdHI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPGRpdiBpZD1cIndyYXBwZXJcIiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICA8YSBocmVmPVwiXCIgZGF0YS1saW5rPk5vbm9ncmFtczwvYT5cbiAgICA8YnVyZ2VyLWJ0bj48L2J1cmdlci1idG4+XG4gIDwvZGl2PiAgXG5gO1xuY2xhc3MgR2FtZUhlYWRlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGhlYWRlclN0eWxlcyk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgY29uc3QgZ2FtZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdnYW1lLW1lbnUnKTtcbiAgICBnYW1lTWVudS5pbkhlYWRlciA9IHRydWU7XG4gICAgZ2FtZU1lbnUuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJyk7XG4gICAgc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpLmFwcGVuZChnYW1lTWVudSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZUhlYWRlciB9O1xuIiwiaW1wb3J0IG1lbnVTdHlsZVN0ciBmcm9tICcuL0dhbWVNZW51LnN0eWxlcy5zY3NzJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcbmltcG9ydCB7IFJhbmRvbUJ0biB9IGZyb20gJy4vcmFuZG9tQnRuL1JhbmRvbkJ0bic7XG5pbXBvcnQgeyBDb250aW51ZUJ0biB9IGZyb20gJy4vY29udGludWVCdG4vQ29udGludWVCdG4nO1xuaW1wb3J0IHsgVGVtcGxhdGVzQnRuIH0gZnJvbSAnLi90ZW1wbGF0ZXNCdG4vVGVtcGxhdGVzQnRuJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyYW5kb20tYnRuJywgUmFuZG9tQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29udGludWUtYnRuJywgQ29udGludWVCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0ZW1wbGF0ZXMtYnRuJywgVGVtcGxhdGVzQnRuKTtcblxuY29uc3QgbGV2ZWxzID0gWy4uLm5ldyBTZXQobm9ub2dyYW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5sZXZlbCkpXTtcblxubGV0IGxldmVsc0hUTUwgPSBsZXZlbHNcbiAgLm1hcCgobGV2ZWwpID0+IHtcbiAgICBjb25zdCBnYW1lTmFtZXMgPSBub25vZ3JhbXNcbiAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09IGxldmVsKVxuICAgICAgLm1hcChcbiAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgYDxhIGhyZWY9XCJub25vZ3JhbVwiIGNsYXNzPVwibWVudV9faXRlbVwiIGxldmVsPVwiJHtsZXZlbH1cIiBnYW1lLW5hbWU9XCIke2l0ZW0ubmFtZX1cIiBkYXRhLWxpbms+JHtpdGVtLm5hbWV9PC9hPlxcbmBcbiAgICAgIClcbiAgICAgIC5qb2luKCdcXG4nKTtcblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibGV2ZWxcIj5cbiAgICAgICAgPGgzIGNsYXNzPVwibGV2ZWxfX3RpdGxlXCI+JHtsZXZlbH08L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGV2ZWxfX2dhbWVzXCI+XG4gICAgICAgICAgJHtnYW1lTmFtZXN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfSlcbiAgLmpvaW4oJ1xcbicpO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImFjdGlvbnNcIiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZXMtYnRuPjwvdGVtcGxhdGVzLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxyYW5kb20tYnRuPjwvcmFuZG9tLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjb250aW51ZS1idG4+PC9jb250aW51ZS1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5gO1xuXG5jbGFzcyBHYW1lTWVudSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgIGNvbnN0IG1lbnVTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIG1lbnVTdHlsZXMudGV4dENvbnRlbnQgPSBtZW51U3R5bGVTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQobWVudVN0eWxlcyk7XG5cbiAgICBjb25zdCBhY3Rpb25zID0gc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnYWN0aW9ucycpO1xuXG4gICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdtYWluLXBhZ2UnKSkge1xuICAgICAgYWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0J1cmdlcikge1xuICAgICAgc2hhZG93Um9vdC5sYXN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBsZXZlbHNIVE1MKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNCdXJnZXIpIHtcbiAgICAgIGFjdGlvbnMuc3R5bGUuZmxleERpcmVjdGlvbiA9ICdjb2x1bW4nO1xuICAgICAgYWN0aW9ucy5zdHlsZS5hbGlnbkl0ZW1zID0gJ2NlbnRlcic7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVNZW51IH07XG4iLCJpbXBvcnQgY29udGludWVCdG5TdHlsZXNTdHIgZnJvbSAnLi9Db250aW51ZUJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIENvbnRpbnVlQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJ0bi5ocmVmID0gJ25vbm9ncmFtJztcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnY29udGludWUnLCB0cnVlKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnLCB0cnVlKTtcbiAgICBidG4uaW5uZXJUZXh0ID0gJ0NvbnRpbnVlIGdhbWUnO1xuXG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWRHYW1lJykpIHtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCBjb250aW51ZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgY29udGludWVCdG5TdHlsZXMudGV4dENvbnRlbnQgPSBjb250aW51ZUJ0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChjb250aW51ZUJ0blN0eWxlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQ29udGludWVCdG4gfTtcbiIsImltcG9ydCByYW5kb21CdG5TdHlsZXNTdHIgZnJvbSAnLi9SYW5kb21CdG4uc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBSYW5kb21CdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYnRuLmhyZWYgPSAnbm9ub2dyYW0nO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdyYW5kb20nLCB0cnVlKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnLCB0cnVlKTtcbiAgICBidG4uaW5uZXJUZXh0ID0gJ1JhbmRvbSc7XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZChidG4pO1xuXG4gICAgY29uc3QgcmFuZG9tQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICByYW5kb21CdG5TdHlsZXMudGV4dENvbnRlbnQgPSByYW5kb21CdG5TdHlsZXNTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQocmFuZG9tQnRuU3R5bGVzKTtcbiAgfVxufVxuXG5leHBvcnQgeyBSYW5kb21CdG4gfTtcbiIsImltcG9ydCB0ZW1wbGF0ZXNCdG5TdHlsZXNTdHIgZnJvbSAnLi9UZW1wbGF0ZXNCdG4uc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBUZW1wbGF0ZXNCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYnRuLmhyZWYgPSAnJztcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rJywgdHJ1ZSk7XG4gICAgYnRuLmlubmVyVGV4dCA9ICdUZW1wbGF0ZXMnO1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcblxuICAgIGNvbnN0IHRlbXBsYXRlc0J0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGVtcGxhdGVzQnRuU3R5bGVzLnRleHRDb250ZW50ID0gdGVtcGxhdGVzQnRuU3R5bGVzU3RyO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRlbXBsYXRlc0J0blN0eWxlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgVGVtcGxhdGVzQnRuIH07XG4iLCJpbXBvcnQgbm9ub2dyYW1TdHlsZXNTdHIgZnJvbSAnLi9HYW1lTm9ub2dyYW0uc3R5bGVzLnNjc3MnO1xuaW1wb3J0IHsgR2FtZUZpZWxkIH0gZnJvbSAnLi9nYW1lRmllbGQvR2FtZUZpZWxkJztcbmltcG9ydCB7IFJlc3RhcnRCdG4gfSBmcm9tICcuL3Jlc3RhcnRCdG4vUmVzdGFydEJ0bic7XG5pbXBvcnQgeyBTb2x1dGlvbkJ0biB9IGZyb20gJy4vc29sdXRpb25CdG4vU29sdXRpb25CdG4nO1xuaW1wb3J0IHsgU2F2ZUJ0biB9IGZyb20gJy4vc2F2ZUJ0bi9TYXZlQnRuJztcbmltcG9ydCB7IEdhbWVUaW1lciB9IGZyb20gJy4vZ2FtZVRpbWVyL0dhbWVUaW1lcic7XG5pbXBvcnQgeyBSZXN1bHRNb2RhbCB9IGZyb20gJy4vcmVzdWx0TW9kYWwvUmVzdWx0TW9kYWwnO1xuaW1wb3J0IG5vbm9ncmFtcyBmcm9tICcuLi8uLi9yZXNvdXJjZXMvbm9ub2dyYW1zLmpzb24nO1xuaW1wb3J0IHdpblNvdW5kRmlsZSBmcm9tICcuLy4uLy4uL2Fzc2V0cy9zb3VuZC1lZmZlY3RzL3dpbi1nYW1lLm1wMyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS1maWVsZCcsIEdhbWVGaWVsZCk7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3Jlc3RhcnQtYnRuJywgUmVzdGFydEJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NvbHV0aW9uLWJ0bicsIFNvbHV0aW9uQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc2F2ZS1idG4nLCBTYXZlQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS10aW1lcicsIEdhbWVUaW1lcik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3Jlc3VsdC1tb2RhbCcsIFJlc3VsdE1vZGFsKTtcblxuY29uc3Qgbm9ub2dyYW1TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xubm9ub2dyYW1TdHlsZXMudGV4dENvbnRlbnQgPSBub25vZ3JhbVN0eWxlc1N0cjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8ZGl2IGNsYXNzPVwibm9ub2dyYW1fX2NvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCI+XG4gICAgICA8cmVzdGFydC1idG4+PC9yZXN0YXJ0LWJ0bj5cbiAgICAgIDxzYXZlLWJ0bj48L3NhdmUtYnRuPlxuICAgICAgPGdhbWUtdGltZXIgaWQ9XCJnYW1lLXRpbWVyXCIgbWludXRlcz1cIjBcIiBzZWNvbmRzPVwiMFwiPjwvZ2FtZS10aW1lcj5cbiAgICAgIDxzb2x1dGlvbi1idG4+PC9zb2x1dGlvbi1idG4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGlkPVwic3VtbWFyeVwiIGNsYXNzPVwic3VtbWFyeVwiPlxuICAgICAgPC9kaXY+ICBcbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwibm9ub2dyYW1fX3dyYXBwZXJcIj5cbiAgICAgIDxkaXYgaWQ9XCJub25vZ3JhbVwiIGNsYXNzPVwibm9ub2dyYW1cIj5cbiAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9wLXBhbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZnQtcGFuZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+ICBcbiAgICBcbiAgPC9kaXY+XG5gO1xuXG5jbGFzcyBHYW1lTm9ub2dyYW0gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQobm9ub2dyYW1TdHlsZXMpO1xuXG4gICAgY29uc3QgbGV2ZWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKTtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICBjb25zdCBzYXZlZFNvbHV0aW9uID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NhdmVkc29sdXRpb24nKTtcbiAgICBjb25zdCBjcm9zc2VkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Nyb3NzZWQnKTtcblxuICAgIGNvbnN0IHRpbWVyID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS10aW1lcicpO1xuICAgIGNvbnNvbGUubG9nKCdub25vZ3JhbSBhZGRlZCB0byB0aGUgZG9jJyk7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpICE9PSAnMCcgfHxcbiAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJykgIT09ICcwJ1xuICAgICkge1xuICAgICAgY29uc3Qgc2F2ZWRNaW51dGVzID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKTtcbiAgICAgIGNvbnN0IHNhdmVkU2Vjb25kcyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyk7XG5cbiAgICAgIHRpbWVyLnNldEF0dHJpYnV0ZSgnbWludXRlcycsIHNhdmVkTWludXRlcyk7XG4gICAgICB0aW1lci5zZXRBdHRyaWJ1dGUoJ3NlY29uZHMnLCBzYXZlZFNlY29uZHMpO1xuXG4gICAgICB0aW1lci5jb250aW51ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnc3VtbWFyeScpLmlubmVySFRNTCA9IGBcbiAgICAgIDxwIGNsYXNzPVwic3VtbWFyeV9fbGV2ZWxcIj4ke2xldmVsfTwvcD5cbiAgICAgIDxwIGNsYXNzPVwic3VtbWFyeV9fbmFtZVwiPiAke25hbWVbMF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSl9PC9wPlxuICAgIGA7XG5cbiAgICBjb25zdCBub25vZ3JhbSA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI25vbm9ncmFtJyk7XG4gICAgY29uc3QgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdnYW1lLWZpZWxkJyk7XG4gICAgZmllbGQuaWQgPSAnZ2FtZS1maWVsZCc7XG4gICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnZ2FtZS1maWVsZCcpO1xuICAgIGZpZWxkLnNhdmVkU29sdXRpb24gPSBzYXZlZFNvbHV0aW9uO1xuICAgIGZpZWxkLmNyb3NzZWQgPSBjcm9zc2VkO1xuICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnbGV2ZWwnLCBsZXZlbCk7XG5cbiAgICBub25vZ3JhbS5hcHBlbmQoZmllbGQpO1xuXG4gICAgY29uc3QgeyBtYXRyaXggfSA9IG5vbm9ncmFtcy5maW5kKFxuICAgICAgKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gbmFtZSAmJiBpdGVtLmxldmVsID09PSBsZXZlbFxuICAgICk7XG5cbiAgICBjb25zdCBjb3JyZWN0U29sdXRpb24gPSBtYXRyaXguZmxhdCgpLmpvaW4oJycpLnRvU3RyaW5nKCk7XG5cbiAgICAvLyBEcmF3IG1hdHJpeCBzb2x1dGlvblxuICAgIGxldCBzdHIgPSAnJztcbiAgICBtYXRyaXguZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIHN0ciArPSBlbC5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBjdXJyID8gJ+KWoCcgOiAn4pahJztcbiAgICAgICAgcmV0dXJuIGFjYyArIHNxdWFyZTtcbiAgICAgIH0sICcnKTtcbiAgICAgIHN0ciArPSAnXFxuJztcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhzdHIpO1xuXG4gICAgY29uc3QgdG9wUGFuZSA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLnRvcC1wYW5lJyk7XG4gICAgY29uc3QgbGVmdFBhbmUgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0LXBhbmUnKTtcbiAgICBsZXQgbWF4TGVmdEhpbnRzID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBsZWZ0SGludCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbGVmdEhpbnQuY2xhc3NMaXN0LmFkZCgnbGVmdC1wYW5lX19oaW50Jyk7XG5cbiAgICAgIGNvbnN0IHRvcEhpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvcEhpbnQuY2xhc3NMaXN0LmFkZCgndG9wLXBhbmVfX2hpbnQnKTtcblxuICAgICAgbGV0IGNvdW50ZXJMZWZ0ID0gMDtcbiAgICAgIGxldCBjb3VudGVyVG9wID0gMDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXgubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKG1hdHJpeFtpXVtqXSkge1xuICAgICAgICAgIGNvdW50ZXJMZWZ0ICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgKGNvdW50ZXJMZWZ0ICYmICFtYXRyaXhbaV1bal0pIHx8XG4gICAgICAgICAgKGNvdW50ZXJMZWZ0ICYmIGogPT09IG1hdHJpeC5sZW5ndGggLSAxKVxuICAgICAgICApIHtcbiAgICAgICAgICBsZWZ0SGludC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgICAgIGBcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImxlZnQtcGFuZV9fbnVtYmVyXCI+JHtjb3VudGVyTGVmdH08L2Rpdj5cblx0XHRcdFx0XHRcdGBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY291bnRlckxlZnQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdHJpeFtqXVtpXSkge1xuICAgICAgICAgIGNvdW50ZXJUb3AgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAoY291bnRlclRvcCAmJiAhbWF0cml4W2pdW2ldKSB8fFxuICAgICAgICAgIChjb3VudGVyVG9wICYmIGogPT09IG1hdHJpeC5sZW5ndGggLSAxKVxuICAgICAgICApIHtcbiAgICAgICAgICB0b3BIaW50Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgICAgICAgYFxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInRvcC1wYW5lX19udW1iZXJcIj4ke2NvdW50ZXJUb3B9PC9kaXY+XG5cdFx0XHRcdFx0XHRgXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvdW50ZXJUb3AgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxlZnRQYW5lLmFwcGVuZChsZWZ0SGludCk7XG4gICAgICB0b3BQYW5lLmFwcGVuZCh0b3BIaW50KTtcblxuICAgICAgaWYgKGxlZnRIaW50LmNoaWxkcmVuLmxlbmd0aCA+IG1heExlZnRIaW50cykge1xuICAgICAgICBtYXhMZWZ0SGludHMgPSBsZWZ0SGludC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2FsY3VsYXRlIGNlbGwgc2l6ZVxuICAgIGNvbnN0IG5vbm9ncmFtV2lkdGggPSBub25vZ3JhbS5vZmZzZXRXaWR0aDtcblxuICAgIGxldCBjZWxsU2l6ZSA9IG5vbm9ncmFtV2lkdGggLyAobWF4TGVmdEhpbnRzICsgbWF0cml4Lmxlbmd0aCk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNlbGwtc2l6ZScsIGNlbGxTaXplICsgJ3B4Jyk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZpbGwnLCAoKSA9PiB7XG4gICAgICBpZiAoY29ycmVjdFNvbHV0aW9uID09PSBmaWVsZC5jdXJyZW50U29sdXRpb24pIHtcbiAgICAgICAgZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3dpbicpKTtcbiAgICAgICAgdGltZXIuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3dpbicpKTtcbiAgICAgICAgY29uc3QgbWludXRlcyA9IHRpbWVyLmdldEF0dHJpYnV0ZSgnbWludXRlcycpO1xuXG4gICAgICAgIGxldCBtaW51dGVzU3RyID0gJyc7XG4gICAgICAgIGlmICghK21pbnV0ZXMpIHtcbiAgICAgICAgICBtaW51dGVzU3RyID0gJyc7XG4gICAgICAgIH0gZWxzZSBpZiAoK21pbnV0ZXMgPiAxKSB7XG4gICAgICAgICAgbWludXRlc1N0ciArPSAnbWludXRlcyAnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1pbnV0ZXNTdHIgKz0gJ21pbnV0ZSc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWNvbmRzID0gdGltZXIuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyk7XG4gICAgICAgIGxldCBzZWNvbmRzU3RyID0gIXNlY29uZHMgfHwgYCR7c2Vjb25kc30gc2Vjb25kYDtcbiAgICAgICAgc2Vjb25kc1N0ciA9ICtzZWNvbmRzID4gMSA/IHNlY29uZHNTdHIgKyAncycgOiBzZWNvbmRzU3RyO1xuXG4gICAgICAgIG5ldyBBdWRpbyh3aW5Tb3VuZEZpbGUpLnBsYXkoKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgR3JlYXQhIFlvdSBoYXZlIHNvbHZlZCB0aGUgbm9ub2dyYW0gJHtuYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpfSBpbiAke21pbnV0ZXNTdHJ9JHtzZWNvbmRzU3RyfSFgXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdyZXN1bHQtbW9kYWwnKTtcbiAgICAgICAgbW9kYWwubWVzc2FnZSA9IGBHcmVhdCEgWW91IGhhdmUgc29sdmVkIHRoZSBub25vZ3JhbSAke25hbWVbMF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSl9IGluICR7bWludXRlc1N0cn0ke3NlY29uZHNTdHJ9IWA7XG4gICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kKG1vZGFsKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcigncmVzdGFydCcsICgpID0+IHtcbiAgICAgIGZpZWxkLnRpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3Jlc3RhcnQnKSk7XG4gICAgICB0aW1lci5yZXN0YXJ0KCk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NvbHV0aW9uJywgKCkgPT4ge1xuICAgICAgdGltZXIuc3RvcCgpO1xuXG4gICAgICBmaWVsZC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NvbHV0aW9uJywge1xuICAgICAgICAgIGRldGFpbDogbWF0cml4LmZsYXQoKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NhdmUtZ2FtZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGdhbWUgPSB7XG4gICAgICAgIGxldmVsLFxuICAgICAgICBuYW1lLFxuICAgICAgICBjdXJyZW50U29sdXRpb246IGZpZWxkLmN1cnJlbnRTb2x1dGlvbixcbiAgICAgICAgY3Jvc3NlZDogZmllbGQuY3VycmVudENyb3NzZWQsXG4gICAgICAgIHRpbWU6IHtcbiAgICAgICAgICBtaW51dGVzOiB0aW1lci5taW51dGVzLFxuICAgICAgICAgIHNlY29uZHM6IHRpbWVyLnNlY29uZHMsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2F2ZWRHYW1lJywgSlNPTi5zdHJpbmdpZnkoZ2FtZSkpO1xuICAgIH0pO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdzdGFydHRpbWVyJywgKCkgPT4ge1xuICAgICAgdGltZXIubGF1bmNoKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZU5vbm9ncmFtIH07XG4iLCJpbXBvcnQgZmllbGRTdHlsZXNTdHIgZnJvbSAnLi9HYW1lRmllbGQuc3R5bGVzLnNjc3MnO1xuaW1wb3J0IGZpbGxTb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy9maWxsLWNlbGwubXAzJztcbmltcG9ydCBjbGVhclNvdW5kRmlsZSBmcm9tICcuLy4uLy4uLy4uL2Fzc2V0cy9zb3VuZC1lZmZlY3RzL2NsZWFyLWNlbGwubXAzJztcbmltcG9ydCBjcm9zc1NvdW5kRmlsZSBmcm9tICcuLy4uLy4uLy4uL2Fzc2V0cy9zb3VuZC1lZmZlY3RzL2Nyb3NzLWNlbGwubXAzJztcblxuY29uc3QgZmllbGRTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuZmllbGRTdHlsZXMudGV4dENvbnRlbnQgPSBmaWVsZFN0eWxlc1N0cjtcblxuY2xhc3MgR2FtZUZpZWxkIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoZmllbGRTdHlsZXMpO1xuXG4gICAgdGhpcy5sZXZlbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdsZXZlbCcpLnNwbGl0KCd4JylbMF07XG5cbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5maWVsZC5pZCA9ICdmaWVsZCc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGV2ZWw7IGkgKz0gMSkge1xuICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ3JvdycpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxldmVsOyBqICs9IDEpIHtcbiAgICAgICAgcm93Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+YCk7XG4gICAgICB9XG4gICAgICB0aGlzLmZpZWxkLmFwcGVuZChyb3cpO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRoaXMuZmllbGQpO1xuXG4gICAgdGhpcy5jZWxscyA9IHRoaXMuZmllbGQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcblxuICAgIHRoaXMuY3VycmVudFNvbHV0aW9uID1cbiAgICAgIHRoaXMuc2F2ZWRTb2x1dGlvbiB8fCBuZXcgQXJyYXkodGhpcy5jZWxscy5sZW5ndGgpLmZpbGwoMCkuam9pbignJyk7XG5cbiAgICBpZiAodGhpcy5zYXZlZFNvbHV0aW9uKSB7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2F2ZWRTb2x1dGlvbltpXSA9PT0gJzEnKSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY3Jvc3NlZCkge1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNyb3NzZWRbaV0gPT09ICd4Jykge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY3Jvc3NlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmNsaWNrc0Rpc2FibGVkKSB7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmNsaWNrc0Rpc2FibGVkKSB7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Nyb3NzZWQnKTtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2ZpbGxlZCcpO1xuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaWxsZWQnKSkge1xuICAgICAgICBuZXcgQXVkaW8oZmlsbFNvdW5kRmlsZSkucGxheSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IEF1ZGlvKGNsZWFyU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tTb2x1dGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2Nyb3NzZWQnKTtcblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY3Jvc3NlZCcpKSB7XG4gICAgICAgIG5ldyBBdWRpbyhjcm9zc1NvdW5kRmlsZSkucGxheSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IEF1ZGlvKGNsZWFyU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tTb2x1dGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRpbWVyU3RhcnRlZCkgcmV0dXJuO1xuICAgICAgdGhpcy50aW1lclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLmZpZWxkLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc3RhcnR0aW1lcicsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50aW1lclN0YXJ0ZWQpIHJldHVybjtcbiAgICAgIHRoaXMudGltZXJTdGFydGVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3N0YXJ0dGltZXInLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc3RhcnQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmVuYWJsZUNsaWNrcygpO1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcsICdjcm9zc2VkJykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdzb2x1dGlvbicsIChlKSA9PiB7XG4gICAgICB0aGlzLmRpc2FibGVDbGlja3MoKTtcblxuICAgICAgY29uc3Qgc29sdXRpb24gPSBlLmRldGFpbDtcblxuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgIGlmIChzb2x1dGlvbltpXSkge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJyk7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3dpbicsICgpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUNsaWNrcygpO1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nyb3NzZWQnKSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NvbHV0aW9uKCkge1xuICAgIHRoaXMuY3VycmVudFNvbHV0aW9uID0gWy4uLnRoaXMuY2VsbHNdLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICByZXR1cm4gY3Vyci5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpbGxlZCcpID8gYWNjICsgJzEnIDogYWNjICsgJzAnO1xuICAgIH0sICcnKTtcblxuICAgIHRoaXMuY3VycmVudENyb3NzZWQgPSBbLi4udGhpcy5jZWxsc10ucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgIHJldHVybiBjdXJyLmNsYXNzTGlzdC5jb250YWlucygnY3Jvc3NlZCcpID8gYWNjICsgJ3gnIDogYWNjICsgJzAnO1xuICAgIH0sICcnKTtcblxuICAgIHRoaXMuZmllbGQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnZmlsbCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBkaXNhYmxlQ2xpY2tzKCkge1xuICAgIHRoaXMuY2xpY2tzRGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZW5hYmxlQ2xpY2tzKCkge1xuICAgIHRoaXMuY2xpY2tzRGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lRmllbGQgfTtcbiIsImltcG9ydCB0aW1lclN0eWxlc1N0ciBmcm9tICcuL0dhbWVUaW1lci5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHRpbWVyU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnRpbWVyU3R5bGVzLnRleHRDb250ZW50ID0gdGltZXJTdHlsZXNTdHI7XG5cbmNsYXNzIEdhbWVUaW1lciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5hcHBlbmQodGltZXJTdHlsZXMpO1xuXG4gICAgaWYgKCF0aGlzLnJlbmRlcmVkKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5yZW5kZXJlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd3aW4nLCAoKSA9PiB0aGlzLnN0b3AoKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IG1pbnV0ZXMgPVxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKS5sZW5ndGggPT09IDFcbiAgICAgICAgPyBgMCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKX1gXG4gICAgICAgIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKTtcblxuICAgIGxldCBzZWNvbmRzID1cbiAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJykubGVuZ3RoID09PSAxXG4gICAgICAgID8gYDAke3RoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyl9YFxuICAgICAgICA6IHRoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyk7XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IGAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xuXG4gICAgdGhpcy5taW51dGVzID0gbWludXRlcztcbiAgICB0aGlzLnNlY29uZHMgPSBzZWNvbmRzO1xuICAgIHRoaXMuY3VycmVudER1cmF0aW9uID0gZHVyYXRpb247XG4gICAgdGhpcy5pbm5lckhUTUwgPSBkdXJhdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ21pbnV0ZXMnLCAnc2Vjb25kcyddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBsYXVuY2goKSB7XG4gICAgaWYgKHRoaXMuY29udGludWUpIHtcbiAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmN1cnJlbnREdXJhdGlvbi5zcGxpdCgnOicpO1xuICAgICAgY29uc3QgbWluID0gK3RpbWVbMF07XG4gICAgICBjb25zdCBzZWMgPSArdGltZVsxXTtcblxuICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpIC0gKG1pbiAqIDYwICsgc2VjKSAqIDEwMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7XG5cbiAgICB0aGlzLmludGVydmFsSUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLnRydW5jKChub3cgLSB0aGlzLnN0YXJ0VGltZSkgLyAxMDAwKTtcblxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlY29uZHMnLCBkdXJhdGlvbiAlIDYwKTtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtaW51dGVzJywgTWF0aC5mbG9vcihkdXJhdGlvbiAvIDYwKSk7XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKTtcbiAgfVxuXG4gIHJlc3RhcnQoKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBudWxsO1xuICAgIHRoaXMuY29udGludWUgPSBmYWxzZTtcblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWNvbmRzJywgJzAnKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbWludXRlcycsICcwJyk7XG5cbiAgICB0aGlzLnN0b3AoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVUaW1lciB9O1xuIiwiaW1wb3J0IHJlc3RhcnRCdG5TdHlsZXNTdHIgZnJvbSAnLi9SZXN0YXJ0QnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3QgcmVzdGFydEJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5yZXN0YXJ0QnRuU3R5bGVzLnRleHRDb250ZW50ID0gcmVzdGFydEJ0blN0eWxlc1N0cjtcblxuY2xhc3MgUmVzdGFydEJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvblwiPlJlc3RhcnQgZ2FtZTwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQocmVzdGFydEJ0blN0eWxlcyk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgncmVzdGFydCcsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IFJlc3RhcnRCdG4gfTtcbiIsImltcG9ydCBtb2RhbFN0eWxlc1N0ciBmcm9tICcuL1Jlc3VsdE1vZGFsLnN0eWxlcy5zY3NzJztcblxuY29uc3QgbW9kYWxTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xubW9kYWxTdHlsZXMuaW5uZXJUZXh0ID0gbW9kYWxTdHlsZXNTdHI7XG5cbmNsYXNzIFJlc3VsdE1vZGFsIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZChtb2RhbFN0eWxlcyk7XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgd3JhcHBlci5jbGFzc05hbWUgPSAnbW9kYWxfX3dyYXBwZXInO1xuXG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtb2RhbC5jbGFzc05hbWUgPSAnbW9kYWwnO1xuXG4gICAgaWYgKHRoaXMubWVzc2FnZSkge1xuICAgICAgbW9kYWwudGV4dENvbnRlbnQgPSB0aGlzLm1lc3NhZ2U7XG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjbG9zZS5jbGFzc05hbWUgPSAnbW9kYWxfX2Nsb3NlJztcbiAgICBjbG9zZS5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWxfX2Nsb3NlLXN0cm9rZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsX19jbG9zZS1zdHJva2VcIj48L2Rpdj5cbiAgICBgO1xuXG4gICAgbW9kYWwuYXBwZW5kKGNsb3NlKTtcbiAgICB3cmFwcGVyLmFwcGVuZChtb2RhbCk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQod3JhcHBlcik7XG5cbiAgICBjbG9zZS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IFJlc3VsdE1vZGFsIH07XG4iLCJpbXBvcnQgc2F2ZUJ0blN0eWxlc1N0ciBmcm9tICcuL1NhdmVCdG4uc3R5bGVzLnNjc3MnO1xuXG5jb25zdCBzYXZlQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnNhdmVCdG5TdHlsZXMudGV4dENvbnRlbnQgPSBzYXZlQnRuU3R5bGVzU3RyO1xuXG5jbGFzcyBTYXZlQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+U2F2ZSBnYW1lPC9kaXY+XG4gICAgYDtcbiAgICBzaGFkb3dSb290LmFwcGVuZChzYXZlQnRuU3R5bGVzKTtcbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUuY3VycmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NhdmUtZ2FtZScsIHsgYnViYmxlczogdHJ1ZSwgY29tcG9zZWQ6IHRydWUgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgU2F2ZUJ0biB9O1xuIiwiaW1wb3J0IHNvbHV0aW9uQnRuU3R5bGVzU3RyIGZyb20gJy4vU29sdXRpb25CdG4uc3R5bGVzLnNjc3MnO1xuXG5jb25zdCBzb2x1dGlvbkJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5zb2x1dGlvbkJ0blN0eWxlcy50ZXh0Q29udGVudCA9IHNvbHV0aW9uQnRuU3R5bGVzU3RyO1xuXG5jbGFzcyBTb2x1dGlvbkJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvblwiPlNvbHV0aW9uPC9kaXY+XG4gICAgYDtcbiAgICBzaGFkb3dSb290LmFwcGVuZChzb2x1dGlvbkJ0blN0eWxlcyk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgZS5jdXJyZW50VGFyZ2V0LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc29sdXRpb24nLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBTb2x1dGlvbkJ0biB9O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gQ29sb3JzXG5cbiRjb2xvci1iYWNrZ3JvdW5kOiAjZmJmM2YyO1xuJGNvbG9yLWFjY2VudDogIzFjNzY4ZjtcbiRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTE6ICNmYTk5MWM7XG4kY29sb3ItYWNjZW50LXNlY29uZGFyeS0yOiAjZmExYzY2O1xuJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMzogIzYyMWNmYTtcblxuJGNvbG9yLXRleHQtbWFpbjogIzI2MjYyNjtcbiRjb2xvci10ZXh0LXJldmVyc2U6ICNmZmZmZmY7XG5cbi8vIFNpemVzXG5cbjpyb290IHtcbiAgLS1jZWxsLXNpemU6IGF1dG87XG59XG5cbi8vIEZvbnRzXG5cbiRmb250LW1haW46ICdTaWduaWthIE5lZ2F0aXZlJywgc2Fucy1zZXJpZjtcbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L21peGlucycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmJ1cmdlci1pY29uIHtcbiAgZGlzcGxheTogbm9uZTtcblxuICB3aWR0aDogNDRweDtcbiAgaGVpZ2h0OiA0NHB4O1xuXG4gIEBpbmNsdWRlIG1heC03Njgge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5cbiAgJGJ0bjogJjtcblxuICAmLmFjdGl2ZSB7XG4gICAgI3skYnRufV9fc3Ryb2tlIHtcbiAgICAgICY6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDVweCkgcm90YXRlKDQ1ZGVnKTtcbiAgICAgIH1cblxuICAgICAgJjpudGgtY2hpbGQoMikge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCkgcm90YXRlKC00NWRlZyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJl9fc3Ryb2tlIHtcbiAgICB3aWR0aDogMjRweDtcbiAgICBoZWlnaHQ6IDJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYmFja2dyb3VuZDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG5cbiAgICB0cmFuc2l0aW9uOiAwLjNzO1xuICB9XG59XG4iLCIvKiBGb3IgbWVkaWEgcXVlcmllcyAqL1xuXG5AbWl4aW4gbWF4LTEyMDAge1xuICBAbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1pbi0xMDI0IHtcbiAgQG1lZGlhIChtaW4td2lkdGg6IDEwMjRweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtYXgtMTAyNCB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMDI0cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTc2OCB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtYXgtNTc2IHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1heC0zODAge1xuICBAbWVkaWEgKG1heC13aWR0aDogMzgwcHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gcG9ydHJhaXQge1xuICBAbWVkaWEgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG4iLCJAdXNlICcuLy4uL2Fic3RyYWN0L21peGlucycgYXMgKjtcbkB1c2UgJy4vLi4vYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuXG4qIHtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuaHRtbCB7XG5cdHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xufVxuXG5ib2R5IHtcblx0YmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWJhY2tncm91bmQ7XG5cdHVzZXItc2VsZWN0OiBub25lO1xuXG5cdCYuc2Nyb2xsLWRpc2FibGVkIHtcblx0XHRoZWlnaHQ6IDEwMCU7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0fVxufVxuXG4ud3JhcHBlciB7XG5cdG1heC13aWR0aDogMTQ0MHB4O1xuXHRwYWRkaW5nOiAwIDQwcHg7XG5cdG1hcmdpbjogMCBhdXRvO1xuXG5cdEBpbmNsdWRlIG1heC01NzYge1xuXHRcdHBhZGRpbmc6IDAgNC4yMTA1MiU7XG5cdH1cbn1cblxuLnNlY3Rpb24ge1xuXHRtYXJnaW4tYm90dG9tOiAxMDBweDtcbn1cblxuaW1nIHtcblx0bWF4LXdpZHRoOiAxMDAlO1xufVxuXG4udHJhbnNwYXJlbnQge1xuXHRvcGFjaXR5OiAwO1xufVxuXG46aG9zdCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufVxuIiwiQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvbWl4aW5zJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi9zdHlsZXMvbGF5b3V0L2Jhc2ljJyBhcyAqO1xuXG46aG9zdCB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgYmFja2dyb3VuZDogJGNvbG9yLWFjY2VudDtcblxuICAqIHtcbiAgICBjb2xvcjogJGNvbG9yLWJhY2tncm91bmQ7XG4gIH1cbn1cblxuYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAxMHB4O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbmdhbWUtbWVudSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgJi5oZWFkZXIge1xuICAgIEBpbmNsdWRlIG1heC03Njgge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAmLmhpZGRlbiB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICAmLmFic29sdXRlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA3NnB4O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG5cbiAgICBwYWRkaW5nOiAwIDE2cHggMjBweCAxNnB4O1xuXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1hY2NlbnQ7XG4gIH1cbn1cblxuLndyYXBwZXIge1xuICBwYWRkaW5nOiAxNnB4O1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuIiwiLmFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDIwcHg7XG59XG4iLCJAdXNlICcuLy4uL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmJ1dHRvbiB7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuXG4gIGNvbG9yOiAkY29sb3ItdGV4dC1yZXZlcnNlO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTE7XG5cbiAgYm9yZGVyLXJhZGl1czogMTBweDtcblxuICB0cmFuc2l0aW9uOiAwLjNzO1xuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMTIwJSk7XG4gIH1cblxuICAmLmRpc2FibGVkIHtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgZmlsdGVyOiBvcGFjaXR5KDAuNikgZ3JheXNjYWxlKDAuNSk7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgIGZpbHRlcjogb3BhY2l0eSgwLjYpIGdyYXlzY2FsZSgwLjUpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYWNjZW50LXNlY29uZGFyeS0yO1xufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYWNjZW50LXNlY29uZGFyeS0zO1xufVxuIiwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xuXG4vKiBEb2N1bWVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cbiAqL1xuXG5odG1sIHtcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXG59XG5cbi8qIFNlY3Rpb25zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxuICovXG5cbm1haW4ge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxuICovXG5cbmgxIHtcbiAgZm9udC1zaXplOiAyZW07XG4gIG1hcmdpbjogMC42N2VtIDA7XG59XG5cbi8qIEdyb3VwaW5nIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxuICovXG5cbmhyIHtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cbiAgaGVpZ2h0OiAwOyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5wcmUge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxucCB7XG4gIG1hcmdpbjogMDtcbn1cblxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxuICovXG5cbmEge1xuICBkaXNwbGF5OiBibG9jaztcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG59XG5cbnVsIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG4vKipcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxuICovXG5cbmFiYnJbdGl0bGVdIHtcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxuICovXG5cbmIsXG5zdHJvbmcge1xuICBmb250LXdlaWdodDogYm9sZGVyO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuY29kZSxcbmtiZCxcbnNhbXAge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zbWFsbCB7XG4gIGZvbnQtc2l6ZTogODAlO1xufVxuXG4vKipcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxuICogYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1YixcbnN1cCB7XG4gIGZvbnQtc2l6ZTogNzUlO1xuICBsaW5lLWhlaWdodDogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbnN1YiB7XG4gIGJvdHRvbTogLTAuMjVlbTtcbn1cblxuc3VwIHtcbiAgdG9wOiAtMC41ZW07XG59XG5cbi8qIEVtYmVkZGVkIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cbiAqL1xuXG5pbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xufVxuXG4vKiBGb3Jtc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCxcbm9wdGdyb3VwLFxuc2VsZWN0LFxudGV4dGFyZWEge1xuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cbiAgbWFyZ2luOiAwOyAvKiAyICovXG59XG5cbmJ1dHRvbiB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbn1cblxuLyoqXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXG4gKi9cblxuYnV0dG9uLFxuaW5wdXQge1xuICAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbixcbnNlbGVjdCB7XG4gIC8qIDEgKi9cbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5bdHlwZT0nYnV0dG9uJ10sXG5bdHlwZT0ncmVzZXQnXSxcblt0eXBlPSdzdWJtaXQnXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xuICBhcHBlYXJhbmNlOiBidXR0b247XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT0nYnV0dG9uJ106Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT0ncmVzZXQnXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdzdWJtaXQnXTo6LW1vei1mb2N1cy1pbm5lciB7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxuLyoqXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXG4gKi9cblxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9J2J1dHRvbiddOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9J3Jlc2V0J106LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0nc3VibWl0J106LW1vei1mb2N1c3Jpbmcge1xuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmZpZWxkc2V0IHtcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5sZWdlbmQge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAzICovXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxuICovXG5cbnByb2dyZXNzIHtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxuICovXG5cbnRleHRhcmVhIHtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbi8qKlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXG4gKi9cblxuW3R5cGU9J2NoZWNrYm94J10sXG5bdHlwZT0ncmFkaW8nXSB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cbiAgcGFkZGluZzogMDsgLyogMiAqL1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cbiAqL1xuXG5bdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5bdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cbiAqL1xuXG5bdHlwZT0nc2VhcmNoJ10ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xuICBhcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXG4gKi9cblxuW3R5cGU9J3NlYXJjaCddOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXG4gKi9cblxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cbn1cblxuLyogSW50ZXJhY3RpdmVcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxuICovXG5cbmRldGFpbHMge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdW1tYXJ5IHtcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xufVxuXG4vKiBNaXNjXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cbiAqL1xuXG50ZW1wbGF0ZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXG4gKi9cblxuW2hpZGRlbl0ge1xuICBkaXNwbGF5OiBub25lO1xufVxuIiwiQHVzZSAnLi8uLi8uLi9zdHlsZXMvYmFzZS9ub3JtYWxpemUnIGFzICo7XG5AdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC9taXhpbnMnIGFzICo7XG5cbjpob3N0IHtcbiAgKiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxufVxuXG4uYWN0aW9ucyB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG5cbiAgd2lkdGg6IDEwMCU7XG5cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ubm9ub2dyYW0ge1xuICAmX19jb250YWluZXIge1xuICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSk7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICB9XG5cbiAgJl9fd3JhcHBlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZmxleC1ncm93OiAxO1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgd2lkdGg6IDQwJTtcblxuICBAaW5jbHVkZSBtYXgtMTIwMCB7XG4gICAgd2lkdGg6IDUwJTtcbiAgfVxuXG4gIEBpbmNsdWRlIHBvcnRyYWl0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIEBpbmNsdWRlIG1heC03Njgge1xuICAgIGZvbnQtc2l6ZTogbWluKGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDAuOCksIDJyZW0pO1xuICB9XG5cbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOlxuICAgIGF1dG9cbiAgICAxZnIgMWZyO1xuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxuICAgICdhIGIgYidcbiAgICAnYyBkIGQnXG4gICAgJ2MgZCBkJztcbn1cblxuLnN1bW1hcnkge1xuICBwYWRkaW5nOiAxMHB4O1xuXG4gIGdyaWQtYXJlYTogYTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxNnB4O1xuXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRvcC1wYW5lIHtcbiAgZ3JpZC1hcmVhOiBiO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG5cbiAgZGlzcGxheTogZmxleDtcblxuICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLWxlZnQ6IDFweCAjMDAwIHNvbGlkO1xuXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDAxZjtcblxuICAmX19oaW50IHtcbiAgICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblxuICAgIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1yaWdodDogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCAjMDAwIHNvbGlkO1xuXG4gICAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgICAgYm9yZGVyLXJpZ2h0OiAycHggIzAwMDAwMCBzb2xpZDtcbiAgICB9XG4gIH1cblxuICAmX19udW1iZXIge1xuICAgIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cbn1cblxuLmxlZnQtcGFuZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBncmlkLWFyZWE6IGM7XG5cbiAgYm9yZGVyLXRvcDogMXB4ICMwMDAgc29saWQ7XG4gIGJvcmRlci1ib3R0b206IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDFmO1xuXG4gICZfX2hpbnQge1xuICAgIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cbiAgICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggIzAwMCBzb2xpZDtcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICBib3JkZXItYm90dG9tOiAycHggIzAwMDAwMCBzb2xpZDtcbiAgICB9XG4gIH1cblxuICAmX19udW1iZXIge1xuICAgIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxufVxuXG5nYW1lLWZpZWxkIHtcbiAgZ3JpZC1hcmVhOiBkO1xufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYmFzZS9ub3JtYWxpemUnIGFzICo7XG5cbjpob3N0IHtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBib3JkZXI6IDFweCAjMDAwMDAwIHNvbGlkO1xuXG4gICoge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmYWM7XG59XG5cbi5yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XG5cbiAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgIGJvcmRlci1ib3R0b206IDJweCAjMDAwMDAwIHNvbGlkO1xuICB9XG59XG5cbi5jZWxsIHtcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcbiAgYm9yZGVyOiAxcHggIzAwMDAwMCBzb2xpZDtcblxuICB0cmFuc2l0aW9uOiAwLjJzO1xuXG4gICY6bnRoLWNoaWxkKDVuKTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICBib3JkZXItcmlnaHQ6IDJweCAjMDAwMDAwIHNvbGlkO1xuICB9XG5cbiAgJi5maWxsZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gIH1cblxuICAmLmNyb3NzZWQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICY6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbGVmdDogNTAlO1xuXG4gICAgICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC45KTtcbiAgICAgIGhlaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcblxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgcm90YXRlKDQ1ZGVnKTtcbiAgICB9XG4gICAgJjo6YWZ0ZXIge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIGxlZnQ6IDUwJTtcblxuICAgICAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDAuOSk7XG4gICAgICBoZWlnaHQ6IDNweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG5cbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHJvdGF0ZSgtNDVkZWcpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuXG4ubW9kYWwge1xuICAmX193cmFwcGVyIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcblxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDAzZjtcblxuICAgIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgICAmLmhpZGRlbiB7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxuXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZzogNDBweDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWJhY2tncm91bmQ7XG5cbiAgJl9fY2xvc2Uge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDVweDtcbiAgICByaWdodDogNXB4O1xuXG4gICAgd2lkdGg6IDM0cHg7XG4gICAgaGVpZ2h0OiAzNHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuXG4gICAgJjpob3ZlciB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuXG4gICAgJi1zdHJva2Uge1xuICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICBoZWlnaHQ6IDJweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci10ZXh0LW1haW47XG4gICAgICBib3JkZXItcmFkaXVzOiAycHg7XG5cbiAgICAgIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgICAgICY6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDVweCkgcm90YXRlKDQ1ZGVnKTtcbiAgICAgIH1cblxuICAgICAgJjpudGgtY2hpbGQoMikge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCkgcm90YXRlKC00NWRlZyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9jb21wb25lbnRzL2J1dHRvbicgYXMgKjtcblxuLmJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTM7XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9jb21wb25lbnRzL2J1dHRvbicgYXMgKjtcblxuLmJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTI7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuL3N0eWxlcy9tYWluLnNjc3MnO1xuaW1wb3J0IHsgQXBwUm91dGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2FwcC1yb3V0ZXIvQXBwUm91dGVyJztcbmltcG9ydCB7IEdhbWVIZWFkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FtZUhlYWRlci9HYW1lSGVhZGVyJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLWhlYWRlcicsIEdhbWVIZWFkZXIpO1xuXG5kb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTChcbiAgJ2FmdGVyYmVnaW4nLFxuICBgXG5cdFx0PGdhbWUtaGVhZGVyPjwvZ2FtZS1oZWFkZXI+XG5cdFx0PG1haW4gaWQ9XCJtYWluXCIgY2xhc3M9XCJtYWluIHdyYXBwZXJcIj5cblx0XHQ8L21haW4+XG5cdGBcbik7XG5cbmNvbnN0IHJvdXRlciA9IG5ldyBBcHBSb3V0ZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IGRlZXBlc3RFbCA9IGUuY29tcG9zZWRQYXRoKClbMF07XG5cbiAgICBpZiAoZGVlcGVzdEVsLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW2RhdGEtbGlua10nKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcm91dGVyLmNoYW5nZUhhc2goZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcblxuICAgICAgbGV0IHBhcmFtcyA9IFtdO1xuICAgICAgaWYgKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSA9PT0gJ25vbm9ncmFtJykge1xuICAgICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnZ2FtZS1uYW1lJykpIHtcbiAgICAgICAgICBwYXJhbXMucHVzaChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdnYW1lLW5hbWUnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKSkge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2xldmVsJykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW3JhbmRvbV0nKSkge1xuICAgICAgICBwYXJhbXMucHVzaCgncmFuZG9tJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW2NvbnRpbnVlXScpKSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKCdjb250aW51ZScpO1xuICAgICAgfVxuXG4gICAgICByb3V0ZXIuc2hvd1JvdXRlKHBhcmFtcyk7XG4gICAgfVxuICB9KTtcblxuICB3aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHtcbiAgICByb3V0ZXIuc2hvd1JvdXRlKCk7XG4gIH07XG5cbiAgcm91dGVyLnNob3dSb3V0ZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiR2FtZU1lbnUiLCJHYW1lTm9ub2dyYW0iLCJub25vZ3JhbXMiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIkFwcFJvdXRlciIsImNvbnN0cnVjdG9yIiwiYXBwIiwicm91dGVzIiwiaGFzaCIsInZpZXciLCJuYW1lIiwibGV2ZWwiLCJzYXZlZFNvbHV0aW9uIiwiY3Jvc3NlZCIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwicmVzb2x2ZWROYW1lIiwicmVzb2x2ZWRMZXZlbCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRJdGVtIiwiY2hhbmdlSGFzaCIsInVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwic2hvd1JvdXRlIiwicGFyYW1zIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiaGVhZGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYnVyZ2VyTWVudSIsInNoYWRvd1Jvb3QiLCJjbGFzc0xpc3QiLCJhZGQiLCJuZXdQYXJhbXMiLCJyYW5kb21OdW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21Ob25vZ3JhbSIsInNhdmVkIiwiSlNPTiIsInBhcnNlIiwiY3VycmVudFNvbHV0aW9uIiwidGltZSIsIm1hdGNoIiwiZmluZCIsIml0ZW0iLCJzbGljZSIsImlubmVySFRNTCIsImJ1cmdlck1lbnVTdHlsZXNTdHIiLCJCdXJnZXJNZW51QnRuIiwiSFRNTEVsZW1lbnQiLCJjb25uZWN0ZWRDYWxsYmFjayIsImF0dGFjaFNoYWRvdyIsIm1vZGUiLCJidXJnZXJCdG5TdHlsZXMiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJhcHBlbmQiLCJidG4iLCJnYW1lTWVudSIsImlzQnVyZ2VyIiwiYWZ0ZXIiLCJvbmNsaWNrIiwidG9nZ2xlIiwiaGVhZGVyU3R5bGVzU3RyIiwiaGVhZGVyU3R5bGVzIiwidGVtcGxhdGUiLCJHYW1lSGVhZGVyIiwiY29udGVudCIsImNsb25lTm9kZSIsImluSGVhZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJtZW51U3R5bGVTdHIiLCJSYW5kb21CdG4iLCJDb250aW51ZUJ0biIsIlRlbXBsYXRlc0J0biIsImxldmVscyIsIlNldCIsIm1hcCIsImxldmVsc0hUTUwiLCJnYW1lTmFtZXMiLCJmaWx0ZXIiLCJqb2luIiwibWVudVN0eWxlcyIsImFjdGlvbnMiLCJnZXRBdHRyaWJ1dGUiLCJzdHlsZSIsImRpc3BsYXkiLCJsYXN0RWxlbWVudENoaWxkIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZmxleERpcmVjdGlvbiIsImFsaWduSXRlbXMiLCJjb250aW51ZUJ0blN0eWxlc1N0ciIsImhyZWYiLCJzZXRBdHRyaWJ1dGUiLCJpbm5lclRleHQiLCJjb250aW51ZUJ0blN0eWxlcyIsInJhbmRvbUJ0blN0eWxlc1N0ciIsInJhbmRvbUJ0blN0eWxlcyIsInRlbXBsYXRlc0J0blN0eWxlc1N0ciIsInRlbXBsYXRlc0J0blN0eWxlcyIsIm5vbm9ncmFtU3R5bGVzU3RyIiwiR2FtZUZpZWxkIiwiUmVzdGFydEJ0biIsIlNvbHV0aW9uQnRuIiwiU2F2ZUJ0biIsIkdhbWVUaW1lciIsIlJlc3VsdE1vZGFsIiwid2luU291bmRGaWxlIiwibm9ub2dyYW1TdHlsZXMiLCJ0aW1lciIsImNvbnNvbGUiLCJsb2ciLCJzYXZlZE1pbnV0ZXMiLCJzYXZlZFNlY29uZHMiLCJjb250aW51ZSIsInRvVXBwZXJDYXNlIiwibm9ub2dyYW0iLCJmaWVsZCIsImlkIiwibWF0cml4IiwiY29ycmVjdFNvbHV0aW9uIiwiZmxhdCIsInRvU3RyaW5nIiwic3RyIiwiZm9yRWFjaCIsImVsIiwicmVkdWNlIiwiYWNjIiwiY3VyciIsInNxdWFyZSIsInRvcFBhbmUiLCJsZWZ0UGFuZSIsIm1heExlZnRIaW50cyIsImkiLCJsZWZ0SGludCIsInRvcEhpbnQiLCJjb3VudGVyTGVmdCIsImNvdW50ZXJUb3AiLCJqIiwiY2hpbGRyZW4iLCJub25vZ3JhbVdpZHRoIiwib2Zmc2V0V2lkdGgiLCJjZWxsU2l6ZSIsImRvY3VtZW50RWxlbWVudCIsInNldFByb3BlcnR5IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwibWludXRlc1N0ciIsInNlY29uZHNTdHIiLCJBdWRpbyIsInBsYXkiLCJtb2RhbCIsIm1lc3NhZ2UiLCJ0aW1lclN0YXJ0ZWQiLCJyZXN0YXJ0Iiwic3RvcCIsImRldGFpbCIsImdhbWUiLCJjdXJyZW50Q3Jvc3NlZCIsInN0cmluZ2lmeSIsImxhdW5jaCIsImZpZWxkU3R5bGVzU3RyIiwiZmlsbFNvdW5kRmlsZSIsImNsZWFyU291bmRGaWxlIiwiY3Jvc3NTb3VuZEZpbGUiLCJmaWVsZFN0eWxlcyIsInNwbGl0Iiwicm93IiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJmaWxsIiwiY2VsbCIsImUiLCJjbGlja3NEaXNhYmxlZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInRhcmdldCIsInJlbW92ZSIsImNvbnRhaW5zIiwiY2hlY2tTb2x1dGlvbiIsInByZXZlbnREZWZhdWx0IiwiYnViYmxlcyIsImNvbXBvc2VkIiwiZW5hYmxlQ2xpY2tzIiwiZGlzYWJsZUNsaWNrcyIsInNvbHV0aW9uIiwidGltZXJTdHlsZXNTdHIiLCJ0aW1lclN0eWxlcyIsInJlbmRlcmVkIiwicmVuZGVyIiwiZHVyYXRpb24iLCJjdXJyZW50RHVyYXRpb24iLCJvYnNlcnZlZEF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2siLCJtaW4iLCJzZWMiLCJzdGFydFRpbWUiLCJEYXRlIiwibm93IiwiY2xlYXJJbnRlcnZhbCIsImludGVydmFsSUQiLCJzZXRJbnRlcnZhbCIsInRydW5jIiwiZGlzY29ubmVjdGVkQ2FsbGJhY2siLCJyZXN0YXJ0QnRuU3R5bGVzU3RyIiwicmVzdGFydEJ0blN0eWxlcyIsIm1vZGFsU3R5bGVzU3RyIiwibW9kYWxTdHlsZXMiLCJhcHBlbmRDaGlsZCIsIndyYXBwZXIiLCJjbGFzc05hbWUiLCJjbG9zZSIsInNhdmVCdG5TdHlsZXNTdHIiLCJzYXZlQnRuU3R5bGVzIiwiY3VycmVudFRhcmdldCIsInNvbHV0aW9uQnRuU3R5bGVzU3RyIiwic29sdXRpb25CdG5TdHlsZXMiLCJib2R5Iiwicm91dGVyIiwiZGVlcGVzdEVsIiwiY29tcG9zZWRQYXRoIiwibWF0Y2hlcyIsInB1c2giLCJvbnBvcHN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==