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
/* harmony import */ var _highScoreTable_HighScoreTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../highScoreTable/HighScoreTable */ 454);
/* harmony import */ var _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/nonograms.json */ 697);




customElements.define('game-menu', _gameMenu_GameMenu__WEBPACK_IMPORTED_MODULE_0__.GameMenu);
customElements.define('game-nonogram', _gameNonogram_GameNonogram__WEBPACK_IMPORTED_MODULE_1__.GameNonogram);
customElements.define('high-score-table', _highScoreTable_HighScoreTable__WEBPACK_IMPORTED_MODULE_2__.HighScoreTable);
class AppRouter {
  constructor(app) {
    this.app = app;
    this.routes = [{
      hash: 'templates',
      view: () => '<game-menu main-page="true"></game-menu>'
    }, {
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
          resolvedName = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_3__[0].name;
          resolvedSize = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_3__[0].size;
          resolvedLevel = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_3__[0].level;
        }
        return `
            <game-nonogram name="${resolvedName}" size="${resolvedSize}" level="${resolvedLevel}"  savedsolution="${savedSolution || ''}" crossed="${crossed || ''}" minutes="${minutes || '0'}" seconds="${seconds || '0'}">
            </game-nonogram>
          `;
      }
    }, {
      hash: 'high-score',
      view: () => '<high-score-table></high-score-table>'
    }];
  }
  changeHash(url) {
    this.url = url;
    window.location.hash = url;
  }
  showRoute() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const header = document.querySelector('game-header').shadowRoot;
    const burgerMenu = header.querySelector('game-menu.absolute');
    if (burgerMenu) {
      burgerMenu.classList.add('hidden');
    }
    const burgerBtn = header.querySelector('burger-btn').shadowRoot.querySelector('.burger-icon');
    burgerBtn.classList.remove('active');
    const newParams = [...params];
    if (params[0] === 'random') {
      const randomNum = Math.floor(Math.random() * _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_3__.length);
      const randomNonogram = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_3__[randomNum];
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
    <a href="templates" data-link>Nonograms</a>
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
/* harmony import */ var _highScoreBtn_HighScoreBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./highScoreBtn/HighScoreBtn */ 862);
/* harmony import */ var _themeBtn_ThemeBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./themeBtn/ThemeBtn */ 263);
/* harmony import */ var _muteBtn_MuteBtn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./muteBtn/MuteBtn */ 305);








customElements.define('random-btn', _randomBtn_RandonBtn__WEBPACK_IMPORTED_MODULE_2__.RandomBtn);
customElements.define('continue-btn', _continueBtn_ContinueBtn__WEBPACK_IMPORTED_MODULE_3__.ContinueBtn);
customElements.define('templates-btn', _templatesBtn_TemplatesBtn__WEBPACK_IMPORTED_MODULE_4__.TemplatesBtn);
customElements.define('high-score-btn', _highScoreBtn_HighScoreBtn__WEBPACK_IMPORTED_MODULE_5__.HighScoreBtn);
customElements.define('theme-btn', _themeBtn_ThemeBtn__WEBPACK_IMPORTED_MODULE_6__.ThemeBtn);
customElements.define('mute-btn', _muteBtn_MuteBtn__WEBPACK_IMPORTED_MODULE_7__.MuteBtn);
const levels = [...new Set(_resources_nonograms_json__WEBPACK_IMPORTED_MODULE_1__.map(item => item.level))];
let levelsHTML = levels.map(level => {
  const gameNames = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_1__.filter(item => item.level === level).map(item => `<a href="" class="menu__item" game-level="${item.level}" game-name="${item.name}" game-size="${item.size}" data-link>${item.name[0].toUpperCase() + item.name.slice(1)}</a>\n`).join('\n');
  return `
      <div class="level">
        <h3 class="level__title">${level[0].toUpperCase() + level.slice(1)}</h3>
        <div class="level__games">
          ${gameNames}
        </div>
      </div>
    `;
}).join('\n');
const template = document.createElement('template');
template.innerHTML = `
                      <div id="actions" class="actions">
                        <mute-btn></mute-btn>
                        <theme-btn></theme-btn>
                        <templates-btn></templates-btn>
                        <random-btn></random-btn>
                        <continue-btn></continue-btn>
                        <high-score-btn></high-score-btn>
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
    if (!this.isBurger && !this.inHeader) {
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
    btn.href = '';
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

/***/ 862:
/*!**************************************************************!*\
  !*** ./src/components/gameMenu/highScoreBtn/HighScoreBtn.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HighScoreBtn: () => (/* binding */ HighScoreBtn)
/* harmony export */ });
/* harmony import */ var _HighScoreBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HighScoreBtn.styles.scss */ 833);

class HighScoreBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    const btn = document.createElement('a');
    btn.href = 'high-score';
    btn.classList.add('button');
    btn.setAttribute('data-link', true);
    btn.innerText = 'Scores';
    shadowRoot.append(btn);
    const highScoreBtnStyles = document.createElement('style');
    highScoreBtnStyles.textContent = _HighScoreBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
    shadowRoot.append(highScoreBtnStyles);
  }
}


/***/ }),

/***/ 305:
/*!****************************************************!*\
  !*** ./src/components/gameMenu/muteBtn/MuteBtn.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MuteBtn: () => (/* binding */ MuteBtn)
/* harmony export */ });
/* harmony import */ var _MuteBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MuteBtn.styles.scss */ 31);

class MuteBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    const btn = document.createElement('a');
    this.btn = btn;
    btn.classList.add('button');
    shadowRoot.append(btn);
    const muteBtnStyles = document.createElement('style');
    muteBtnStyles.textContent = _MuteBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
    shadowRoot.append(muteBtnStyles);
    this.chooseImg();
    btn.onclick = () => {
      let isMuted = localStorage.getItem('muted');
      if (!isMuted) {
        isMuted = 'true';
      } else if (isMuted === 'true') {
        isMuted = 'false';
      } else {
        isMuted = 'true';
      }
      localStorage.setItem('muted', isMuted);
      this.chooseImg();
    };
  }
  chooseImg() {
    if (localStorage.getItem('muted') === 'true') {
      this.btn.innerHTML = `
      <svg width="34px" height="34px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9395 17.72C12.9395 19.5 15.3895 20.72 16.5495 20.33C18.6495 19.55 18.9995 15.3299 18.9995 12.4099C18.9995 11.5999 18.9995 10.68 18.8895 9.77002" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.1292 6.28008C18.0012 5.89129 17.795 5.53273 17.5233 5.22661C17.2516 4.9205 16.9201 4.67327 16.5493 4.50005C15.3193 4.04005 12.7093 5.49996 10.5493 7.40996H8.94922C7.88835 7.40996 6.87093 7.83145 6.12079 8.58159C5.37064 9.33174 4.94922 10.3491 4.94922 11.41V13.41C4.9489 14.1811 5.17151 14.936 5.59021 15.5835C6.00892 16.2311 6.60585 16.7438 7.3092 17.06" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 2.42004L2 22.42" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
    } else {
      this.btn.innerHTML = `
      <svg width="34px" height="34px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5493 4.50005C11.3193 4.04005 8.70926 5.49996 6.54926 7.40996H4.94922C3.88835 7.40996 2.87093 7.83145 2.12079 8.58159C1.37064 9.33174 0.949219 10.3491 0.949219 11.41V13.41C0.949219 14.4708 1.37064 15.4883 2.12079 16.2385C2.87093 16.9886 3.88835 17.41 4.94922 17.41H6.54926C8.65926 19.35 11.2693 20.78 12.5493 20.33C14.6493 19.55 14.9992 15.33 14.9992 12.41C14.9992 9.48996 14.6493 5.28005 12.5493 4.50005Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.6602 6.71997C22.1593 8.22011 23.0015 10.2542 23.0015 12.375C23.0015 14.4958 22.1593 16.5299 20.6602 18.03" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.5391 15.95C19.4764 15.0123 20.003 13.7407 20.003 12.4149C20.003 11.0891 19.4764 9.81764 18.5391 8.88" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
    }
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
    btn.href = '';
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
    btn.href = 'templates';
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

/***/ 263:
/*!******************************************************!*\
  !*** ./src/components/gameMenu/themeBtn/ThemeBtn.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeBtn: () => (/* binding */ ThemeBtn)
/* harmony export */ });
/* harmony import */ var _ThemeBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ThemeBtn.styles.scss */ 30);

class ThemeBtn extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    const btn = document.createElement('a');
    this.btn = btn;
    btn.classList.add('button');
    shadowRoot.append(btn);
    const themeBtnStyles = document.createElement('style');
    themeBtnStyles.textContent = _ThemeBtn_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
    shadowRoot.append(themeBtnStyles);
    const root = document.documentElement;
    this.chooseImg();
    btn.onclick = () => {
      root.classList.toggle('dark');
      this.chooseImg();
    };
  }
  chooseImg() {
    if (document.documentElement.classList.contains('dark')) {
      this.btn.innerHTML = `
      <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z" fill="#ffffff"/>
    </svg>
      `;
    } else {
      this.btn.innerHTML = `
      <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.28451 10.3333C7.10026 10.8546 7 11.4156 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C11.4156 7 10.8546 7.10026 10.3333 7.28451" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M12 2V4" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M12 20V22" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M4 12L2 12" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M22 12L20 12" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M19.7778 4.22266L17.5558 6.25424" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M4.22217 4.22266L6.44418 6.25424" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M6.44434 17.5557L4.22211 19.7779" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M19.7778 19.7773L17.5558 17.5551" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      `;
    }
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
    const size = this.getAttribute('size');
    const name = this.getAttribute('name');
    const savedSolution = this.getAttribute('savedsolution');
    const crossed = this.getAttribute('crossed');
    const timer = shadowRoot.querySelector('#game-timer');
    if (this.getAttribute('minutes') !== '0' || this.getAttribute('seconds') !== '0') {
      const savedMinutes = this.getAttribute('minutes');
      const savedSeconds = this.getAttribute('seconds');
      timer.setAttribute('minutes', savedMinutes);
      timer.setAttribute('seconds', savedSeconds);
      timer.continue = true;
    }
    shadowRoot.getElementById('summary').innerHTML = `
      <p class="summary__level">${level[0].toUpperCase() + level.slice(1)} (${size})</p> -
      <p class="summary__name"> ${name[0].toUpperCase() + name.slice(1)}</p>
    `;
    const nonogram = shadowRoot.querySelector('#nonogram');
    const field = document.createElement('game-field');
    field.id = 'game-field';
    field.classList.add('game-field');
    field.savedSolution = savedSolution;
    field.crossed = crossed;
    field.setAttribute('level', level);
    field.setAttribute('size', size);
    nonogram.append(field);
    const {
      matrix
    } = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_7__.find(item => item.name === name && item.size === size);
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
        if (counterLeft && !matrix[i][j] || counterLeft && j === matrix.length - 1 || j === matrix.length - 1 && leftHint.children.length === 0) {
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
        if (+minutes) {
          minutesStr = +minutes > 1 ? minutes + ' minutes ' : minutes + ' minute ';
        }
        const seconds = timer.getAttribute('seconds');
        let secondsStr = '';
        if (+seconds) {
          secondsStr = +seconds > 1 ? seconds + ' seconds' : seconds + ' second';
        }
        if (localStorage.getItem('muted') !== 'true') {
          new Audio(_assets_sound_effects_win_game_mp3__WEBPACK_IMPORTED_MODULE_8__).play();
        }
        const modal = document.createElement('result-modal');
        modal.classList.add('hidden');
        modal.message = `Great! You have solved the nonogram ${name[0].toUpperCase() + name.slice(1)} in ${minutesStr}${secondsStr}!`;
        shadowRoot.append(modal);
        setTimeout(() => {
          modal.classList.remove('hidden');
        }, 0);
        const savedResult = {
          name,
          level,
          size,
          time: timer.currentDuration,
          duration: +minutes * 60 + +seconds
        };
        let highScoreTable = JSON.parse(localStorage.getItem('highScoreTable'));
        if (!highScoreTable) highScoreTable = [];
        highScoreTable.unshift(savedResult);
        localStorage.setItem('highScoreTable', JSON.stringify(highScoreTable.slice(0, 5)));
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
        size,
        name,
        currentSolution: field.currentSolution,
        crossed: field.currentCrossed,
        time: {
          minutes: timer.minutes,
          seconds: timer.seconds
        }
      };
      localStorage.setItem('savedGame', JSON.stringify(game));
      const header = document.querySelector('game-header');
      const continueBtn = header.shadowRoot.querySelector('game-menu.header').shadowRoot.querySelector('continue-btn');
      const inner = continueBtn.shadowRoot.querySelector('.button');
      inner.classList.remove('disabled');
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
    this.size = this.getAttribute('size').split('x')[0];
    this.field = document.createElement('div');
    this.field.id = 'field';
    for (let i = 0; i < this.size; i += 1) {
      let row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < this.size; j += 1) {
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
      if (localStorage.getItem('muted') !== 'true') {
        if (e.target.classList.contains('filled')) {
          new Audio(_assets_sound_effects_fill_cell_mp3__WEBPACK_IMPORTED_MODULE_1__).play();
        } else {
          new Audio(_assets_sound_effects_clear_cell_mp3__WEBPACK_IMPORTED_MODULE_2__).play();
        }
      }
      this.checkSolution();
    });
    this.field.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.target.classList.remove('filled');
      e.target.classList.toggle('crossed');
      if (localStorage.getItem('muted') !== 'true') {
        if (e.target.classList.contains('crossed')) {
          new Audio(_assets_sound_effects_cross_cell_mp3__WEBPACK_IMPORTED_MODULE_3__).play();
        } else {
          new Audio(_assets_sound_effects_clear_cell_mp3__WEBPACK_IMPORTED_MODULE_2__).play();
        }
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
      wrapper.addEventListener('transitionend', () => wrapper.remove());
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

/***/ 454:
/*!*********************************************************!*\
  !*** ./src/components/highScoreTable/HighScoreTable.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HighScoreTable: () => (/* binding */ HighScoreTable)
/* harmony export */ });
/* harmony import */ var _HighScoreTable_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HighScoreTable.styles.scss */ 216);

class HighScoreTable extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    const template = document.createElement('template');
    let results = JSON.parse(localStorage.getItem('highScoreTable'));
    if (results) {
      results = results.slice(0, 5);
      results.sort((a, b) => a.duration - b.duration);
      results = results.map((result, i) => `  <tr class="high-scores__score">
                        <td>${i + 1}.</td>
                        <td>${result.time}</td>
                        <td>${result.level[0].toUpperCase() + result.level.slice(1)}</td>
                        <td>${result.size}</td>
                        <td>${result.name[0].toUpperCase() + result.name.slice(1)}</td>
                      </tr>
                    `);
    }
    template.innerHTML = `
    <div class="high-scores">
      <h2>Latest 5 scores:</h2>
      <table class="high-scores__scores">
        ${results ? `
        <tr class="high-scores__score header">
        <th>No</th>
        <th>Time</th>
        <th>Level</th>
        <th>Size</th>
        <th>Game name</th>
        </tr>
        ` : ''} 
        ${results ? results.join('\n') : '<tr><td colspan="4">No scores yet.</td></tr>'}
      </table>
    </div>
`;
    shadowRoot.append(template.content.cloneNode(true));
    const highScoreStyles = document.createElement('style');
    highScoreStyles.textContent = _HighScoreTable_styles_scss__WEBPACK_IMPORTED_MODULE_0__["default"];
    shadowRoot.append(highScoreStyles);
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.burger-icon{display:none;width:44px;height:44px}@media(max-width: 768px){.burger-icon{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}}.burger-icon:hover{cursor:pointer}.burger-icon.active .burger-icon__stroke:nth-child(1){transform:translateY(5px) rotate(45deg)}.burger-icon.active .burger-icon__stroke:nth-child(2){transform:translateY(-5px) rotate(-45deg)}.burger-icon__stroke{width:24px;height:2px;background-color:var(--color-text-light);border-radius:2px;transition:.3s}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}*{box-sizing:border-box}html{scroll-behavior:smooth}body{background-color:var(--color-background);user-select:none}body.scroll-disabled{height:100%;overflow:hidden}.wrapper{max-width:1440px;padding:0 40px;margin:0 auto}@media(max-width: 576px){.wrapper{padding:0 4.21052%}}.section{margin-bottom:100px}img{max-width:100%}.transparent{opacity:0}:host{display:block}:host{margin-bottom:20px;display:flex;background:var(--color-accent)}:host *{color:var(--color-text-light)}a{display:block;padding:10px;text-decoration:none;text-transform:uppercase;font-weight:600}game-menu{display:flex;transition:.3s}@media(max-width: 768px){game-menu.header{display:none}}game-menu.hidden{visibility:hidden;opacity:0}game-menu.absolute{position:absolute;top:76px;left:0;right:0;padding:0 16px 20px 16px;flex-direction:column;background-color:var(--color-accent)}.wrapper{padding:16px;width:100%;display:flex;justify-content:space-between;align-items:center}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.actions{display:flex;align-items:center;gap:20px}.level__games{display:flex;flex-wrap:wrap;gap:10px}.menu__item{padding:8px 12px;border:1px solid var(--color-text-main);border-radius:10px;background-color:var(--color-accent-secondary-2-transparent);color:var(--color-text-main);text-decoration:none;transition:.3s}.menu__item:hover{cursor:pointer;background-color:var(--color-accent-secondary-1-transparent)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}@media(max-width: 450px){.button{padding:6px 10px;font-size:1.6rem}}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:var(--color-accent-secondary-2)}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 833:
/*!***********************************************************************!*\
  !*** ./src/components/gameMenu/highScoreBtn/HighScoreBtn.styles.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}@media(max-width: 450px){.button{padding:6px 10px;font-size:1.6rem}}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:var(--color-accent-secondary-4)}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 31:
/*!*************************************************************!*\
  !*** ./src/components/gameMenu/muteBtn/MuteBtn.styles.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `.button{display:flex;align-items:center;justify-content:center;transition:.3s}.button:hover{cursor:pointer;filter:brightness(0.9)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}@media(max-width: 450px){.button{padding:6px 10px;font-size:1.6rem}}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}@media(max-width: 450px){.button{padding:6px 10px;font-size:1.6rem}}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:var(--color-accent-secondary-3)}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 30:
/*!***************************************************************!*\
  !*** ./src/components/gameMenu/themeBtn/ThemeBtn.styles.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `.button{display:flex;align-items:center;justify-content:center;transition:.3s}.button:hover{cursor:pointer;filter:brightness(0.9)}`;
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

        const styles = `/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}p{margin:0}a{display:block;background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}ul{margin:0;padding:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{display:block;border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button{outline:none;border:none}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}:host *{box-sizing:border-box}.actions{margin-bottom:20px;width:100%;display:flex;justify-content:space-between;align-items:center}.nonogram{width:40%;display:grid;grid-template-columns:auto 1fr 1fr;grid-template-areas:"a b b" "c d d" "c d d"}.nonogram__container{min-height:100%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:flex-start}.nonogram__wrapper{width:100%;flex-grow:1;display:flex;justify-content:center;align-items:center}@media(max-width: 1200px){.nonogram{width:50%}}@media(orientation: portrait){.nonogram{width:100%}}@media(max-width: 768px){.nonogram{font-size:min(var(--cell-size)*.8,2rem)}}.summary{padding:10px;grid-area:a;display:flex;justify-content:center;gap:16px;text-align:center}.top-pane{grid-area:b;width:fit-content;display:flex;border-top:1px #000 solid;border-right:1px #000 solid;border-left:1px #000 solid;background-color:rgba(0,0,0,.1215686275)}.top-pane__hint{width:var(--cell-size);display:flex;flex-direction:column;justify-content:flex-end;border-top:1px #000 solid;border-right:1px #000 solid;border-left:1px #000 solid}.top-pane__hint:nth-child(5n):not(:last-child){border-right:2px #000 solid}.top-pane__number{height:var(--cell-size);display:flex;justify-content:center;align-items:center}.left-pane{width:100%;grid-area:c;border-top:1px #000 solid;border-bottom:1px #000 solid;border-left:1px #000 solid;background-color:rgba(0,0,0,.1215686275)}.left-pane__hint{height:var(--cell-size);display:flex;justify-content:flex-end;border-top:1px #000 solid;border-bottom:1px #000 solid;border-left:1px #000 solid}.left-pane__hint:nth-child(5n):not(:last-child){border-bottom:2px #000 solid}.left-pane__number{width:var(--cell-size);display:flex;justify-content:center;align-items:center}game-field{grid-area:d}result-modal{transition:.3s}result-modal.hidden{opacity:0;visibility:hidden}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}p{margin:0}a{display:block;background-color:rgba(0,0,0,0);text-decoration:none;color:inherit}ul{margin:0;padding:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{display:block;border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button{outline:none;border:none}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:host{width:fit-content;display:flex;flex-direction:column;border:1px #000 solid;background-color:rgba(255,255,255,.8352941176)}:host *{box-sizing:border-box}.row{display:flex;height:var(--cell-size)}.row:nth-child(5n):not(:last-child){border-bottom:2px #000 solid}.cell{width:var(--cell-size);height:var(--cell-size);border:1px #000 solid;transition:.2s}.cell:nth-child(5n):not(:last-child){border-right:2px #000 solid}.cell.filled{background-color:#000}.cell.crossed{position:relative}.cell.crossed::before{content:"";position:absolute;top:50%;left:50%;width:calc(var(--cell-size)*.9);height:3px;background-color:#000;transform:translate(-50%, -50%) rotate(45deg)}.cell.crossed::after{content:"";position:absolute;top:50%;left:50%;width:calc(var(--cell-size)*.9);height:3px;background-color:#000;transform:translate(-50%, -50%) rotate(-45deg)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}@media(max-width: 450px){.button{padding:6px 10px;font-size:1.6rem}}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.modal{position:relative;padding:40px;border-radius:20px;background-color:var(--color-background)}.modal__wrapper{position:fixed;z-index:100;top:0;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:center;background-color:rgba(0,0,0,.2470588235);transition:.3s}.modal__wrapper.hidden{visibility:hidden;opacity:0}.modal__close{position:absolute;top:5px;right:5px;width:34px;height:34px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}.modal__close:hover{cursor:pointer}.modal__close-stroke{width:24px;height:2px;background-color:var(--color-text-main);border-radius:2px;transition:.3s}.modal__close-stroke:nth-child(1){transform:translateY(5px) rotate(45deg)}.modal__close-stroke:nth-child(2){transform:translateY(-5px) rotate(-45deg)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}@media(max-width: 450px){.button{padding:6px 10px;font-size:1.6rem}}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:var(--color-accent-secondary-3)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}@media(max-width: 450px){.button{padding:6px 10px;font-size:1.6rem}}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:var(--color-accent-secondary-2)}`;
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
    

/***/ }),

/***/ 216:
/*!******************************************************************!*\
  !*** ./src/components/highScoreTable/HighScoreTable.styles.scss ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.high-scores__scores{border-collapse:collapse;border-radius:10px}.high-scores__score th{background-color:var(--color-accent-secondary-1);color:var(--color-text-reverse);font-weight:500}.high-scores__score th,.high-scores__score td{padding:10px;text-align:center;border:1px solid var(--color-text-main)}`;
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

module.exports = /*#__PURE__*/JSON.parse('[{"size":"5x5","level":"easy","name":"android","matrix":[[0,1,1,1,0],[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1]],"picture":"./"},{"size":"5x5","level":"easy","name":"flower","matrix":[[0,1,1,1,0],[1,0,1,0,1],[1,1,0,1,1],[1,0,1,0,1],[0,1,1,1,0]],"picture":"./"},{"size":"5x5","level":"easy","name":"rune","matrix":[[0,1,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,0,0]],"picture":"./"},{"size":"5x5","level":"easy","name":"smile","matrix":[[1,1,0,1,1],[1,1,0,1,1],[0,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],"picture":"./"},{"size":"5x5","level":"easy","name":"tower","matrix":[[1,0,1,0,1],[1,1,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,1,1,0]],"picture":"./"},{"size":"5x5","level":"easy","name":"airplane","matrix":[[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,0,1,0,0],[0,1,1,1,0]],"picture":"./"},{"size":"5x5","level":"easy","name":"car","matrix":[[0,0,0,0,0],[0,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,0,1,0]],"picture":"./"},{"size":"5x5","level":"easy","name":"dog","matrix":[[0,0,0,1,0],[1,0,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,0,1,0]],"picture":"./"},{"size":"10x10","level":"medium","name":"mouse","matrix":[[0,0,1,1,0,0,0,1,1,0],[0,1,0,0,1,0,1,0,0,1],[0,1,0,1,1,1,1,1,0,1],[0,0,1,1,0,1,0,1,1,0],[0,0,0,1,1,1,1,1,0,0],[0,0,1,1,1,0,1,1,1,0],[1,0,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0]],"picture":"./"},{"size":"10x10","level":"medium","name":"alarm","matrix":[[0,1,1,0,0,0,0,1,1,0],[1,1,0,1,1,1,1,0,1,1],[1,0,1,1,1,0,1,1,0,1],[0,1,1,1,1,0,1,1,1,0],[0,1,1,1,1,0,1,1,1,0],[0,1,1,1,0,1,1,1,1,0],[0,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,0,0,1,1,0,0]],"picture":"./"},{"size":"10x10","level":"medium","name":"cup of coffee","matrix":[[0,0,1,0,1,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,0,0],[0,1,1,0,1,1,1,1,1,1],[0,1,1,0,1,1,1,1,0,1],[0,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,0,0],[1,0,1,1,1,1,1,0,0,1],[0,1,1,1,1,1,1,1,1,0]],"picture":"./"},{"size":"10x10","level":"medium","name":"leaf","matrix":[[0,0,0,0,1,1,1,1,1,1],[0,0,0,1,0,1,0,1,0,1],[0,0,1,1,0,1,0,1,1,0],[0,1,0,1,0,1,1,0,1,0],[0,1,0,1,0,1,1,1,1,0],[0,1,0,1,1,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,0,0,0,0,1,0,0],[0,1,0,1,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0]],"picture":"./"},{"size":"10x10","level":"medium","name":"TV","matrix":[[0,0,1,0,0,0,0,1,0,0],[0,0,0,1,0,0,1,0,0,0],[1,1,1,1,1,1,1,1,1,1],[1,0,1,1,0,0,0,0,1,1],[1,1,1,0,0,0,0,0,0,1],[1,0,1,0,0,0,0,0,0,1],[1,1,1,0,0,0,0,0,0,1],[1,1,1,1,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,0,0,0,0,0,0,1,0]],"picture":"./"},{"size":"10x10","level":"medium","name":"tree","matrix":[[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,0,1,1,1,0],[1,1,1,1,1,0,1,1,1,1],[1,1,0,1,1,1,0,0,1,1],[1,1,1,0,1,1,1,1,1,0],[0,1,1,1,1,1,0,0,0,0],[0,0,0,0,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,1,0,0,1,1,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"size":"10x10","level":"medium","name":"question","matrix":[[0,0,1,1,1,1,1,1,0,0],[0,1,1,0,0,0,0,1,1,0],[0,1,1,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,1,1,0],[0,0,0,0,0,0,1,1,1,0],[0,0,0,0,1,1,1,1,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0]],"picture":"./"},{"size":"10x10","level":"medium","name":"hot air balloon","matrix":[[1,1,1,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,1,0,1],[1,1,0,0,0,0,0,1,0,1],[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,0,1,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"size":"15x15","level":"hard","name":"deer","matrix":[[1,1,0,1,1,0,0,0,0,0,0,1,1,0,1],[1,1,0,1,1,0,1,0,0,1,0,1,1,0,1],[0,1,1,1,1,0,1,0,0,1,0,1,1,0,1],[0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],[0,0,0,0,1,1,0,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],[0,0,0,0,0,1,0,1,0,1,1,1,1,1,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1],[0,1,0,1,1,1,0,0,0,0,1,1,1,1,1],[0,1,1,1,1,1,0,0,0,0,1,1,1,1,1],[0,0,1,1,1,0,0,0,0,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1]],"picture":"./"},{"size":"15x15","level":"hard","name":"flower","matrix":[[0,0,0,1,1,0,1,1,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,1,1,1,1,1,0,0,0],[0,1,1,1,0,0,0,0,1,0,0,1,1,0,0],[1,1,0,0,1,1,1,0,0,0,0,0,1,0,0],[1,0,0,0,0,1,1,0,1,0,0,1,1,0,0],[1,1,1,0,1,0,0,0,0,1,1,1,0,0,0],[0,1,1,1,0,0,1,0,0,0,1,0,0,0,0],[0,0,1,0,0,1,1,1,0,0,1,0,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,0,0,1,0],[1,1,0,0,1,1,0,1,1,0,0,0,0,0,1],[1,1,1,0,0,1,0,1,0,0,1,1,1,1,1],[1,0,1,0,0,1,1,1,0,1,1,1,1,1,1],[0,1,1,1,0,0,1,0,0,1,1,1,0,1,1],[0,0,1,1,1,1,1,0,1,1,1,0,1,1,0],[0,0,0,0,0,1,1,1,0,0,1,1,1,0,0]],"picture":"./"},{"size":"15x15","level":"hard","name":"alarm","matrix":[[0,0,1,1,1,0,0,0,0,0,1,1,1,0,0],[0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],[1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],[1,1,0,1,1,1,1,0,1,1,1,1,0,1,1],[1,0,1,1,1,1,1,1,1,1,0,1,1,0,1],[0,0,1,1,1,1,1,1,1,0,1,1,1,0,0],[0,1,1,1,1,1,1,1,0,1,1,1,1,1,0],[0,1,0,0,1,0,0,0,1,1,1,0,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,1,1,1,1,0,0,0],[0,0,1,0,0,1,1,1,1,1,0,0,1,0,0],[0,1,0,0,1,0,1,1,1,0,1,0,0,1,0],[0,0,1,1,0,0,0,0,0,0,0,1,1,0,0]],"picture":"./"},{"size":"15x15","level":"hard","name":"castle","matrix":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],[1,1,0,1,1,0,1,0,0,0,1,1,0,1,1],[1,1,1,1,1,0,1,0,0,0,1,1,1,1,1],[1,0,0,0,1,0,1,0,0,0,1,0,0,0,1],[1,0,1,0,1,0,1,0,0,0,1,0,1,0,1],[1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,0,0,0,1,0,0,1],[1,0,1,1,1,0,0,1,0,0,1,1,1,0,1],[1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],[1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],[1,0,0,0,0,0,1,1,1,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"size":"15x15","level":"hard","name":"dolphin","matrix":[[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,1,1,0,1,1,1,1],[1,1,1,0,0,0,0,1,1,0,0,0,1,1,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,1,0,0,0,0,0,1,1,0,1,0,1,0,1],[0,0,0,1,1,0,1,1,0,1,0,1,1,0,0],[0,0,1,0,0,1,1,0,1,1,0,1,1,1,0],[1,1,1,0,1,1,1,0,1,1,1,0,1,1,1]],"picture":"./"},{"size":"15x15","level":"hard","name":"duck","matrix":[[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,1,1,1,1,0,1,1,1],[0,0,0,0,0,0,0,1,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],[1,0,0,0,0,0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,1,1,1,0,0,0,1,1,1,0],[1,1,1,1,1,1,1,0,1,1,1,0,1,1,0],[0,1,1,1,1,1,0,1,1,1,1,0,1,1,0],[0,1,1,1,1,1,1,1,1,0,0,1,1,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,1,1,1,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,1,1,1,0,0,0]],"picture":"./"},{"size":"15x15","level":"hard","name":"clover","matrix":[[0,0,0,0,0,1,1,0,1,1,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,1,1,1,0,1,1,1,1,1,0,1,1,1,0],[1,1,1,1,1,0,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],[0,1,1,1,1,1,1,0,1,1,1,1,1,1,0],[1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],[1,1,1,1,1,0,0,1,0,0,1,1,1,1,1],[0,1,1,1,0,0,0,1,0,0,0,1,1,1,0],[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0,0,0,0,0,0]],"picture":"./"}]');

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
      if (deepestEl.getAttribute('href') === '') {
        if (deepestEl.getAttribute('game-name')) {
          params.push(deepestEl.getAttribute('game-name'));
        }
        if (deepestEl.getAttribute('game-size')) {
          params.push(deepestEl.getAttribute('game-size'));
        }
        if (deepestEl.getAttribute('game-level')) {
          params.push(deepestEl.getAttribute('game-level'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sR0FBRyxFQUFFO01BQ2YsSUFBSXNPLFNBQVMsQ0FBQzlKLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDekMsSUFBSThKLFNBQVMsQ0FBQzlKLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTtVQUN2Q3hFLE1BQU0sQ0FBQ3lPLElBQUksQ0FBQ0gsU0FBUyxDQUFDOUosWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xEO1FBQ0EsSUFBSThKLFNBQVMsQ0FBQzlKLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTtVQUN2Q3hFLE1BQU0sQ0FBQ3lPLElBQUksQ0FBQ0gsU0FBUyxDQUFDOUosWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xEO1FBQ0EsSUFBSThKLFNBQVMsQ0FBQzlKLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRTtVQUN4Q3hFLE1BQU0sQ0FBQ3lPLElBQUksQ0FBQ0gsU0FBUyxDQUFDOUosWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25EO01BQ0Y7TUFFQSxJQUFJOEosU0FBUyxDQUFDRSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakN4TyxNQUFNLENBQUN5TyxJQUFJLENBQUMsUUFBUSxDQUFDO01BQ3ZCO01BRUEsSUFBSUgsU0FBUyxDQUFDRSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDbkN4TyxNQUFNLENBQUN5TyxJQUFJLENBQUMsVUFBVSxDQUFDO01BQ3pCO01BRUFKLE1BQU0sQ0FBQ3RPLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDO0lBQzFCO0VBQ0YsQ0FBQyxDQUFDO0VBRUZILE1BQU0sQ0FBQzZPLFVBQVUsR0FBRyxNQUFNO0lBQ3hCTCxNQUFNLENBQUN0TyxTQUFTLENBQUMsQ0FBQztFQUNwQixDQUFDO0VBRURzTyxNQUFNLENBQUN0TyxTQUFTLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2FwcC1yb3V0ZXIvQXBwUm91dGVyLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2J1cmdlck1lbnUvQnVyZ2VyTWVudUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lSGVhZGVyL0dhbWVIZWFkZXIuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvR2FtZU1lbnUuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvY29udGludWVCdG4vQ29udGludWVCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvaGlnaFNjb3JlQnRuL0hpZ2hTY29yZUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9tdXRlQnRuL011dGVCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvcmFuZG9tQnRuL1JhbmRvbkJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS90ZW1wbGF0ZXNCdG4vVGVtcGxhdGVzQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L3RoZW1lQnRuL1RoZW1lQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9HYW1lTm9ub2dyYW0uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL2dhbWVGaWVsZC9HYW1lRmllbGQuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL2dhbWVUaW1lci9HYW1lVGltZXIuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3Jlc3RhcnRCdG4vUmVzdGFydEJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vcmVzdWx0TW9kYWwvUmVzdWx0TW9kYWwuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NhdmVCdG4vU2F2ZUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vc29sdXRpb25CdG4vU29sdXRpb25CdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvaGlnaFNjb3JlVGFibGUvSGlnaFNjb3JlVGFibGUuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/ZmM3NyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2Fic3RyYWN0L192YXJpYWJsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9idXJnZXJNZW51L0J1cmdlck1lbnVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9hYnN0cmFjdC9fbWl4aW5zLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9sYXlvdXQvX2Jhc2ljLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZUhlYWRlci9HYW1lSGVhZGVyLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L0dhbWVNZW51LnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvY29tcG9uZW50cy9fYnV0dG9uLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvY29udGludWVCdG4vQ29udGludWVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvaGlnaFNjb3JlQnRuL0hpZ2hTY29yZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9tdXRlQnRuL011dGVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvdGVtcGxhdGVzQnRuL1RlbXBsYXRlc0J0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS90aGVtZUJ0bi9UaGVtZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2Jhc2UvX25vcm1hbGl6ZS5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9HYW1lTm9ub2dyYW0uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL2dhbWVGaWVsZC9HYW1lRmllbGQuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3Jlc3VsdE1vZGFsL1Jlc3VsdE1vZGFsLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zYXZlQnRuL1NhdmVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NvbHV0aW9uQnRuL1NvbHV0aW9uQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2hpZ2hTY29yZVRhYmxlL0hpZ2hTY29yZVRhYmxlLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNZW51IH0gZnJvbSAnLi4vZ2FtZU1lbnUvR2FtZU1lbnUnO1xuaW1wb3J0IHsgR2FtZU5vbm9ncmFtIH0gZnJvbSAnLi4vZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbSc7XG5pbXBvcnQgeyBIaWdoU2NvcmVUYWJsZSB9IGZyb20gJy4uL2hpZ2hTY29yZVRhYmxlL0hpZ2hTY29yZVRhYmxlJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLW1lbnUnLCBHYW1lTWVudSk7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtbm9ub2dyYW0nLCBHYW1lTm9ub2dyYW0pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdoaWdoLXNjb3JlLXRhYmxlJywgSGlnaFNjb3JlVGFibGUpO1xuXG5jbGFzcyBBcHBSb3V0ZXIge1xuICBjb25zdHJ1Y3RvcihhcHApIHtcbiAgICB0aGlzLmFwcCA9IGFwcDtcblxuICAgIHRoaXMucm91dGVzID0gW1xuICAgICAge1xuICAgICAgICBoYXNoOiAndGVtcGxhdGVzJyxcbiAgICAgICAgdmlldzogKCkgPT4gJzxnYW1lLW1lbnUgbWFpbi1wYWdlPVwidHJ1ZVwiPjwvZ2FtZS1tZW51PicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBoYXNoOiAnJyxcbiAgICAgICAgdmlldzogKG5hbWUsIHNpemUsIGxldmVsLCBzYXZlZFNvbHV0aW9uLCBjcm9zc2VkLCBtaW51dGVzLCBzZWNvbmRzKSA9PiB7XG4gICAgICAgICAgbGV0IHJlc29sdmVkTmFtZTtcbiAgICAgICAgICBsZXQgcmVzb2x2ZWRTaXplO1xuICAgICAgICAgIGxldCByZXNvbHZlZExldmVsO1xuXG4gICAgICAgICAgaWYgKG5hbWUgJiYgc2l6ZSAmJiBsZXZlbCkge1xuICAgICAgICAgICAgcmVzb2x2ZWROYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHJlc29sdmVkU2l6ZSA9IHNpemU7XG4gICAgICAgICAgICByZXNvbHZlZExldmVsID0gbGV2ZWw7XG5cbiAgICAgICAgICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLW5hbWUnLCBuYW1lKTtcbiAgICAgICAgICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLXNpemUnLCBzaXplKTtcbiAgICAgICAgICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLWxldmVsJywgbGV2ZWwpO1xuICAgICAgICAgICAgLy8gfSBlbHNlIGlmIChcbiAgICAgICAgICAgIC8vICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUtbmFtZScpICYmXG4gICAgICAgICAgICAvLyAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLXNpemUnKSAmJlxuICAgICAgICAgICAgLy8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUtbGV2ZWwnKVxuICAgICAgICAgICAgLy8gKSB7XG4gICAgICAgICAgICAvLyAgIHJlc29sdmVkTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLW5hbWUnKTtcbiAgICAgICAgICAgIC8vICAgcmVzb2x2ZWRTaXplID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUtc2l6ZScpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlZE5hbWUgPSBub25vZ3JhbXNbMF0ubmFtZTtcbiAgICAgICAgICAgIHJlc29sdmVkU2l6ZSA9IG5vbm9ncmFtc1swXS5zaXplO1xuICAgICAgICAgICAgcmVzb2x2ZWRMZXZlbCA9IG5vbm9ncmFtc1swXS5sZXZlbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGdhbWUtbm9ub2dyYW0gbmFtZT1cIiR7cmVzb2x2ZWROYW1lfVwiIHNpemU9XCIke3Jlc29sdmVkU2l6ZX1cIiBsZXZlbD1cIiR7cmVzb2x2ZWRMZXZlbH1cIiAgc2F2ZWRzb2x1dGlvbj1cIiR7c2F2ZWRTb2x1dGlvbiB8fCAnJ31cIiBjcm9zc2VkPVwiJHtjcm9zc2VkIHx8ICcnfVwiIG1pbnV0ZXM9XCIke21pbnV0ZXMgfHwgJzAnfVwiIHNlY29uZHM9XCIke3NlY29uZHMgfHwgJzAnfVwiPlxuICAgICAgICAgICAgPC9nYW1lLW5vbm9ncmFtPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBoYXNoOiAnaGlnaC1zY29yZScsXG4gICAgICAgIHZpZXc6ICgpID0+ICc8aGlnaC1zY29yZS10YWJsZT48L2hpZ2gtc2NvcmUtdGFibGU+JyxcbiAgICAgIH0sXG4gICAgXTtcbiAgfVxuXG4gIGNoYW5nZUhhc2godXJsKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB1cmw7XG4gIH1cblxuICBzaG93Um91dGUocGFyYW1zID0gW10pIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdnYW1lLWhlYWRlcicpLnNoYWRvd1Jvb3Q7XG4gICAgY29uc3QgYnVyZ2VyTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdnYW1lLW1lbnUuYWJzb2x1dGUnKTtcbiAgICBpZiAoYnVyZ2VyTWVudSkge1xuICAgICAgYnVyZ2VyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBidXJnZXJCdG4gPSBoZWFkZXJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCdidXJnZXItYnRuJylcbiAgICAgIC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXItaWNvbicpO1xuICAgIGJ1cmdlckJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgIGNvbnN0IG5ld1BhcmFtcyA9IFsuLi5wYXJhbXNdO1xuXG4gICAgaWYgKHBhcmFtc1swXSA9PT0gJ3JhbmRvbScpIHtcbiAgICAgIGNvbnN0IHJhbmRvbU51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5vbm9ncmFtcy5sZW5ndGgpO1xuICAgICAgY29uc3QgcmFuZG9tTm9ub2dyYW0gPSBub25vZ3JhbXNbcmFuZG9tTnVtXTtcblxuICAgICAgbmV3UGFyYW1zWzBdID0gcmFuZG9tTm9ub2dyYW0ubmFtZTtcbiAgICAgIG5ld1BhcmFtc1sxXSA9IHJhbmRvbU5vbm9ncmFtLnNpemU7XG4gICAgICBuZXdQYXJhbXNbMl0gPSByYW5kb21Ob25vZ3JhbS5sZXZlbDtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zWzBdID09PSAnY29udGludWUnKSB7XG4gICAgICBjb25zdCBzYXZlZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkR2FtZScpKTtcblxuICAgICAgbmV3UGFyYW1zWzBdID0gc2F2ZWQubmFtZTtcbiAgICAgIG5ld1BhcmFtc1sxXSA9IHNhdmVkLnNpemU7XG4gICAgICBuZXdQYXJhbXNbMl0gPSBzYXZlZC5sZXZlbDtcbiAgICAgIG5ld1BhcmFtc1szXSA9IHNhdmVkLmN1cnJlbnRTb2x1dGlvbjtcbiAgICAgIG5ld1BhcmFtc1s0XSA9IHNhdmVkLmNyb3NzZWQ7XG4gICAgICBuZXdQYXJhbXNbNV0gPSBzYXZlZC50aW1lLm1pbnV0ZXM7XG4gICAgICBuZXdQYXJhbXNbNl0gPSBzYXZlZC50aW1lLnNlY29uZHM7XG4gICAgfVxuXG4gICAgbGV0IG1hdGNoID0gdGhpcy5yb3V0ZXMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLmhhc2ggPT09IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpXG4gICAgKTtcblxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIG1hdGNoID0gdGhpcy5yb3V0ZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5oYXNoID09PSAnJyk7XG4gICAgfVxuXG4gICAgdGhpcy5hcHAuaW5uZXJIVE1MID0gbWF0Y2gudmlldyguLi5uZXdQYXJhbXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEFwcFJvdXRlciB9O1xuIiwiaW1wb3J0IGJ1cmdlck1lbnVTdHlsZXNTdHIgZnJvbSAnLi9CdXJnZXJNZW51QnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgQnVyZ2VyTWVudUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ1cmdlckJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgYnVyZ2VyQnRuU3R5bGVzLnRleHRDb250ZW50ID0gYnVyZ2VyTWVudVN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChidXJnZXJCdG5TdHlsZXMpO1xuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1cmdlci1pY29uJyk7XG4gICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXJnZXItaWNvbl9fc3Ryb2tlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnVyZ2VyLWljb25fX3N0cm9rZVwiPjwvZGl2PlxuICAgIGA7XG5cbiAgICBjb25zdCBnYW1lTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dhbWUtbWVudScpO1xuICAgIGdhbWVNZW51LmlzQnVyZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLmFmdGVyKGdhbWVNZW51KTtcbiAgICBnYW1lTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBnYW1lTWVudS5jbGFzc0xpc3QuYWRkKCdhYnNvbHV0ZScpO1xuXG4gICAgYnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICBnYW1lTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9O1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcbiAgfVxufVxuXG5leHBvcnQgeyBCdXJnZXJNZW51QnRuIH07XG4iLCJpbXBvcnQgaGVhZGVyU3R5bGVzU3RyIGZyb20gJy4vR2FtZUhlYWRlci5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgeyBCdXJnZXJNZW51QnRuIH0gZnJvbSAnLi4vYnVyZ2VyTWVudS9CdXJnZXJNZW51QnRuJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdidXJnZXItYnRuJywgQnVyZ2VyTWVudUJ0bik7XG5cbmNvbnN0IGhlYWRlclN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5oZWFkZXJTdHlsZXMudGV4dENvbnRlbnQgPSBoZWFkZXJTdHlsZXNTdHI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPGRpdiBpZD1cIndyYXBwZXJcIiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICA8YSBocmVmPVwidGVtcGxhdGVzXCIgZGF0YS1saW5rPk5vbm9ncmFtczwvYT5cbiAgICA8YnVyZ2VyLWJ0bj48L2J1cmdlci1idG4+XG4gIDwvZGl2PiAgXG5gO1xuY2xhc3MgR2FtZUhlYWRlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGhlYWRlclN0eWxlcyk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgY29uc3QgZ2FtZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdnYW1lLW1lbnUnKTtcbiAgICBnYW1lTWVudS5pbkhlYWRlciA9IHRydWU7XG4gICAgZ2FtZU1lbnUuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJyk7XG4gICAgc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpLmFwcGVuZChnYW1lTWVudSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZUhlYWRlciB9O1xuIiwiaW1wb3J0IG1lbnVTdHlsZVN0ciBmcm9tICcuL0dhbWVNZW51LnN0eWxlcy5zY3NzJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcbmltcG9ydCB7IFJhbmRvbUJ0biB9IGZyb20gJy4vcmFuZG9tQnRuL1JhbmRvbkJ0bic7XG5pbXBvcnQgeyBDb250aW51ZUJ0biB9IGZyb20gJy4vY29udGludWVCdG4vQ29udGludWVCdG4nO1xuaW1wb3J0IHsgVGVtcGxhdGVzQnRuIH0gZnJvbSAnLi90ZW1wbGF0ZXNCdG4vVGVtcGxhdGVzQnRuJztcbmltcG9ydCB7IEhpZ2hTY29yZUJ0biB9IGZyb20gJy4vaGlnaFNjb3JlQnRuL0hpZ2hTY29yZUJ0bic7XG5pbXBvcnQgeyBUaGVtZUJ0biB9IGZyb20gJy4vdGhlbWVCdG4vVGhlbWVCdG4nO1xuaW1wb3J0IHsgTXV0ZUJ0biB9IGZyb20gJy4vbXV0ZUJ0bi9NdXRlQnRuJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyYW5kb20tYnRuJywgUmFuZG9tQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29udGludWUtYnRuJywgQ29udGludWVCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0ZW1wbGF0ZXMtYnRuJywgVGVtcGxhdGVzQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaGlnaC1zY29yZS1idG4nLCBIaWdoU2NvcmVCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0aGVtZS1idG4nLCBUaGVtZUJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ211dGUtYnRuJywgTXV0ZUJ0bik7XG5cbmNvbnN0IGxldmVscyA9IFsuLi5uZXcgU2V0KG5vbm9ncmFtcy5tYXAoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwpKV07XG5cbmxldCBsZXZlbHNIVE1MID0gbGV2ZWxzXG4gIC5tYXAoKGxldmVsKSA9PiB7XG4gICAgY29uc3QgZ2FtZU5hbWVzID0gbm9ub2dyYW1zXG4gICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSBsZXZlbClcbiAgICAgIC5tYXAoXG4gICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgIGA8YSBocmVmPVwiXCIgY2xhc3M9XCJtZW51X19pdGVtXCIgZ2FtZS1sZXZlbD1cIiR7aXRlbS5sZXZlbH1cIiBnYW1lLW5hbWU9XCIke2l0ZW0ubmFtZX1cIiBnYW1lLXNpemU9XCIke2l0ZW0uc2l6ZX1cIiBkYXRhLWxpbms+JHtpdGVtLm5hbWVbMF0udG9VcHBlckNhc2UoKSArIGl0ZW0ubmFtZS5zbGljZSgxKX08L2E+XFxuYFxuICAgICAgKVxuICAgICAgLmpvaW4oJ1xcbicpO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJsZXZlbFwiPlxuICAgICAgICA8aDMgY2xhc3M9XCJsZXZlbF9fdGl0bGVcIj4ke2xldmVsWzBdLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKX08L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGV2ZWxfX2dhbWVzXCI+XG4gICAgICAgICAgJHtnYW1lTmFtZXN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfSlcbiAgLmpvaW4oJ1xcbicpO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImFjdGlvbnNcIiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtdXRlLWJ0bj48L211dGUtYnRuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZW1lLWJ0bj48L3RoZW1lLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZXMtYnRuPjwvdGVtcGxhdGVzLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxyYW5kb20tYnRuPjwvcmFuZG9tLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjb250aW51ZS1idG4+PC9jb250aW51ZS1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aGlnaC1zY29yZS1idG4+PC9oaWdoLXNjb3JlLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbmA7XG5cbmNsYXNzIEdhbWVNZW51IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgY29uc3QgbWVudVN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgbWVudVN0eWxlcy50ZXh0Q29udGVudCA9IG1lbnVTdHlsZVN0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChtZW51U3R5bGVzKTtcblxuICAgIGNvbnN0IGFjdGlvbnMgPSBzaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCdhY3Rpb25zJyk7XG5cbiAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ21haW4tcGFnZScpKSB7XG4gICAgICBhY3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzQnVyZ2VyICYmICF0aGlzLmluSGVhZGVyKSB7XG4gICAgICBzaGFkb3dSb290Lmxhc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGxldmVsc0hUTUwpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0J1cmdlcikge1xuICAgICAgYWN0aW9ucy5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ2NvbHVtbic7XG4gICAgICBhY3Rpb25zLnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZU1lbnUgfTtcbiIsImltcG9ydCBjb250aW51ZUJ0blN0eWxlc1N0ciBmcm9tICcuL0NvbnRpbnVlQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgQ29udGludWVCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYnRuLmhyZWYgPSAnJztcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnY29udGludWUnLCB0cnVlKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnLCB0cnVlKTtcbiAgICBidG4uaW5uZXJUZXh0ID0gJ0NvbnRpbnVlIGdhbWUnO1xuXG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWRHYW1lJykpIHtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCBjb250aW51ZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgY29udGludWVCdG5TdHlsZXMudGV4dENvbnRlbnQgPSBjb250aW51ZUJ0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChjb250aW51ZUJ0blN0eWxlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQ29udGludWVCdG4gfTtcbiIsImltcG9ydCBoaWdoU2NvcmVCdG5TdHlsZXNTdHIgZnJvbSAnLi9IaWdoU2NvcmVCdG4uc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBIaWdoU2NvcmVCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYnRuLmhyZWYgPSAnaGlnaC1zY29yZSc7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycsIHRydWUpO1xuICAgIGJ0bi5pbm5lclRleHQgPSAnU2NvcmVzJztcblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCBoaWdoU2NvcmVCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGhpZ2hTY29yZUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IGhpZ2hTY29yZUJ0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChoaWdoU2NvcmVCdG5TdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEhpZ2hTY29yZUJ0biB9O1xuIiwiaW1wb3J0IG11dGVCdG5TdHlsZXNTdHIgZnJvbSAnLi9NdXRlQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgTXV0ZUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB0aGlzLmJ0biA9IGJ0bjtcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZChidG4pO1xuXG4gICAgY29uc3QgbXV0ZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgbXV0ZUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IG11dGVCdG5TdHlsZXNTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQobXV0ZUJ0blN0eWxlcyk7XG5cbiAgICB0aGlzLmNob29zZUltZygpO1xuXG4gICAgYnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBsZXQgaXNNdXRlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtdXRlZCcpO1xuXG4gICAgICBpZiAoIWlzTXV0ZWQpIHtcbiAgICAgICAgaXNNdXRlZCA9ICd0cnVlJztcbiAgICAgIH0gZWxzZSBpZiAoaXNNdXRlZCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGlzTXV0ZWQgPSAnZmFsc2UnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNNdXRlZCA9ICd0cnVlJztcbiAgICAgIH1cblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ211dGVkJywgaXNNdXRlZCk7XG5cbiAgICAgIHRoaXMuY2hvb3NlSW1nKCk7XG4gICAgfTtcbiAgfVxuXG4gIGNob29zZUltZygpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ211dGVkJykgPT09ICd0cnVlJykge1xuICAgICAgdGhpcy5idG4uaW5uZXJIVE1MID0gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjM0cHhcIiBoZWlnaHQ9XCIzNHB4XCIgdmlld0JveD1cIi0wLjUgMCAyNSAyNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgPHBhdGggZD1cIk0xMC45Mzk1IDE3LjcyQzEyLjkzOTUgMTkuNSAxNS4zODk1IDIwLjcyIDE2LjU0OTUgMjAuMzNDMTguNjQ5NSAxOS41NSAxOC45OTk1IDE1LjMyOTkgMTguOTk5NSAxMi40MDk5QzE4Ljk5OTUgMTEuNTk5OSAxOC45OTk1IDEwLjY4IDE4Ljg4OTUgOS43NzAwMlwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTE4LjEyOTIgNi4yODAwOEMxOC4wMDEyIDUuODkxMjkgMTcuNzk1IDUuNTMyNzMgMTcuNTIzMyA1LjIyNjYxQzE3LjI1MTYgNC45MjA1IDE2LjkyMDEgNC42NzMyNyAxNi41NDkzIDQuNTAwMDVDMTUuMzE5MyA0LjA0MDA1IDEyLjcwOTMgNS40OTk5NiAxMC41NDkzIDcuNDA5OTZIOC45NDkyMkM3Ljg4ODM1IDcuNDA5OTYgNi44NzA5MyA3LjgzMTQ1IDYuMTIwNzkgOC41ODE1OUM1LjM3MDY0IDkuMzMxNzQgNC45NDkyMiAxMC4zNDkxIDQuOTQ5MjIgMTEuNDFWMTMuNDFDNC45NDg5IDE0LjE4MTEgNS4xNzE1MSAxNC45MzYgNS41OTAyMSAxNS41ODM1QzYuMDA4OTIgMTYuMjMxMSA2LjYwNTg1IDE2Ljc0MzggNy4zMDkyIDE3LjA2XCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNMjIgMi40MjAwNEwyIDIyLjQyXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICAgYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idG4uaW5uZXJIVE1MID0gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjM0cHhcIiBoZWlnaHQ9XCIzNHB4XCIgdmlld0JveD1cIi0wLjUgMCAyNSAyNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgPHBhdGggZD1cIk0xMi41NDkzIDQuNTAwMDVDMTEuMzE5MyA0LjA0MDA1IDguNzA5MjYgNS40OTk5NiA2LjU0OTI2IDcuNDA5OTZINC45NDkyMkMzLjg4ODM1IDcuNDA5OTYgMi44NzA5MyA3LjgzMTQ1IDIuMTIwNzkgOC41ODE1OUMxLjM3MDY0IDkuMzMxNzQgMC45NDkyMTkgMTAuMzQ5MSAwLjk0OTIxOSAxMS40MVYxMy40MUMwLjk0OTIxOSAxNC40NzA4IDEuMzcwNjQgMTUuNDg4MyAyLjEyMDc5IDE2LjIzODVDMi44NzA5MyAxNi45ODg2IDMuODg4MzUgMTcuNDEgNC45NDkyMiAxNy40MUg2LjU0OTI2QzguNjU5MjYgMTkuMzUgMTEuMjY5MyAyMC43OCAxMi41NDkzIDIwLjMzQzE0LjY0OTMgMTkuNTUgMTQuOTk5MiAxNS4zMyAxNC45OTkyIDEyLjQxQzE0Ljk5OTIgOS40ODk5NiAxNC42NDkzIDUuMjgwMDUgMTIuNTQ5MyA0LjUwMDA1WlwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTIwLjY2MDIgNi43MTk5N0MyMi4xNTkzIDguMjIwMTEgMjMuMDAxNSAxMC4yNTQyIDIzLjAwMTUgMTIuMzc1QzIzLjAwMTUgMTQuNDk1OCAyMi4xNTkzIDE2LjUyOTkgMjAuNjYwMiAxOC4wM1wiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTE4LjUzOTEgMTUuOTVDMTkuNDc2NCAxNS4wMTIzIDIwLjAwMyAxMy43NDA3IDIwLjAwMyAxMi40MTQ5QzIwLjAwMyAxMS4wODkxIDE5LjQ3NjQgOS44MTc2NCAxOC41MzkxIDguODhcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuICAgICAgPC9zdmc+XG4gICAgICBgO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBNdXRlQnRuIH07XG4iLCJpbXBvcnQgcmFuZG9tQnRuU3R5bGVzU3RyIGZyb20gJy4vUmFuZG9tQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgUmFuZG9tQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJ0bi5ocmVmID0gJyc7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3JhbmRvbScsIHRydWUpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycsIHRydWUpO1xuICAgIGJ0bi5pbm5lclRleHQgPSAnUmFuZG9tJztcblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCByYW5kb21CdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHJhbmRvbUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IHJhbmRvbUJ0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChyYW5kb21CdG5TdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IFJhbmRvbUJ0biB9O1xuIiwiaW1wb3J0IHRlbXBsYXRlc0J0blN0eWxlc1N0ciBmcm9tICcuL1RlbXBsYXRlc0J0bi5zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIFRlbXBsYXRlc0J0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBidG4uaHJlZiA9ICd0ZW1wbGF0ZXMnO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnLCB0cnVlKTtcbiAgICBidG4uaW5uZXJUZXh0ID0gJ1RlbXBsYXRlcyc7XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZChidG4pO1xuXG4gICAgY29uc3QgdGVtcGxhdGVzQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0ZW1wbGF0ZXNCdG5TdHlsZXMudGV4dENvbnRlbnQgPSB0ZW1wbGF0ZXNCdG5TdHlsZXNTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGVzQnRuU3R5bGVzKTtcbiAgfVxufVxuXG5leHBvcnQgeyBUZW1wbGF0ZXNCdG4gfTtcbiIsImltcG9ydCB0aGVtZUJ0blN0eWxlc1N0ciBmcm9tICcuL1RoZW1lQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgVGhlbWVCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdGhpcy5idG4gPSBidG47XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcblxuICAgIGNvbnN0IHRoZW1lQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0aGVtZUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IHRoZW1lQnRuU3R5bGVzU3RyO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRoZW1lQnRuU3R5bGVzKTtcblxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdGhpcy5jaG9vc2VJbWcoKTtcblxuICAgIGJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgcm9vdC5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrJyk7XG4gICAgICB0aGlzLmNob29zZUltZygpO1xuICAgIH07XG4gIH1cblxuICBjaG9vc2VJbWcoKSB7XG4gICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2RhcmsnKSkge1xuICAgICAgdGhpcy5idG4uaW5uZXJIVE1MID0gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjM0cHhcIiBoZWlnaHQ9XCIzNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgPHBhdGggZD1cIk0yMS4wNjcyIDExLjg1NjhMMjAuNDI1MyAxMS40NjlMMjEuMDY3MiAxMS44NTY4Wk0xMi4xNDMyIDIuOTMyNzZMMTEuNzU1MyAyLjI5MDg1VjIuMjkwODVMMTIuMTQzMiAyLjkzMjc2Wk03LjM3NTU0IDIwLjAxM0M3LjAxNyAxOS44MDU2IDYuNTU4MiAxOS45MjgxIDYuMzUwOCAyMC4yODY2QzYuMTQzMzkgMjAuNjQ1MiA2LjI2NTkxIDIxLjEwNCA2LjYyNDQ2IDIxLjMxMTRMNy4zNzU1NCAyMC4wMTNaTTIuNjg4NjIgMTcuMzc1NUMyLjg5NjAyIDE3LjczNDEgMy4zNTQ4MiAxNy44NTY2IDMuNzEzMzcgMTcuNjQ5MkM0LjA3MTkxIDE3LjQ0MTggNC4xOTQ0MyAxNi45ODMgMy45ODcwMyAxNi42MjQ1TDIuNjg4NjIgMTcuMzc1NVpNMjEuMjUgMTJDMjEuMjUgMTcuMTA4NiAxNy4xMDg2IDIxLjI1IDEyIDIxLjI1VjIyLjc1QzE3LjkzNzEgMjIuNzUgMjIuNzUgMTcuOTM3MSAyMi43NSAxMkgyMS4yNVpNMi43NSAxMkMyLjc1IDYuODkxMzcgNi44OTEzNyAyLjc1IDEyIDIuNzVWMS4yNUM2LjA2Mjk0IDEuMjUgMS4yNSA2LjA2Mjk0IDEuMjUgMTJIMi43NVpNMTUuNSAxNC4yNUMxMi4zMjQ0IDE0LjI1IDkuNzUgMTEuNjc1NiA5Ljc1IDguNUg4LjI1QzguMjUgMTIuNTA0MSAxMS40OTU5IDE1Ljc1IDE1LjUgMTUuNzVWMTQuMjVaTTIwLjQyNTMgMTEuNDY5QzE5LjQxNzIgMTMuMTM3MyAxNy41ODgyIDE0LjI1IDE1LjUgMTQuMjVWMTUuNzVDMTguMTM0OSAxNS43NSAyMC40NDA3IDE0LjM0MzkgMjEuNzA5MiAxMi4yNDQ3TDIwLjQyNTMgMTEuNDY5Wk05Ljc1IDguNUM5Ljc1IDYuNDExODIgMTAuODYyNyA0LjU4MjggMTIuNTMxIDMuNTc0NjdMMTEuNzU1MyAyLjI5MDg1QzkuNjU2MDkgMy41NTkzIDguMjUgNS44NjUwOSA4LjI1IDguNUg5Ljc1Wk0xMiAyLjc1QzExLjkxMTUgMi43NSAxMS44MDc3IDIuNzEwMDggMTEuNzMyNCAyLjYzMTY4QzExLjY2ODYgMi41NjUyNyAxMS42NTM4IDIuNTAyNDQgMTEuNjUwMyAyLjQ3NzAzQzExLjY0NjEgMi40NDU4NyAxMS42NDgyIDIuMzU1NTcgMTEuNzU1MyAyLjI5MDg1TDEyLjUzMSAzLjU3NDY3QzEzLjAzNDIgMy4yNzA2NSAxMy4xOTYgMi43MTM5OCAxMy4xMzY4IDIuMjc2MjdDMTMuMDc1NCAxLjgyMTI2IDEyLjcxNjYgMS4yNSAxMiAxLjI1VjIuNzVaTTIxLjcwOTIgMTIuMjQ0N0MyMS42NDQ0IDEyLjM1MTggMjEuNTU0MSAxMi4zNTM5IDIxLjUyMyAxMi4zNDk3QzIxLjQ5NzYgMTIuMzQ2MiAyMS40MzQ3IDEyLjMzMTQgMjEuMzY4MyAxMi4yNjc2QzIxLjI4OTkgMTIuMTkyMyAyMS4yNSAxMi4wODg1IDIxLjI1IDEySDIyLjc1QzIyLjc1IDExLjI4MzQgMjIuMTc4NyAxMC45MjQ2IDIxLjcyMzcgMTAuODYzMkMyMS4yODYgMTAuODA0IDIwLjcyOTMgMTAuOTY1OCAyMC40MjUzIDExLjQ2OUwyMS43MDkyIDEyLjI0NDdaTTEyIDIxLjI1QzEwLjMxMzkgMjEuMjUgOC43MzUzMyAyMC43OTk2IDcuMzc1NTQgMjAuMDEzTDYuNjI0NDYgMjEuMzExNEM4LjIwNjQgMjIuMjI2NSAxMC4wNDMyIDIyLjc1IDEyIDIyLjc1VjIxLjI1Wk0zLjk4NzAzIDE2LjYyNDVDMy4yMDA0MyAxNS4yNjQ3IDIuNzUgMTMuNjg2MSAyLjc1IDEySDEuMjVDMS4yNSAxMy45NTY4IDEuNzczNTEgMTUuNzkzNiAyLjY4ODYyIDE3LjM3NTVMMy45ODcwMyAxNi42MjQ1WlwiIGZpbGw9XCIjZmZmZmZmXCIvPlxuICAgIDwvc3ZnPlxuICAgICAgYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idG4uaW5uZXJIVE1MID0gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjM0cHhcIiBoZWlnaHQ9XCIzNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgPHBhdGggZD1cIk03LjI4NDUxIDEwLjMzMzNDNy4xMDAyNiAxMC44NTQ2IDcgMTEuNDE1NiA3IDEyQzcgMTQuNzYxNCA5LjIzODU4IDE3IDEyIDE3QzE0Ljc2MTQgMTcgMTcgMTQuNzYxNCAxNyAxMkMxNyA5LjIzODU4IDE0Ljc2MTQgNyAxMiA3QzExLjQxNTYgNyAxMC44NTQ2IDcuMTAwMjYgMTAuMzMzMyA3LjI4NDUxXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTEyIDJWNFwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgPHBhdGggZD1cIk0xMiAyMFYyMlwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgPHBhdGggZD1cIk00IDEyTDIgMTJcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNMjIgMTJMMjAgMTJcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNMTkuNzc3OCA0LjIyMjY2TDE3LjU1NTggNi4yNTQyNFwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgPHBhdGggZD1cIk00LjIyMjE3IDQuMjIyNjZMNi40NDQxOCA2LjI1NDI0XCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTYuNDQ0MzQgMTcuNTU1N0w0LjIyMjExIDE5Ljc3NzlcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNMTkuNzc3OCAxOS43NzczTDE3LjU1NTggMTcuNTU1MVwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgPC9zdmc+XG4gICAgICBgO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBUaGVtZUJ0biB9O1xuIiwiaW1wb3J0IG5vbm9ncmFtU3R5bGVzU3RyIGZyb20gJy4vR2FtZU5vbm9ncmFtLnN0eWxlcy5zY3NzJztcbmltcG9ydCB7IEdhbWVGaWVsZCB9IGZyb20gJy4vZ2FtZUZpZWxkL0dhbWVGaWVsZCc7XG5pbXBvcnQgeyBSZXN0YXJ0QnRuIH0gZnJvbSAnLi9yZXN0YXJ0QnRuL1Jlc3RhcnRCdG4nO1xuaW1wb3J0IHsgU29sdXRpb25CdG4gfSBmcm9tICcuL3NvbHV0aW9uQnRuL1NvbHV0aW9uQnRuJztcbmltcG9ydCB7IFNhdmVCdG4gfSBmcm9tICcuL3NhdmVCdG4vU2F2ZUJ0bic7XG5pbXBvcnQgeyBHYW1lVGltZXIgfSBmcm9tICcuL2dhbWVUaW1lci9HYW1lVGltZXInO1xuaW1wb3J0IHsgUmVzdWx0TW9kYWwgfSBmcm9tICcuL3Jlc3VsdE1vZGFsL1Jlc3VsdE1vZGFsJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcbmltcG9ydCB3aW5Tb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy93aW4tZ2FtZS5tcDMnO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtZmllbGQnLCBHYW1lRmllbGQpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyZXN0YXJ0LWJ0bicsIFJlc3RhcnRCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdzb2x1dGlvbi1idG4nLCBTb2x1dGlvbkJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NhdmUtYnRuJywgU2F2ZUJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtdGltZXInLCBHYW1lVGltZXIpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyZXN1bHQtbW9kYWwnLCBSZXN1bHRNb2RhbCk7XG5cbmNvbnN0IG5vbm9ncmFtU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbm5vbm9ncmFtU3R5bGVzLnRleHRDb250ZW50ID0gbm9ub2dyYW1TdHlsZXNTdHI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPGRpdiBjbGFzcz1cIm5vbm9ncmFtX19jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPlxuICAgICAgPHJlc3RhcnQtYnRuPjwvcmVzdGFydC1idG4+XG4gICAgICA8c2F2ZS1idG4+PC9zYXZlLWJ0bj5cbiAgICAgIDxnYW1lLXRpbWVyIGlkPVwiZ2FtZS10aW1lclwiIG1pbnV0ZXM9XCIwXCIgc2Vjb25kcz1cIjBcIj48L2dhbWUtdGltZXI+XG4gICAgICA8c29sdXRpb24tYnRuPjwvc29sdXRpb24tYnRuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBpZD1cInN1bW1hcnlcIiBjbGFzcz1cInN1bW1hcnlcIj5cbiAgICAgIDwvZGl2PiAgXG4gICAgXG4gICAgPGRpdiBjbGFzcz1cIm5vbm9ncmFtX193cmFwcGVyXCI+XG4gICAgICA8ZGl2IGlkPVwibm9ub2dyYW1cIiBjbGFzcz1cIm5vbm9ncmFtXCI+XG4gICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvcC1wYW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LXBhbmVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PiAgXG4gICAgXG4gIDwvZGl2PlxuYDtcblxuY2xhc3MgR2FtZU5vbm9ncmFtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKG5vbm9ncmFtU3R5bGVzKTtcblxuICAgIGNvbnN0IGxldmVsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xldmVsJyk7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzaXplJyk7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gICAgY29uc3Qgc2F2ZWRTb2x1dGlvbiA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzYXZlZHNvbHV0aW9uJyk7XG4gICAgY29uc3QgY3Jvc3NlZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdjcm9zc2VkJyk7XG5cbiAgICBjb25zdCB0aW1lciA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI2dhbWUtdGltZXInKTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKCdtaW51dGVzJykgIT09ICcwJyB8fFxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKSAhPT0gJzAnXG4gICAgKSB7XG4gICAgICBjb25zdCBzYXZlZE1pbnV0ZXMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpO1xuICAgICAgY29uc3Qgc2F2ZWRTZWNvbmRzID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKTtcblxuICAgICAgdGltZXIuc2V0QXR0cmlidXRlKCdtaW51dGVzJywgc2F2ZWRNaW51dGVzKTtcbiAgICAgIHRpbWVyLnNldEF0dHJpYnV0ZSgnc2Vjb25kcycsIHNhdmVkU2Vjb25kcyk7XG5cbiAgICAgIHRpbWVyLmNvbnRpbnVlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCdzdW1tYXJ5JykuaW5uZXJIVE1MID0gYFxuICAgICAgPHAgY2xhc3M9XCJzdW1tYXJ5X19sZXZlbFwiPiR7bGV2ZWxbMF0udG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpfSAoJHtzaXplfSk8L3A+IC1cbiAgICAgIDxwIGNsYXNzPVwic3VtbWFyeV9fbmFtZVwiPiAke25hbWVbMF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSl9PC9wPlxuICAgIGA7XG5cbiAgICBjb25zdCBub25vZ3JhbSA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI25vbm9ncmFtJyk7XG4gICAgY29uc3QgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdnYW1lLWZpZWxkJyk7XG4gICAgZmllbGQuaWQgPSAnZ2FtZS1maWVsZCc7XG4gICAgZmllbGQuY2xhc3NMaXN0LmFkZCgnZ2FtZS1maWVsZCcpO1xuICAgIGZpZWxkLnNhdmVkU29sdXRpb24gPSBzYXZlZFNvbHV0aW9uO1xuICAgIGZpZWxkLmNyb3NzZWQgPSBjcm9zc2VkO1xuICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnbGV2ZWwnLCBsZXZlbCk7XG4gICAgZmllbGQuc2V0QXR0cmlidXRlKCdzaXplJywgc2l6ZSk7XG5cbiAgICBub25vZ3JhbS5hcHBlbmQoZmllbGQpO1xuXG4gICAgY29uc3QgeyBtYXRyaXggfSA9IG5vbm9ncmFtcy5maW5kKFxuICAgICAgKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gbmFtZSAmJiBpdGVtLnNpemUgPT09IHNpemVcbiAgICApO1xuXG4gICAgY29uc3QgY29ycmVjdFNvbHV0aW9uID0gbWF0cml4LmZsYXQoKS5qb2luKCcnKS50b1N0cmluZygpO1xuXG4gICAgLy8gRHJhdyBtYXRyaXggc29sdXRpb25cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgbWF0cml4LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBzdHIgKz0gZWwucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gY3VyciA/ICfilqAnIDogJ+KWoSc7XG4gICAgICAgIHJldHVybiBhY2MgKyBzcXVhcmU7XG4gICAgICB9LCAnJyk7XG4gICAgICBzdHIgKz0gJ1xcbic7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coc3RyKTtcblxuICAgIGNvbnN0IHRvcFBhbmUgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy50b3AtcGFuZScpO1xuICAgIGNvbnN0IGxlZnRQYW5lID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubGVmdC1wYW5lJyk7XG4gICAgbGV0IG1heExlZnRIaW50cyA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbGVmdEhpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGxlZnRIaW50LmNsYXNzTGlzdC5hZGQoJ2xlZnQtcGFuZV9faGludCcpO1xuXG4gICAgICBjb25zdCB0b3BIaW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b3BIaW50LmNsYXNzTGlzdC5hZGQoJ3RvcC1wYW5lX19oaW50Jyk7XG5cbiAgICAgIGxldCBjb3VudGVyTGVmdCA9IDA7XG4gICAgICBsZXQgY291bnRlclRvcCA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4Lmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChtYXRyaXhbaV1bal0pIHtcbiAgICAgICAgICBjb3VudGVyTGVmdCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChjb3VudGVyTGVmdCAmJiAhbWF0cml4W2ldW2pdKSB8fFxuICAgICAgICAgIChjb3VudGVyTGVmdCAmJiBqID09PSBtYXRyaXgubGVuZ3RoIC0gMSkgfHxcbiAgICAgICAgICAoaiA9PT0gbWF0cml4Lmxlbmd0aCAtIDEgJiYgbGVmdEhpbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxuICAgICAgICApIHtcbiAgICAgICAgICBsZWZ0SGludC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgICAgIGBcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImxlZnQtcGFuZV9fbnVtYmVyXCI+JHtjb3VudGVyTGVmdH08L2Rpdj5cblx0XHRcdFx0XHRcdGBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY291bnRlckxlZnQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdHJpeFtqXVtpXSkge1xuICAgICAgICAgIGNvdW50ZXJUb3AgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAoY291bnRlclRvcCAmJiAhbWF0cml4W2pdW2ldKSB8fFxuICAgICAgICAgIChjb3VudGVyVG9wICYmIGogPT09IG1hdHJpeC5sZW5ndGggLSAxKVxuICAgICAgICApIHtcbiAgICAgICAgICB0b3BIaW50Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgICAgICAgYFxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInRvcC1wYW5lX19udW1iZXJcIj4ke2NvdW50ZXJUb3B9PC9kaXY+XG5cdFx0XHRcdFx0XHRgXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvdW50ZXJUb3AgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxlZnRQYW5lLmFwcGVuZChsZWZ0SGludCk7XG4gICAgICB0b3BQYW5lLmFwcGVuZCh0b3BIaW50KTtcblxuICAgICAgaWYgKGxlZnRIaW50LmNoaWxkcmVuLmxlbmd0aCA+IG1heExlZnRIaW50cykge1xuICAgICAgICBtYXhMZWZ0SGludHMgPSBsZWZ0SGludC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2FsY3VsYXRlIGNlbGwgc2l6ZVxuICAgIGNvbnN0IG5vbm9ncmFtV2lkdGggPSBub25vZ3JhbS5vZmZzZXRXaWR0aDtcblxuICAgIGxldCBjZWxsU2l6ZSA9IG5vbm9ncmFtV2lkdGggLyAobWF4TGVmdEhpbnRzICsgbWF0cml4Lmxlbmd0aCk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNlbGwtc2l6ZScsIGNlbGxTaXplICsgJ3B4Jyk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZpbGwnLCAoKSA9PiB7XG4gICAgICBpZiAoY29ycmVjdFNvbHV0aW9uID09PSBmaWVsZC5jdXJyZW50U29sdXRpb24pIHtcbiAgICAgICAgZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3dpbicpKTtcbiAgICAgICAgdGltZXIuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3dpbicpKTtcblxuICAgICAgICBjb25zdCBtaW51dGVzID0gdGltZXIuZ2V0QXR0cmlidXRlKCdtaW51dGVzJyk7XG4gICAgICAgIGxldCBtaW51dGVzU3RyID0gJyc7XG4gICAgICAgIGlmICgrbWludXRlcykge1xuICAgICAgICAgIG1pbnV0ZXNTdHIgPVxuICAgICAgICAgICAgK21pbnV0ZXMgPiAxID8gbWludXRlcyArICcgbWludXRlcyAnIDogbWludXRlcyArICcgbWludXRlICc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWNvbmRzID0gdGltZXIuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyk7XG4gICAgICAgIGxldCBzZWNvbmRzU3RyID0gJyc7XG4gICAgICAgIGlmICgrc2Vjb25kcykge1xuICAgICAgICAgIHNlY29uZHNTdHIgPVxuICAgICAgICAgICAgK3NlY29uZHMgPiAxID8gc2Vjb25kcyArICcgc2Vjb25kcycgOiBzZWNvbmRzICsgJyBzZWNvbmQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtdXRlZCcpICE9PSAndHJ1ZScpIHtcbiAgICAgICAgICBuZXcgQXVkaW8od2luU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Jlc3VsdC1tb2RhbCcpO1xuICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgbW9kYWwubWVzc2FnZSA9IGBHcmVhdCEgWW91IGhhdmUgc29sdmVkIHRoZSBub25vZ3JhbSAke25hbWVbMF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSl9IGluICR7bWludXRlc1N0cn0ke3NlY29uZHNTdHJ9IWA7XG4gICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kKG1vZGFsKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgY29uc3Qgc2F2ZWRSZXN1bHQgPSB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBsZXZlbCxcbiAgICAgICAgICBzaXplLFxuICAgICAgICAgIHRpbWU6IHRpbWVyLmN1cnJlbnREdXJhdGlvbixcbiAgICAgICAgICBkdXJhdGlvbjogK21pbnV0ZXMgKiA2MCArICtzZWNvbmRzLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBoaWdoU2NvcmVUYWJsZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpZ2hTY29yZVRhYmxlJykpO1xuICAgICAgICBpZiAoIWhpZ2hTY29yZVRhYmxlKSBoaWdoU2NvcmVUYWJsZSA9IFtdO1xuICAgICAgICBoaWdoU2NvcmVUYWJsZS51bnNoaWZ0KHNhdmVkUmVzdWx0KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgJ2hpZ2hTY29yZVRhYmxlJyxcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShoaWdoU2NvcmVUYWJsZS5zbGljZSgwLCA1KSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcigncmVzdGFydCcsICgpID0+IHtcbiAgICAgIGZpZWxkLnRpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3Jlc3RhcnQnKSk7XG4gICAgICB0aW1lci5yZXN0YXJ0KCk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NvbHV0aW9uJywgKCkgPT4ge1xuICAgICAgdGltZXIuc3RvcCgpO1xuXG4gICAgICBmaWVsZC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NvbHV0aW9uJywge1xuICAgICAgICAgIGRldGFpbDogbWF0cml4LmZsYXQoKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NhdmUtZ2FtZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGdhbWUgPSB7XG4gICAgICAgIGxldmVsLFxuICAgICAgICBzaXplLFxuICAgICAgICBuYW1lLFxuICAgICAgICBjdXJyZW50U29sdXRpb246IGZpZWxkLmN1cnJlbnRTb2x1dGlvbixcbiAgICAgICAgY3Jvc3NlZDogZmllbGQuY3VycmVudENyb3NzZWQsXG4gICAgICAgIHRpbWU6IHtcbiAgICAgICAgICBtaW51dGVzOiB0aW1lci5taW51dGVzLFxuICAgICAgICAgIHNlY29uZHM6IHRpbWVyLnNlY29uZHMsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2F2ZWRHYW1lJywgSlNPTi5zdHJpbmdpZnkoZ2FtZSkpO1xuXG4gICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdnYW1lLWhlYWRlcicpO1xuICAgICAgY29uc3QgY29udGludWVCdG4gPSBoZWFkZXIuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcignZ2FtZS1tZW51LmhlYWRlcicpXG4gICAgICAgIC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2NvbnRpbnVlLWJ0bicpO1xuICAgICAgY29uc3QgaW5uZXIgPSBjb250aW51ZUJ0bi5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24nKTtcbiAgICAgIGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3N0YXJ0dGltZXInLCAoKSA9PiB7XG4gICAgICB0aW1lci5sYXVuY2goKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lTm9ub2dyYW0gfTtcbiIsImltcG9ydCBmaWVsZFN0eWxlc1N0ciBmcm9tICcuL0dhbWVGaWVsZC5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgZmlsbFNvdW5kRmlsZSBmcm9tICcuLy4uLy4uLy4uL2Fzc2V0cy9zb3VuZC1lZmZlY3RzL2ZpbGwtY2VsbC5tcDMnO1xuaW1wb3J0IGNsZWFyU291bmRGaWxlIGZyb20gJy4vLi4vLi4vLi4vYXNzZXRzL3NvdW5kLWVmZmVjdHMvY2xlYXItY2VsbC5tcDMnO1xuaW1wb3J0IGNyb3NzU291bmRGaWxlIGZyb20gJy4vLi4vLi4vLi4vYXNzZXRzL3NvdW5kLWVmZmVjdHMvY3Jvc3MtY2VsbC5tcDMnO1xuXG5jb25zdCBmaWVsZFN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5maWVsZFN0eWxlcy50ZXh0Q29udGVudCA9IGZpZWxkU3R5bGVzU3RyO1xuXG5jbGFzcyBHYW1lRmllbGQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZChmaWVsZFN0eWxlcyk7XG5cbiAgICB0aGlzLnNpemUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc2l6ZScpLnNwbGl0KCd4JylbMF07XG5cbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5maWVsZC5pZCA9ICdmaWVsZCc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZTsgaSArPSAxKSB7XG4gICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2l6ZTsgaiArPSAxKSB7XG4gICAgICAgIHJvdy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PmApO1xuICAgICAgfVxuICAgICAgdGhpcy5maWVsZC5hcHBlbmQocm93KTtcbiAgICB9XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZCh0aGlzLmZpZWxkKTtcblxuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmZpZWxkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG5cbiAgICB0aGlzLmN1cnJlbnRTb2x1dGlvbiA9XG4gICAgICB0aGlzLnNhdmVkU29sdXRpb24gfHwgbmV3IEFycmF5KHRoaXMuY2VsbHMubGVuZ3RoKS5maWxsKDApLmpvaW4oJycpO1xuXG4gICAgaWYgKHRoaXMuc2F2ZWRTb2x1dGlvbikge1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNhdmVkU29sdXRpb25baV0gPT09ICcxJykge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNyb3NzZWQpIHtcbiAgICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jcm9zc2VkW2ldID09PSAneCcpIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2Nyb3NzZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5jbGlja3NEaXNhYmxlZCkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5jbGlja3NEaXNhYmxlZCkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJyk7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdmaWxsZWQnKTtcblxuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtdXRlZCcpICE9PSAndHJ1ZScpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZmlsbGVkJykpIHtcbiAgICAgICAgICBuZXcgQXVkaW8oZmlsbFNvdW5kRmlsZSkucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ldyBBdWRpbyhjbGVhclNvdW5kRmlsZSkucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tTb2x1dGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2Nyb3NzZWQnKTtcblxuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtdXRlZCcpICE9PSAndHJ1ZScpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY3Jvc3NlZCcpKSB7XG4gICAgICAgICAgbmV3IEF1ZGlvKGNyb3NzU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3IEF1ZGlvKGNsZWFyU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja1NvbHV0aW9uKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGltZXJTdGFydGVkKSByZXR1cm47XG4gICAgICB0aGlzLnRpbWVyU3RhcnRlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuZmllbGQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzdGFydHRpbWVyJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRpbWVyU3RhcnRlZCkgcmV0dXJuO1xuICAgICAgdGhpcy50aW1lclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc3RhcnR0aW1lcicsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigncmVzdGFydCcsICgpID0+IHtcbiAgICAgIHRoaXMuZW5hYmxlQ2xpY2tzKCk7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJywgJ2Nyb3NzZWQnKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3NvbHV0aW9uJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUNsaWNrcygpO1xuXG4gICAgICBjb25zdCBzb2x1dGlvbiA9IGUuZGV0YWlsO1xuXG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgICAgaWYgKHNvbHV0aW9uW2ldKSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJyk7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nyb3NzZWQnKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignd2luJywgKCkgPT4ge1xuICAgICAgdGhpcy5kaXNhYmxlQ2xpY2tzKCk7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrU29sdXRpb24oKSB7XG4gICAgdGhpcy5jdXJyZW50U29sdXRpb24gPSBbLi4udGhpcy5jZWxsc10ucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgIHJldHVybiBjdXJyLmNsYXNzTGlzdC5jb250YWlucygnZmlsbGVkJykgPyBhY2MgKyAnMScgOiBhY2MgKyAnMCc7XG4gICAgfSwgJycpO1xuXG4gICAgdGhpcy5jdXJyZW50Q3Jvc3NlZCA9IFsuLi50aGlzLmNlbGxzXS5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgcmV0dXJuIGN1cnIuY2xhc3NMaXN0LmNvbnRhaW5zKCdjcm9zc2VkJykgPyBhY2MgKyAneCcgOiBhY2MgKyAnMCc7XG4gICAgfSwgJycpO1xuXG4gICAgdGhpcy5maWVsZC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdmaWxsJywge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGRpc2FibGVDbGlja3MoKSB7XG4gICAgdGhpcy5jbGlja3NEaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICBlbmFibGVDbGlja3MoKSB7XG4gICAgdGhpcy5jbGlja3NEaXNhYmxlZCA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVGaWVsZCB9O1xuIiwiaW1wb3J0IHRpbWVyU3R5bGVzU3RyIGZyb20gJy4vR2FtZVRpbWVyLnN0eWxlcy5zY3NzJztcblxuY29uc3QgdGltZXJTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xudGltZXJTdHlsZXMudGV4dENvbnRlbnQgPSB0aW1lclN0eWxlc1N0cjtcblxuY2xhc3MgR2FtZVRpbWVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmFwcGVuZCh0aW1lclN0eWxlcyk7XG5cbiAgICBpZiAoIXRoaXMucmVuZGVyZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLnJlbmRlcmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3dpbicsICgpID0+IHRoaXMuc3RvcCgpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgbWludXRlcyA9XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpLmxlbmd0aCA9PT0gMVxuICAgICAgICA/IGAwJHt0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpfWBcbiAgICAgICAgOiB0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpO1xuXG4gICAgbGV0IHNlY29uZHMgPVxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKS5sZW5ndGggPT09IDFcbiAgICAgICAgPyBgMCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKX1gXG4gICAgICAgIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKTtcblxuICAgIGNvbnN0IGR1cmF0aW9uID0gYCR7bWludXRlc306JHtzZWNvbmRzfWA7XG5cbiAgICB0aGlzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICAgIHRoaXMuc2Vjb25kcyA9IHNlY29uZHM7XG4gICAgdGhpcy5jdXJyZW50RHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICB0aGlzLmlubmVySFRNTCA9IGR1cmF0aW9uO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnbWludXRlcycsICdzZWNvbmRzJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGxhdW5jaCgpIHtcbiAgICBpZiAodGhpcy5jb250aW51ZSkge1xuICAgICAgY29uc3QgdGltZSA9IHRoaXMuY3VycmVudER1cmF0aW9uLnNwbGl0KCc6Jyk7XG4gICAgICBjb25zdCBtaW4gPSArdGltZVswXTtcbiAgICAgIGNvbnN0IHNlYyA9ICt0aW1lWzFdO1xuXG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCkgLSAobWluICogNjAgKyBzZWMpICogMTAwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKTtcblxuICAgIHRoaXMuaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGgudHJ1bmMoKG5vdyAtIHRoaXMuc3RhcnRUaW1lKSAvIDEwMDApO1xuXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2Vjb25kcycsIGR1cmF0aW9uICUgNjApO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnLCBNYXRoLmZsb29yKGR1cmF0aW9uIC8gNjApKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xuICB9XG5cbiAgcmVzdGFydCgpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XG4gICAgdGhpcy5jb250aW51ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlY29uZHMnLCAnMCcpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtaW51dGVzJywgJzAnKTtcblxuICAgIHRoaXMuc3RvcCgpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZVRpbWVyIH07XG4iLCJpbXBvcnQgcmVzdGFydEJ0blN0eWxlc1N0ciBmcm9tICcuL1Jlc3RhcnRCdG4uc3R5bGVzLnNjc3MnO1xuXG5jb25zdCByZXN0YXJ0QnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnJlc3RhcnRCdG5TdHlsZXMudGV4dENvbnRlbnQgPSByZXN0YXJ0QnRuU3R5bGVzU3RyO1xuXG5jbGFzcyBSZXN0YXJ0QnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+UmVzdGFydCBnYW1lPC9kaXY+XG4gICAgYDtcbiAgICBzaGFkb3dSb290LmFwcGVuZChyZXN0YXJ0QnRuU3R5bGVzKTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQub25jbGljayA9ICgpID0+IHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdyZXN0YXJ0Jywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IHsgUmVzdGFydEJ0biB9O1xuIiwiaW1wb3J0IG1vZGFsU3R5bGVzU3RyIGZyb20gJy4vUmVzdWx0TW9kYWwuc3R5bGVzLnNjc3MnO1xuXG5jb25zdCBtb2RhbFN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5tb2RhbFN0eWxlcy5pbm5lclRleHQgPSBtb2RhbFN0eWxlc1N0cjtcblxuY2xhc3MgUmVzdWx0TW9kYWwgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKG1vZGFsU3R5bGVzKTtcblxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICdtb2RhbF9fd3JhcHBlcic7XG5cbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1vZGFsLmNsYXNzTmFtZSA9ICdtb2RhbCc7XG5cbiAgICBpZiAodGhpcy5tZXNzYWdlKSB7XG4gICAgICBtb2RhbC50ZXh0Q29udGVudCA9IHRoaXMubWVzc2FnZTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNsb3NlLmNsYXNzTmFtZSA9ICdtb2RhbF9fY2xvc2UnO1xuICAgIGNsb3NlLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbF9fY2xvc2Utc3Ryb2tlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWxfX2Nsb3NlLXN0cm9rZVwiPjwvZGl2PlxuICAgIGA7XG5cbiAgICBtb2RhbC5hcHBlbmQoY2xvc2UpO1xuICAgIHdyYXBwZXIuYXBwZW5kKG1vZGFsKTtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh3cmFwcGVyKTtcblxuICAgIGNsb3NlLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4gd3JhcHBlci5yZW1vdmUoKSk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBSZXN1bHRNb2RhbCB9O1xuIiwiaW1wb3J0IHNhdmVCdG5TdHlsZXNTdHIgZnJvbSAnLi9TYXZlQnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3Qgc2F2ZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5zYXZlQnRuU3R5bGVzLnRleHRDb250ZW50ID0gc2F2ZUJ0blN0eWxlc1N0cjtcblxuY2xhc3MgU2F2ZUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvblwiPlNhdmUgZ2FtZTwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoc2F2ZUJ0blN0eWxlcyk7XG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLmN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzYXZlLWdhbWUnLCB7IGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IFNhdmVCdG4gfTtcbiIsImltcG9ydCBzb2x1dGlvbkJ0blN0eWxlc1N0ciBmcm9tICcuL1NvbHV0aW9uQnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3Qgc29sdXRpb25CdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuc29sdXRpb25CdG5TdHlsZXMudGV4dENvbnRlbnQgPSBzb2x1dGlvbkJ0blN0eWxlc1N0cjtcblxuY2xhc3MgU29sdXRpb25CdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIj5Tb2x1dGlvbjwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoc29sdXRpb25CdG5TdHlsZXMpO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgIGUuY3VycmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NvbHV0aW9uJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IHsgU29sdXRpb25CdG4gfTtcbiIsImltcG9ydCBoaWdoU2NvcmVTdHlsZXNTdHIgZnJvbSAnLi9IaWdoU2NvcmVUYWJsZS5zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIEhpZ2hTY29yZVRhYmxlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgbGV0IHJlc3VsdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWdoU2NvcmVUYWJsZScpKTtcblxuICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICByZXN1bHRzID0gcmVzdWx0cy5zbGljZSgwLCA1KTtcbiAgICAgIHJlc3VsdHMuc29ydCgoYSwgYikgPT4gYS5kdXJhdGlvbiAtIGIuZHVyYXRpb24pO1xuICAgICAgcmVzdWx0cyA9IHJlc3VsdHMubWFwKFxuICAgICAgICAocmVzdWx0LCBpKSA9PiBgICA8dHIgY2xhc3M9XCJoaWdoLXNjb3Jlc19fc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke2kgKyAxfS48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7cmVzdWx0LnRpbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3Jlc3VsdC5sZXZlbFswXS50b1VwcGVyQ2FzZSgpICsgcmVzdWx0LmxldmVsLnNsaWNlKDEpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtyZXN1bHQuc2l6ZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7cmVzdWx0Lm5hbWVbMF0udG9VcHBlckNhc2UoKSArIHJlc3VsdC5uYW1lLnNsaWNlKDEpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImhpZ2gtc2NvcmVzXCI+XG4gICAgICA8aDI+TGF0ZXN0IDUgc2NvcmVzOjwvaDI+XG4gICAgICA8dGFibGUgY2xhc3M9XCJoaWdoLXNjb3Jlc19fc2NvcmVzXCI+XG4gICAgICAgICR7XG4gICAgICAgICAgcmVzdWx0c1xuICAgICAgICAgICAgPyBgXG4gICAgICAgIDx0ciBjbGFzcz1cImhpZ2gtc2NvcmVzX19zY29yZSBoZWFkZXJcIj5cbiAgICAgICAgPHRoPk5vPC90aD5cbiAgICAgICAgPHRoPlRpbWU8L3RoPlxuICAgICAgICA8dGg+TGV2ZWw8L3RoPlxuICAgICAgICA8dGg+U2l6ZTwvdGg+XG4gICAgICAgIDx0aD5HYW1lIG5hbWU8L3RoPlxuICAgICAgICA8L3RyPlxuICAgICAgICBgXG4gICAgICAgICAgICA6ICcnXG4gICAgICAgIH0gXG4gICAgICAgICR7cmVzdWx0cyA/IHJlc3VsdHMuam9pbignXFxuJykgOiAnPHRyPjx0ZCBjb2xzcGFuPVwiNFwiPk5vIHNjb3JlcyB5ZXQuPC90ZD48L3RyPid9XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuYDtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICBjb25zdCBoaWdoU2NvcmVTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGhpZ2hTY29yZVN0eWxlcy50ZXh0Q29udGVudCA9IGhpZ2hTY29yZVN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChoaWdoU2NvcmVTdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEhpZ2hTY29yZVRhYmxlIH07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBDb2xvcnNcblxuOnJvb3Qge1xuICAtLWNvbG9yLWJhY2tncm91bmQ6ICNmYmYzZjI7XG4gIC0tY29sb3ItYWNjZW50OiAjMDA3NTk2O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMTogI2ZhOTkxYztcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTEtdHJhbnNwYXJlbnQ6ICNmYTk5MWMyNTtcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTI6ICNmMDMxNmE7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yLXRyYW5zcGFyZW50OiAjZmExYzY2MjU7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0zOiAjNmIzMmU2O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktNDogIzE2YTc3YztcblxuICAtLWNvbG9yLXRleHQtbWFpbjogIzI2MjYyNjtcbiAgLS1jb2xvci10ZXh0LXJldmVyc2U6ICNmZmZmZmY7XG4gIC0tY29sb3ItdGV4dC1saWdodDogI2ZmZmZmZjtcbn1cblxuOnJvb3QuZGFyayB7XG4gIC0tY29sb3ItYmFja2dyb3VuZDogIzI2MzIzODtcbiAgLS1jb2xvci1hY2NlbnQ6ICMxOTIyMjc7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0xOiAjYWE3MjI4O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMS10cmFuc3BhcmVudDogI2ZhOTkxYzI1O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMjogIzk2Mjg0OTtcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTItdHJhbnNwYXJlbnQ6ICNmYTFjNjYyNTtcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTM6ICM1ZTNlYTE7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS00OiAjMTc2ODUwO1xuXG4gIC0tY29sb3ItdGV4dC1tYWluOiAjZmZmZmZmO1xuICAtLWNvbG9yLXRleHQtcmV2ZXJzZTogIzI2MjYyNjtcbiAgLS1jb2xvci10ZXh0LWxpZ2h0OiAjZmZmZmZmO1xufVxuXG4vLyBTaXplc1xuXG46cm9vdCB7XG4gIC0tY2VsbC1zaXplOiBhdXRvO1xufVxuXG4vLyBGb250c1xuXG4kZm9udC1tYWluOiAnU2lnbmlrYSBOZWdhdGl2ZScsIHNhbnMtc2VyaWY7XG4iLCJAdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC9taXhpbnMnIGFzICo7XG5AdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbi5idXJnZXItaWNvbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG5cbiAgd2lkdGg6IDQ0cHg7XG4gIGhlaWdodDogNDRweDtcblxuICBAaW5jbHVkZSBtYXgtNzY4IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgfVxuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gICRidG46ICY7XG5cbiAgJi5hY3RpdmUge1xuICAgICN7JGJ0bn1fX3N0cm9rZSB7XG4gICAgICAmOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg1cHgpIHJvdGF0ZSg0NWRlZyk7XG4gICAgICB9XG5cbiAgICAgICY6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpIHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICZfX3N0cm9rZSB7XG4gICAgd2lkdGg6IDI0cHg7XG4gICAgaGVpZ2h0OiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItdGV4dC1saWdodCk7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuXG4gICAgdHJhbnNpdGlvbjogMC4zcztcbiAgfVxufVxuIiwiLyogRm9yIG1lZGlhIHF1ZXJpZXMgKi9cblxuQG1peGluIG1heC0xMjAwIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtaW4tMTAyNCB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMDI0cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTEwMjQge1xuICBAbWVkaWEgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1heC03Njgge1xuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTU3NiB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtYXgtNDUwIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQ1MHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1heC0zODAge1xuICBAbWVkaWEgKG1heC13aWR0aDogMzgwcHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gcG9ydHJhaXQge1xuICBAbWVkaWEgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG4iLCJAdXNlICcuLy4uL2Fic3RyYWN0L21peGlucycgYXMgKjtcbkB1c2UgJy4vLi4vYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuXG4qIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuaHRtbCB7XG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xufVxuXG5ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZCk7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuXG4gICYuc2Nyb2xsLWRpc2FibGVkIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxufVxuXG4ud3JhcHBlciB7XG4gIG1heC13aWR0aDogMTQ0MHB4O1xuICBwYWRkaW5nOiAwIDQwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuXG4gIEBpbmNsdWRlIG1heC01NzYge1xuICAgIHBhZGRpbmc6IDAgNC4yMTA1MiU7XG4gIH1cbn1cblxuLnNlY3Rpb24ge1xuICBtYXJnaW4tYm90dG9tOiAxMDBweDtcbn1cblxuaW1nIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuXG4udHJhbnNwYXJlbnQge1xuICBvcGFjaXR5OiAwO1xufVxuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuIiwiQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvbWl4aW5zJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi9zdHlsZXMvbGF5b3V0L2Jhc2ljJyBhcyAqO1xuXG46aG9zdCB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItYWNjZW50KTtcblxuICAqIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItdGV4dC1saWdodCk7XG4gIH1cbn1cblxuYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAxMHB4O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbmdhbWUtbWVudSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgJi5oZWFkZXIge1xuICAgIEBpbmNsdWRlIG1heC03Njgge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAmLmhpZGRlbiB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICAmLmFic29sdXRlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA3NnB4O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG5cbiAgICBwYWRkaW5nOiAwIDE2cHggMjBweCAxNnB4O1xuXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFjY2VudCk7XG4gIH1cbn1cblxuLndyYXBwZXIge1xuICBwYWRkaW5nOiAxNnB4O1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuIiwiQHVzZSAnLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuXG4uYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMjBweDtcbn1cblxuLmxldmVsIHtcbiAgJl9fZ2FtZXMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGdhcDogMTBweDtcbiAgfVxufVxuXG4ubWVudSB7XG4gICZfX2l0ZW0ge1xuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLXRleHQtbWFpbik7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTItdHJhbnNwYXJlbnQpO1xuXG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXRleHQtbWFpbik7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXG4gICAgdHJhbnNpdGlvbjogMC4zcztcblxuICAgICY6aG92ZXIge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0xLXRyYW5zcGFyZW50KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vYWJzdHJhY3QvbWl4aW5zJyBhcyAqO1xuQHVzZSAnLi8uLi9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbi5idXR0b24ge1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcblxuICBjb2xvcjogdmFyKC0tY29sb3ItdGV4dC1saWdodCk7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0xKTtcblxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuXG4gIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgQGluY2x1ZGUgbWF4LTQ1MCB7XG4gICAgcGFkZGluZzogNnB4IDEwcHg7XG4gICAgZm9udC1zaXplOiAxLjZyZW07XG4gIH1cblxuICAmOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDEyMCUpO1xuICB9XG5cbiAgJi5kaXNhYmxlZCB7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIGZpbHRlcjogb3BhY2l0eSgwLjYpIGdyYXlzY2FsZSgwLjUpO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICBmaWx0ZXI6IG9wYWNpdHkoMC42KSBncmF5c2NhbGUoMC41KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yKTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS00KTtcbn1cbiIsIi5idXR0b24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICB0cmFuc2l0aW9uOiAwLjNzO1xuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMC45KTtcbiAgfVxufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTMpO1xufVxuIiwiLmJ1dHRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwLjkpO1xuICB9XG59XG4iLCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXG5cbi8qIERvY3VtZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxuICovXG5cbmh0bWwge1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cbn1cblxuLyogU2VjdGlvbnNcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXG4gKi9cblxubWFpbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXG4gKi9cblxuaDEge1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcbn1cblxuLyogR3JvdXBpbmcgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXG4gKi9cblxuaHIge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xuICBoZWlnaHQ6IDA7IC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnByZSB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG5wIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxudWwge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXG4gKi9cblxuYWJiclt0aXRsZV0ge1xuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5jb2RlLFxua2JkLFxuc2FtcCB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnNtYWxsIHtcbiAgZm9udC1zaXplOiA4MCU7XG59XG5cbi8qKlxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXG4gKiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3ViLFxuc3VwIHtcbiAgZm9udC1zaXplOiA3NSU7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuc3ViIHtcbiAgYm90dG9tOiAtMC4yNWVtO1xufVxuXG5zdXAge1xuICB0b3A6IC0wLjVlbTtcbn1cblxuLyogRW1iZWRkZWQgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxuICovXG5cbmltZyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG59XG5cbi8qIEZvcm1zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmlucHV0LFxub3B0Z3JvdXAsXG5zZWxlY3QsXG50ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICBtYXJnaW46IDA7IC8qIDIgKi9cbn1cblxuYnV0dG9uIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4vKipcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCB7XG4gIC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXG4gKi9cblxuYnV0dG9uLFxuc2VsZWN0IHtcbiAgLyogMSAqL1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcblt0eXBlPSdidXR0b24nXSxcblt0eXBlPSdyZXNldCddLFxuW3R5cGU9J3N1Ym1pdCddIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XG4gIGFwcGVhcmFuY2U6IGJ1dHRvbjtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdidXR0b24nXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdyZXNldCddOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9J3N1Ym1pdCddOjotbW96LWZvY3VzLWlubmVyIHtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xufVxuXG4vKipcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cbiAqL1xuXG5idXR0b246LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0nYnV0dG9uJ106LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0ncmVzZXQnXTotbW96LWZvY3VzcmluZyxcblt0eXBlPSdzdWJtaXQnXTotbW96LWZvY3VzcmluZyB7XG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuZmllbGRzZXQge1xuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmxlZ2VuZCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4gKi9cblxucHJvZ3Jlc3Mge1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXG4gKi9cblxudGV4dGFyZWEge1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cbiAqL1xuXG5bdHlwZT0nY2hlY2tib3gnXSxcblt0eXBlPSdyYWRpbyddIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAyICovXG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxuICovXG5cblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPSdzZWFyY2gnXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXG4gIGFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cbiAqL1xuXG5bdHlwZT0nc2VhcmNoJ106Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cbiAqL1xuXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xufVxuXG4vKiBJbnRlcmFjdGl2ZVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXG4gKi9cblxuZGV0YWlscyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1bW1hcnkge1xuICBkaXNwbGF5OiBsaXN0LWl0ZW07XG59XG5cbi8qIE1pc2NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxuICovXG5cbnRlbXBsYXRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cbiAqL1xuXG5baGlkZGVuXSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4iLCJAdXNlICcuLy4uLy4uL3N0eWxlcy9iYXNlL25vcm1hbGl6ZScgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L21peGlucycgYXMgKjtcblxuOmhvc3Qge1xuICAqIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG59XG5cbi5hY3Rpb25zIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcblxuICB3aWR0aDogMTAwJTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5ub25vZ3JhbSB7XG4gICZfX2NvbnRhaW5lciB7XG4gICAgbWluLWhlaWdodDogY2FsYygxMDAlKTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIH1cblxuICAmX193cmFwcGVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICB3aWR0aDogNDAlO1xuXG4gIEBpbmNsdWRlIG1heC0xMjAwIHtcbiAgICB3aWR0aDogNTAlO1xuICB9XG5cbiAgQGluY2x1ZGUgcG9ydHJhaXQge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgQGluY2x1ZGUgbWF4LTc2OCB7XG4gICAgZm9udC1zaXplOiBtaW4oY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC44KSwgMnJlbSk7XG4gIH1cblxuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6XG4gICAgYXV0b1xuICAgIDFmciAxZnI7XG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XG4gICAgJ2EgYiBiJ1xuICAgICdjIGQgZCdcbiAgICAnYyBkIGQnO1xufVxuXG4uc3VtbWFyeSB7XG4gIHBhZGRpbmc6IDEwcHg7XG5cbiAgZ3JpZC1hcmVhOiBhO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDE2cHg7XG5cbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udG9wLXBhbmUge1xuICBncmlkLWFyZWE6IGI7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcblxuICBkaXNwbGF5OiBmbGV4O1xuXG4gIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItcmlnaHQ6IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDFmO1xuXG4gICZfX2hpbnQge1xuICAgIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuXG4gICAgYm9yZGVyLXRvcDogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggIzAwMCBzb2xpZDtcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICBib3JkZXItcmlnaHQ6IDJweCAjMDAwMDAwIHNvbGlkO1xuICAgIH1cbiAgfVxuXG4gICZfX251bWJlciB7XG4gICAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxufVxuXG4ubGVmdC1wYW5lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGdyaWQtYXJlYTogYztcblxuICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4ICMwMDAgc29saWQ7XG4gIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwMWY7XG5cbiAgJl9faGludCB7XG4gICAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblxuICAgIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1ib3R0b206IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICAgICY6bnRoLWNoaWxkKDVuKTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCAjMDAwMDAwIHNvbGlkO1xuICAgIH1cbiAgfVxuXG4gICZfX251bWJlciB7XG4gICAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG59XG5cbmdhbWUtZmllbGQge1xuICBncmlkLWFyZWE6IGQ7XG59XG5cbnJlc3VsdC1tb2RhbCB7XG4gIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgJi5oaWRkZW4ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB9XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9iYXNlL25vcm1hbGl6ZScgYXMgKjtcblxuOmhvc3Qge1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGJvcmRlcjogMXB4ICMwMDAwMDAgc29saWQ7XG5cbiAgKiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmZkNTtcbn1cblxuLnJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcblxuICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4ICMwMDAwMDAgc29saWQ7XG4gIH1cbn1cblxuLmNlbGwge1xuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICBib3JkZXI6IDFweCAjMDAwMDAwIHNvbGlkO1xuXG4gIHRyYW5zaXRpb246IDAuMnM7XG5cbiAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgIGJvcmRlci1yaWdodDogMnB4ICMwMDAwMDAgc29saWQ7XG4gIH1cblxuICAmLmZpbGxlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgfVxuXG4gICYuY3Jvc3NlZCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgJjo6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICBsZWZ0OiA1MCU7XG5cbiAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAwLjkpO1xuICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSByb3RhdGUoNDVkZWcpO1xuICAgIH1cbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbGVmdDogNTAlO1xuXG4gICAgICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC45KTtcbiAgICAgIGhlaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcblxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgcm90YXRlKC00NWRlZyk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbi5tb2RhbCB7XG4gICZfX3dyYXBwZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAxMDA7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDNmO1xuXG4gICAgdHJhbnNpdGlvbjogMC4zcztcblxuICAgICYuaGlkZGVuIHtcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICB9XG5cbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kKTtcblxuICAmX19jbG9zZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNXB4O1xuICAgIHJpZ2h0OiA1cHg7XG5cbiAgICB3aWR0aDogMzRweDtcbiAgICBoZWlnaHQ6IDM0cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG5cbiAgICAmLXN0cm9rZSB7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMnB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItdGV4dC1tYWluKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcblxuICAgICAgdHJhbnNpdGlvbjogMC4zcztcblxuICAgICAgJjpudGgtY2hpbGQoMSkge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KSByb3RhdGUoNDVkZWcpO1xuICAgICAgfVxuXG4gICAgICAmOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KSByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0zKTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yKTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmhpZ2gtc2NvcmVzIHtcbiAgJl9fc2NvcmVzIHtcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIH1cblxuICAmX19zY29yZSB7XG4gICAgdGgge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0xKTtcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0LXJldmVyc2UpO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICB0aCxcbiAgICB0ZCB7XG4gICAgICBwYWRkaW5nOiAxMHB4O1xuXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLXRleHQtbWFpbik7XG4gICAgfVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuL3N0eWxlcy9tYWluLnNjc3MnO1xuaW1wb3J0IHsgQXBwUm91dGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2FwcC1yb3V0ZXIvQXBwUm91dGVyJztcbmltcG9ydCB7IEdhbWVIZWFkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FtZUhlYWRlci9HYW1lSGVhZGVyJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLWhlYWRlcicsIEdhbWVIZWFkZXIpO1xuXG5kb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTChcbiAgJ2FmdGVyYmVnaW4nLFxuICBgXG5cdFx0PGdhbWUtaGVhZGVyPjwvZ2FtZS1oZWFkZXI+XG5cdFx0PG1haW4gaWQ9XCJtYWluXCIgY2xhc3M9XCJtYWluIHdyYXBwZXJcIj5cblx0XHQ8L21haW4+XG5cdGBcbik7XG5cbmNvbnN0IHJvdXRlciA9IG5ldyBBcHBSb3V0ZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IGRlZXBlc3RFbCA9IGUuY29tcG9zZWRQYXRoKClbMF07XG5cbiAgICBpZiAoZGVlcGVzdEVsLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW2RhdGEtbGlua10nKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcm91dGVyLmNoYW5nZUhhc2goZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcblxuICAgICAgbGV0IHBhcmFtcyA9IFtdO1xuICAgICAgaWYgKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSA9PT0gJycpIHtcbiAgICAgICAgaWYgKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2dhbWUtbmFtZScpKSB7XG4gICAgICAgICAgcGFyYW1zLnB1c2goZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnZ2FtZS1uYW1lJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdnYW1lLXNpemUnKSkge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2dhbWUtc2l6ZScpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnZ2FtZS1sZXZlbCcpKSB7XG4gICAgICAgICAgcGFyYW1zLnB1c2goZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnZ2FtZS1sZXZlbCcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGVlcGVzdEVsLm1hdGNoZXMoJ1tyYW5kb21dJykpIHtcbiAgICAgICAgcGFyYW1zLnB1c2goJ3JhbmRvbScpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGVlcGVzdEVsLm1hdGNoZXMoJ1tjb250aW51ZV0nKSkge1xuICAgICAgICBwYXJhbXMucHVzaCgnY29udGludWUnKTtcbiAgICAgIH1cblxuICAgICAgcm91dGVyLnNob3dSb3V0ZShwYXJhbXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgd2luZG93Lm9ucG9wc3RhdGUgPSAoKSA9PiB7XG4gICAgcm91dGVyLnNob3dSb3V0ZSgpO1xuICB9O1xuXG4gIHJvdXRlci5zaG93Um91dGUoKTtcbn0pO1xuIl0sIm5hbWVzIjpbIkdhbWVNZW51IiwiR2FtZU5vbm9ncmFtIiwiSGlnaFNjb3JlVGFibGUiLCJub25vZ3JhbXMiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIkFwcFJvdXRlciIsImNvbnN0cnVjdG9yIiwiYXBwIiwicm91dGVzIiwiaGFzaCIsInZpZXciLCJuYW1lIiwic2l6ZSIsImxldmVsIiwic2F2ZWRTb2x1dGlvbiIsImNyb3NzZWQiLCJtaW51dGVzIiwic2Vjb25kcyIsInJlc29sdmVkTmFtZSIsInJlc29sdmVkU2l6ZSIsInJlc29sdmVkTGV2ZWwiLCJjaGFuZ2VIYXNoIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJzaG93Um91dGUiLCJwYXJhbXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJoZWFkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzaGFkb3dSb290IiwiYnVyZ2VyTWVudSIsImNsYXNzTGlzdCIsImFkZCIsImJ1cmdlckJ0biIsInJlbW92ZSIsIm5ld1BhcmFtcyIsInJhbmRvbU51bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbU5vbm9ncmFtIiwic2F2ZWQiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY3VycmVudFNvbHV0aW9uIiwidGltZSIsIm1hdGNoIiwiZmluZCIsIml0ZW0iLCJzbGljZSIsImlubmVySFRNTCIsImJ1cmdlck1lbnVTdHlsZXNTdHIiLCJCdXJnZXJNZW51QnRuIiwiSFRNTEVsZW1lbnQiLCJjb25uZWN0ZWRDYWxsYmFjayIsImF0dGFjaFNoYWRvdyIsIm1vZGUiLCJidXJnZXJCdG5TdHlsZXMiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJhcHBlbmQiLCJidG4iLCJnYW1lTWVudSIsImlzQnVyZ2VyIiwiYWZ0ZXIiLCJvbmNsaWNrIiwidG9nZ2xlIiwiaGVhZGVyU3R5bGVzU3RyIiwiaGVhZGVyU3R5bGVzIiwidGVtcGxhdGUiLCJHYW1lSGVhZGVyIiwiY29udGVudCIsImNsb25lTm9kZSIsImluSGVhZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJtZW51U3R5bGVTdHIiLCJSYW5kb21CdG4iLCJDb250aW51ZUJ0biIsIlRlbXBsYXRlc0J0biIsIkhpZ2hTY29yZUJ0biIsIlRoZW1lQnRuIiwiTXV0ZUJ0biIsImxldmVscyIsIlNldCIsIm1hcCIsImxldmVsc0hUTUwiLCJnYW1lTmFtZXMiLCJmaWx0ZXIiLCJ0b1VwcGVyQ2FzZSIsImpvaW4iLCJtZW51U3R5bGVzIiwiYWN0aW9ucyIsImdldEF0dHJpYnV0ZSIsInN0eWxlIiwiZGlzcGxheSIsImxhc3RFbGVtZW50Q2hpbGQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImNvbnRpbnVlQnRuU3R5bGVzU3RyIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImlubmVyVGV4dCIsImNvbnRpbnVlQnRuU3R5bGVzIiwiaGlnaFNjb3JlQnRuU3R5bGVzU3RyIiwiaGlnaFNjb3JlQnRuU3R5bGVzIiwibXV0ZUJ0blN0eWxlc1N0ciIsIm11dGVCdG5TdHlsZXMiLCJjaG9vc2VJbWciLCJpc011dGVkIiwic2V0SXRlbSIsInJhbmRvbUJ0blN0eWxlc1N0ciIsInJhbmRvbUJ0blN0eWxlcyIsInRlbXBsYXRlc0J0blN0eWxlc1N0ciIsInRlbXBsYXRlc0J0blN0eWxlcyIsInRoZW1lQnRuU3R5bGVzU3RyIiwidGhlbWVCdG5TdHlsZXMiLCJyb290IiwiZG9jdW1lbnRFbGVtZW50IiwiY29udGFpbnMiLCJub25vZ3JhbVN0eWxlc1N0ciIsIkdhbWVGaWVsZCIsIlJlc3RhcnRCdG4iLCJTb2x1dGlvbkJ0biIsIlNhdmVCdG4iLCJHYW1lVGltZXIiLCJSZXN1bHRNb2RhbCIsIndpblNvdW5kRmlsZSIsIm5vbm9ncmFtU3R5bGVzIiwidGltZXIiLCJzYXZlZE1pbnV0ZXMiLCJzYXZlZFNlY29uZHMiLCJjb250aW51ZSIsIm5vbm9ncmFtIiwiZmllbGQiLCJpZCIsIm1hdHJpeCIsImNvcnJlY3RTb2x1dGlvbiIsImZsYXQiLCJ0b1N0cmluZyIsInN0ciIsImZvckVhY2giLCJlbCIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJzcXVhcmUiLCJjb25zb2xlIiwibG9nIiwidG9wUGFuZSIsImxlZnRQYW5lIiwibWF4TGVmdEhpbnRzIiwiaSIsImxlZnRIaW50IiwidG9wSGludCIsImNvdW50ZXJMZWZ0IiwiY291bnRlclRvcCIsImoiLCJjaGlsZHJlbiIsIm5vbm9ncmFtV2lkdGgiLCJvZmZzZXRXaWR0aCIsImNlbGxTaXplIiwic2V0UHJvcGVydHkiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJtaW51dGVzU3RyIiwic2Vjb25kc1N0ciIsIkF1ZGlvIiwicGxheSIsIm1vZGFsIiwibWVzc2FnZSIsInNldFRpbWVvdXQiLCJzYXZlZFJlc3VsdCIsImN1cnJlbnREdXJhdGlvbiIsImR1cmF0aW9uIiwiaGlnaFNjb3JlVGFibGUiLCJ1bnNoaWZ0Iiwic3RyaW5naWZ5IiwidGltZXJTdGFydGVkIiwicmVzdGFydCIsInN0b3AiLCJkZXRhaWwiLCJnYW1lIiwiY3VycmVudENyb3NzZWQiLCJjb250aW51ZUJ0biIsImlubmVyIiwibGF1bmNoIiwiZmllbGRTdHlsZXNTdHIiLCJmaWxsU291bmRGaWxlIiwiY2xlYXJTb3VuZEZpbGUiLCJjcm9zc1NvdW5kRmlsZSIsImZpZWxkU3R5bGVzIiwic3BsaXQiLCJyb3ciLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJBcnJheSIsImZpbGwiLCJjZWxsIiwiZSIsImNsaWNrc0Rpc2FibGVkIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwidGFyZ2V0IiwiY2hlY2tTb2x1dGlvbiIsInByZXZlbnREZWZhdWx0IiwiYnViYmxlcyIsImNvbXBvc2VkIiwiZW5hYmxlQ2xpY2tzIiwiZGlzYWJsZUNsaWNrcyIsInNvbHV0aW9uIiwidGltZXJTdHlsZXNTdHIiLCJ0aW1lclN0eWxlcyIsInJlbmRlcmVkIiwicmVuZGVyIiwib2JzZXJ2ZWRBdHRyaWJ1dGVzIiwiYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIiwibWluIiwic2VjIiwic3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsImNsZWFySW50ZXJ2YWwiLCJpbnRlcnZhbElEIiwic2V0SW50ZXJ2YWwiLCJ0cnVuYyIsImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwicmVzdGFydEJ0blN0eWxlc1N0ciIsInJlc3RhcnRCdG5TdHlsZXMiLCJtb2RhbFN0eWxlc1N0ciIsIm1vZGFsU3R5bGVzIiwiYXBwZW5kQ2hpbGQiLCJ3cmFwcGVyIiwiY2xhc3NOYW1lIiwiY2xvc2UiLCJzYXZlQnRuU3R5bGVzU3RyIiwic2F2ZUJ0blN0eWxlcyIsImN1cnJlbnRUYXJnZXQiLCJzb2x1dGlvbkJ0blN0eWxlc1N0ciIsInNvbHV0aW9uQnRuU3R5bGVzIiwiaGlnaFNjb3JlU3R5bGVzU3RyIiwicmVzdWx0cyIsInNvcnQiLCJhIiwiYiIsInJlc3VsdCIsImhpZ2hTY29yZVN0eWxlcyIsImJvZHkiLCJyb3V0ZXIiLCJkZWVwZXN0RWwiLCJjb21wb3NlZFBhdGgiLCJtYXRjaGVzIiwicHVzaCIsIm9ucG9wc3RhdGUiXSwic291cmNlUm9vdCI6IiJ9