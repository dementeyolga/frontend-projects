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
    if (this.inHeader) {
      console.log(document.documentElement.clientWidth);
      if (document.documentElement.clientWidth <= 768) {
        this.style.display = 'none';
      }
    } else if (!this.isBurger) {
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

        const styles = `:root{--cell-size: auto}*{box-sizing:border-box}html{scroll-behavior:smooth}body{background-color:#fbf3f2;user-select:none}body.scroll-disabled{height:100%;overflow:hidden}.wrapper{max-width:1440px;padding:0 40px;margin:0 auto}@media(max-width: 576px){.wrapper{padding:0 4.21052%}}.section{margin-bottom:100px}img{max-width:100%}.transparent{opacity:0}:host{display:block}:host{margin-bottom:20px;display:flex;background:#1c768f}:host *{color:#fbf3f2}a{display:block;padding:10px;text-decoration:none;text-transform:uppercase;font-weight:600}game-menu{display:flex;transition:.3s}game-menu.hidden{visibility:hidden;opacity:0}game-menu.absolute{position:absolute;top:76px;left:0;right:0;padding:0 16px 20px 16px;flex-direction:column;background-color:#1c768f}.wrapper{padding:16px;width:100%;display:flex;justify-content:space-between;align-items:center}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFRLENBQUM7TUFDdkI7TUFFQSxJQUFJSCxTQUFTLENBQUNFLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNuQzVNLE1BQU0sQ0FBQzZNLElBQUksQ0FBQyxVQUFVLENBQUM7TUFDekI7TUFFQUosTUFBTSxDQUFDMU0sU0FBUyxDQUFDQyxNQUFNLENBQUM7SUFDMUI7RUFDRixDQUFDLENBQUM7RUFFRkgsTUFBTSxDQUFDaU4sVUFBVSxHQUFHLE1BQU07SUFDeEJMLE1BQU0sQ0FBQzFNLFNBQVMsQ0FBQyxDQUFDO0VBQ3BCLENBQUM7RUFFRDBNLE1BQU0sQ0FBQzFNLFNBQVMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvYXBwLXJvdXRlci9BcHBSb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvYnVyZ2VyTWVudS9CdXJnZXJNZW51QnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVIZWFkZXIvR2FtZUhlYWRlci5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9HYW1lTWVudS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9jb250aW51ZUJ0bi9Db250aW51ZUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9yYW5kb21CdG4vUmFuZG9uQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L3RlbXBsYXRlc0J0bi9UZW1wbGF0ZXNCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZUZpZWxkL0dhbWVGaWVsZC5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZVRpbWVyL0dhbWVUaW1lci5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vcmVzdGFydEJ0bi9SZXN0YXJ0QnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9yZXN1bHRNb2RhbC9SZXN1bHRNb2RhbC5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vc2F2ZUJ0bi9TYXZlQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zb2x1dGlvbkJ0bi9Tb2x1dGlvbkJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL21haW4uc2Nzcz9mYzc3Iiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvYWJzdHJhY3QvX3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2J1cmdlck1lbnUvQnVyZ2VyTWVudUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2Fic3RyYWN0L19taXhpbnMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2xheW91dC9fYmFzaWMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lSGVhZGVyL0dhbWVIZWFkZXIuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvR2FtZU1lbnUuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9jb21wb25lbnRzL19idXR0b24uc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9jb250aW51ZUJ0bi9Db250aW51ZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS90ZW1wbGF0ZXNCdG4vVGVtcGxhdGVzQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvYmFzZS9fbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbS5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZUZpZWxkL0dhbWVGaWVsZC5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vcmVzdWx0TW9kYWwvUmVzdWx0TW9kYWwuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NhdmVCdG4vU2F2ZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vc29sdXRpb25CdG4vU29sdXRpb25CdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZU1lbnUgfSBmcm9tICcuLi9nYW1lTWVudS9HYW1lTWVudSc7XG5pbXBvcnQgeyBHYW1lTm9ub2dyYW0gfSBmcm9tICcuLi9nYW1lTm9ub2dyYW0vR2FtZU5vbm9ncmFtJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLW1lbnUnLCBHYW1lTWVudSk7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtbm9ub2dyYW0nLCBHYW1lTm9ub2dyYW0pO1xuXG5jbGFzcyBBcHBSb3V0ZXIge1xuICBjb25zdHJ1Y3RvcihhcHApIHtcbiAgICB0aGlzLmFwcCA9IGFwcDtcblxuICAgIHRoaXMucm91dGVzID0gW1xuICAgICAge1xuICAgICAgICBoYXNoOiAnJyxcbiAgICAgICAgdmlldzogKCkgPT4gJzxnYW1lLW1lbnUgbWFpbi1wYWdlPVwidHJ1ZVwiPjwvZ2FtZS1tZW51PicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBoYXNoOiAnbm9ub2dyYW0nLFxuICAgICAgICB2aWV3OiAobmFtZSwgbGV2ZWwsIHNhdmVkU29sdXRpb24sIGNyb3NzZWQsIG1pbnV0ZXMsIHNlY29uZHMpID0+IHtcbiAgICAgICAgICBsZXQgcmVzb2x2ZWROYW1lO1xuICAgICAgICAgIGxldCByZXNvbHZlZExldmVsO1xuXG4gICAgICAgICAgaWYgKG5hbWUgJiYgbGV2ZWwpIHtcbiAgICAgICAgICAgIHJlc29sdmVkTmFtZSA9IG5hbWU7XG4gICAgICAgICAgICByZXNvbHZlZExldmVsID0gbGV2ZWw7XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLW5hbWUnLCBuYW1lKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLWxldmVsJywgbGV2ZWwpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1uYW1lJykgJiZcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLWxldmVsJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc29sdmVkTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLW5hbWUnKTtcbiAgICAgICAgICAgIHJlc29sdmVkTGV2ZWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1sZXZlbCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlZE5hbWUgPSBub25vZ3JhbXNbMF0ubmFtZTtcbiAgICAgICAgICAgIHJlc29sdmVkTGV2ZWwgPSBub25vZ3JhbXNbMF0ubGV2ZWw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxnYW1lLW5vbm9ncmFtIG5hbWU9XCIke3Jlc29sdmVkTmFtZX1cIiBsZXZlbD1cIiR7cmVzb2x2ZWRMZXZlbH1cIiAgc2F2ZWRzb2x1dGlvbj1cIiR7c2F2ZWRTb2x1dGlvbiB8fCAnJ31cIiBjcm9zc2VkPVwiJHtjcm9zc2VkIHx8ICcnfVwiIG1pbnV0ZXM9XCIke21pbnV0ZXMgfHwgJzAnfVwiIHNlY29uZHM9XCIke3NlY29uZHMgfHwgJzAnfVwiPlxuICAgICAgICAgICAgPC9nYW1lLW5vbm9ncmFtPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF07XG4gIH1cblxuICBjaGFuZ2VIYXNoKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gdXJsO1xuICB9XG5cbiAgc2hvd1JvdXRlKHBhcmFtcyA9IFtdKSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZ2FtZS1oZWFkZXInKTtcbiAgICBjb25zdCBidXJnZXJNZW51ID0gaGVhZGVyLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignZ2FtZS1tZW51LmFic29sdXRlJyk7XG4gICAgaWYgKGJ1cmdlck1lbnUpIHtcbiAgICAgIGJ1cmdlck1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV3UGFyYW1zID0gWy4uLnBhcmFtc107XG5cbiAgICBpZiAocGFyYW1zWzBdID09PSAncmFuZG9tJykge1xuICAgICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbm9ub2dyYW1zLmxlbmd0aCk7XG4gICAgICBjb25zdCByYW5kb21Ob25vZ3JhbSA9IG5vbm9ncmFtc1tyYW5kb21OdW1dO1xuXG4gICAgICBuZXdQYXJhbXNbMF0gPSByYW5kb21Ob25vZ3JhbS5uYW1lO1xuICAgICAgbmV3UGFyYW1zWzFdID0gcmFuZG9tTm9ub2dyYW0ubGV2ZWw7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1swXSA9PT0gJ2NvbnRpbnVlJykge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZEdhbWUnKSk7XG5cbiAgICAgIG5ld1BhcmFtc1swXSA9IHNhdmVkLm5hbWU7XG4gICAgICBuZXdQYXJhbXNbMV0gPSBzYXZlZC5sZXZlbDtcbiAgICAgIG5ld1BhcmFtc1syXSA9IHNhdmVkLmN1cnJlbnRTb2x1dGlvbjtcbiAgICAgIG5ld1BhcmFtc1szXSA9IHNhdmVkLmNyb3NzZWQ7XG4gICAgICBuZXdQYXJhbXNbNF0gPSBzYXZlZC50aW1lLm1pbnV0ZXM7XG4gICAgICBuZXdQYXJhbXNbNV0gPSBzYXZlZC50aW1lLnNlY29uZHM7XG4gICAgfVxuXG4gICAgbGV0IG1hdGNoID0gdGhpcy5yb3V0ZXMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLmhhc2ggPT09IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpXG4gICAgKTtcblxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIG1hdGNoID0gdGhpcy5yb3V0ZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5oYXNoID09PSAnJyk7XG4gICAgfVxuXG4gICAgdGhpcy5hcHAuaW5uZXJIVE1MID0gbWF0Y2gudmlldyguLi5uZXdQYXJhbXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEFwcFJvdXRlciB9O1xuIiwiaW1wb3J0IGJ1cmdlck1lbnVTdHlsZXNTdHIgZnJvbSAnLi9CdXJnZXJNZW51QnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgQnVyZ2VyTWVudUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ1cmdlckJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgYnVyZ2VyQnRuU3R5bGVzLnRleHRDb250ZW50ID0gYnVyZ2VyTWVudVN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChidXJnZXJCdG5TdHlsZXMpO1xuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1cmdlci1pY29uJyk7XG4gICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXJnZXItaWNvbl9fc3Ryb2tlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnVyZ2VyLWljb25fX3N0cm9rZVwiPjwvZGl2PlxuICAgIGA7XG5cbiAgICBjb25zdCBnYW1lTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dhbWUtbWVudScpO1xuICAgIGdhbWVNZW51LmlzQnVyZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLmFmdGVyKGdhbWVNZW51KTtcbiAgICBnYW1lTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBnYW1lTWVudS5jbGFzc0xpc3QuYWRkKCdhYnNvbHV0ZScpO1xuXG4gICAgYnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICBnYW1lTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9O1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcbiAgfVxufVxuXG5leHBvcnQgeyBCdXJnZXJNZW51QnRuIH07XG4iLCJpbXBvcnQgaGVhZGVyU3R5bGVzU3RyIGZyb20gJy4vR2FtZUhlYWRlci5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgeyBCdXJnZXJNZW51QnRuIH0gZnJvbSAnLi4vYnVyZ2VyTWVudS9CdXJnZXJNZW51QnRuJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdidXJnZXItYnRuJywgQnVyZ2VyTWVudUJ0bik7XG5cbmNvbnN0IGhlYWRlclN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5oZWFkZXJTdHlsZXMudGV4dENvbnRlbnQgPSBoZWFkZXJTdHlsZXNTdHI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPGRpdiBpZD1cIndyYXBwZXJcIiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICA8YSBocmVmPVwiXCIgZGF0YS1saW5rPk5vbm9ncmFtczwvYT5cbiAgICA8YnVyZ2VyLWJ0bj48L2J1cmdlci1idG4+XG4gIDwvZGl2PiAgXG5gO1xuY2xhc3MgR2FtZUhlYWRlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGhlYWRlclN0eWxlcyk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgY29uc3QgZ2FtZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdnYW1lLW1lbnUnKTtcbiAgICBnYW1lTWVudS5pbkhlYWRlciA9IHRydWU7XG4gICAgc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpLmFwcGVuZChnYW1lTWVudSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZUhlYWRlciB9O1xuIiwiaW1wb3J0IG1lbnVTdHlsZVN0ciBmcm9tICcuL0dhbWVNZW51LnN0eWxlcy5zY3NzJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcbmltcG9ydCB7IFJhbmRvbUJ0biB9IGZyb20gJy4vcmFuZG9tQnRuL1JhbmRvbkJ0bic7XG5pbXBvcnQgeyBDb250aW51ZUJ0biB9IGZyb20gJy4vY29udGludWVCdG4vQ29udGludWVCdG4nO1xuaW1wb3J0IHsgVGVtcGxhdGVzQnRuIH0gZnJvbSAnLi90ZW1wbGF0ZXNCdG4vVGVtcGxhdGVzQnRuJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyYW5kb20tYnRuJywgUmFuZG9tQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29udGludWUtYnRuJywgQ29udGludWVCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0ZW1wbGF0ZXMtYnRuJywgVGVtcGxhdGVzQnRuKTtcblxuY29uc3QgbGV2ZWxzID0gWy4uLm5ldyBTZXQobm9ub2dyYW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5sZXZlbCkpXTtcblxubGV0IGxldmVsc0hUTUwgPSBsZXZlbHNcbiAgLm1hcCgobGV2ZWwpID0+IHtcbiAgICBjb25zdCBnYW1lTmFtZXMgPSBub25vZ3JhbXNcbiAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09IGxldmVsKVxuICAgICAgLm1hcChcbiAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgYDxhIGhyZWY9XCJub25vZ3JhbVwiIGNsYXNzPVwibWVudV9faXRlbVwiIGxldmVsPVwiJHtsZXZlbH1cIiBnYW1lLW5hbWU9XCIke2l0ZW0ubmFtZX1cIiBkYXRhLWxpbms+JHtpdGVtLm5hbWV9PC9hPlxcbmBcbiAgICAgIClcbiAgICAgIC5qb2luKCdcXG4nKTtcblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibGV2ZWxcIj5cbiAgICAgICAgPGgzIGNsYXNzPVwibGV2ZWxfX3RpdGxlXCI+JHtsZXZlbH08L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGV2ZWxfX2dhbWVzXCI+XG4gICAgICAgICAgJHtnYW1lTmFtZXN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfSlcbiAgLmpvaW4oJ1xcbicpO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImFjdGlvbnNcIiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZXMtYnRuPjwvdGVtcGxhdGVzLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxyYW5kb20tYnRuPjwvcmFuZG9tLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjb250aW51ZS1idG4+PC9jb250aW51ZS1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5gO1xuXG5jbGFzcyBHYW1lTWVudSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgIGNvbnN0IG1lbnVTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIG1lbnVTdHlsZXMudGV4dENvbnRlbnQgPSBtZW51U3R5bGVTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQobWVudVN0eWxlcyk7XG5cbiAgICBjb25zdCBhY3Rpb25zID0gc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnYWN0aW9ucycpO1xuXG4gICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdtYWluLXBhZ2UnKSkge1xuICAgICAgYWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmluSGVhZGVyKSB7XG4gICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpO1xuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA8PSA3NjgpIHtcbiAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNCdXJnZXIpIHtcbiAgICAgIHNoYWRvd1Jvb3QubGFzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgbGV2ZWxzSFRNTCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzQnVyZ2VyKSB7XG4gICAgICBhY3Rpb25zLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAnY29sdW1uJztcbiAgICAgIGFjdGlvbnMuc3R5bGUuYWxpZ25JdGVtcyA9ICdjZW50ZXInO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lTWVudSB9O1xuIiwiaW1wb3J0IGNvbnRpbnVlQnRuU3R5bGVzU3RyIGZyb20gJy4vQ29udGludWVCdG4uc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBDb250aW51ZUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBidG4uaHJlZiA9ICdub25vZ3JhbSc7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2NvbnRpbnVlJywgdHJ1ZSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rJywgdHJ1ZSk7XG4gICAgYnRuLmlubmVyVGV4dCA9ICdDb250aW51ZSBnYW1lJztcblxuICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkR2FtZScpKSB7XG4gICAgICBidG4uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZChidG4pO1xuXG4gICAgY29uc3QgY29udGludWVCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGNvbnRpbnVlQnRuU3R5bGVzLnRleHRDb250ZW50ID0gY29udGludWVCdG5TdHlsZXNTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoY29udGludWVCdG5TdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IENvbnRpbnVlQnRuIH07XG4iLCJpbXBvcnQgcmFuZG9tQnRuU3R5bGVzU3RyIGZyb20gJy4vUmFuZG9tQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgUmFuZG9tQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJ0bi5ocmVmID0gJ25vbm9ncmFtJztcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgncmFuZG9tJywgdHJ1ZSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rJywgdHJ1ZSk7XG4gICAgYnRuLmlubmVyVGV4dCA9ICdSYW5kb20nO1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcblxuICAgIGNvbnN0IHJhbmRvbUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgcmFuZG9tQnRuU3R5bGVzLnRleHRDb250ZW50ID0gcmFuZG9tQnRuU3R5bGVzU3RyO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHJhbmRvbUJ0blN0eWxlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUmFuZG9tQnRuIH07XG4iLCJpbXBvcnQgdGVtcGxhdGVzQnRuU3R5bGVzU3RyIGZyb20gJy4vVGVtcGxhdGVzQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgVGVtcGxhdGVzQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJ0bi5ocmVmID0gJyc7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycsIHRydWUpO1xuICAgIGJ0bi5pbm5lclRleHQgPSAnVGVtcGxhdGVzJztcblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZXNCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHRlbXBsYXRlc0J0blN0eWxlcy50ZXh0Q29udGVudCA9IHRlbXBsYXRlc0J0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZXNCdG5TdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IFRlbXBsYXRlc0J0biB9O1xuIiwiaW1wb3J0IG5vbm9ncmFtU3R5bGVzU3RyIGZyb20gJy4vR2FtZU5vbm9ncmFtLnN0eWxlcy5zY3NzJztcbmltcG9ydCB7IEdhbWVGaWVsZCB9IGZyb20gJy4vZ2FtZUZpZWxkL0dhbWVGaWVsZCc7XG5pbXBvcnQgeyBSZXN0YXJ0QnRuIH0gZnJvbSAnLi9yZXN0YXJ0QnRuL1Jlc3RhcnRCdG4nO1xuaW1wb3J0IHsgU29sdXRpb25CdG4gfSBmcm9tICcuL3NvbHV0aW9uQnRuL1NvbHV0aW9uQnRuJztcbmltcG9ydCB7IFNhdmVCdG4gfSBmcm9tICcuL3NhdmVCdG4vU2F2ZUJ0bic7XG5pbXBvcnQgeyBHYW1lVGltZXIgfSBmcm9tICcuL2dhbWVUaW1lci9HYW1lVGltZXInO1xuaW1wb3J0IHsgUmVzdWx0TW9kYWwgfSBmcm9tICcuL3Jlc3VsdE1vZGFsL1Jlc3VsdE1vZGFsJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcbmltcG9ydCB3aW5Tb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy93aW4tZ2FtZS5tcDMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtZmllbGQnLCBHYW1lRmllbGQpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyZXN0YXJ0LWJ0bicsIFJlc3RhcnRCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdzb2x1dGlvbi1idG4nLCBTb2x1dGlvbkJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NhdmUtYnRuJywgU2F2ZUJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtdGltZXInLCBHYW1lVGltZXIpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyZXN1bHQtbW9kYWwnLCBSZXN1bHRNb2RhbCk7XG5cbmNvbnN0IG5vbm9ncmFtU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbm5vbm9ncmFtU3R5bGVzLnRleHRDb250ZW50ID0gbm9ub2dyYW1TdHlsZXNTdHI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPGRpdiBjbGFzcz1cIm5vbm9ncmFtX19jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPlxuICAgICAgPHJlc3RhcnQtYnRuPjwvcmVzdGFydC1idG4+XG4gICAgICA8c2F2ZS1idG4+PC9zYXZlLWJ0bj5cbiAgICAgIDxnYW1lLXRpbWVyIGlkPVwiZ2FtZS10aW1lclwiIG1pbnV0ZXM9XCIwXCIgc2Vjb25kcz1cIjBcIj48L2dhbWUtdGltZXI+XG4gICAgICA8c29sdXRpb24tYnRuPjwvc29sdXRpb24tYnRuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBpZD1cInN1bW1hcnlcIiBjbGFzcz1cInN1bW1hcnlcIj5cbiAgICAgIDwvZGl2PiAgXG4gICAgXG4gICAgPGRpdiBjbGFzcz1cIm5vbm9ncmFtX193cmFwcGVyXCI+XG4gICAgICA8ZGl2IGlkPVwibm9ub2dyYW1cIiBjbGFzcz1cIm5vbm9ncmFtXCI+XG4gICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvcC1wYW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LXBhbmVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PiAgXG4gICAgXG4gIDwvZGl2PlxuYDtcblxuY2xhc3MgR2FtZU5vbm9ncmFtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKG5vbm9ncmFtU3R5bGVzKTtcblxuICAgIGNvbnN0IGxldmVsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xldmVsJyk7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gICAgY29uc3Qgc2F2ZWRTb2x1dGlvbiA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzYXZlZHNvbHV0aW9uJyk7XG4gICAgY29uc3QgY3Jvc3NlZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdjcm9zc2VkJyk7XG5cbiAgICBjb25zdCB0aW1lciA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI2dhbWUtdGltZXInKTtcbiAgICBjb25zb2xlLmxvZygnbm9ub2dyYW0gYWRkZWQgdG8gdGhlIGRvYycpO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKSAhPT0gJzAnIHx8XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpICE9PSAnMCdcbiAgICApIHtcbiAgICAgIGNvbnN0IHNhdmVkTWludXRlcyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdtaW51dGVzJyk7XG4gICAgICBjb25zdCBzYXZlZFNlY29uZHMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpO1xuXG4gICAgICB0aW1lci5zZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnLCBzYXZlZE1pbnV0ZXMpO1xuICAgICAgdGltZXIuc2V0QXR0cmlidXRlKCdzZWNvbmRzJywgc2F2ZWRTZWNvbmRzKTtcblxuICAgICAgdGltZXIuY29udGludWUgPSB0cnVlO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ3N1bW1hcnknKS5pbm5lckhUTUwgPSBgXG4gICAgICA8cCBjbGFzcz1cInN1bW1hcnlfX2xldmVsXCI+JHtsZXZlbH08L3A+XG4gICAgICA8cCBjbGFzcz1cInN1bW1hcnlfX25hbWVcIj4gJHtuYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpfTwvcD5cbiAgICBgO1xuXG4gICAgY29uc3Qgbm9ub2dyYW0gPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNub25vZ3JhbScpO1xuICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ2FtZS1maWVsZCcpO1xuICAgIGZpZWxkLmlkID0gJ2dhbWUtZmllbGQnO1xuICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2dhbWUtZmllbGQnKTtcbiAgICBmaWVsZC5zYXZlZFNvbHV0aW9uID0gc2F2ZWRTb2x1dGlvbjtcbiAgICBmaWVsZC5jcm9zc2VkID0gY3Jvc3NlZDtcbiAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2xldmVsJywgbGV2ZWwpO1xuXG4gICAgbm9ub2dyYW0uYXBwZW5kKGZpZWxkKTtcblxuICAgIGNvbnN0IHsgbWF0cml4IH0gPSBub25vZ3JhbXMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IG5hbWUgJiYgaXRlbS5sZXZlbCA9PT0gbGV2ZWxcbiAgICApO1xuXG4gICAgY29uc3QgY29ycmVjdFNvbHV0aW9uID0gbWF0cml4LmZsYXQoKS5qb2luKCcnKS50b1N0cmluZygpO1xuXG4gICAgLy8gRHJhdyBtYXRyaXggc29sdXRpb25cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgbWF0cml4LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBzdHIgKz0gZWwucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gY3VyciA/ICfilqAnIDogJ+KWoSc7XG4gICAgICAgIHJldHVybiBhY2MgKyBzcXVhcmU7XG4gICAgICB9LCAnJyk7XG4gICAgICBzdHIgKz0gJ1xcbic7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coc3RyKTtcblxuICAgIGNvbnN0IHRvcFBhbmUgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy50b3AtcGFuZScpO1xuICAgIGNvbnN0IGxlZnRQYW5lID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubGVmdC1wYW5lJyk7XG4gICAgbGV0IG1heExlZnRIaW50cyA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbGVmdEhpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGxlZnRIaW50LmNsYXNzTGlzdC5hZGQoJ2xlZnQtcGFuZV9faGludCcpO1xuXG4gICAgICBjb25zdCB0b3BIaW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b3BIaW50LmNsYXNzTGlzdC5hZGQoJ3RvcC1wYW5lX19oaW50Jyk7XG5cbiAgICAgIGxldCBjb3VudGVyTGVmdCA9IDA7XG4gICAgICBsZXQgY291bnRlclRvcCA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4Lmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChtYXRyaXhbaV1bal0pIHtcbiAgICAgICAgICBjb3VudGVyTGVmdCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChjb3VudGVyTGVmdCAmJiAhbWF0cml4W2ldW2pdKSB8fFxuICAgICAgICAgIChjb3VudGVyTGVmdCAmJiBqID09PSBtYXRyaXgubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGVmdEhpbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAgICAgICBgXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsZWZ0LXBhbmVfX251bWJlclwiPiR7Y291bnRlckxlZnR9PC9kaXY+XG5cdFx0XHRcdFx0XHRgXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvdW50ZXJMZWZ0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRyaXhbal1baV0pIHtcbiAgICAgICAgICBjb3VudGVyVG9wICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgKGNvdW50ZXJUb3AgJiYgIW1hdHJpeFtqXVtpXSkgfHxcbiAgICAgICAgICAoY291bnRlclRvcCAmJiBqID09PSBtYXRyaXgubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdG9wSGludC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgICAgIGBcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ0b3AtcGFuZV9fbnVtYmVyXCI+JHtjb3VudGVyVG9wfTwvZGl2PlxuXHRcdFx0XHRcdFx0YFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb3VudGVyVG9wID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZWZ0UGFuZS5hcHBlbmQobGVmdEhpbnQpO1xuICAgICAgdG9wUGFuZS5hcHBlbmQodG9wSGludCk7XG5cbiAgICAgIGlmIChsZWZ0SGludC5jaGlsZHJlbi5sZW5ndGggPiBtYXhMZWZ0SGludHMpIHtcbiAgICAgICAgbWF4TGVmdEhpbnRzID0gbGVmdEhpbnQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSBjZWxsIHNpemVcbiAgICBjb25zdCBub25vZ3JhbVdpZHRoID0gbm9ub2dyYW0ub2Zmc2V0V2lkdGg7XG5cbiAgICBsZXQgY2VsbFNpemUgPSBub25vZ3JhbVdpZHRoIC8gKG1heExlZnRIaW50cyArIG1hdHJpeC5sZW5ndGgpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jZWxsLXNpemUnLCBjZWxsU2l6ZSArICdweCcpO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdmaWxsJywgKCkgPT4ge1xuICAgICAgaWYgKGNvcnJlY3RTb2x1dGlvbiA9PT0gZmllbGQuY3VycmVudFNvbHV0aW9uKSB7XG4gICAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd3aW4nKSk7XG4gICAgICAgIHRpbWVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd3aW4nKSk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSB0aW1lci5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKTtcblxuICAgICAgICBsZXQgbWludXRlc1N0ciA9ICcnO1xuICAgICAgICBpZiAoISttaW51dGVzKSB7XG4gICAgICAgICAgbWludXRlc1N0ciA9ICcnO1xuICAgICAgICB9IGVsc2UgaWYgKCttaW51dGVzID4gMSkge1xuICAgICAgICAgIG1pbnV0ZXNTdHIgKz0gJ21pbnV0ZXMgJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtaW51dGVzU3RyICs9ICdtaW51dGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVyLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpO1xuICAgICAgICBsZXQgc2Vjb25kc1N0ciA9ICFzZWNvbmRzIHx8IGAke3NlY29uZHN9IHNlY29uZGA7XG4gICAgICAgIHNlY29uZHNTdHIgPSArc2Vjb25kcyA+IDEgPyBzZWNvbmRzU3RyICsgJ3MnIDogc2Vjb25kc1N0cjtcblxuICAgICAgICBuZXcgQXVkaW8od2luU291bmRGaWxlKS5wbGF5KCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYEdyZWF0ISBZb3UgaGF2ZSBzb2x2ZWQgdGhlIG5vbm9ncmFtICR7bmFtZVswXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKX0gaW4gJHttaW51dGVzU3RyfSR7c2Vjb25kc1N0cn0hYFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncmVzdWx0LW1vZGFsJyk7XG4gICAgICAgIG1vZGFsLm1lc3NhZ2UgPSBgR3JlYXQhIFlvdSBoYXZlIHNvbHZlZCB0aGUgbm9ub2dyYW0gJHtuYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpfSBpbiAke21pbnV0ZXNTdHJ9JHtzZWNvbmRzU3RyfSFgO1xuICAgICAgICBzaGFkb3dSb290LmFwcGVuZChtb2RhbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc3RhcnQnLCAoKSA9PiB7XG4gICAgICBmaWVsZC50aW1lclN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyZXN0YXJ0JykpO1xuICAgICAgdGltZXIucmVzdGFydCgpO1xuICAgIH0pO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdzb2x1dGlvbicsICgpID0+IHtcbiAgICAgIHRpbWVyLnN0b3AoKTtcblxuICAgICAgZmllbGQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzb2x1dGlvbicsIHtcbiAgICAgICAgICBkZXRhaWw6IG1hdHJpeC5mbGF0KCksXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdzYXZlLWdhbWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBnYW1lID0ge1xuICAgICAgICBsZXZlbCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY3VycmVudFNvbHV0aW9uOiBmaWVsZC5jdXJyZW50U29sdXRpb24sXG4gICAgICAgIGNyb3NzZWQ6IGZpZWxkLmN1cnJlbnRDcm9zc2VkLFxuICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgbWludXRlczogdGltZXIubWludXRlcyxcbiAgICAgICAgICBzZWNvbmRzOiB0aW1lci5zZWNvbmRzLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NhdmVkR2FtZScsIEpTT04uc3RyaW5naWZ5KGdhbWUpKTtcbiAgICB9KTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignc3RhcnR0aW1lcicsICgpID0+IHtcbiAgICAgIHRpbWVyLmxhdW5jaCgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVOb25vZ3JhbSB9O1xuIiwiaW1wb3J0IGZpZWxkU3R5bGVzU3RyIGZyb20gJy4vR2FtZUZpZWxkLnN0eWxlcy5zY3NzJztcbmltcG9ydCBmaWxsU291bmRGaWxlIGZyb20gJy4vLi4vLi4vLi4vYXNzZXRzL3NvdW5kLWVmZmVjdHMvZmlsbC1jZWxsLm1wMyc7XG5pbXBvcnQgY2xlYXJTb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy9jbGVhci1jZWxsLm1wMyc7XG5pbXBvcnQgY3Jvc3NTb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy9jcm9zcy1jZWxsLm1wMyc7XG5cbmNvbnN0IGZpZWxkU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbmZpZWxkU3R5bGVzLnRleHRDb250ZW50ID0gZmllbGRTdHlsZXNTdHI7XG5cbmNsYXNzIEdhbWVGaWVsZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGZpZWxkU3R5bGVzKTtcblxuICAgIHRoaXMubGV2ZWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKS5zcGxpdCgneCcpWzBdO1xuXG4gICAgdGhpcy5maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuZmllbGQuaWQgPSAnZmllbGQnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsOyBpICs9IDEpIHtcbiAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdyb3cnKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZXZlbDsgaiArPSAxKSB7XG4gICAgICAgIHJvdy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PmApO1xuICAgICAgfVxuICAgICAgdGhpcy5maWVsZC5hcHBlbmQocm93KTtcbiAgICB9XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZCh0aGlzLmZpZWxkKTtcblxuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmZpZWxkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG5cbiAgICB0aGlzLmN1cnJlbnRTb2x1dGlvbiA9XG4gICAgICB0aGlzLnNhdmVkU29sdXRpb24gfHwgbmV3IEFycmF5KHRoaXMuY2VsbHMubGVuZ3RoKS5maWxsKDApLmpvaW4oJycpO1xuXG4gICAgaWYgKHRoaXMuc2F2ZWRTb2x1dGlvbikge1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNhdmVkU29sdXRpb25baV0gPT09ICcxJykge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNyb3NzZWQpIHtcbiAgICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jcm9zc2VkW2ldID09PSAneCcpIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2Nyb3NzZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5jbGlja3NEaXNhYmxlZCkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5jbGlja3NEaXNhYmxlZCkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJyk7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdmaWxsZWQnKTtcblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZmlsbGVkJykpIHtcbiAgICAgICAgbmV3IEF1ZGlvKGZpbGxTb3VuZEZpbGUpLnBsYXkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ldyBBdWRpbyhjbGVhclNvdW5kRmlsZSkucGxheSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrU29sdXRpb24oKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdjcm9zc2VkJyk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nyb3NzZWQnKSkge1xuICAgICAgICBuZXcgQXVkaW8oY3Jvc3NTb3VuZEZpbGUpLnBsYXkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ldyBBdWRpbyhjbGVhclNvdW5kRmlsZSkucGxheSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrU29sdXRpb24oKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50aW1lclN0YXJ0ZWQpIHJldHVybjtcbiAgICAgIHRoaXMudGltZXJTdGFydGVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5maWVsZC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3N0YXJ0dGltZXInLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGltZXJTdGFydGVkKSByZXR1cm47XG4gICAgICB0aGlzLnRpbWVyU3RhcnRlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzdGFydHRpbWVyJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdyZXN0YXJ0JywgKCkgPT4ge1xuICAgICAgdGhpcy5lbmFibGVDbGlja3MoKTtcbiAgICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnLCAnY3Jvc3NlZCcpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignc29sdXRpb24nLCAoZSkgPT4ge1xuICAgICAgdGhpcy5kaXNhYmxlQ2xpY2tzKCk7XG5cbiAgICAgIGNvbnN0IHNvbHV0aW9uID0gZS5kZXRhaWw7XG5cbiAgICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgICBpZiAoc29sdXRpb25baV0pIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nyb3NzZWQnKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd3aW4nLCAoKSA9PiB7XG4gICAgICB0aGlzLmRpc2FibGVDbGlja3MoKTtcbiAgICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4gY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJykpO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tTb2x1dGlvbigpIHtcbiAgICB0aGlzLmN1cnJlbnRTb2x1dGlvbiA9IFsuLi50aGlzLmNlbGxzXS5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgcmV0dXJuIGN1cnIuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaWxsZWQnKSA/IGFjYyArICcxJyA6IGFjYyArICcwJztcbiAgICB9LCAnJyk7XG5cbiAgICB0aGlzLmN1cnJlbnRDcm9zc2VkID0gWy4uLnRoaXMuY2VsbHNdLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICByZXR1cm4gY3Vyci5jbGFzc0xpc3QuY29udGFpbnMoJ2Nyb3NzZWQnKSA/IGFjYyArICd4JyA6IGFjYyArICcwJztcbiAgICB9LCAnJyk7XG5cbiAgICB0aGlzLmZpZWxkLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2ZpbGwnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZGlzYWJsZUNsaWNrcygpIHtcbiAgICB0aGlzLmNsaWNrc0Rpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGVuYWJsZUNsaWNrcygpIHtcbiAgICB0aGlzLmNsaWNrc0Rpc2FibGVkID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZUZpZWxkIH07XG4iLCJpbXBvcnQgdGltZXJTdHlsZXNTdHIgZnJvbSAnLi9HYW1lVGltZXIuc3R5bGVzLnNjc3MnO1xuXG5jb25zdCB0aW1lclN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG50aW1lclN0eWxlcy50ZXh0Q29udGVudCA9IHRpbWVyU3R5bGVzU3RyO1xuXG5jbGFzcyBHYW1lVGltZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuYXBwZW5kKHRpbWVyU3R5bGVzKTtcblxuICAgIGlmICghdGhpcy5yZW5kZXJlZCkge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHRoaXMucmVuZGVyZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignd2luJywgKCkgPT4gdGhpcy5zdG9wKCkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBtaW51dGVzID1cbiAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKCdtaW51dGVzJykubGVuZ3RoID09PSAxXG4gICAgICAgID8gYDAke3RoaXMuZ2V0QXR0cmlidXRlKCdtaW51dGVzJyl9YFxuICAgICAgICA6IHRoaXMuZ2V0QXR0cmlidXRlKCdtaW51dGVzJyk7XG5cbiAgICBsZXQgc2Vjb25kcyA9XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpLmxlbmd0aCA9PT0gMVxuICAgICAgICA/IGAwJHt0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpfWBcbiAgICAgICAgOiB0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpO1xuXG4gICAgY29uc3QgZHVyYXRpb24gPSBgJHttaW51dGVzfToke3NlY29uZHN9YDtcblxuICAgIHRoaXMubWludXRlcyA9IG1pbnV0ZXM7XG4gICAgdGhpcy5zZWNvbmRzID0gc2Vjb25kcztcbiAgICB0aGlzLmN1cnJlbnREdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gZHVyYXRpb247XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydtaW51dGVzJywgJ3NlY29uZHMnXTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgbGF1bmNoKCkge1xuICAgIGlmICh0aGlzLmNvbnRpbnVlKSB7XG4gICAgICBjb25zdCB0aW1lID0gdGhpcy5jdXJyZW50RHVyYXRpb24uc3BsaXQoJzonKTtcbiAgICAgIGNvbnN0IG1pbiA9ICt0aW1lWzBdO1xuICAgICAgY29uc3Qgc2VjID0gK3RpbWVbMV07XG5cbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKSAtIChtaW4gKiA2MCArIHNlYykgKiAxMDAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xuXG4gICAgdGhpcy5pbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gTWF0aC50cnVuYygobm93IC0gdGhpcy5zdGFydFRpbWUpIC8gMTAwMCk7XG5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWNvbmRzJywgZHVyYXRpb24gJSA2MCk7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbWludXRlcycsIE1hdGguZmxvb3IoZHVyYXRpb24gLyA2MCkpO1xuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7XG4gIH1cblxuICByZXN0YXJ0KCkge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gbnVsbDtcbiAgICB0aGlzLmNvbnRpbnVlID0gZmFsc2U7XG5cbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2Vjb25kcycsICcwJyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnLCAnMCcpO1xuXG4gICAgdGhpcy5zdG9wKCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnN0b3AoKTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lVGltZXIgfTtcbiIsImltcG9ydCByZXN0YXJ0QnRuU3R5bGVzU3RyIGZyb20gJy4vUmVzdGFydEJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHJlc3RhcnRCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xucmVzdGFydEJ0blN0eWxlcy50ZXh0Q29udGVudCA9IHJlc3RhcnRCdG5TdHlsZXNTdHI7XG5cbmNsYXNzIFJlc3RhcnRCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIj5SZXN0YXJ0IGdhbWU8L2Rpdj5cbiAgICBgO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHJlc3RhcnRCdG5TdHlsZXMpO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3Jlc3RhcnQnLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBSZXN0YXJ0QnRuIH07XG4iLCJpbXBvcnQgbW9kYWxTdHlsZXNTdHIgZnJvbSAnLi9SZXN1bHRNb2RhbC5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IG1vZGFsU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbm1vZGFsU3R5bGVzLmlubmVyVGV4dCA9IG1vZGFsU3R5bGVzU3RyO1xuXG5jbGFzcyBSZXN1bHRNb2RhbCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQobW9kYWxTdHlsZXMpO1xuXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gJ21vZGFsX193cmFwcGVyJztcblxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbW9kYWwuY2xhc3NOYW1lID0gJ21vZGFsJztcblxuICAgIGlmICh0aGlzLm1lc3NhZ2UpIHtcbiAgICAgIG1vZGFsLnRleHRDb250ZW50ID0gdGhpcy5tZXNzYWdlO1xuICAgIH1cblxuICAgIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2xvc2UuY2xhc3NOYW1lID0gJ21vZGFsX19jbG9zZSc7XG4gICAgY2xvc2UuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsX19jbG9zZS1zdHJva2VcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbF9fY2xvc2Utc3Ryb2tlXCI+PC9kaXY+XG4gICAgYDtcblxuICAgIG1vZGFsLmFwcGVuZChjbG9zZSk7XG4gICAgd3JhcHBlci5hcHBlbmQobW9kYWwpO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHdyYXBwZXIpO1xuXG4gICAgY2xvc2Uub25jbGljayA9ICgpID0+IHtcbiAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBSZXN1bHRNb2RhbCB9O1xuIiwiaW1wb3J0IHNhdmVCdG5TdHlsZXNTdHIgZnJvbSAnLi9TYXZlQnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3Qgc2F2ZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5zYXZlQnRuU3R5bGVzLnRleHRDb250ZW50ID0gc2F2ZUJ0blN0eWxlc1N0cjtcblxuY2xhc3MgU2F2ZUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvblwiPlNhdmUgZ2FtZTwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoc2F2ZUJ0blN0eWxlcyk7XG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLmN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzYXZlLWdhbWUnLCB7IGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IFNhdmVCdG4gfTtcbiIsImltcG9ydCBzb2x1dGlvbkJ0blN0eWxlc1N0ciBmcm9tICcuL1NvbHV0aW9uQnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3Qgc29sdXRpb25CdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuc29sdXRpb25CdG5TdHlsZXMudGV4dENvbnRlbnQgPSBzb2x1dGlvbkJ0blN0eWxlc1N0cjtcblxuY2xhc3MgU29sdXRpb25CdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIj5Tb2x1dGlvbjwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoc29sdXRpb25CdG5TdHlsZXMpO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgIGUuY3VycmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NvbHV0aW9uJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IHsgU29sdXRpb25CdG4gfTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIENvbG9yc1xuXG4kY29sb3ItYmFja2dyb3VuZDogI2ZiZjNmMjtcbiRjb2xvci1hY2NlbnQ6ICMxYzc2OGY7XG4kY29sb3ItYWNjZW50LXNlY29uZGFyeS0xOiAjZmE5OTFjO1xuJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMjogI2ZhMWM2NjtcbiRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTM6ICM2MjFjZmE7XG5cbiRjb2xvci10ZXh0LW1haW46ICMyNjI2MjY7XG4kY29sb3ItdGV4dC1yZXZlcnNlOiAjZmZmZmZmO1xuXG4vLyBTaXplc1xuXG46cm9vdCB7XG4gIC0tY2VsbC1zaXplOiBhdXRvO1xufVxuXG4vLyBGb250c1xuXG4kZm9udC1tYWluOiAnU2lnbmlrYSBOZWdhdGl2ZScsIHNhbnMtc2VyaWY7XG4iLCJAdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC9taXhpbnMnIGFzICo7XG5AdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbi5idXJnZXItaWNvbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG5cbiAgd2lkdGg6IDQ0cHg7XG4gIGhlaWdodDogNDRweDtcblxuICBAaW5jbHVkZSBtYXgtNzY4IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgfVxuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gICRidG46ICY7XG5cbiAgJi5hY3RpdmUge1xuICAgICN7JGJ0bn1fX3N0cm9rZSB7XG4gICAgICAmOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg1cHgpIHJvdGF0ZSg0NWRlZyk7XG4gICAgICB9XG5cbiAgICAgICY6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpIHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICZfX3N0cm9rZSB7XG4gICAgd2lkdGg6IDI0cHg7XG4gICAgaGVpZ2h0OiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWJhY2tncm91bmQ7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuXG4gICAgdHJhbnNpdGlvbjogMC4zcztcbiAgfVxufVxuIiwiLyogRm9yIG1lZGlhIHF1ZXJpZXMgKi9cblxuQG1peGluIG1heC0xMjAwIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtaW4tMTAyNCB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMDI0cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTEwMjQge1xuICBAbWVkaWEgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1heC03Njgge1xuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTU3NiB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtYXgtMzgwIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDM4MHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIHBvcnRyYWl0IHtcbiAgQG1lZGlhIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuIiwiQHVzZSAnLi8uLi9hYnN0cmFjdC9taXhpbnMnIGFzICo7XG5AdXNlICcuLy4uL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuKiB7XG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmh0bWwge1xuXHRzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcbn1cblxuYm9keSB7XG5cdGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1iYWNrZ3JvdW5kO1xuXHR1c2VyLXNlbGVjdDogbm9uZTtcblxuXHQmLnNjcm9sbC1kaXNhYmxlZCB7XG5cdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdH1cbn1cblxuLndyYXBwZXIge1xuXHRtYXgtd2lkdGg6IDE0NDBweDtcblx0cGFkZGluZzogMCA0MHB4O1xuXHRtYXJnaW46IDAgYXV0bztcblxuXHRAaW5jbHVkZSBtYXgtNTc2IHtcblx0XHRwYWRkaW5nOiAwIDQuMjEwNTIlO1xuXHR9XG59XG5cbi5zZWN0aW9uIHtcblx0bWFyZ2luLWJvdHRvbTogMTAwcHg7XG59XG5cbmltZyB7XG5cdG1heC13aWR0aDogMTAwJTtcbn1cblxuLnRyYW5zcGFyZW50IHtcblx0b3BhY2l0eTogMDtcbn1cblxuOmhvc3Qge1xuXHRkaXNwbGF5OiBibG9jaztcbn1cbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2xheW91dC9iYXNpYycgYXMgKjtcblxuOmhvc3Qge1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJhY2tncm91bmQ6ICRjb2xvci1hY2NlbnQ7XG5cbiAgKiB7XG4gICAgY29sb3I6ICRjb2xvci1iYWNrZ3JvdW5kO1xuICB9XG59XG5cbmEge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMTBweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG5nYW1lLW1lbnUge1xuICBkaXNwbGF5OiBmbGV4O1xuICB0cmFuc2l0aW9uOiAwLjNzO1xuXG4gICYuaGlkZGVuIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuXG4gICYuYWJzb2x1dGUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDc2cHg7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcblxuICAgIHBhZGRpbmc6IDAgMTZweCAyMHB4IDE2cHg7XG5cbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWFjY2VudDtcbiAgfVxufVxuXG4ud3JhcHBlciB7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4iLCIuYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMjBweDtcbn1cbiIsIkB1c2UgJy4vLi4vYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG5cbiAgY29sb3I6ICRjb2xvci10ZXh0LXJldmVyc2U7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMTtcblxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuXG4gIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygxMjAlKTtcbiAgfVxuXG4gICYuZGlzYWJsZWQge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBmaWx0ZXI6IG9wYWNpdHkoMC42KSBncmF5c2NhbGUoMC41KTtcblxuICAgICY6aG92ZXIge1xuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgZmlsdGVyOiBvcGFjaXR5KDAuNikgZ3JheXNjYWxlKDAuNSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9jb21wb25lbnRzL2J1dHRvbicgYXMgKjtcblxuLmJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTI7XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9jb21wb25lbnRzL2J1dHRvbicgYXMgKjtcblxuLmJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTM7XG59XG4iLCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXG5cbi8qIERvY3VtZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxuICovXG5cbmh0bWwge1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cbn1cblxuLyogU2VjdGlvbnNcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXG4gKi9cblxubWFpbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXG4gKi9cblxuaDEge1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcbn1cblxuLyogR3JvdXBpbmcgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXG4gKi9cblxuaHIge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xuICBoZWlnaHQ6IDA7IC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnByZSB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG5wIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxudWwge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXG4gKi9cblxuYWJiclt0aXRsZV0ge1xuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5jb2RlLFxua2JkLFxuc2FtcCB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnNtYWxsIHtcbiAgZm9udC1zaXplOiA4MCU7XG59XG5cbi8qKlxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXG4gKiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3ViLFxuc3VwIHtcbiAgZm9udC1zaXplOiA3NSU7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuc3ViIHtcbiAgYm90dG9tOiAtMC4yNWVtO1xufVxuXG5zdXAge1xuICB0b3A6IC0wLjVlbTtcbn1cblxuLyogRW1iZWRkZWQgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxuICovXG5cbmltZyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG59XG5cbi8qIEZvcm1zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmlucHV0LFxub3B0Z3JvdXAsXG5zZWxlY3QsXG50ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICBtYXJnaW46IDA7IC8qIDIgKi9cbn1cblxuYnV0dG9uIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4vKipcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCB7XG4gIC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXG4gKi9cblxuYnV0dG9uLFxuc2VsZWN0IHtcbiAgLyogMSAqL1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcblt0eXBlPSdidXR0b24nXSxcblt0eXBlPSdyZXNldCddLFxuW3R5cGU9J3N1Ym1pdCddIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XG4gIGFwcGVhcmFuY2U6IGJ1dHRvbjtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdidXR0b24nXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdyZXNldCddOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9J3N1Ym1pdCddOjotbW96LWZvY3VzLWlubmVyIHtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xufVxuXG4vKipcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cbiAqL1xuXG5idXR0b246LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0nYnV0dG9uJ106LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0ncmVzZXQnXTotbW96LWZvY3VzcmluZyxcblt0eXBlPSdzdWJtaXQnXTotbW96LWZvY3VzcmluZyB7XG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuZmllbGRzZXQge1xuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmxlZ2VuZCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4gKi9cblxucHJvZ3Jlc3Mge1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXG4gKi9cblxudGV4dGFyZWEge1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cbiAqL1xuXG5bdHlwZT0nY2hlY2tib3gnXSxcblt0eXBlPSdyYWRpbyddIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAyICovXG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxuICovXG5cblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPSdzZWFyY2gnXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXG4gIGFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cbiAqL1xuXG5bdHlwZT0nc2VhcmNoJ106Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cbiAqL1xuXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xufVxuXG4vKiBJbnRlcmFjdGl2ZVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXG4gKi9cblxuZGV0YWlscyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1bW1hcnkge1xuICBkaXNwbGF5OiBsaXN0LWl0ZW07XG59XG5cbi8qIE1pc2NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxuICovXG5cbnRlbXBsYXRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cbiAqL1xuXG5baGlkZGVuXSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4iLCJAdXNlICcuLy4uLy4uL3N0eWxlcy9iYXNlL25vcm1hbGl6ZScgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L21peGlucycgYXMgKjtcblxuOmhvc3Qge1xuICAqIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG59XG5cbi5hY3Rpb25zIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcblxuICB3aWR0aDogMTAwJTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5ub25vZ3JhbSB7XG4gICZfX2NvbnRhaW5lciB7XG4gICAgbWluLWhlaWdodDogY2FsYygxMDAlKTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIH1cblxuICAmX193cmFwcGVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICB3aWR0aDogNDAlO1xuXG4gIEBpbmNsdWRlIG1heC0xMjAwIHtcbiAgICB3aWR0aDogNTAlO1xuICB9XG5cbiAgQGluY2x1ZGUgcG9ydHJhaXQge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgQGluY2x1ZGUgbWF4LTc2OCB7XG4gICAgZm9udC1zaXplOiBtaW4oY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC44KSwgMnJlbSk7XG4gIH1cblxuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6XG4gICAgYXV0b1xuICAgIDFmciAxZnI7XG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XG4gICAgJ2EgYiBiJ1xuICAgICdjIGQgZCdcbiAgICAnYyBkIGQnO1xufVxuXG4uc3VtbWFyeSB7XG4gIHBhZGRpbmc6IDEwcHg7XG5cbiAgZ3JpZC1hcmVhOiBhO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDE2cHg7XG5cbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udG9wLXBhbmUge1xuICBncmlkLWFyZWE6IGI7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcblxuICBkaXNwbGF5OiBmbGV4O1xuXG4gIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItcmlnaHQ6IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDFmO1xuXG4gICZfX2hpbnQge1xuICAgIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuXG4gICAgYm9yZGVyLXRvcDogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggIzAwMCBzb2xpZDtcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICBib3JkZXItcmlnaHQ6IDJweCAjMDAwMDAwIHNvbGlkO1xuICAgIH1cbiAgfVxuXG4gICZfX251bWJlciB7XG4gICAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxufVxuXG4ubGVmdC1wYW5lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGdyaWQtYXJlYTogYztcblxuICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4ICMwMDAgc29saWQ7XG4gIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwMWY7XG5cbiAgJl9faGludCB7XG4gICAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblxuICAgIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1ib3R0b206IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICAgICY6bnRoLWNoaWxkKDVuKTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCAjMDAwMDAwIHNvbGlkO1xuICAgIH1cbiAgfVxuXG4gICZfX251bWJlciB7XG4gICAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG59XG5cbmdhbWUtZmllbGQge1xuICBncmlkLWFyZWE6IGQ7XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9iYXNlL25vcm1hbGl6ZScgYXMgKjtcblxuOmhvc3Qge1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGJvcmRlcjogMXB4ICMwMDAwMDAgc29saWQ7XG5cbiAgKiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmZhYztcbn1cblxuLnJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcblxuICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4ICMwMDAwMDAgc29saWQ7XG4gIH1cbn1cblxuLmNlbGwge1xuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICBib3JkZXI6IDFweCAjMDAwMDAwIHNvbGlkO1xuXG4gIHRyYW5zaXRpb246IDAuMnM7XG5cbiAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgIGJvcmRlci1yaWdodDogMnB4ICMwMDAwMDAgc29saWQ7XG4gIH1cblxuICAmLmZpbGxlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgfVxuXG4gICYuY3Jvc3NlZCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgJjo6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICBsZWZ0OiA1MCU7XG5cbiAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAwLjkpO1xuICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSByb3RhdGUoNDVkZWcpO1xuICAgIH1cbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbGVmdDogNTAlO1xuXG4gICAgICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC45KTtcbiAgICAgIGhlaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcblxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgcm90YXRlKC00NWRlZyk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbi5tb2RhbCB7XG4gICZfX3dyYXBwZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAxMDA7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDNmO1xuXG4gICAgdHJhbnNpdGlvbjogMC4zcztcblxuICAgICYuaGlkZGVuIHtcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICB9XG5cbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYmFja2dyb3VuZDtcblxuICAmX19jbG9zZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNXB4O1xuICAgIHJpZ2h0OiA1cHg7XG5cbiAgICB3aWR0aDogMzRweDtcbiAgICBoZWlnaHQ6IDM0cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG5cbiAgICAmLXN0cm9rZSB7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMnB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXRleHQtbWFpbjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcblxuICAgICAgdHJhbnNpdGlvbjogMC4zcztcblxuICAgICAgJjpudGgtY2hpbGQoMSkge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KSByb3RhdGUoNDVkZWcpO1xuICAgICAgfVxuXG4gICAgICAmOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KSByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMztcbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4vc3R5bGVzL21haW4uc2Nzcyc7XG5pbXBvcnQgeyBBcHBSb3V0ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvYXBwLXJvdXRlci9BcHBSb3V0ZXInO1xuaW1wb3J0IHsgR2FtZUhlYWRlciB9IGZyb20gJy4vY29tcG9uZW50cy9nYW1lSGVhZGVyL0dhbWVIZWFkZXInO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtaGVhZGVyJywgR2FtZUhlYWRlcik7XG5cbmRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAnYWZ0ZXJiZWdpbicsXG4gIGBcblx0XHQ8Z2FtZS1oZWFkZXI+PC9nYW1lLWhlYWRlcj5cblx0XHQ8bWFpbiBpZD1cIm1haW5cIiBjbGFzcz1cIm1haW4gd3JhcHBlclwiPlxuXHRcdDwvbWFpbj5cblx0YFxuKTtcblxuY29uc3Qgcm91dGVyID0gbmV3IEFwcFJvdXRlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgZGVlcGVzdEVsID0gZS5jb21wb3NlZFBhdGgoKVswXTtcblxuICAgIGlmIChkZWVwZXN0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRlZXBlc3RFbC5tYXRjaGVzKCdbZGF0YS1saW5rXScpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByb3V0ZXIuY2hhbmdlSGFzaChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuXG4gICAgICBsZXQgcGFyYW1zID0gW107XG4gICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnaHJlZicpID09PSAnbm9ub2dyYW0nKSB7XG4gICAgICAgIGlmIChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdnYW1lLW5hbWUnKSkge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2dhbWUtbmFtZScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdsZXZlbCcpKSB7XG4gICAgICAgICAgcGFyYW1zLnB1c2goZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGRlZXBlc3RFbC5tYXRjaGVzKCdbcmFuZG9tXScpKSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKCdyYW5kb20nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRlZXBlc3RFbC5tYXRjaGVzKCdbY29udGludWVdJykpIHtcbiAgICAgICAgcGFyYW1zLnB1c2goJ2NvbnRpbnVlJyk7XG4gICAgICB9XG5cbiAgICAgIHJvdXRlci5zaG93Um91dGUocGFyYW1zKTtcbiAgICB9XG4gIH0pO1xuXG4gIHdpbmRvdy5vbnBvcHN0YXRlID0gKCkgPT4ge1xuICAgIHJvdXRlci5zaG93Um91dGUoKTtcbiAgfTtcblxuICByb3V0ZXIuc2hvd1JvdXRlKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJHYW1lTWVudSIsIkdhbWVOb25vZ3JhbSIsIm5vbm9ncmFtcyIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiQXBwUm91dGVyIiwiY29uc3RydWN0b3IiLCJhcHAiLCJyb3V0ZXMiLCJoYXNoIiwidmlldyIsIm5hbWUiLCJsZXZlbCIsInNhdmVkU29sdXRpb24iLCJjcm9zc2VkIiwibWludXRlcyIsInNlY29uZHMiLCJyZXNvbHZlZE5hbWUiLCJyZXNvbHZlZExldmVsIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJjaGFuZ2VIYXNoIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJzaG93Um91dGUiLCJwYXJhbXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJoZWFkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJidXJnZXJNZW51Iiwic2hhZG93Um9vdCIsImNsYXNzTGlzdCIsImFkZCIsIm5ld1BhcmFtcyIsInJhbmRvbU51bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbU5vbm9ncmFtIiwic2F2ZWQiLCJKU09OIiwicGFyc2UiLCJjdXJyZW50U29sdXRpb24iLCJ0aW1lIiwibWF0Y2giLCJmaW5kIiwiaXRlbSIsInNsaWNlIiwiaW5uZXJIVE1MIiwiYnVyZ2VyTWVudVN0eWxlc1N0ciIsIkJ1cmdlck1lbnVCdG4iLCJIVE1MRWxlbWVudCIsImNvbm5lY3RlZENhbGxiYWNrIiwiYXR0YWNoU2hhZG93IiwibW9kZSIsImJ1cmdlckJ0blN0eWxlcyIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZCIsImJ0biIsImdhbWVNZW51IiwiaXNCdXJnZXIiLCJhZnRlciIsIm9uY2xpY2siLCJ0b2dnbGUiLCJoZWFkZXJTdHlsZXNTdHIiLCJoZWFkZXJTdHlsZXMiLCJ0ZW1wbGF0ZSIsIkdhbWVIZWFkZXIiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiaW5IZWFkZXIiLCJnZXRFbGVtZW50QnlJZCIsIm1lbnVTdHlsZVN0ciIsIlJhbmRvbUJ0biIsIkNvbnRpbnVlQnRuIiwiVGVtcGxhdGVzQnRuIiwibGV2ZWxzIiwiU2V0IiwibWFwIiwibGV2ZWxzSFRNTCIsImdhbWVOYW1lcyIsImZpbHRlciIsImpvaW4iLCJtZW51U3R5bGVzIiwiYWN0aW9ucyIsImdldEF0dHJpYnV0ZSIsInN0eWxlIiwiZGlzcGxheSIsImNvbnNvbGUiLCJsb2ciLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImxhc3RFbGVtZW50Q2hpbGQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImNvbnRpbnVlQnRuU3R5bGVzU3RyIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImlubmVyVGV4dCIsImNvbnRpbnVlQnRuU3R5bGVzIiwicmFuZG9tQnRuU3R5bGVzU3RyIiwicmFuZG9tQnRuU3R5bGVzIiwidGVtcGxhdGVzQnRuU3R5bGVzU3RyIiwidGVtcGxhdGVzQnRuU3R5bGVzIiwibm9ub2dyYW1TdHlsZXNTdHIiLCJHYW1lRmllbGQiLCJSZXN0YXJ0QnRuIiwiU29sdXRpb25CdG4iLCJTYXZlQnRuIiwiR2FtZVRpbWVyIiwiUmVzdWx0TW9kYWwiLCJ3aW5Tb3VuZEZpbGUiLCJub25vZ3JhbVN0eWxlcyIsInRpbWVyIiwic2F2ZWRNaW51dGVzIiwic2F2ZWRTZWNvbmRzIiwiY29udGludWUiLCJ0b1VwcGVyQ2FzZSIsIm5vbm9ncmFtIiwiZmllbGQiLCJpZCIsIm1hdHJpeCIsImNvcnJlY3RTb2x1dGlvbiIsImZsYXQiLCJ0b1N0cmluZyIsInN0ciIsImZvckVhY2giLCJlbCIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJzcXVhcmUiLCJ0b3BQYW5lIiwibGVmdFBhbmUiLCJtYXhMZWZ0SGludHMiLCJpIiwibGVmdEhpbnQiLCJ0b3BIaW50IiwiY291bnRlckxlZnQiLCJjb3VudGVyVG9wIiwiaiIsImNoaWxkcmVuIiwibm9ub2dyYW1XaWR0aCIsIm9mZnNldFdpZHRoIiwiY2VsbFNpemUiLCJzZXRQcm9wZXJ0eSIsImZpcnN0RWxlbWVudENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsIm1pbnV0ZXNTdHIiLCJzZWNvbmRzU3RyIiwiQXVkaW8iLCJwbGF5IiwibW9kYWwiLCJtZXNzYWdlIiwidGltZXJTdGFydGVkIiwicmVzdGFydCIsInN0b3AiLCJkZXRhaWwiLCJnYW1lIiwiY3VycmVudENyb3NzZWQiLCJzdHJpbmdpZnkiLCJsYXVuY2giLCJmaWVsZFN0eWxlc1N0ciIsImZpbGxTb3VuZEZpbGUiLCJjbGVhclNvdW5kRmlsZSIsImNyb3NzU291bmRGaWxlIiwiZmllbGRTdHlsZXMiLCJzcGxpdCIsInJvdyIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiZmlsbCIsImNlbGwiLCJlIiwiY2xpY2tzRGlzYWJsZWQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJyZW1vdmUiLCJjb250YWlucyIsImNoZWNrU29sdXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImJ1YmJsZXMiLCJjb21wb3NlZCIsImVuYWJsZUNsaWNrcyIsImRpc2FibGVDbGlja3MiLCJzb2x1dGlvbiIsInRpbWVyU3R5bGVzU3RyIiwidGltZXJTdHlsZXMiLCJyZW5kZXJlZCIsInJlbmRlciIsImR1cmF0aW9uIiwiY3VycmVudER1cmF0aW9uIiwib2JzZXJ2ZWRBdHRyaWJ1dGVzIiwiYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIiwibWluIiwic2VjIiwic3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsImNsZWFySW50ZXJ2YWwiLCJpbnRlcnZhbElEIiwic2V0SW50ZXJ2YWwiLCJ0cnVuYyIsImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwicmVzdGFydEJ0blN0eWxlc1N0ciIsInJlc3RhcnRCdG5TdHlsZXMiLCJtb2RhbFN0eWxlc1N0ciIsIm1vZGFsU3R5bGVzIiwiYXBwZW5kQ2hpbGQiLCJ3cmFwcGVyIiwiY2xhc3NOYW1lIiwiY2xvc2UiLCJzYXZlQnRuU3R5bGVzU3RyIiwic2F2ZUJ0blN0eWxlcyIsImN1cnJlbnRUYXJnZXQiLCJzb2x1dGlvbkJ0blN0eWxlc1N0ciIsInNvbHV0aW9uQnRuU3R5bGVzIiwiYm9keSIsInJvdXRlciIsImRlZXBlc3RFbCIsImNvbXBvc2VkUGF0aCIsIm1hdGNoZXMiLCJwdXNoIiwib25wb3BzdGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=