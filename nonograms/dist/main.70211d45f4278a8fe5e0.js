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

/***/ 130:
/*!*************************************************************!*\
  !*** ./src/components/burgerMenu/BurgerMenuBtn.styles.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--cell-size: auto}.burger-icon{display:none;width:44px;height:44px}@media(max-width: 768px){.burger-icon{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}}.burger-icon.active .burger-icon__stroke:nth-child(1){transform:translateY(5px) rotate(45deg)}.burger-icon.active .burger-icon__stroke:nth-child(2){transform:translateY(-5px) rotate(-45deg)}.burger-icon__stroke{width:24px;height:2px;background-color:#fbf3f2;border-radius:2px;transition:.3s}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dXRlci9BcHBSb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvYnVyZ2VyTWVudS9CdXJnZXJNZW51QnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVIZWFkZXIvR2FtZUhlYWRlci5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9HYW1lTWVudS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9jb250aW51ZUJ0bi9Db250aW51ZUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9yYW5kb21CdG4vUmFuZG9uQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L3RlbXBsYXRlc0J0bi9UZW1wbGF0ZXNCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZUZpZWxkL0dhbWVGaWVsZC5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZVRpbWVyL0dhbWVUaW1lci5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vcmVzdGFydEJ0bi9SZXN0YXJ0QnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zYXZlQnRuL1NhdmVCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NvbHV0aW9uQnRuL1NvbHV0aW9uQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvbWFpbi5zY3NzP2ZjNzciLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9hYnN0cmFjdC9fdmFyaWFibGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvYnVyZ2VyTWVudS9CdXJnZXJNZW51QnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvYWJzdHJhY3QvX21peGlucy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvbGF5b3V0L19iYXNpYy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVIZWFkZXIvR2FtZUhlYWRlci5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9HYW1lTWVudS5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2NvbXBvbmVudHMvX2J1dHRvbi5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L2NvbnRpbnVlQnRuL0NvbnRpbnVlQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L3RlbXBsYXRlc0J0bi9UZW1wbGF0ZXNCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9iYXNlL19ub3JtYWxpemUuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vR2FtZU5vbm9ncmFtLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9nYW1lRmllbGQvR2FtZUZpZWxkLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zYXZlQnRuL1NhdmVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NvbHV0aW9uQnRuL1NvbHV0aW9uQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNZW51IH0gZnJvbSAnLi4vZ2FtZU1lbnUvR2FtZU1lbnUnO1xuaW1wb3J0IHsgR2FtZU5vbm9ncmFtIH0gZnJvbSAnLi4vZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbSc7XG5pbXBvcnQgbm9ub2dyYW1zIGZyb20gJy4uLy4uL3Jlc291cmNlcy9ub25vZ3JhbXMuanNvbic7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS1tZW51JywgR2FtZU1lbnUpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLW5vbm9ncmFtJywgR2FtZU5vbm9ncmFtKTtcblxuY2xhc3MgQXBwUm91dGVyIHtcbiAgY29uc3RydWN0b3IoYXBwKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG5cbiAgICB0aGlzLnJvdXRlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgaGFzaDogJycsXG4gICAgICAgIHZpZXc6ICgpID0+ICc8Z2FtZS1tZW51IG1haW4tcGFnZT1cInRydWVcIj48L2dhbWUtbWVudT4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaGFzaDogJ25vbm9ncmFtJyxcbiAgICAgICAgdmlldzogKG5hbWUsIGxldmVsLCBzYXZlZFNvbHV0aW9uLCBjcm9zc2VkLCBtaW51dGVzLCBzZWNvbmRzKSA9PiB7XG4gICAgICAgICAgbGV0IHJlc29sdmVkTmFtZTtcbiAgICAgICAgICBsZXQgcmVzb2x2ZWRMZXZlbDtcblxuICAgICAgICAgIGlmIChuYW1lICYmIGxldmVsKSB7XG4gICAgICAgICAgICByZXNvbHZlZE5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgcmVzb2x2ZWRMZXZlbCA9IGxldmVsO1xuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZS1uYW1lJywgbmFtZSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZS1sZXZlbCcsIGxldmVsKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUtbmFtZScpICYmXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1sZXZlbCcpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXNvbHZlZE5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1uYW1lJyk7XG4gICAgICAgICAgICByZXNvbHZlZExldmVsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUtbGV2ZWwnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZWROYW1lID0gbm9ub2dyYW1zWzBdLm5hbWU7XG4gICAgICAgICAgICByZXNvbHZlZExldmVsID0gbm9ub2dyYW1zWzBdLmxldmVsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8Z2FtZS1ub25vZ3JhbSBuYW1lPVwiJHtyZXNvbHZlZE5hbWV9XCIgbGV2ZWw9XCIke3Jlc29sdmVkTGV2ZWx9XCIgIHNhdmVkc29sdXRpb249XCIke3NhdmVkU29sdXRpb24gfHwgJyd9XCIgY3Jvc3NlZD1cIiR7Y3Jvc3NlZCB8fCAnJ31cIiBtaW51dGVzPVwiJHttaW51dGVzIHx8ICcwJ31cIiBzZWNvbmRzPVwiJHtzZWNvbmRzIHx8ICcwJ31cIj5cbiAgICAgICAgICAgIDwvZ2FtZS1ub25vZ3JhbT5cbiAgICAgICAgICBgO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdO1xuICB9XG5cbiAgY2hhbmdlSGFzaCh1cmwpIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHVybDtcbiAgfVxuXG4gIHNob3dSb3V0ZShwYXJhbXMgPSBbXSkge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dhbWUtaGVhZGVyJyk7XG4gICAgY29uc3QgYnVyZ2VyTWVudSA9IGhlYWRlci5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2dhbWUtbWVudS5hYnNvbHV0ZScpO1xuICAgIGlmIChidXJnZXJNZW51KSB7XG4gICAgICBidXJnZXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld1BhcmFtcyA9IFsuLi5wYXJhbXNdO1xuXG4gICAgaWYgKHBhcmFtc1swXSA9PT0gJ3JhbmRvbScpIHtcbiAgICAgIGNvbnN0IHJhbmRvbU51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5vbm9ncmFtcy5sZW5ndGgpO1xuICAgICAgY29uc3QgcmFuZG9tTm9ub2dyYW0gPSBub25vZ3JhbXNbcmFuZG9tTnVtXTtcblxuICAgICAgbmV3UGFyYW1zWzBdID0gcmFuZG9tTm9ub2dyYW0ubmFtZTtcbiAgICAgIG5ld1BhcmFtc1sxXSA9IHJhbmRvbU5vbm9ncmFtLmxldmVsO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXNbMF0gPT09ICdjb250aW51ZScpIHtcbiAgICAgIGNvbnN0IHNhdmVkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWRHYW1lJykpO1xuXG4gICAgICBuZXdQYXJhbXNbMF0gPSBzYXZlZC5uYW1lO1xuICAgICAgbmV3UGFyYW1zWzFdID0gc2F2ZWQubGV2ZWw7XG4gICAgICBuZXdQYXJhbXNbMl0gPSBzYXZlZC5jdXJyZW50U29sdXRpb247XG4gICAgICBuZXdQYXJhbXNbM10gPSBzYXZlZC5jcm9zc2VkO1xuICAgICAgbmV3UGFyYW1zWzRdID0gc2F2ZWQudGltZS5taW51dGVzO1xuICAgICAgbmV3UGFyYW1zWzVdID0gc2F2ZWQudGltZS5zZWNvbmRzO1xuICAgIH1cblxuICAgIGxldCBtYXRjaCA9IHRoaXMucm91dGVzLmZpbmQoXG4gICAgICAoaXRlbSkgPT4gaXRlbS5oYXNoID09PSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKVxuICAgICk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICBtYXRjaCA9IHRoaXMucm91dGVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaGFzaCA9PT0gJycpO1xuICAgIH1cblxuICAgIHRoaXMuYXBwLmlubmVySFRNTCA9IG1hdGNoLnZpZXcoLi4ubmV3UGFyYW1zKTtcbiAgfVxufVxuXG5leHBvcnQgeyBBcHBSb3V0ZXIgfTtcbiIsImltcG9ydCBidXJnZXJNZW51U3R5bGVzU3RyIGZyb20gJy4vQnVyZ2VyTWVudUJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIEJ1cmdlck1lbnVCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidXJnZXJCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGJ1cmdlckJ0blN0eWxlcy50ZXh0Q29udGVudCA9IGJ1cmdlck1lbnVTdHlsZXNTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnVyZ2VyQnRuU3R5bGVzKTtcblxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXJnZXItaWNvbicpO1xuICAgIGJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYnVyZ2VyLWljb25fX3N0cm9rZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImJ1cmdlci1pY29uX19zdHJva2VcIj48L2Rpdj5cbiAgICBgO1xuXG4gICAgY29uc3QgZ2FtZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdnYW1lLW1lbnUnKTtcbiAgICBnYW1lTWVudS5pc0J1cmdlciA9IHRydWU7XG4gICAgdGhpcy5hZnRlcihnYW1lTWVudSk7XG4gICAgZ2FtZU1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgZ2FtZU1lbnUuY2xhc3NMaXN0LmFkZCgnYWJzb2x1dGUnKTtcblxuICAgIGJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgZ2FtZU1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfTtcblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG4gIH1cbn1cblxuZXhwb3J0IHsgQnVyZ2VyTWVudUJ0biB9O1xuIiwiaW1wb3J0IGhlYWRlclN0eWxlc1N0ciBmcm9tICcuL0dhbWVIZWFkZXIuc3R5bGVzLnNjc3MnO1xuaW1wb3J0IHsgQnVyZ2VyTWVudUJ0biB9IGZyb20gJy4uL2J1cmdlck1lbnUvQnVyZ2VyTWVudUJ0bic7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYnVyZ2VyLWJ0bicsIEJ1cmdlck1lbnVCdG4pO1xuXG5jb25zdCBoZWFkZXJTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuaGVhZGVyU3R5bGVzLnRleHRDb250ZW50ID0gaGVhZGVyU3R5bGVzU3RyO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxkaXYgaWQ9XCJ3cmFwcGVyXCIgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgPGEgaHJlZj1cIlwiIGRhdGEtbGluaz5Ob25vZ3JhbXM8L2E+XG4gICAgPGJ1cmdlci1idG4+PC9idXJnZXItYnRuPlxuICA8L2Rpdj4gIFxuYDtcbmNsYXNzIEdhbWVIZWFkZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZChoZWFkZXJTdHlsZXMpO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgIGNvbnN0IGdhbWVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ2FtZS1tZW51Jyk7XG4gICAgZ2FtZU1lbnUuaW5IZWFkZXIgPSB0cnVlO1xuICAgIHNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ3dyYXBwZXInKS5hcHBlbmQoZ2FtZU1lbnUpO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVIZWFkZXIgfTtcbiIsImltcG9ydCBtZW51U3R5bGVTdHIgZnJvbSAnLi9HYW1lTWVudS5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgbm9ub2dyYW1zIGZyb20gJy4uLy4uL3Jlc291cmNlcy9ub25vZ3JhbXMuanNvbic7XG5pbXBvcnQgeyBSYW5kb21CdG4gfSBmcm9tICcuL3JhbmRvbUJ0bi9SYW5kb25CdG4nO1xuaW1wb3J0IHsgQ29udGludWVCdG4gfSBmcm9tICcuL2NvbnRpbnVlQnRuL0NvbnRpbnVlQnRuJztcbmltcG9ydCB7IFRlbXBsYXRlc0J0biB9IGZyb20gJy4vdGVtcGxhdGVzQnRuL1RlbXBsYXRlc0J0bic7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgncmFuZG9tLWJ0bicsIFJhbmRvbUJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NvbnRpbnVlLWJ0bicsIENvbnRpbnVlQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndGVtcGxhdGVzLWJ0bicsIFRlbXBsYXRlc0J0bik7XG5cbmNvbnN0IGxldmVscyA9IFsuLi5uZXcgU2V0KG5vbm9ncmFtcy5tYXAoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwpKV07XG5cbmxldCBsZXZlbHNIVE1MID0gbGV2ZWxzXG4gIC5tYXAoKGxldmVsKSA9PiB7XG4gICAgY29uc3QgZ2FtZU5hbWVzID0gbm9ub2dyYW1zXG4gICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSBsZXZlbClcbiAgICAgIC5tYXAoXG4gICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgIGA8YSBocmVmPVwibm9ub2dyYW1cIiBjbGFzcz1cIm1lbnVfX2l0ZW1cIiBsZXZlbD1cIiR7bGV2ZWx9XCIgZ2FtZS1uYW1lPVwiJHtpdGVtLm5hbWV9XCIgZGF0YS1saW5rPiR7aXRlbS5uYW1lfTwvYT5cXG5gXG4gICAgICApXG4gICAgICAuam9pbignXFxuJyk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImxldmVsXCI+XG4gICAgICAgIDxoMyBjbGFzcz1cImxldmVsX190aXRsZVwiPiR7bGV2ZWx9PC9oMz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxldmVsX19nYW1lc1wiPlxuICAgICAgICAgICR7Z2FtZU5hbWVzfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH0pXG4gIC5qb2luKCdcXG4nKTtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJhY3Rpb25zXCIgY2xhc3M9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGVzLWJ0bj48L3RlbXBsYXRlcy1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cmFuZG9tLWJ0bj48L3JhbmRvbS1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Y29udGludWUtYnRuPjwvY29udGludWUtYnRuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuYDtcblxuY2xhc3MgR2FtZU1lbnUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICBjb25zdCBtZW51U3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBtZW51U3R5bGVzLnRleHRDb250ZW50ID0gbWVudVN0eWxlU3RyO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKG1lbnVTdHlsZXMpO1xuXG4gICAgY29uc3QgYWN0aW9ucyA9IHNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ2FjdGlvbnMnKTtcblxuICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnbWFpbi1wYWdlJykpIHtcbiAgICAgIGFjdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbkhlYWRlcikge1xuICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKTtcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPD0gNzY4KSB7XG4gICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzQnVyZ2VyKSB7XG4gICAgICBzaGFkb3dSb290Lmxhc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGxldmVsc0hUTUwpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0J1cmdlcikge1xuICAgICAgYWN0aW9ucy5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ2NvbHVtbic7XG4gICAgICBhY3Rpb25zLnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZU1lbnUgfTtcbiIsImltcG9ydCBjb250aW51ZUJ0blN0eWxlc1N0ciBmcm9tICcuL0NvbnRpbnVlQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgQ29udGludWVCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYnRuLmhyZWYgPSAnbm9ub2dyYW0nO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdjb250aW51ZScsIHRydWUpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycsIHRydWUpO1xuICAgIGJ0bi5pbm5lclRleHQgPSAnQ29udGludWUgZ2FtZSc7XG5cbiAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZEdhbWUnKSkge1xuICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcblxuICAgIGNvbnN0IGNvbnRpbnVlQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBjb250aW51ZUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IGNvbnRpbnVlQnRuU3R5bGVzU3RyO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGNvbnRpbnVlQnRuU3R5bGVzKTtcbiAgfVxufVxuXG5leHBvcnQgeyBDb250aW51ZUJ0biB9O1xuIiwiaW1wb3J0IHJhbmRvbUJ0blN0eWxlc1N0ciBmcm9tICcuL1JhbmRvbUJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIFJhbmRvbUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBidG4uaHJlZiA9ICdub25vZ3JhbSc7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3JhbmRvbScsIHRydWUpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycsIHRydWUpO1xuICAgIGJ0bi5pbm5lclRleHQgPSAnUmFuZG9tJztcblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCByYW5kb21CdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHJhbmRvbUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IHJhbmRvbUJ0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChyYW5kb21CdG5TdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IFJhbmRvbUJ0biB9O1xuIiwiaW1wb3J0IHRlbXBsYXRlc0J0blN0eWxlc1N0ciBmcm9tICcuL1RlbXBsYXRlc0J0bi5zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIFRlbXBsYXRlc0J0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBidG4uaHJlZiA9ICcnO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnLCB0cnVlKTtcbiAgICBidG4uaW5uZXJUZXh0ID0gJ1RlbXBsYXRlcyc7XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZChidG4pO1xuXG4gICAgY29uc3QgdGVtcGxhdGVzQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0ZW1wbGF0ZXNCdG5TdHlsZXMudGV4dENvbnRlbnQgPSB0ZW1wbGF0ZXNCdG5TdHlsZXNTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGVzQnRuU3R5bGVzKTtcbiAgfVxufVxuXG5leHBvcnQgeyBUZW1wbGF0ZXNCdG4gfTtcbiIsImltcG9ydCBub25vZ3JhbVN0eWxlc1N0ciBmcm9tICcuL0dhbWVOb25vZ3JhbS5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgeyBHYW1lRmllbGQgfSBmcm9tICcuL2dhbWVGaWVsZC9HYW1lRmllbGQnO1xuaW1wb3J0IHsgUmVzdGFydEJ0biB9IGZyb20gJy4vcmVzdGFydEJ0bi9SZXN0YXJ0QnRuJztcbmltcG9ydCB7IFNvbHV0aW9uQnRuIH0gZnJvbSAnLi9zb2x1dGlvbkJ0bi9Tb2x1dGlvbkJ0bic7XG5pbXBvcnQgeyBTYXZlQnRuIH0gZnJvbSAnLi9zYXZlQnRuL1NhdmVCdG4nO1xuaW1wb3J0IHsgR2FtZVRpbWVyIH0gZnJvbSAnLi9nYW1lVGltZXIvR2FtZVRpbWVyJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcbmltcG9ydCB3aW5Tb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy93aW4tZ2FtZS5tcDMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtZmllbGQnLCBHYW1lRmllbGQpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyZXN0YXJ0LWJ0bicsIFJlc3RhcnRCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdzb2x1dGlvbi1idG4nLCBTb2x1dGlvbkJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NhdmUtYnRuJywgU2F2ZUJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtdGltZXInLCBHYW1lVGltZXIpO1xuXG5jb25zdCBub25vZ3JhbVN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5ub25vZ3JhbVN0eWxlcy50ZXh0Q29udGVudCA9IG5vbm9ncmFtU3R5bGVzU3RyO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxkaXYgY2xhc3M9XCJub25vZ3JhbV9fY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgIDxyZXN0YXJ0LWJ0bj48L3Jlc3RhcnQtYnRuPlxuICAgICAgPHNhdmUtYnRuPjwvc2F2ZS1idG4+XG4gICAgICA8c29sdXRpb24tYnRuPjwvc29sdXRpb24tYnRuPlxuICAgICAgPGdhbWUtdGltZXIgaWQ9XCJnYW1lLXRpbWVyXCIgbWludXRlcz1cIjBcIiBzZWNvbmRzPVwiMFwiPjwvZ2FtZS10aW1lcj5cbiAgICAgIDxhIGhyZWY9XCJcIiBkYXRhLWxpbms+TWVudTwvYT5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgaWQ9XCJzdW1tYXJ5XCIgY2xhc3M9XCJzdW1tYXJ5XCI+XG4gICAgICA8L2Rpdj4gIFxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJub25vZ3JhbV9fd3JhcHBlclwiPlxuICAgICAgPGRpdiBpZD1cIm5vbm9ncmFtXCIgY2xhc3M9XCJub25vZ3JhbVwiPlxuICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b3AtcGFuZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdC1wYW5lXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4gIFxuICAgIFxuICA8L2Rpdj5cbmA7XG5cbmNsYXNzIEdhbWVOb25vZ3JhbSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICBzaGFkb3dSb290LmFwcGVuZChub25vZ3JhbVN0eWxlcyk7XG5cbiAgICBjb25zdCBsZXZlbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdsZXZlbCcpO1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgIGNvbnN0IHNhdmVkU29sdXRpb24gPSB0aGlzLmdldEF0dHJpYnV0ZSgnc2F2ZWRzb2x1dGlvbicpO1xuICAgIGNvbnN0IGNyb3NzZWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnY3Jvc3NlZCcpO1xuXG4gICAgY29uc3QgdGltZXIgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLXRpbWVyJyk7XG4gICAgY29uc29sZS5sb2coJ25vbm9ncmFtIGFkZGVkIHRvIHRoZSBkb2MnKTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKCdtaW51dGVzJykgIT09ICcwJyB8fFxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKSAhPT0gJzAnXG4gICAgKSB7XG4gICAgICBjb25zdCBzYXZlZE1pbnV0ZXMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpO1xuICAgICAgY29uc3Qgc2F2ZWRTZWNvbmRzID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKTtcblxuICAgICAgdGltZXIuc2V0QXR0cmlidXRlKCdtaW51dGVzJywgc2F2ZWRNaW51dGVzKTtcbiAgICAgIHRpbWVyLnNldEF0dHJpYnV0ZSgnc2Vjb25kcycsIHNhdmVkU2Vjb25kcyk7XG5cbiAgICAgIHRpbWVyLmNvbnRpbnVlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCdzdW1tYXJ5JykuaW5uZXJIVE1MID0gYFxuICAgICAgPHAgY2xhc3M9XCJzdW1tYXJ5X19sZXZlbFwiPiR7bGV2ZWx9PC9wPlxuICAgICAgPHAgY2xhc3M9XCJzdW1tYXJ5X19uYW1lXCI+ICR7bmFtZVswXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKX08L3A+XG4gICAgYDtcblxuICAgIGNvbnN0IG5vbm9ncmFtID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjbm9ub2dyYW0nKTtcbiAgICBjb25zdCBmaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dhbWUtZmllbGQnKTtcbiAgICBmaWVsZC5pZCA9ICdnYW1lLWZpZWxkJztcbiAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdnYW1lLWZpZWxkJyk7XG4gICAgZmllbGQuc2F2ZWRTb2x1dGlvbiA9IHNhdmVkU29sdXRpb247XG4gICAgZmllbGQuY3Jvc3NlZCA9IGNyb3NzZWQ7XG4gICAgZmllbGQuc2V0QXR0cmlidXRlKCdsZXZlbCcsIGxldmVsKTtcblxuICAgIG5vbm9ncmFtLmFwcGVuZChmaWVsZCk7XG5cbiAgICBjb25zdCB7IG1hdHJpeCB9ID0gbm9ub2dyYW1zLmZpbmQoXG4gICAgICAoaXRlbSkgPT4gaXRlbS5uYW1lID09PSBuYW1lICYmIGl0ZW0ubGV2ZWwgPT09IGxldmVsXG4gICAgKTtcblxuICAgIGNvbnN0IGNvcnJlY3RTb2x1dGlvbiA9IG1hdHJpeC5mbGF0KCkuam9pbignJykudG9TdHJpbmcoKTtcblxuICAgIC8vIERyYXcgbWF0cml4IHNvbHV0aW9uXG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIG1hdHJpeC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgc3RyICs9IGVsLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGN1cnIgPyAn4pagJyA6ICfilqEnO1xuICAgICAgICByZXR1cm4gYWNjICsgc3F1YXJlO1xuICAgICAgfSwgJycpO1xuICAgICAgc3RyICs9ICdcXG4nO1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKHN0cik7XG5cbiAgICBjb25zdCB0b3BQYW5lID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcudG9wLXBhbmUnKTtcbiAgICBjb25zdCBsZWZ0UGFuZSA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLmxlZnQtcGFuZScpO1xuICAgIGxldCBtYXhMZWZ0SGludHMgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxlZnRIaW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBsZWZ0SGludC5jbGFzc0xpc3QuYWRkKCdsZWZ0LXBhbmVfX2hpbnQnKTtcblxuICAgICAgY29uc3QgdG9wSGludCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9wSGludC5jbGFzc0xpc3QuYWRkKCd0b3AtcGFuZV9faGludCcpO1xuXG4gICAgICBsZXQgY291bnRlckxlZnQgPSAwO1xuICAgICAgbGV0IGNvdW50ZXJUb3AgPSAwO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBpZiAobWF0cml4W2ldW2pdKSB7XG4gICAgICAgICAgY291bnRlckxlZnQgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAoY291bnRlckxlZnQgJiYgIW1hdHJpeFtpXVtqXSkgfHxcbiAgICAgICAgICAoY291bnRlckxlZnQgJiYgaiA9PT0gbWF0cml4Lmxlbmd0aCAtIDEpXG4gICAgICAgICkge1xuICAgICAgICAgIGxlZnRIaW50Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgICAgICAgYFxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGVmdC1wYW5lX19udW1iZXJcIj4ke2NvdW50ZXJMZWZ0fTwvZGl2PlxuXHRcdFx0XHRcdFx0YFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb3VudGVyTGVmdCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0cml4W2pdW2ldKSB7XG4gICAgICAgICAgY291bnRlclRvcCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChjb3VudGVyVG9wICYmICFtYXRyaXhbal1baV0pIHx8XG4gICAgICAgICAgKGNvdW50ZXJUb3AgJiYgaiA9PT0gbWF0cml4Lmxlbmd0aCAtIDEpXG4gICAgICAgICkge1xuICAgICAgICAgIHRvcEhpbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAgICAgICBgXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidG9wLXBhbmVfX251bWJlclwiPiR7Y291bnRlclRvcH08L2Rpdj5cblx0XHRcdFx0XHRcdGBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY291bnRlclRvcCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGVmdFBhbmUuYXBwZW5kKGxlZnRIaW50KTtcbiAgICAgIHRvcFBhbmUuYXBwZW5kKHRvcEhpbnQpO1xuXG4gICAgICBpZiAobGVmdEhpbnQuY2hpbGRyZW4ubGVuZ3RoID4gbWF4TGVmdEhpbnRzKSB7XG4gICAgICAgIG1heExlZnRIaW50cyA9IGxlZnRIaW50LmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYWxjdWxhdGUgY2VsbCBzaXplXG4gICAgY29uc3Qgbm9ub2dyYW1XaWR0aCA9IG5vbm9ncmFtLm9mZnNldFdpZHRoO1xuXG4gICAgbGV0IGNlbGxTaXplID0gbm9ub2dyYW1XaWR0aCAvIChtYXhMZWZ0SGludHMgKyBtYXRyaXgubGVuZ3RoKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY2VsbC1zaXplJywgY2VsbFNpemUgKyAncHgnKTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignZmlsbCcsICgpID0+IHtcbiAgICAgIGlmIChjb3JyZWN0U29sdXRpb24gPT09IGZpZWxkLmN1cnJlbnRTb2x1dGlvbikge1xuICAgICAgICBmaWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnd2luJykpO1xuICAgICAgICB0aW1lci5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnd2luJykpO1xuICAgICAgICBjb25zdCBtaW51dGVzID0gdGltZXIuZ2V0QXR0cmlidXRlKCdtaW51dGVzJyk7XG5cbiAgICAgICAgbGV0IG1pbnV0ZXNTdHIgPSAnJztcbiAgICAgICAgaWYgKCErbWludXRlcykge1xuICAgICAgICAgIG1pbnV0ZXNTdHIgPSAnJztcbiAgICAgICAgfSBlbHNlIGlmICgrbWludXRlcyA+IDEpIHtcbiAgICAgICAgICBtaW51dGVzU3RyICs9ICdtaW51dGVzICc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWludXRlc1N0ciArPSAnbWludXRlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSB0aW1lci5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKTtcbiAgICAgICAgbGV0IHNlY29uZHNTdHIgPSAhc2Vjb25kcyB8fCBgJHtzZWNvbmRzfSBzZWNvbmRgO1xuICAgICAgICBzZWNvbmRzU3RyID0gK3NlY29uZHMgPiAxID8gc2Vjb25kc1N0ciArICdzJyA6IHNlY29uZHNTdHI7XG5cbiAgICAgICAgbmV3IEF1ZGlvKHdpblNvdW5kRmlsZSkucGxheSgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGBHcmVhdCEgWW91IGhhdmUgc29sdmVkIHRoZSBub25vZ3JhbSAke25hbWVbMF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSl9IGluICR7bWludXRlc1N0cn0ke3NlY29uZHNTdHJ9IWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcigncmVzdGFydCcsICgpID0+IHtcbiAgICAgIGZpZWxkLnRpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3Jlc3RhcnQnKSk7XG4gICAgICB0aW1lci5yZXN0YXJ0KCk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NvbHV0aW9uJywgKCkgPT4ge1xuICAgICAgdGltZXIuc3RvcCgpO1xuXG4gICAgICBmaWVsZC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NvbHV0aW9uJywge1xuICAgICAgICAgIGRldGFpbDogbWF0cml4LmZsYXQoKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NhdmUtZ2FtZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGdhbWUgPSB7XG4gICAgICAgIGxldmVsLFxuICAgICAgICBuYW1lLFxuICAgICAgICBjdXJyZW50U29sdXRpb246IGZpZWxkLmN1cnJlbnRTb2x1dGlvbixcbiAgICAgICAgY3Jvc3NlZDogZmllbGQuY3VycmVudENyb3NzZWQsXG4gICAgICAgIHRpbWU6IHtcbiAgICAgICAgICBtaW51dGVzOiB0aW1lci5taW51dGVzLFxuICAgICAgICAgIHNlY29uZHM6IHRpbWVyLnNlY29uZHMsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2F2ZWRHYW1lJywgSlNPTi5zdHJpbmdpZnkoZ2FtZSkpO1xuICAgIH0pO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdzdGFydHRpbWVyJywgKCkgPT4ge1xuICAgICAgdGltZXIubGF1bmNoKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZU5vbm9ncmFtIH07XG4iLCJpbXBvcnQgZmllbGRTdHlsZXNTdHIgZnJvbSAnLi9HYW1lRmllbGQuc3R5bGVzLnNjc3MnO1xuaW1wb3J0IGZpbGxTb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy9maWxsLWNlbGwubXAzJztcbmltcG9ydCBjbGVhclNvdW5kRmlsZSBmcm9tICcuLy4uLy4uLy4uL2Fzc2V0cy9zb3VuZC1lZmZlY3RzL2NsZWFyLWNlbGwubXAzJztcbmltcG9ydCBjcm9zc1NvdW5kRmlsZSBmcm9tICcuLy4uLy4uLy4uL2Fzc2V0cy9zb3VuZC1lZmZlY3RzL2Nyb3NzLWNlbGwubXAzJztcblxuY29uc3QgZmllbGRTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuZmllbGRTdHlsZXMudGV4dENvbnRlbnQgPSBmaWVsZFN0eWxlc1N0cjtcblxuY2xhc3MgR2FtZUZpZWxkIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoZmllbGRTdHlsZXMpO1xuXG4gICAgdGhpcy5sZXZlbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdsZXZlbCcpLnNwbGl0KCd4JylbMF07XG5cbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5maWVsZC5pZCA9ICdmaWVsZCc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGV2ZWw7IGkgKz0gMSkge1xuICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ3JvdycpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxldmVsOyBqICs9IDEpIHtcbiAgICAgICAgcm93Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+YCk7XG4gICAgICB9XG4gICAgICB0aGlzLmZpZWxkLmFwcGVuZChyb3cpO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRoaXMuZmllbGQpO1xuXG4gICAgdGhpcy5jZWxscyA9IHRoaXMuZmllbGQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcblxuICAgIHRoaXMuY3VycmVudFNvbHV0aW9uID1cbiAgICAgIHRoaXMuc2F2ZWRTb2x1dGlvbiB8fCBuZXcgQXJyYXkodGhpcy5jZWxscy5sZW5ndGgpLmZpbGwoMCkuam9pbignJyk7XG5cbiAgICBpZiAodGhpcy5zYXZlZFNvbHV0aW9uKSB7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2F2ZWRTb2x1dGlvbltpXSA9PT0gJzEnKSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY3Jvc3NlZCkge1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNyb3NzZWRbaV0gPT09ICd4Jykge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY3Jvc3NlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmNsaWNrc0Rpc2FibGVkKSB7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmNsaWNrc0Rpc2FibGVkKSB7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Nyb3NzZWQnKTtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2ZpbGxlZCcpO1xuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaWxsZWQnKSkge1xuICAgICAgICBuZXcgQXVkaW8oZmlsbFNvdW5kRmlsZSkucGxheSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IEF1ZGlvKGNsZWFyU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tTb2x1dGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2Nyb3NzZWQnKTtcblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY3Jvc3NlZCcpKSB7XG4gICAgICAgIG5ldyBBdWRpbyhjcm9zc1NvdW5kRmlsZSkucGxheSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IEF1ZGlvKGNsZWFyU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tTb2x1dGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRpbWVyU3RhcnRlZCkgcmV0dXJuO1xuICAgICAgdGhpcy50aW1lclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLmZpZWxkLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc3RhcnR0aW1lcicsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50aW1lclN0YXJ0ZWQpIHJldHVybjtcbiAgICAgIHRoaXMudGltZXJTdGFydGVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3N0YXJ0dGltZXInLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc3RhcnQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmVuYWJsZUNsaWNrcygpO1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcsICdjcm9zc2VkJykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdzb2x1dGlvbicsIChlKSA9PiB7XG4gICAgICB0aGlzLmRpc2FibGVDbGlja3MoKTtcblxuICAgICAgY29uc3Qgc29sdXRpb24gPSBlLmRldGFpbDtcblxuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgIGlmIChzb2x1dGlvbltpXSkge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJyk7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3dpbicsICgpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUNsaWNrcygpO1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nyb3NzZWQnKSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NvbHV0aW9uKCkge1xuICAgIHRoaXMuY3VycmVudFNvbHV0aW9uID0gWy4uLnRoaXMuY2VsbHNdLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICByZXR1cm4gY3Vyci5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpbGxlZCcpID8gYWNjICsgJzEnIDogYWNjICsgJzAnO1xuICAgIH0sICcnKTtcblxuICAgIHRoaXMuY3VycmVudENyb3NzZWQgPSBbLi4udGhpcy5jZWxsc10ucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgIHJldHVybiBjdXJyLmNsYXNzTGlzdC5jb250YWlucygnY3Jvc3NlZCcpID8gYWNjICsgJ3gnIDogYWNjICsgJzAnO1xuICAgIH0sICcnKTtcblxuICAgIHRoaXMuZmllbGQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnZmlsbCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBkaXNhYmxlQ2xpY2tzKCkge1xuICAgIHRoaXMuY2xpY2tzRGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZW5hYmxlQ2xpY2tzKCkge1xuICAgIHRoaXMuY2xpY2tzRGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lRmllbGQgfTtcbiIsImltcG9ydCB0aW1lclN0eWxlc1N0ciBmcm9tICcuL0dhbWVUaW1lci5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHRpbWVyU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnRpbWVyU3R5bGVzLnRleHRDb250ZW50ID0gdGltZXJTdHlsZXNTdHI7XG5cbmNsYXNzIEdhbWVUaW1lciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5hcHBlbmQodGltZXJTdHlsZXMpO1xuXG4gICAgaWYgKCF0aGlzLnJlbmRlcmVkKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5yZW5kZXJlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd3aW4nLCAoKSA9PiB0aGlzLnN0b3AoKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IG1pbnV0ZXMgPVxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKS5sZW5ndGggPT09IDFcbiAgICAgICAgPyBgMCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKX1gXG4gICAgICAgIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKTtcblxuICAgIGxldCBzZWNvbmRzID1cbiAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJykubGVuZ3RoID09PSAxXG4gICAgICAgID8gYDAke3RoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyl9YFxuICAgICAgICA6IHRoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyk7XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IGAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xuXG4gICAgdGhpcy5taW51dGVzID0gbWludXRlcztcbiAgICB0aGlzLnNlY29uZHMgPSBzZWNvbmRzO1xuICAgIHRoaXMuY3VycmVudER1cmF0aW9uID0gZHVyYXRpb247XG4gICAgdGhpcy5pbm5lckhUTUwgPSBkdXJhdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ21pbnV0ZXMnLCAnc2Vjb25kcyddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBsYXVuY2goKSB7XG4gICAgaWYgKHRoaXMuY29udGludWUpIHtcbiAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmN1cnJlbnREdXJhdGlvbi5zcGxpdCgnOicpO1xuICAgICAgY29uc3QgbWluID0gK3RpbWVbMF07XG4gICAgICBjb25zdCBzZWMgPSArdGltZVsxXTtcblxuICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpIC0gKG1pbiAqIDYwICsgc2VjKSAqIDEwMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7XG5cbiAgICB0aGlzLmludGVydmFsSUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLnRydW5jKChub3cgLSB0aGlzLnN0YXJ0VGltZSkgLyAxMDAwKTtcblxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlY29uZHMnLCBkdXJhdGlvbiAlIDYwKTtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtaW51dGVzJywgTWF0aC5mbG9vcihkdXJhdGlvbiAvIDYwKSk7XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKTtcbiAgfVxuXG4gIHJlc3RhcnQoKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBudWxsO1xuICAgIHRoaXMuY29udGludWUgPSBmYWxzZTtcblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWNvbmRzJywgJzAnKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbWludXRlcycsICcwJyk7XG5cbiAgICB0aGlzLnN0b3AoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVUaW1lciB9O1xuIiwiaW1wb3J0IHJlc3RhcnRCdG5TdHlsZXNTdHIgZnJvbSAnLi9SZXN0YXJ0QnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3QgcmVzdGFydEJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5yZXN0YXJ0QnRuU3R5bGVzLnRleHRDb250ZW50ID0gcmVzdGFydEJ0blN0eWxlc1N0cjtcblxuY2xhc3MgUmVzdGFydEJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvblwiPlJlc3RhcnQgZ2FtZTwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQocmVzdGFydEJ0blN0eWxlcyk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgncmVzdGFydCcsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IFJlc3RhcnRCdG4gfTtcbiIsImltcG9ydCBzYXZlQnRuU3R5bGVzU3RyIGZyb20gJy4vU2F2ZUJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHNhdmVCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuc2F2ZUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IHNhdmVCdG5TdHlsZXNTdHI7XG5cbmNsYXNzIFNhdmVCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIj5TYXZlIGdhbWU8L2Rpdj5cbiAgICBgO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHNhdmVCdG5TdHlsZXMpO1xuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5jdXJyZW50VGFyZ2V0LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2F2ZS1nYW1lJywgeyBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBTYXZlQnRuIH07XG4iLCJpbXBvcnQgc29sdXRpb25CdG5TdHlsZXNTdHIgZnJvbSAnLi9Tb2x1dGlvbkJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHNvbHV0aW9uQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnNvbHV0aW9uQnRuU3R5bGVzLnRleHRDb250ZW50ID0gc29sdXRpb25CdG5TdHlsZXNTdHI7XG5cbmNsYXNzIFNvbHV0aW9uQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+U29sdXRpb248L2Rpdj5cbiAgICBgO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHNvbHV0aW9uQnRuU3R5bGVzKTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQub25jbGljayA9IChlKSA9PiB7XG4gICAgICBlLmN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzb2x1dGlvbicsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IFNvbHV0aW9uQnRuIH07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBDb2xvcnNcblxuJGNvbG9yLWJhY2tncm91bmQ6ICNmYmYzZjI7XG4kY29sb3ItYWNjZW50OiAjMWM3NjhmO1xuJGNvbG9yLWFjY2VudC1zZWNvbmRhcnktMTogI2ZhOTkxYztcbiRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTI6ICNmYTFjNjY7XG4kY29sb3ItYWNjZW50LXNlY29uZGFyeS0zOiAjNjIxY2ZhO1xuXG4kY29sb3ItdGV4dC1tYWluOiAjMjYyNjI2O1xuJGNvbG9yLXRleHQtcmV2ZXJzZTogI2ZmZmZmZjtcblxuLy8gU2l6ZXNcblxuOnJvb3Qge1xuICAtLWNlbGwtc2l6ZTogYXV0bztcbn1cblxuLy8gRm9udHNcblxuJGZvbnQtbWFpbjogJ1NpZ25pa2EgTmVnYXRpdmUnLCBzYW5zLXNlcmlmO1xuIiwiQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvbWl4aW5zJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuXG4uYnVyZ2VyLWljb24ge1xuICBkaXNwbGF5OiBub25lO1xuXG4gIHdpZHRoOiA0NHB4O1xuICBoZWlnaHQ6IDQ0cHg7XG5cbiAgQGluY2x1ZGUgbWF4LTc2OCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gIH1cblxuICAkYnRuOiAmO1xuXG4gICYuYWN0aXZlIHtcbiAgICAjeyRidG59X19zdHJva2Uge1xuICAgICAgJjpudGgtY2hpbGQoMSkge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KSByb3RhdGUoNDVkZWcpO1xuICAgICAgfVxuXG4gICAgICAmOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KSByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmX19zdHJva2Uge1xuICAgIHdpZHRoOiAyNHB4O1xuICAgIGhlaWdodDogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1iYWNrZ3JvdW5kO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcblxuICAgIHRyYW5zaXRpb246IDAuM3M7XG4gIH1cbn1cbiIsIi8qIEZvciBtZWRpYSBxdWVyaWVzICovXG5cbkBtaXhpbiBtYXgtMTIwMCB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWluLTEwMjQge1xuICBAbWVkaWEgKG1pbi13aWR0aDogMTAyNHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1heC0xMDI0IHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMjRweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtYXgtNzY4IHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1heC01NzYge1xuICBAbWVkaWEgKG1heC13aWR0aDogNTc2cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTM4MCB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiAzODBweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBwb3J0cmFpdCB7XG4gIEBtZWRpYSAob3JpZW50YXRpb246IHBvcnRyYWl0KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vYWJzdHJhY3QvbWl4aW5zJyBhcyAqO1xuQHVzZSAnLi8uLi9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbioge1xuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5odG1sIHtcblx0c2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XG59XG5cbmJvZHkge1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYmFja2dyb3VuZDtcblx0dXNlci1zZWxlY3Q6IG5vbmU7XG5cblx0Ji5zY3JvbGwtZGlzYWJsZWQge1xuXHRcdGhlaWdodDogMTAwJTtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHR9XG59XG5cbi53cmFwcGVyIHtcblx0bWF4LXdpZHRoOiAxNDQwcHg7XG5cdHBhZGRpbmc6IDAgNDBweDtcblx0bWFyZ2luOiAwIGF1dG87XG5cblx0QGluY2x1ZGUgbWF4LTU3NiB7XG5cdFx0cGFkZGluZzogMCA0LjIxMDUyJTtcblx0fVxufVxuXG4uc2VjdGlvbiB7XG5cdG1hcmdpbi1ib3R0b206IDEwMHB4O1xufVxuXG5pbWcge1xuXHRtYXgtd2lkdGg6IDEwMCU7XG59XG5cbi50cmFuc3BhcmVudCB7XG5cdG9wYWNpdHk6IDA7XG59XG5cbjpob3N0IHtcblx0ZGlzcGxheTogYmxvY2s7XG59XG4iLCJAdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uL3N0eWxlcy9sYXlvdXQvYmFzaWMnIGFzICo7XG5cbjpob3N0IHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBiYWNrZ3JvdW5kOiAkY29sb3ItYWNjZW50O1xuXG4gICoge1xuICAgIGNvbG9yOiAkY29sb3ItYmFja2dyb3VuZDtcbiAgfVxufVxuXG5hIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuZ2FtZS1tZW51IHtcbiAgZGlzcGxheTogZmxleDtcbiAgdHJhbnNpdGlvbjogMC4zcztcblxuICAmLmhpZGRlbiB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICAmLmFic29sdXRlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA3NnB4O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG5cbiAgICBwYWRkaW5nOiAwIDE2cHggMjBweCAxNnB4O1xuXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1hY2NlbnQ7XG4gIH1cbn1cblxuLndyYXBwZXIge1xuICBwYWRkaW5nOiAxNnB4O1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuIiwiLmFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDIwcHg7XG59XG4iLCJAdXNlICcuLy4uL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmJ1dHRvbiB7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuXG4gIGNvbG9yOiAkY29sb3ItdGV4dC1yZXZlcnNlO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTE7XG5cbiAgYm9yZGVyLXJhZGl1czogMTBweDtcblxuICB0cmFuc2l0aW9uOiAwLjNzO1xuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMTIwJSk7XG4gIH1cblxuICAmLmRpc2FibGVkIHtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgZmlsdGVyOiBvcGFjaXR5KDAuNikgZ3JheXNjYWxlKDAuNSk7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgIGZpbHRlcjogb3BhY2l0eSgwLjYpIGdyYXlzY2FsZSgwLjUpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYWNjZW50LXNlY29uZGFyeS0yO1xufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYWNjZW50LXNlY29uZGFyeS0zO1xufVxuIiwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xuXG4vKiBEb2N1bWVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cbiAqL1xuXG5odG1sIHtcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXG59XG5cbi8qIFNlY3Rpb25zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxuICovXG5cbm1haW4ge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxuICovXG5cbmgxIHtcbiAgZm9udC1zaXplOiAyZW07XG4gIG1hcmdpbjogMC42N2VtIDA7XG59XG5cbi8qIEdyb3VwaW5nIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxuICovXG5cbmhyIHtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cbiAgaGVpZ2h0OiAwOyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5wcmUge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxucCB7XG4gIG1hcmdpbjogMDtcbn1cblxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxuICovXG5cbmEge1xuICBkaXNwbGF5OiBibG9jaztcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG59XG5cbnVsIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG4vKipcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxuICovXG5cbmFiYnJbdGl0bGVdIHtcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxuICovXG5cbmIsXG5zdHJvbmcge1xuICBmb250LXdlaWdodDogYm9sZGVyO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuY29kZSxcbmtiZCxcbnNhbXAge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zbWFsbCB7XG4gIGZvbnQtc2l6ZTogODAlO1xufVxuXG4vKipcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxuICogYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1YixcbnN1cCB7XG4gIGZvbnQtc2l6ZTogNzUlO1xuICBsaW5lLWhlaWdodDogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbnN1YiB7XG4gIGJvdHRvbTogLTAuMjVlbTtcbn1cblxuc3VwIHtcbiAgdG9wOiAtMC41ZW07XG59XG5cbi8qIEVtYmVkZGVkIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cbiAqL1xuXG5pbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xufVxuXG4vKiBGb3Jtc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCxcbm9wdGdyb3VwLFxuc2VsZWN0LFxudGV4dGFyZWEge1xuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cbiAgbWFyZ2luOiAwOyAvKiAyICovXG59XG5cbmJ1dHRvbiB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbn1cblxuLyoqXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXG4gKi9cblxuYnV0dG9uLFxuaW5wdXQge1xuICAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbixcbnNlbGVjdCB7XG4gIC8qIDEgKi9cbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5bdHlwZT0nYnV0dG9uJ10sXG5bdHlwZT0ncmVzZXQnXSxcblt0eXBlPSdzdWJtaXQnXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xuICBhcHBlYXJhbmNlOiBidXR0b247XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT0nYnV0dG9uJ106Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT0ncmVzZXQnXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdzdWJtaXQnXTo6LW1vei1mb2N1cy1pbm5lciB7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxuLyoqXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXG4gKi9cblxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9J2J1dHRvbiddOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9J3Jlc2V0J106LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0nc3VibWl0J106LW1vei1mb2N1c3Jpbmcge1xuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmZpZWxkc2V0IHtcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5sZWdlbmQge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAzICovXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxuICovXG5cbnByb2dyZXNzIHtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxuICovXG5cbnRleHRhcmVhIHtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbi8qKlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXG4gKi9cblxuW3R5cGU9J2NoZWNrYm94J10sXG5bdHlwZT0ncmFkaW8nXSB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cbiAgcGFkZGluZzogMDsgLyogMiAqL1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cbiAqL1xuXG5bdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5bdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cbiAqL1xuXG5bdHlwZT0nc2VhcmNoJ10ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xuICBhcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXG4gKi9cblxuW3R5cGU9J3NlYXJjaCddOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXG4gKi9cblxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cbn1cblxuLyogSW50ZXJhY3RpdmVcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxuICovXG5cbmRldGFpbHMge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdW1tYXJ5IHtcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xufVxuXG4vKiBNaXNjXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cbiAqL1xuXG50ZW1wbGF0ZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXG4gKi9cblxuW2hpZGRlbl0ge1xuICBkaXNwbGF5OiBub25lO1xufVxuIiwiQHVzZSAnLi8uLi8uLi9zdHlsZXMvYmFzZS9ub3JtYWxpemUnIGFzICo7XG5AdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC9taXhpbnMnIGFzICo7XG5cbjpob3N0IHtcbiAgKiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxufVxuXG4uYWN0aW9ucyB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG5cbiAgd2lkdGg6IDEwMCU7XG5cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ubm9ub2dyYW0ge1xuICAmX19jb250YWluZXIge1xuICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSk7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICB9XG5cbiAgJl9fd3JhcHBlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZmxleC1ncm93OiAxO1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgd2lkdGg6IDQwJTtcblxuICBAaW5jbHVkZSBtYXgtMTIwMCB7XG4gICAgd2lkdGg6IDUwJTtcbiAgfVxuXG4gIEBpbmNsdWRlIHBvcnRyYWl0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIEBpbmNsdWRlIG1heC03Njgge1xuICAgIGZvbnQtc2l6ZTogbWluKGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDAuOCksIDJyZW0pO1xuICB9XG5cbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOlxuICAgIGF1dG9cbiAgICAxZnIgMWZyO1xuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxuICAgICdhIGIgYidcbiAgICAnYyBkIGQnXG4gICAgJ2MgZCBkJztcbn1cblxuLnN1bW1hcnkge1xuICBwYWRkaW5nOiAxMHB4O1xuXG4gIGdyaWQtYXJlYTogYTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxNnB4O1xuXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRvcC1wYW5lIHtcbiAgZ3JpZC1hcmVhOiBiO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG5cbiAgZGlzcGxheTogZmxleDtcblxuICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLWxlZnQ6IDFweCAjMDAwIHNvbGlkO1xuXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDAxZjtcblxuICAmX19oaW50IHtcbiAgICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblxuICAgIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1yaWdodDogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCAjMDAwIHNvbGlkO1xuXG4gICAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgICAgYm9yZGVyLXJpZ2h0OiAycHggIzAwMDAwMCBzb2xpZDtcbiAgICB9XG4gIH1cblxuICAmX19udW1iZXIge1xuICAgIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cbn1cblxuLmxlZnQtcGFuZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBncmlkLWFyZWE6IGM7XG5cbiAgYm9yZGVyLXRvcDogMXB4ICMwMDAgc29saWQ7XG4gIGJvcmRlci1ib3R0b206IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDFmO1xuXG4gICZfX2hpbnQge1xuICAgIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cbiAgICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggIzAwMCBzb2xpZDtcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICBib3JkZXItYm90dG9tOiAycHggIzAwMDAwMCBzb2xpZDtcbiAgICB9XG4gIH1cblxuICAmX19udW1iZXIge1xuICAgIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxufVxuXG5nYW1lLWZpZWxkIHtcbiAgZ3JpZC1hcmVhOiBkO1xufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYmFzZS9ub3JtYWxpemUnIGFzICo7XG5cbjpob3N0IHtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBib3JkZXI6IDFweCAjMDAwMDAwIHNvbGlkO1xuXG4gICoge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmYWM7XG59XG5cbi5yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IHZhcigtLWNlbGwtc2l6ZSk7XG5cbiAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgIGJvcmRlci1ib3R0b206IDJweCAjMDAwMDAwIHNvbGlkO1xuICB9XG59XG5cbi5jZWxsIHtcbiAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcbiAgYm9yZGVyOiAxcHggIzAwMDAwMCBzb2xpZDtcblxuICB0cmFuc2l0aW9uOiAwLjJzO1xuXG4gICY6bnRoLWNoaWxkKDVuKTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICBib3JkZXItcmlnaHQ6IDJweCAjMDAwMDAwIHNvbGlkO1xuICB9XG5cbiAgJi5maWxsZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gIH1cblxuICAmLmNyb3NzZWQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICY6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbGVmdDogNTAlO1xuXG4gICAgICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC45KTtcbiAgICAgIGhlaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcblxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgcm90YXRlKDQ1ZGVnKTtcbiAgICB9XG4gICAgJjo6YWZ0ZXIge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIGxlZnQ6IDUwJTtcblxuICAgICAgd2lkdGg6IGNhbGModmFyKC0tY2VsbC1zaXplKSAqIDAuOSk7XG4gICAgICBoZWlnaHQ6IDNweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG5cbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHJvdGF0ZSgtNDVkZWcpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYWNjZW50LXNlY29uZGFyeS0zO1xufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItYWNjZW50LXNlY29uZGFyeS0yO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAnLi9zdHlsZXMvbWFpbi5zY3NzJztcbmltcG9ydCB7IEFwcFJvdXRlciB9IGZyb20gJy4vY29tcG9uZW50cy9hcHAtcm91dGVyL0FwcFJvdXRlcic7XG5pbXBvcnQgeyBHYW1lSGVhZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2dhbWVIZWFkZXIvR2FtZUhlYWRlcic7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS1oZWFkZXInLCBHYW1lSGVhZGVyKTtcblxuZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoXG4gICdhZnRlcmJlZ2luJyxcbiAgYFxuXHRcdDxnYW1lLWhlYWRlcj48L2dhbWUtaGVhZGVyPlxuXHRcdDxtYWluIGlkPVwibWFpblwiIGNsYXNzPVwibWFpbiB3cmFwcGVyXCI+XG5cdFx0PC9tYWluPlxuXHRgXG4pO1xuXG5jb25zdCByb3V0ZXIgPSBuZXcgQXBwUm91dGVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCBkZWVwZXN0RWwgPSBlLmNvbXBvc2VkUGF0aCgpWzBdO1xuXG4gICAgaWYgKGRlZXBlc3RFbC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGVlcGVzdEVsLm1hdGNoZXMoJ1tkYXRhLWxpbmtdJykpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJvdXRlci5jaGFuZ2VIYXNoKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG5cbiAgICAgIGxldCBwYXJhbXMgPSBbXTtcbiAgICAgIGlmIChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdocmVmJykgPT09ICdub25vZ3JhbScpIHtcbiAgICAgICAgaWYgKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2dhbWUtbmFtZScpKSB7XG4gICAgICAgICAgcGFyYW1zLnB1c2goZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnZ2FtZS1uYW1lJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2xldmVsJykpIHtcbiAgICAgICAgICBwYXJhbXMucHVzaChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdsZXZlbCcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGVlcGVzdEVsLm1hdGNoZXMoJ1tyYW5kb21dJykpIHtcbiAgICAgICAgcGFyYW1zLnB1c2goJ3JhbmRvbScpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGVlcGVzdEVsLm1hdGNoZXMoJ1tjb250aW51ZV0nKSkge1xuICAgICAgICBwYXJhbXMucHVzaCgnY29udGludWUnKTtcbiAgICAgIH1cblxuICAgICAgcm91dGVyLnNob3dSb3V0ZShwYXJhbXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgd2luZG93Lm9ucG9wc3RhdGUgPSAoKSA9PiB7XG4gICAgcm91dGVyLnNob3dSb3V0ZSgpO1xuICB9O1xuXG4gIHJvdXRlci5zaG93Um91dGUoKTtcbn0pO1xuIl0sIm5hbWVzIjpbIkdhbWVNZW51IiwiR2FtZU5vbm9ncmFtIiwibm9ub2dyYW1zIiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJBcHBSb3V0ZXIiLCJjb25zdHJ1Y3RvciIsImFwcCIsInJvdXRlcyIsImhhc2giLCJ2aWV3IiwibmFtZSIsImxldmVsIiwic2F2ZWRTb2x1dGlvbiIsImNyb3NzZWQiLCJtaW51dGVzIiwic2Vjb25kcyIsInJlc29sdmVkTmFtZSIsInJlc29sdmVkTGV2ZWwiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsImNoYW5nZUhhc2giLCJ1cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNob3dSb3V0ZSIsInBhcmFtcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImhlYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJ1cmdlck1lbnUiLCJzaGFkb3dSb290IiwiY2xhc3NMaXN0IiwiYWRkIiwibmV3UGFyYW1zIiwicmFuZG9tTnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tTm9ub2dyYW0iLCJzYXZlZCIsIkpTT04iLCJwYXJzZSIsImN1cnJlbnRTb2x1dGlvbiIsInRpbWUiLCJtYXRjaCIsImZpbmQiLCJpdGVtIiwic2xpY2UiLCJpbm5lckhUTUwiLCJidXJnZXJNZW51U3R5bGVzU3RyIiwiQnVyZ2VyTWVudUJ0biIsIkhUTUxFbGVtZW50IiwiY29ubmVjdGVkQ2FsbGJhY2siLCJhdHRhY2hTaGFkb3ciLCJtb2RlIiwiYnVyZ2VyQnRuU3R5bGVzIiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwiYXBwZW5kIiwiYnRuIiwiZ2FtZU1lbnUiLCJpc0J1cmdlciIsImFmdGVyIiwib25jbGljayIsInRvZ2dsZSIsImhlYWRlclN0eWxlc1N0ciIsImhlYWRlclN0eWxlcyIsInRlbXBsYXRlIiwiR2FtZUhlYWRlciIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJpbkhlYWRlciIsImdldEVsZW1lbnRCeUlkIiwibWVudVN0eWxlU3RyIiwiUmFuZG9tQnRuIiwiQ29udGludWVCdG4iLCJUZW1wbGF0ZXNCdG4iLCJsZXZlbHMiLCJTZXQiLCJtYXAiLCJsZXZlbHNIVE1MIiwiZ2FtZU5hbWVzIiwiZmlsdGVyIiwiam9pbiIsIm1lbnVTdHlsZXMiLCJhY3Rpb25zIiwiZ2V0QXR0cmlidXRlIiwic3R5bGUiLCJkaXNwbGF5IiwiY29uc29sZSIsImxvZyIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwibGFzdEVsZW1lbnRDaGlsZCIsImluc2VydEFkamFjZW50SFRNTCIsImZsZXhEaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwiY29udGludWVCdG5TdHlsZXNTdHIiLCJocmVmIiwic2V0QXR0cmlidXRlIiwiaW5uZXJUZXh0IiwiY29udGludWVCdG5TdHlsZXMiLCJyYW5kb21CdG5TdHlsZXNTdHIiLCJyYW5kb21CdG5TdHlsZXMiLCJ0ZW1wbGF0ZXNCdG5TdHlsZXNTdHIiLCJ0ZW1wbGF0ZXNCdG5TdHlsZXMiLCJub25vZ3JhbVN0eWxlc1N0ciIsIkdhbWVGaWVsZCIsIlJlc3RhcnRCdG4iLCJTb2x1dGlvbkJ0biIsIlNhdmVCdG4iLCJHYW1lVGltZXIiLCJ3aW5Tb3VuZEZpbGUiLCJub25vZ3JhbVN0eWxlcyIsInRpbWVyIiwic2F2ZWRNaW51dGVzIiwic2F2ZWRTZWNvbmRzIiwiY29udGludWUiLCJ0b1VwcGVyQ2FzZSIsIm5vbm9ncmFtIiwiZmllbGQiLCJpZCIsIm1hdHJpeCIsImNvcnJlY3RTb2x1dGlvbiIsImZsYXQiLCJ0b1N0cmluZyIsInN0ciIsImZvckVhY2giLCJlbCIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJzcXVhcmUiLCJ0b3BQYW5lIiwibGVmdFBhbmUiLCJtYXhMZWZ0SGludHMiLCJpIiwibGVmdEhpbnQiLCJ0b3BIaW50IiwiY291bnRlckxlZnQiLCJjb3VudGVyVG9wIiwiaiIsImNoaWxkcmVuIiwibm9ub2dyYW1XaWR0aCIsIm9mZnNldFdpZHRoIiwiY2VsbFNpemUiLCJzZXRQcm9wZXJ0eSIsImZpcnN0RWxlbWVudENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsIm1pbnV0ZXNTdHIiLCJzZWNvbmRzU3RyIiwiQXVkaW8iLCJwbGF5IiwidGltZXJTdGFydGVkIiwicmVzdGFydCIsInN0b3AiLCJkZXRhaWwiLCJnYW1lIiwiY3VycmVudENyb3NzZWQiLCJzdHJpbmdpZnkiLCJsYXVuY2giLCJmaWVsZFN0eWxlc1N0ciIsImZpbGxTb3VuZEZpbGUiLCJjbGVhclNvdW5kRmlsZSIsImNyb3NzU291bmRGaWxlIiwiZmllbGRTdHlsZXMiLCJzcGxpdCIsInJvdyIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiZmlsbCIsImNlbGwiLCJlIiwiY2xpY2tzRGlzYWJsZWQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJyZW1vdmUiLCJjb250YWlucyIsImNoZWNrU29sdXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImJ1YmJsZXMiLCJjb21wb3NlZCIsImVuYWJsZUNsaWNrcyIsImRpc2FibGVDbGlja3MiLCJzb2x1dGlvbiIsInRpbWVyU3R5bGVzU3RyIiwidGltZXJTdHlsZXMiLCJyZW5kZXJlZCIsInJlbmRlciIsImR1cmF0aW9uIiwiY3VycmVudER1cmF0aW9uIiwib2JzZXJ2ZWRBdHRyaWJ1dGVzIiwiYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIiwibWluIiwic2VjIiwic3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsImNsZWFySW50ZXJ2YWwiLCJpbnRlcnZhbElEIiwic2V0SW50ZXJ2YWwiLCJ0cnVuYyIsImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwicmVzdGFydEJ0blN0eWxlc1N0ciIsInJlc3RhcnRCdG5TdHlsZXMiLCJzYXZlQnRuU3R5bGVzU3RyIiwic2F2ZUJ0blN0eWxlcyIsImN1cnJlbnRUYXJnZXQiLCJzb2x1dGlvbkJ0blN0eWxlc1N0ciIsInNvbHV0aW9uQnRuU3R5bGVzIiwiYm9keSIsInJvdXRlciIsImRlZXBlc3RFbCIsImNvbXBvc2VkUGF0aCIsIm1hdGNoZXMiLCJwdXNoIiwib25wb3BzdGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=