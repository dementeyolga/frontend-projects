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
          resolvedName = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_3__[0].name;
          resolvedLevel = _resources_nonograms_json__WEBPACK_IMPORTED_MODULE_3__[0].level;
        }
        return `
            <game-nonogram name="${resolvedName}" level="${resolvedLevel}"  savedsolution="${savedSolution || ''}" crossed="${crossed || ''}" minutes="${minutes || '0'}" seconds="${seconds || '0'}">
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
                        <td>${result.level}</td>
                        <td>${result.name}</td>
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:var(--color-accent-secondary-2)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:var(--color-accent-secondary-4)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:var(--color-accent-secondary-3)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:var(--color-accent-secondary-3)}`;
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.button{padding:8px 12px;display:block;width:fit-content;color:var(--color-text-light);text-decoration:none;background-color:var(--color-accent-secondary-1);border-radius:10px;transition:.3s}.button:hover{cursor:pointer;filter:brightness(120%)}.button.disabled{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button.disabled:hover{cursor:default;filter:opacity(0.6) grayscale(0.5)}.button{background-color:var(--color-accent-secondary-2)}`;
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

module.exports = /*#__PURE__*/JSON.parse('[{"level":"5x5","name":"android","matrix":[[0,1,1,1,0],[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1]],"picture":"./"},{"level":"5x5","name":"flower","matrix":[[0,1,1,1,0],[1,0,1,0,1],[1,1,0,1,1],[1,0,1,0,1],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"rune","matrix":[[0,1,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,0,0]],"picture":"./"},{"level":"5x5","name":"smile","matrix":[[1,1,0,1,1],[1,1,0,1,1],[0,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"tower","matrix":[[1,0,1,0,1],[1,1,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"airplane","matrix":[[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,0,1,0,0],[0,1,1,1,0]],"picture":"./"},{"level":"5x5","name":"car","matrix":[[0,0,0,0,0],[0,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,0,1,0]],"picture":"./"},{"level":"5x5","name":"dog","matrix":[[0,0,0,1,0],[1,0,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,0,1,0]],"picture":"./"},{"level":"10x10","name":"mouse","matrix":[[0,0,1,1,0,0,0,1,1,0],[0,1,0,0,1,0,1,0,0,1],[0,1,0,1,1,1,1,1,0,1],[0,0,1,1,0,1,0,1,1,0],[0,0,0,1,1,1,1,1,0,0],[0,0,1,1,1,0,1,1,1,0],[1,0,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0]],"picture":"./"},{"level":"10x10","name":"alarm","matrix":[[0,1,1,0,0,0,0,1,1,0],[1,1,0,1,1,1,1,0,1,1],[1,0,1,1,1,0,1,1,0,1],[0,1,1,1,1,0,1,1,1,0],[0,1,1,1,1,0,1,1,1,0],[0,1,1,1,0,1,1,1,1,0],[0,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,0,0,1,1,0,0]],"picture":"./"},{"level":"10x10","name":"cup of coffee","matrix":[[0,0,1,0,1,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,0,0],[0,1,1,0,1,1,1,1,1,1],[0,1,1,0,1,1,1,1,0,1],[0,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,0,0],[1,0,1,1,1,1,1,0,0,1],[0,1,1,1,1,1,1,1,1,0]],"picture":"./"},{"level":"10x10","name":"leaf","matrix":[[0,0,0,0,1,1,1,1,1,1],[0,0,0,1,0,1,0,1,0,1],[0,0,1,1,0,1,0,1,1,0],[0,1,0,1,0,1,1,0,1,0],[0,1,0,1,0,1,1,1,1,0],[0,1,0,1,1,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,0,0,0,0,1,0,0],[0,1,0,1,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0]],"picture":"./"},{"level":"10x10","name":"TV","matrix":[[0,0,1,0,0,0,0,1,0,0],[0,0,0,1,0,0,1,0,0,0],[1,1,1,1,1,1,1,1,1,1],[1,0,1,1,0,0,0,0,1,1],[1,1,1,0,0,0,0,0,0,1],[1,0,1,0,0,0,0,0,0,1],[1,1,1,0,0,0,0,0,0,1],[1,1,1,1,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,0,0,0,0,0,0,1,0]],"picture":"./"},{"level":"10x10","name":"tree","matrix":[[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,0,1,1,1,0],[1,1,1,1,1,0,1,1,1,1],[1,1,0,1,1,1,0,0,1,1],[1,1,1,0,1,1,1,1,1,0],[0,1,1,1,1,1,0,0,0,0],[0,0,0,0,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,1,0,0,1,1,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"level":"10x10","name":"question","matrix":[[0,0,1,1,1,1,1,1,0,0],[0,1,1,0,0,0,0,1,1,0],[0,1,1,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,1,1,0],[0,0,0,0,0,0,1,1,1,0],[0,0,0,0,1,1,1,1,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0]],"picture":"./"},{"level":"10x10","name":"hot air balloon","matrix":[[1,1,1,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,1,0,1],[1,1,0,0,0,0,0,1,0,1],[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,0,1,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,0,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"level":"15x15","name":"deer","matrix":[[1,1,0,1,1,0,0,0,0,0,0,1,1,0,1],[1,1,0,1,1,0,1,0,0,1,0,1,1,0,1],[0,1,1,1,1,0,1,0,0,1,0,1,1,0,1],[0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],[0,0,0,0,1,1,0,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],[0,0,0,0,0,1,0,1,0,1,1,1,1,1,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1],[0,1,0,1,1,1,0,0,0,0,1,1,1,1,1],[0,1,1,1,1,1,0,0,0,0,1,1,1,1,1],[0,0,1,1,1,0,0,0,0,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1]],"picture":"./"},{"level":"15x15","name":"flower","matrix":[[0,0,0,1,1,0,1,1,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,1,1,1,1,1,0,0,0],[0,1,1,1,0,0,0,0,1,0,0,1,1,0,0],[1,1,0,0,1,1,1,0,0,0,0,0,1,0,0],[1,0,0,0,0,1,1,0,1,0,0,1,1,0,0],[1,1,1,0,1,0,0,0,0,1,1,1,0,0,0],[0,1,1,1,0,0,1,0,0,0,1,0,0,0,0],[0,0,1,0,0,1,1,1,0,0,1,0,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,0,0,1,0],[1,1,0,0,1,1,0,1,1,0,0,0,0,0,1],[1,1,1,0,0,1,0,1,0,0,1,1,1,1,1],[1,0,1,0,0,1,1,1,0,1,1,1,1,1,1],[0,1,1,1,0,0,1,0,0,1,1,1,0,1,1],[0,0,1,1,1,1,1,0,1,1,1,0,1,1,0],[0,0,0,0,0,1,1,1,0,0,1,1,1,0,0]],"picture":"./"},{"level":"15x15","name":"alarm","matrix":[[0,0,1,1,1,0,0,0,0,0,1,1,1,0,0],[0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],[1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],[1,1,0,1,1,1,1,0,1,1,1,1,0,1,1],[1,0,1,1,1,1,1,1,1,1,0,1,1,0,1],[0,0,1,1,1,1,1,1,1,0,1,1,1,0,0],[0,1,1,1,1,1,1,1,0,1,1,1,1,1,0],[0,1,0,0,1,0,0,0,1,1,1,0,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,1,1,1,1,0,0,0],[0,0,1,0,0,1,1,1,1,1,0,0,1,0,0],[0,1,0,0,1,0,1,1,1,0,1,0,0,1,0],[0,0,1,1,0,0,0,0,0,0,0,1,1,0,0]],"picture":"./"},{"level":"15x15","name":"castle","matrix":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],[1,1,0,1,1,0,1,0,0,0,1,1,0,1,1],[1,1,1,1,1,0,1,0,0,0,1,1,1,1,1],[1,0,0,0,1,0,1,0,0,0,1,0,0,0,1],[1,0,1,0,1,0,1,0,0,0,1,0,1,0,1],[1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,0,0,0,1,0,0,1],[1,0,1,1,1,0,0,1,0,0,1,1,1,0,1],[1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],[1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],[1,0,0,0,0,0,1,1,1,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],"picture":"./"},{"level":"15x15","name":"dolphin","matrix":[[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,1,1,0,1,1,1,1],[1,1,1,0,0,0,0,1,1,0,0,0,1,1,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,1,0,0,0,0,0,1,1,0,1,0,1,0,1],[0,0,0,1,1,0,1,1,0,1,0,1,1,0,0],[0,0,1,0,0,1,1,0,1,1,0,1,1,1,0],[1,1,1,0,1,1,1,0,1,1,1,0,1,1,1]],"picture":"./"},{"level":"15x15","name":"duck","matrix":[[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,1,1,1,1,0,1,1,1],[0,0,0,0,0,0,0,1,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],[1,0,0,0,0,0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,1,1,1,0,0,0,1,1,1,0],[1,1,1,1,1,1,1,0,1,1,1,0,1,1,0],[0,1,1,1,1,1,0,1,1,1,1,0,1,1,0],[0,1,1,1,1,1,1,1,1,0,0,1,1,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,1,1,1,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,1,1,1,0,0,0]],"picture":"./"},{"level":"15x15","name":"clover","matrix":[[0,0,0,0,0,1,1,0,1,1,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,1,1,1,0,1,1,1,1,1,0,1,1,1,0],[1,1,1,1,1,0,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],[0,1,1,1,1,1,1,0,1,1,1,1,1,1,0],[1,1,1,1,1,1,0,1,0,1,1,1,1,1,1],[1,1,1,1,1,0,0,1,0,0,1,1,1,1,1],[0,1,1,1,0,0,0,1,0,0,0,1,1,1,0],[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0,0,0,0,0,0]],"picture":"./"}]');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ3BCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvYXBwLXJvdXRlci9BcHBSb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvYnVyZ2VyTWVudS9CdXJnZXJNZW51QnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVIZWFkZXIvR2FtZUhlYWRlci5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9HYW1lTWVudS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9jb250aW51ZUJ0bi9Db250aW51ZUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9oaWdoU2NvcmVCdG4vSGlnaFNjb3JlQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L211dGVCdG4vTXV0ZUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9yYW5kb21CdG4vUmFuZG9uQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L3RlbXBsYXRlc0J0bi9UZW1wbGF0ZXNCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvdGhlbWVCdG4vVGhlbWVCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZUZpZWxkL0dhbWVGaWVsZC5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZVRpbWVyL0dhbWVUaW1lci5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vcmVzdGFydEJ0bi9SZXN0YXJ0QnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9yZXN1bHRNb2RhbC9SZXN1bHRNb2RhbC5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vc2F2ZUJ0bi9TYXZlQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zb2x1dGlvbkJ0bi9Tb2x1dGlvbkJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9oaWdoU2NvcmVUYWJsZS9IaWdoU2NvcmVUYWJsZS5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL21haW4uc2Nzcz9mYzc3Iiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvYWJzdHJhY3QvX3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2J1cmdlck1lbnUvQnVyZ2VyTWVudUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2Fic3RyYWN0L19taXhpbnMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2xheW91dC9fYmFzaWMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lSGVhZGVyL0dhbWVIZWFkZXIuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvR2FtZU1lbnUuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9jb21wb25lbnRzL19idXR0b24uc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9jb250aW51ZUJ0bi9Db250aW51ZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9oaWdoU2NvcmVCdG4vSGlnaFNjb3JlQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L211dGVCdG4vTXV0ZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS90ZW1wbGF0ZXNCdG4vVGVtcGxhdGVzQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L3RoZW1lQnRuL1RoZW1lQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvYmFzZS9fbm9ybWFsaXplLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbS5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vZ2FtZUZpZWxkL0dhbWVGaWVsZC5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vcmVzdWx0TW9kYWwvUmVzdWx0TW9kYWwuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NhdmVCdG4vU2F2ZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vc29sdXRpb25CdG4vU29sdXRpb25CdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvaGlnaFNjb3JlVGFibGUvSGlnaFNjb3JlVGFibGUuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZU1lbnUgfSBmcm9tICcuLi9nYW1lTWVudS9HYW1lTWVudSc7XG5pbXBvcnQgeyBHYW1lTm9ub2dyYW0gfSBmcm9tICcuLi9nYW1lTm9ub2dyYW0vR2FtZU5vbm9ncmFtJztcbmltcG9ydCB7IEhpZ2hTY29yZVRhYmxlIH0gZnJvbSAnLi4vaGlnaFNjb3JlVGFibGUvSGlnaFNjb3JlVGFibGUnO1xuaW1wb3J0IG5vbm9ncmFtcyBmcm9tICcuLi8uLi9yZXNvdXJjZXMvbm9ub2dyYW1zLmpzb24nO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtbWVudScsIEdhbWVNZW51KTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS1ub25vZ3JhbScsIEdhbWVOb25vZ3JhbSk7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2hpZ2gtc2NvcmUtdGFibGUnLCBIaWdoU2NvcmVUYWJsZSk7XG5cbmNsYXNzIEFwcFJvdXRlciB7XG4gIGNvbnN0cnVjdG9yKGFwcCkge1xuICAgIHRoaXMuYXBwID0gYXBwO1xuXG4gICAgdGhpcy5yb3V0ZXMgPSBbXG4gICAgICB7XG4gICAgICAgIGhhc2g6ICcnLFxuICAgICAgICB2aWV3OiAoKSA9PiAnPGdhbWUtbWVudSBtYWluLXBhZ2U9XCJ0cnVlXCI+PC9nYW1lLW1lbnU+JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGhhc2g6ICdub25vZ3JhbScsXG4gICAgICAgIHZpZXc6IChuYW1lLCBsZXZlbCwgc2F2ZWRTb2x1dGlvbiwgY3Jvc3NlZCwgbWludXRlcywgc2Vjb25kcykgPT4ge1xuICAgICAgICAgIGxldCByZXNvbHZlZE5hbWU7XG4gICAgICAgICAgbGV0IHJlc29sdmVkTGV2ZWw7XG5cbiAgICAgICAgICBpZiAobmFtZSAmJiBsZXZlbCkge1xuICAgICAgICAgICAgcmVzb2x2ZWROYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHJlc29sdmVkTGV2ZWwgPSBsZXZlbDtcblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2dhbWUtbmFtZScsIG5hbWUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2dhbWUtbGV2ZWwnLCBsZXZlbCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLW5hbWUnKSAmJlxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUtbGV2ZWwnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmVzb2x2ZWROYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUtbmFtZScpO1xuICAgICAgICAgICAgcmVzb2x2ZWRMZXZlbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLWxldmVsJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmVkTmFtZSA9IG5vbm9ncmFtc1swXS5uYW1lO1xuICAgICAgICAgICAgcmVzb2x2ZWRMZXZlbCA9IG5vbm9ncmFtc1swXS5sZXZlbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGdhbWUtbm9ub2dyYW0gbmFtZT1cIiR7cmVzb2x2ZWROYW1lfVwiIGxldmVsPVwiJHtyZXNvbHZlZExldmVsfVwiICBzYXZlZHNvbHV0aW9uPVwiJHtzYXZlZFNvbHV0aW9uIHx8ICcnfVwiIGNyb3NzZWQ9XCIke2Nyb3NzZWQgfHwgJyd9XCIgbWludXRlcz1cIiR7bWludXRlcyB8fCAnMCd9XCIgc2Vjb25kcz1cIiR7c2Vjb25kcyB8fCAnMCd9XCI+XG4gICAgICAgICAgICA8L2dhbWUtbm9ub2dyYW0+XG4gICAgICAgICAgYDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGhhc2g6ICdoaWdoLXNjb3JlJyxcbiAgICAgICAgdmlldzogKCkgPT4gJzxoaWdoLXNjb3JlLXRhYmxlPjwvaGlnaC1zY29yZS10YWJsZT4nLFxuICAgICAgfSxcbiAgICBdO1xuICB9XG5cbiAgY2hhbmdlSGFzaCh1cmwpIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHVybDtcbiAgfVxuXG4gIHNob3dSb3V0ZShwYXJhbXMgPSBbXSkge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dhbWUtaGVhZGVyJykuc2hhZG93Um9vdDtcbiAgICBjb25zdCBidXJnZXJNZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ2dhbWUtbWVudS5hYnNvbHV0ZScpO1xuICAgIGlmIChidXJnZXJNZW51KSB7XG4gICAgICBidXJnZXJNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1cmdlckJ0biA9IGhlYWRlclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ2J1cmdlci1idG4nKVxuICAgICAgLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLmJ1cmdlci1pY29uJyk7XG4gICAgYnVyZ2VyQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgY29uc3QgbmV3UGFyYW1zID0gWy4uLnBhcmFtc107XG5cbiAgICBpZiAocGFyYW1zWzBdID09PSAncmFuZG9tJykge1xuICAgICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbm9ub2dyYW1zLmxlbmd0aCk7XG4gICAgICBjb25zdCByYW5kb21Ob25vZ3JhbSA9IG5vbm9ncmFtc1tyYW5kb21OdW1dO1xuXG4gICAgICBuZXdQYXJhbXNbMF0gPSByYW5kb21Ob25vZ3JhbS5uYW1lO1xuICAgICAgbmV3UGFyYW1zWzFdID0gcmFuZG9tTm9ub2dyYW0ubGV2ZWw7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1swXSA9PT0gJ2NvbnRpbnVlJykge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZEdhbWUnKSk7XG5cbiAgICAgIG5ld1BhcmFtc1swXSA9IHNhdmVkLm5hbWU7XG4gICAgICBuZXdQYXJhbXNbMV0gPSBzYXZlZC5sZXZlbDtcbiAgICAgIG5ld1BhcmFtc1syXSA9IHNhdmVkLmN1cnJlbnRTb2x1dGlvbjtcbiAgICAgIG5ld1BhcmFtc1szXSA9IHNhdmVkLmNyb3NzZWQ7XG4gICAgICBuZXdQYXJhbXNbNF0gPSBzYXZlZC50aW1lLm1pbnV0ZXM7XG4gICAgICBuZXdQYXJhbXNbNV0gPSBzYXZlZC50aW1lLnNlY29uZHM7XG4gICAgfVxuXG4gICAgbGV0IG1hdGNoID0gdGhpcy5yb3V0ZXMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLmhhc2ggPT09IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpXG4gICAgKTtcblxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIG1hdGNoID0gdGhpcy5yb3V0ZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5oYXNoID09PSAnJyk7XG4gICAgfVxuXG4gICAgdGhpcy5hcHAuaW5uZXJIVE1MID0gbWF0Y2gudmlldyguLi5uZXdQYXJhbXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEFwcFJvdXRlciB9O1xuIiwiaW1wb3J0IGJ1cmdlck1lbnVTdHlsZXNTdHIgZnJvbSAnLi9CdXJnZXJNZW51QnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgQnVyZ2VyTWVudUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ1cmdlckJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgYnVyZ2VyQnRuU3R5bGVzLnRleHRDb250ZW50ID0gYnVyZ2VyTWVudVN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChidXJnZXJCdG5TdHlsZXMpO1xuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1cmdlci1pY29uJyk7XG4gICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXJnZXItaWNvbl9fc3Ryb2tlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnVyZ2VyLWljb25fX3N0cm9rZVwiPjwvZGl2PlxuICAgIGA7XG5cbiAgICBjb25zdCBnYW1lTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dhbWUtbWVudScpO1xuICAgIGdhbWVNZW51LmlzQnVyZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLmFmdGVyKGdhbWVNZW51KTtcbiAgICBnYW1lTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBnYW1lTWVudS5jbGFzc0xpc3QuYWRkKCdhYnNvbHV0ZScpO1xuXG4gICAgYnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICBnYW1lTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICB9O1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcbiAgfVxufVxuXG5leHBvcnQgeyBCdXJnZXJNZW51QnRuIH07XG4iLCJpbXBvcnQgaGVhZGVyU3R5bGVzU3RyIGZyb20gJy4vR2FtZUhlYWRlci5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgeyBCdXJnZXJNZW51QnRuIH0gZnJvbSAnLi4vYnVyZ2VyTWVudS9CdXJnZXJNZW51QnRuJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdidXJnZXItYnRuJywgQnVyZ2VyTWVudUJ0bik7XG5cbmNvbnN0IGhlYWRlclN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5oZWFkZXJTdHlsZXMudGV4dENvbnRlbnQgPSBoZWFkZXJTdHlsZXNTdHI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPGRpdiBpZD1cIndyYXBwZXJcIiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICA8YSBocmVmPVwiXCIgZGF0YS1saW5rPk5vbm9ncmFtczwvYT5cbiAgICA8YnVyZ2VyLWJ0bj48L2J1cmdlci1idG4+XG4gIDwvZGl2PiAgXG5gO1xuY2xhc3MgR2FtZUhlYWRlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGhlYWRlclN0eWxlcyk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgY29uc3QgZ2FtZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdnYW1lLW1lbnUnKTtcbiAgICBnYW1lTWVudS5pbkhlYWRlciA9IHRydWU7XG4gICAgZ2FtZU1lbnUuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJyk7XG4gICAgc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpLmFwcGVuZChnYW1lTWVudSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZUhlYWRlciB9O1xuIiwiaW1wb3J0IG1lbnVTdHlsZVN0ciBmcm9tICcuL0dhbWVNZW51LnN0eWxlcy5zY3NzJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcbmltcG9ydCB7IFJhbmRvbUJ0biB9IGZyb20gJy4vcmFuZG9tQnRuL1JhbmRvbkJ0bic7XG5pbXBvcnQgeyBDb250aW51ZUJ0biB9IGZyb20gJy4vY29udGludWVCdG4vQ29udGludWVCdG4nO1xuaW1wb3J0IHsgVGVtcGxhdGVzQnRuIH0gZnJvbSAnLi90ZW1wbGF0ZXNCdG4vVGVtcGxhdGVzQnRuJztcbmltcG9ydCB7IEhpZ2hTY29yZUJ0biB9IGZyb20gJy4vaGlnaFNjb3JlQnRuL0hpZ2hTY29yZUJ0bic7XG5pbXBvcnQgeyBUaGVtZUJ0biB9IGZyb20gJy4vdGhlbWVCdG4vVGhlbWVCdG4nO1xuaW1wb3J0IHsgTXV0ZUJ0biB9IGZyb20gJy4vbXV0ZUJ0bi9NdXRlQnRuJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyYW5kb20tYnRuJywgUmFuZG9tQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29udGludWUtYnRuJywgQ29udGludWVCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0ZW1wbGF0ZXMtYnRuJywgVGVtcGxhdGVzQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaGlnaC1zY29yZS1idG4nLCBIaWdoU2NvcmVCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0aGVtZS1idG4nLCBUaGVtZUJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ211dGUtYnRuJywgTXV0ZUJ0bik7XG5cbmNvbnN0IGxldmVscyA9IFsuLi5uZXcgU2V0KG5vbm9ncmFtcy5tYXAoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwpKV07XG5cbmxldCBsZXZlbHNIVE1MID0gbGV2ZWxzXG4gIC5tYXAoKGxldmVsKSA9PiB7XG4gICAgY29uc3QgZ2FtZU5hbWVzID0gbm9ub2dyYW1zXG4gICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSBsZXZlbClcbiAgICAgIC5tYXAoXG4gICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgIGA8YSBocmVmPVwibm9ub2dyYW1cIiBjbGFzcz1cIm1lbnVfX2l0ZW1cIiBsZXZlbD1cIiR7bGV2ZWx9XCIgZ2FtZS1uYW1lPVwiJHtpdGVtLm5hbWV9XCIgZGF0YS1saW5rPiR7aXRlbS5uYW1lfTwvYT5cXG5gXG4gICAgICApXG4gICAgICAuam9pbignXFxuJyk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImxldmVsXCI+XG4gICAgICAgIDxoMyBjbGFzcz1cImxldmVsX190aXRsZVwiPiR7bGV2ZWx9PC9oMz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxldmVsX19nYW1lc1wiPlxuICAgICAgICAgICR7Z2FtZU5hbWVzfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH0pXG4gIC5qb2luKCdcXG4nKTtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJhY3Rpb25zXCIgY2xhc3M9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bXV0ZS1idG4+PC9tdXRlLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVtZS1idG4+PC90aGVtZS1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGVzLWJ0bj48L3RlbXBsYXRlcy1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cmFuZG9tLWJ0bj48L3JhbmRvbS1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Y29udGludWUtYnRuPjwvY29udGludWUtYnRuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGhpZ2gtc2NvcmUtYnRuPjwvaGlnaC1zY29yZS1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5gO1xuXG5jbGFzcyBHYW1lTWVudSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgIGNvbnN0IG1lbnVTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIG1lbnVTdHlsZXMudGV4dENvbnRlbnQgPSBtZW51U3R5bGVTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQobWVudVN0eWxlcyk7XG5cbiAgICBjb25zdCBhY3Rpb25zID0gc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnYWN0aW9ucycpO1xuXG4gICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdtYWluLXBhZ2UnKSkge1xuICAgICAgYWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0J1cmdlciAmJiAhdGhpcy5pbkhlYWRlcikge1xuICAgICAgc2hhZG93Um9vdC5sYXN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBsZXZlbHNIVE1MKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNCdXJnZXIpIHtcbiAgICAgIGFjdGlvbnMuc3R5bGUuZmxleERpcmVjdGlvbiA9ICdjb2x1bW4nO1xuICAgICAgYWN0aW9ucy5zdHlsZS5hbGlnbkl0ZW1zID0gJ2NlbnRlcic7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVNZW51IH07XG4iLCJpbXBvcnQgY29udGludWVCdG5TdHlsZXNTdHIgZnJvbSAnLi9Db250aW51ZUJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIENvbnRpbnVlQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJ0bi5ocmVmID0gJ25vbm9ncmFtJztcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnY29udGludWUnLCB0cnVlKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnLCB0cnVlKTtcbiAgICBidG4uaW5uZXJUZXh0ID0gJ0NvbnRpbnVlIGdhbWUnO1xuXG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWRHYW1lJykpIHtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCBjb250aW51ZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgY29udGludWVCdG5TdHlsZXMudGV4dENvbnRlbnQgPSBjb250aW51ZUJ0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChjb250aW51ZUJ0blN0eWxlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQ29udGludWVCdG4gfTtcbiIsImltcG9ydCBoaWdoU2NvcmVCdG5TdHlsZXNTdHIgZnJvbSAnLi9IaWdoU2NvcmVCdG4uc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBIaWdoU2NvcmVCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYnRuLmhyZWYgPSAnaGlnaC1zY29yZSc7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycsIHRydWUpO1xuICAgIGJ0bi5pbm5lclRleHQgPSAnU2NvcmVzJztcblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCBoaWdoU2NvcmVCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGhpZ2hTY29yZUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IGhpZ2hTY29yZUJ0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChoaWdoU2NvcmVCdG5TdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEhpZ2hTY29yZUJ0biB9O1xuIiwiaW1wb3J0IG11dGVCdG5TdHlsZXNTdHIgZnJvbSAnLi9NdXRlQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgTXV0ZUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB0aGlzLmJ0biA9IGJ0bjtcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZChidG4pO1xuXG4gICAgY29uc3QgbXV0ZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgbXV0ZUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IG11dGVCdG5TdHlsZXNTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQobXV0ZUJ0blN0eWxlcyk7XG5cbiAgICB0aGlzLmNob29zZUltZygpO1xuXG4gICAgYnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBsZXQgaXNNdXRlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtdXRlZCcpO1xuXG4gICAgICBpZiAoIWlzTXV0ZWQpIHtcbiAgICAgICAgaXNNdXRlZCA9ICd0cnVlJztcbiAgICAgIH0gZWxzZSBpZiAoaXNNdXRlZCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGlzTXV0ZWQgPSAnZmFsc2UnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNNdXRlZCA9ICd0cnVlJztcbiAgICAgIH1cblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ211dGVkJywgaXNNdXRlZCk7XG5cbiAgICAgIHRoaXMuY2hvb3NlSW1nKCk7XG4gICAgfTtcbiAgfVxuXG4gIGNob29zZUltZygpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ211dGVkJykgPT09ICd0cnVlJykge1xuICAgICAgdGhpcy5idG4uaW5uZXJIVE1MID0gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjM0cHhcIiBoZWlnaHQ9XCIzNHB4XCIgdmlld0JveD1cIi0wLjUgMCAyNSAyNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgPHBhdGggZD1cIk0xMC45Mzk1IDE3LjcyQzEyLjkzOTUgMTkuNSAxNS4zODk1IDIwLjcyIDE2LjU0OTUgMjAuMzNDMTguNjQ5NSAxOS41NSAxOC45OTk1IDE1LjMyOTkgMTguOTk5NSAxMi40MDk5QzE4Ljk5OTUgMTEuNTk5OSAxOC45OTk1IDEwLjY4IDE4Ljg4OTUgOS43NzAwMlwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTE4LjEyOTIgNi4yODAwOEMxOC4wMDEyIDUuODkxMjkgMTcuNzk1IDUuNTMyNzMgMTcuNTIzMyA1LjIyNjYxQzE3LjI1MTYgNC45MjA1IDE2LjkyMDEgNC42NzMyNyAxNi41NDkzIDQuNTAwMDVDMTUuMzE5MyA0LjA0MDA1IDEyLjcwOTMgNS40OTk5NiAxMC41NDkzIDcuNDA5OTZIOC45NDkyMkM3Ljg4ODM1IDcuNDA5OTYgNi44NzA5MyA3LjgzMTQ1IDYuMTIwNzkgOC41ODE1OUM1LjM3MDY0IDkuMzMxNzQgNC45NDkyMiAxMC4zNDkxIDQuOTQ5MjIgMTEuNDFWMTMuNDFDNC45NDg5IDE0LjE4MTEgNS4xNzE1MSAxNC45MzYgNS41OTAyMSAxNS41ODM1QzYuMDA4OTIgMTYuMjMxMSA2LjYwNTg1IDE2Ljc0MzggNy4zMDkyIDE3LjA2XCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNMjIgMi40MjAwNEwyIDIyLjQyXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICAgYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idG4uaW5uZXJIVE1MID0gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjM0cHhcIiBoZWlnaHQ9XCIzNHB4XCIgdmlld0JveD1cIi0wLjUgMCAyNSAyNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgPHBhdGggZD1cIk0xMi41NDkzIDQuNTAwMDVDMTEuMzE5MyA0LjA0MDA1IDguNzA5MjYgNS40OTk5NiA2LjU0OTI2IDcuNDA5OTZINC45NDkyMkMzLjg4ODM1IDcuNDA5OTYgMi44NzA5MyA3LjgzMTQ1IDIuMTIwNzkgOC41ODE1OUMxLjM3MDY0IDkuMzMxNzQgMC45NDkyMTkgMTAuMzQ5MSAwLjk0OTIxOSAxMS40MVYxMy40MUMwLjk0OTIxOSAxNC40NzA4IDEuMzcwNjQgMTUuNDg4MyAyLjEyMDc5IDE2LjIzODVDMi44NzA5MyAxNi45ODg2IDMuODg4MzUgMTcuNDEgNC45NDkyMiAxNy40MUg2LjU0OTI2QzguNjU5MjYgMTkuMzUgMTEuMjY5MyAyMC43OCAxMi41NDkzIDIwLjMzQzE0LjY0OTMgMTkuNTUgMTQuOTk5MiAxNS4zMyAxNC45OTkyIDEyLjQxQzE0Ljk5OTIgOS40ODk5NiAxNC42NDkzIDUuMjgwMDUgMTIuNTQ5MyA0LjUwMDA1WlwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTIwLjY2MDIgNi43MTk5N0MyMi4xNTkzIDguMjIwMTEgMjMuMDAxNSAxMC4yNTQyIDIzLjAwMTUgMTIuMzc1QzIzLjAwMTUgMTQuNDk1OCAyMi4xNTkzIDE2LjUyOTkgMjAuNjYwMiAxOC4wM1wiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTE4LjUzOTEgMTUuOTVDMTkuNDc2NCAxNS4wMTIzIDIwLjAwMyAxMy43NDA3IDIwLjAwMyAxMi40MTQ5QzIwLjAwMyAxMS4wODkxIDE5LjQ3NjQgOS44MTc2NCAxOC41MzkxIDguODhcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuICAgICAgPC9zdmc+XG4gICAgICBgO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBNdXRlQnRuIH07XG4iLCJpbXBvcnQgcmFuZG9tQnRuU3R5bGVzU3RyIGZyb20gJy4vUmFuZG9tQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgUmFuZG9tQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJ0bi5ocmVmID0gJ25vbm9ncmFtJztcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgncmFuZG9tJywgdHJ1ZSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rJywgdHJ1ZSk7XG4gICAgYnRuLmlubmVyVGV4dCA9ICdSYW5kb20nO1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcblxuICAgIGNvbnN0IHJhbmRvbUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgcmFuZG9tQnRuU3R5bGVzLnRleHRDb250ZW50ID0gcmFuZG9tQnRuU3R5bGVzU3RyO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHJhbmRvbUJ0blN0eWxlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUmFuZG9tQnRuIH07XG4iLCJpbXBvcnQgdGVtcGxhdGVzQnRuU3R5bGVzU3RyIGZyb20gJy4vVGVtcGxhdGVzQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgVGVtcGxhdGVzQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJ0bi5ocmVmID0gJyc7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycsIHRydWUpO1xuICAgIGJ0bi5pbm5lclRleHQgPSAnVGVtcGxhdGVzJztcblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZXNCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHRlbXBsYXRlc0J0blN0eWxlcy50ZXh0Q29udGVudCA9IHRlbXBsYXRlc0J0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZXNCdG5TdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IFRlbXBsYXRlc0J0biB9O1xuIiwiaW1wb3J0IHRoZW1lQnRuU3R5bGVzU3RyIGZyb20gJy4vVGhlbWVCdG4uc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBUaGVtZUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB0aGlzLmJ0biA9IGJ0bjtcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZChidG4pO1xuXG4gICAgY29uc3QgdGhlbWVCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHRoZW1lQnRuU3R5bGVzLnRleHRDb250ZW50ID0gdGhlbWVCdG5TdHlsZXNTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGhlbWVCdG5TdHlsZXMpO1xuXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB0aGlzLmNob29zZUltZygpO1xuXG4gICAgYnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICByb290LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmsnKTtcbiAgICAgIHRoaXMuY2hvb3NlSW1nKCk7XG4gICAgfTtcbiAgfVxuXG4gIGNob29zZUltZygpIHtcbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGFyaycpKSB7XG4gICAgICB0aGlzLmJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICA8c3ZnIHdpZHRoPVwiMzRweFwiIGhlaWdodD1cIjM0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICA8cGF0aCBkPVwiTTIxLjA2NzIgMTEuODU2OEwyMC40MjUzIDExLjQ2OUwyMS4wNjcyIDExLjg1NjhaTTEyLjE0MzIgMi45MzI3NkwxMS43NTUzIDIuMjkwODVWMi4yOTA4NUwxMi4xNDMyIDIuOTMyNzZaTTcuMzc1NTQgMjAuMDEzQzcuMDE3IDE5LjgwNTYgNi41NTgyIDE5LjkyODEgNi4zNTA4IDIwLjI4NjZDNi4xNDMzOSAyMC42NDUyIDYuMjY1OTEgMjEuMTA0IDYuNjI0NDYgMjEuMzExNEw3LjM3NTU0IDIwLjAxM1pNMi42ODg2MiAxNy4zNzU1QzIuODk2MDIgMTcuNzM0MSAzLjM1NDgyIDE3Ljg1NjYgMy43MTMzNyAxNy42NDkyQzQuMDcxOTEgMTcuNDQxOCA0LjE5NDQzIDE2Ljk4MyAzLjk4NzAzIDE2LjYyNDVMMi42ODg2MiAxNy4zNzU1Wk0yMS4yNSAxMkMyMS4yNSAxNy4xMDg2IDE3LjEwODYgMjEuMjUgMTIgMjEuMjVWMjIuNzVDMTcuOTM3MSAyMi43NSAyMi43NSAxNy45MzcxIDIyLjc1IDEySDIxLjI1Wk0yLjc1IDEyQzIuNzUgNi44OTEzNyA2Ljg5MTM3IDIuNzUgMTIgMi43NVYxLjI1QzYuMDYyOTQgMS4yNSAxLjI1IDYuMDYyOTQgMS4yNSAxMkgyLjc1Wk0xNS41IDE0LjI1QzEyLjMyNDQgMTQuMjUgOS43NSAxMS42NzU2IDkuNzUgOC41SDguMjVDOC4yNSAxMi41MDQxIDExLjQ5NTkgMTUuNzUgMTUuNSAxNS43NVYxNC4yNVpNMjAuNDI1MyAxMS40NjlDMTkuNDE3MiAxMy4xMzczIDE3LjU4ODIgMTQuMjUgMTUuNSAxNC4yNVYxNS43NUMxOC4xMzQ5IDE1Ljc1IDIwLjQ0MDcgMTQuMzQzOSAyMS43MDkyIDEyLjI0NDdMMjAuNDI1MyAxMS40NjlaTTkuNzUgOC41QzkuNzUgNi40MTE4MiAxMC44NjI3IDQuNTgyOCAxMi41MzEgMy41NzQ2N0wxMS43NTUzIDIuMjkwODVDOS42NTYwOSAzLjU1OTMgOC4yNSA1Ljg2NTA5IDguMjUgOC41SDkuNzVaTTEyIDIuNzVDMTEuOTExNSAyLjc1IDExLjgwNzcgMi43MTAwOCAxMS43MzI0IDIuNjMxNjhDMTEuNjY4NiAyLjU2NTI3IDExLjY1MzggMi41MDI0NCAxMS42NTAzIDIuNDc3MDNDMTEuNjQ2MSAyLjQ0NTg3IDExLjY0ODIgMi4zNTU1NyAxMS43NTUzIDIuMjkwODVMMTIuNTMxIDMuNTc0NjdDMTMuMDM0MiAzLjI3MDY1IDEzLjE5NiAyLjcxMzk4IDEzLjEzNjggMi4yNzYyN0MxMy4wNzU0IDEuODIxMjYgMTIuNzE2NiAxLjI1IDEyIDEuMjVWMi43NVpNMjEuNzA5MiAxMi4yNDQ3QzIxLjY0NDQgMTIuMzUxOCAyMS41NTQxIDEyLjM1MzkgMjEuNTIzIDEyLjM0OTdDMjEuNDk3NiAxMi4zNDYyIDIxLjQzNDcgMTIuMzMxNCAyMS4zNjgzIDEyLjI2NzZDMjEuMjg5OSAxMi4xOTIzIDIxLjI1IDEyLjA4ODUgMjEuMjUgMTJIMjIuNzVDMjIuNzUgMTEuMjgzNCAyMi4xNzg3IDEwLjkyNDYgMjEuNzIzNyAxMC44NjMyQzIxLjI4NiAxMC44MDQgMjAuNzI5MyAxMC45NjU4IDIwLjQyNTMgMTEuNDY5TDIxLjcwOTIgMTIuMjQ0N1pNMTIgMjEuMjVDMTAuMzEzOSAyMS4yNSA4LjczNTMzIDIwLjc5OTYgNy4zNzU1NCAyMC4wMTNMNi42MjQ0NiAyMS4zMTE0QzguMjA2NCAyMi4yMjY1IDEwLjA0MzIgMjIuNzUgMTIgMjIuNzVWMjEuMjVaTTMuOTg3MDMgMTYuNjI0NUMzLjIwMDQzIDE1LjI2NDcgMi43NSAxMy42ODYxIDIuNzUgMTJIMS4yNUMxLjI1IDEzLjk1NjggMS43NzM1MSAxNS43OTM2IDIuNjg4NjIgMTcuMzc1NUwzLjk4NzAzIDE2LjYyNDVaXCIgZmlsbD1cIiNmZmZmZmZcIi8+XG4gICAgPC9zdmc+XG4gICAgICBgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICA8c3ZnIHdpZHRoPVwiMzRweFwiIGhlaWdodD1cIjM0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICA8cGF0aCBkPVwiTTcuMjg0NTEgMTAuMzMzM0M3LjEwMDI2IDEwLjg1NDYgNyAxMS40MTU2IDcgMTJDNyAxNC43NjE0IDkuMjM4NTggMTcgMTIgMTdDMTQuNzYxNCAxNyAxNyAxNC43NjE0IDE3IDEyQzE3IDkuMjM4NTggMTQuNzYxNCA3IDEyIDdDMTEuNDE1NiA3IDEwLjg1NDYgNy4xMDAyNiAxMC4zMzMzIDcuMjg0NTFcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNMTIgMlY0XCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTEyIDIwVjIyXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTQgMTJMMiAxMlwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgPHBhdGggZD1cIk0yMiAxMkwyMCAxMlwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgPHBhdGggZD1cIk0xOS43Nzc4IDQuMjIyNjZMMTcuNTU1OCA2LjI1NDI0XCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTQuMjIyMTcgNC4yMjI2Nkw2LjQ0NDE4IDYuMjU0MjRcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNNi40NDQzNCAxNy41NTU3TDQuMjIyMTEgMTkuNzc3OVwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgPHBhdGggZD1cIk0xOS43Nzc4IDE5Ljc3NzNMMTcuNTU1OCAxNy41NTUxXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICA8L3N2Zz5cbiAgICAgIGA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IFRoZW1lQnRuIH07XG4iLCJpbXBvcnQgbm9ub2dyYW1TdHlsZXNTdHIgZnJvbSAnLi9HYW1lTm9ub2dyYW0uc3R5bGVzLnNjc3MnO1xuaW1wb3J0IHsgR2FtZUZpZWxkIH0gZnJvbSAnLi9nYW1lRmllbGQvR2FtZUZpZWxkJztcbmltcG9ydCB7IFJlc3RhcnRCdG4gfSBmcm9tICcuL3Jlc3RhcnRCdG4vUmVzdGFydEJ0bic7XG5pbXBvcnQgeyBTb2x1dGlvbkJ0biB9IGZyb20gJy4vc29sdXRpb25CdG4vU29sdXRpb25CdG4nO1xuaW1wb3J0IHsgU2F2ZUJ0biB9IGZyb20gJy4vc2F2ZUJ0bi9TYXZlQnRuJztcbmltcG9ydCB7IEdhbWVUaW1lciB9IGZyb20gJy4vZ2FtZVRpbWVyL0dhbWVUaW1lcic7XG5pbXBvcnQgeyBSZXN1bHRNb2RhbCB9IGZyb20gJy4vcmVzdWx0TW9kYWwvUmVzdWx0TW9kYWwnO1xuaW1wb3J0IG5vbm9ncmFtcyBmcm9tICcuLi8uLi9yZXNvdXJjZXMvbm9ub2dyYW1zLmpzb24nO1xuaW1wb3J0IHdpblNvdW5kRmlsZSBmcm9tICcuLy4uLy4uL2Fzc2V0cy9zb3VuZC1lZmZlY3RzL3dpbi1nYW1lLm1wMyc7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS1maWVsZCcsIEdhbWVGaWVsZCk7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3Jlc3RhcnQtYnRuJywgUmVzdGFydEJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NvbHV0aW9uLWJ0bicsIFNvbHV0aW9uQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc2F2ZS1idG4nLCBTYXZlQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS10aW1lcicsIEdhbWVUaW1lcik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3Jlc3VsdC1tb2RhbCcsIFJlc3VsdE1vZGFsKTtcblxuY29uc3Qgbm9ub2dyYW1TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xubm9ub2dyYW1TdHlsZXMudGV4dENvbnRlbnQgPSBub25vZ3JhbVN0eWxlc1N0cjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8ZGl2IGNsYXNzPVwibm9ub2dyYW1fX2NvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zXCI+XG4gICAgICA8cmVzdGFydC1idG4+PC9yZXN0YXJ0LWJ0bj5cbiAgICAgIDxzYXZlLWJ0bj48L3NhdmUtYnRuPlxuICAgICAgPGdhbWUtdGltZXIgaWQ9XCJnYW1lLXRpbWVyXCIgbWludXRlcz1cIjBcIiBzZWNvbmRzPVwiMFwiPjwvZ2FtZS10aW1lcj5cbiAgICAgIDxzb2x1dGlvbi1idG4+PC9zb2x1dGlvbi1idG4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGlkPVwic3VtbWFyeVwiIGNsYXNzPVwic3VtbWFyeVwiPlxuICAgICAgPC9kaXY+ICBcbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwibm9ub2dyYW1fX3dyYXBwZXJcIj5cbiAgICAgIDxkaXYgaWQ9XCJub25vZ3JhbVwiIGNsYXNzPVwibm9ub2dyYW1cIj5cbiAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9wLXBhbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZnQtcGFuZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+ICBcbiAgICBcbiAgPC9kaXY+XG5gO1xuXG5jbGFzcyBHYW1lTm9ub2dyYW0gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQobm9ub2dyYW1TdHlsZXMpO1xuXG4gICAgY29uc3QgbGV2ZWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKTtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICBjb25zdCBzYXZlZFNvbHV0aW9uID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NhdmVkc29sdXRpb24nKTtcbiAgICBjb25zdCBjcm9zc2VkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Nyb3NzZWQnKTtcblxuICAgIGNvbnN0IHRpbWVyID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS10aW1lcicpO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKSAhPT0gJzAnIHx8XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpICE9PSAnMCdcbiAgICApIHtcbiAgICAgIGNvbnN0IHNhdmVkTWludXRlcyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdtaW51dGVzJyk7XG4gICAgICBjb25zdCBzYXZlZFNlY29uZHMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpO1xuXG4gICAgICB0aW1lci5zZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnLCBzYXZlZE1pbnV0ZXMpO1xuICAgICAgdGltZXIuc2V0QXR0cmlidXRlKCdzZWNvbmRzJywgc2F2ZWRTZWNvbmRzKTtcblxuICAgICAgdGltZXIuY29udGludWUgPSB0cnVlO1xuICAgIH1cblxuICAgIHNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ3N1bW1hcnknKS5pbm5lckhUTUwgPSBgXG4gICAgICA8cCBjbGFzcz1cInN1bW1hcnlfX2xldmVsXCI+JHtsZXZlbH08L3A+XG4gICAgICA8cCBjbGFzcz1cInN1bW1hcnlfX25hbWVcIj4gJHtuYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpfTwvcD5cbiAgICBgO1xuXG4gICAgY29uc3Qgbm9ub2dyYW0gPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNub25vZ3JhbScpO1xuICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ2FtZS1maWVsZCcpO1xuICAgIGZpZWxkLmlkID0gJ2dhbWUtZmllbGQnO1xuICAgIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2dhbWUtZmllbGQnKTtcbiAgICBmaWVsZC5zYXZlZFNvbHV0aW9uID0gc2F2ZWRTb2x1dGlvbjtcbiAgICBmaWVsZC5jcm9zc2VkID0gY3Jvc3NlZDtcbiAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2xldmVsJywgbGV2ZWwpO1xuXG4gICAgbm9ub2dyYW0uYXBwZW5kKGZpZWxkKTtcblxuICAgIGNvbnN0IHsgbWF0cml4IH0gPSBub25vZ3JhbXMuZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IG5hbWUgJiYgaXRlbS5sZXZlbCA9PT0gbGV2ZWxcbiAgICApO1xuXG4gICAgY29uc3QgY29ycmVjdFNvbHV0aW9uID0gbWF0cml4LmZsYXQoKS5qb2luKCcnKS50b1N0cmluZygpO1xuXG4gICAgLy8gRHJhdyBtYXRyaXggc29sdXRpb25cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgbWF0cml4LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBzdHIgKz0gZWwucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gY3VyciA/ICfilqAnIDogJ+KWoSc7XG4gICAgICAgIHJldHVybiBhY2MgKyBzcXVhcmU7XG4gICAgICB9LCAnJyk7XG4gICAgICBzdHIgKz0gJ1xcbic7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coc3RyKTtcblxuICAgIGNvbnN0IHRvcFBhbmUgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy50b3AtcGFuZScpO1xuICAgIGNvbnN0IGxlZnRQYW5lID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubGVmdC1wYW5lJyk7XG4gICAgbGV0IG1heExlZnRIaW50cyA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdHJpeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbGVmdEhpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGxlZnRIaW50LmNsYXNzTGlzdC5hZGQoJ2xlZnQtcGFuZV9faGludCcpO1xuXG4gICAgICBjb25zdCB0b3BIaW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b3BIaW50LmNsYXNzTGlzdC5hZGQoJ3RvcC1wYW5lX19oaW50Jyk7XG5cbiAgICAgIGxldCBjb3VudGVyTGVmdCA9IDA7XG4gICAgICBsZXQgY291bnRlclRvcCA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4Lmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChtYXRyaXhbaV1bal0pIHtcbiAgICAgICAgICBjb3VudGVyTGVmdCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChjb3VudGVyTGVmdCAmJiAhbWF0cml4W2ldW2pdKSB8fFxuICAgICAgICAgIChjb3VudGVyTGVmdCAmJiBqID09PSBtYXRyaXgubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGVmdEhpbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAgICAgICBgXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsZWZ0LXBhbmVfX251bWJlclwiPiR7Y291bnRlckxlZnR9PC9kaXY+XG5cdFx0XHRcdFx0XHRgXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvdW50ZXJMZWZ0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRyaXhbal1baV0pIHtcbiAgICAgICAgICBjb3VudGVyVG9wICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgKGNvdW50ZXJUb3AgJiYgIW1hdHJpeFtqXVtpXSkgfHxcbiAgICAgICAgICAoY291bnRlclRvcCAmJiBqID09PSBtYXRyaXgubGVuZ3RoIC0gMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdG9wSGludC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgICAgIGBcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ0b3AtcGFuZV9fbnVtYmVyXCI+JHtjb3VudGVyVG9wfTwvZGl2PlxuXHRcdFx0XHRcdFx0YFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb3VudGVyVG9wID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZWZ0UGFuZS5hcHBlbmQobGVmdEhpbnQpO1xuICAgICAgdG9wUGFuZS5hcHBlbmQodG9wSGludCk7XG5cbiAgICAgIGlmIChsZWZ0SGludC5jaGlsZHJlbi5sZW5ndGggPiBtYXhMZWZ0SGludHMpIHtcbiAgICAgICAgbWF4TGVmdEhpbnRzID0gbGVmdEhpbnQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSBjZWxsIHNpemVcbiAgICBjb25zdCBub25vZ3JhbVdpZHRoID0gbm9ub2dyYW0ub2Zmc2V0V2lkdGg7XG5cbiAgICBsZXQgY2VsbFNpemUgPSBub25vZ3JhbVdpZHRoIC8gKG1heExlZnRIaW50cyArIG1hdHJpeC5sZW5ndGgpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jZWxsLXNpemUnLCBjZWxsU2l6ZSArICdweCcpO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdmaWxsJywgKCkgPT4ge1xuICAgICAgaWYgKGNvcnJlY3RTb2x1dGlvbiA9PT0gZmllbGQuY3VycmVudFNvbHV0aW9uKSB7XG4gICAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd3aW4nKSk7XG4gICAgICAgIHRpbWVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd3aW4nKSk7XG5cbiAgICAgICAgY29uc3QgbWludXRlcyA9IHRpbWVyLmdldEF0dHJpYnV0ZSgnbWludXRlcycpO1xuICAgICAgICBsZXQgbWludXRlc1N0ciA9ICcnO1xuICAgICAgICBpZiAoK21pbnV0ZXMpIHtcbiAgICAgICAgICBtaW51dGVzU3RyID1cbiAgICAgICAgICAgICttaW51dGVzID4gMSA/IG1pbnV0ZXMgKyAnIG1pbnV0ZXMgJyA6IG1pbnV0ZXMgKyAnIG1pbnV0ZSAnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVyLmdldEF0dHJpYnV0ZSgnc2Vjb25kcycpO1xuICAgICAgICBsZXQgc2Vjb25kc1N0ciA9ICcnO1xuICAgICAgICBpZiAoK3NlY29uZHMpIHtcbiAgICAgICAgICBzZWNvbmRzU3RyID1cbiAgICAgICAgICAgICtzZWNvbmRzID4gMSA/IHNlY29uZHMgKyAnIHNlY29uZHMnIDogc2Vjb25kcyArICcgc2Vjb25kJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXV0ZWQnKSAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgbmV3IEF1ZGlvKHdpblNvdW5kRmlsZSkucGxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdyZXN1bHQtbW9kYWwnKTtcbiAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIG1vZGFsLm1lc3NhZ2UgPSBgR3JlYXQhIFlvdSBoYXZlIHNvbHZlZCB0aGUgbm9ub2dyYW0gJHtuYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpfSBpbiAke21pbnV0ZXNTdHJ9JHtzZWNvbmRzU3RyfSFgO1xuICAgICAgICBzaGFkb3dSb290LmFwcGVuZChtb2RhbCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIH0sIDApO1xuXG4gICAgICAgIGNvbnN0IHNhdmVkUmVzdWx0ID0ge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgbGV2ZWwsXG4gICAgICAgICAgdGltZTogdGltZXIuY3VycmVudER1cmF0aW9uLFxuICAgICAgICAgIGR1cmF0aW9uOiArbWludXRlcyAqIDYwICsgK3NlY29uZHMsXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGhpZ2hTY29yZVRhYmxlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlnaFNjb3JlVGFibGUnKSk7XG4gICAgICAgIGlmICghaGlnaFNjb3JlVGFibGUpIGhpZ2hTY29yZVRhYmxlID0gW107XG4gICAgICAgIGhpZ2hTY29yZVRhYmxlLnVuc2hpZnQoc2F2ZWRSZXN1bHQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAnaGlnaFNjb3JlVGFibGUnLFxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGhpZ2hTY29yZVRhYmxlLnNsaWNlKDAsIDUpKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdyZXN0YXJ0JywgKCkgPT4ge1xuICAgICAgZmllbGQudGltZXJTdGFydGVkID0gZmFsc2U7XG4gICAgICBmaWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgncmVzdGFydCcpKTtcbiAgICAgIHRpbWVyLnJlc3RhcnQoKTtcbiAgICB9KTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignc29sdXRpb24nLCAoKSA9PiB7XG4gICAgICB0aW1lci5zdG9wKCk7XG5cbiAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc29sdXRpb24nLCB7XG4gICAgICAgICAgZGV0YWlsOiBtYXRyaXguZmxhdCgpLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignc2F2ZS1nYW1lJywgKCkgPT4ge1xuICAgICAgY29uc3QgZ2FtZSA9IHtcbiAgICAgICAgbGV2ZWwsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGN1cnJlbnRTb2x1dGlvbjogZmllbGQuY3VycmVudFNvbHV0aW9uLFxuICAgICAgICBjcm9zc2VkOiBmaWVsZC5jdXJyZW50Q3Jvc3NlZCxcbiAgICAgICAgdGltZToge1xuICAgICAgICAgIG1pbnV0ZXM6IHRpbWVyLm1pbnV0ZXMsXG4gICAgICAgICAgc2Vjb25kczogdGltZXIuc2Vjb25kcyxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzYXZlZEdhbWUnLCBKU09OLnN0cmluZ2lmeShnYW1lKSk7XG5cbiAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dhbWUtaGVhZGVyJyk7XG4gICAgICBjb25zdCBjb250aW51ZUJ0biA9IGhlYWRlci5zaGFkb3dSb290XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKCdnYW1lLW1lbnUuaGVhZGVyJylcbiAgICAgICAgLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignY29udGludWUtYnRuJyk7XG4gICAgICBjb25zdCBpbm5lciA9IGNvbnRpbnVlQnRuLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLmJ1dHRvbicpO1xuICAgICAgaW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICB9KTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignc3RhcnR0aW1lcicsICgpID0+IHtcbiAgICAgIHRpbWVyLmxhdW5jaCgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVOb25vZ3JhbSB9O1xuIiwiaW1wb3J0IGZpZWxkU3R5bGVzU3RyIGZyb20gJy4vR2FtZUZpZWxkLnN0eWxlcy5zY3NzJztcbmltcG9ydCBmaWxsU291bmRGaWxlIGZyb20gJy4vLi4vLi4vLi4vYXNzZXRzL3NvdW5kLWVmZmVjdHMvZmlsbC1jZWxsLm1wMyc7XG5pbXBvcnQgY2xlYXJTb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy9jbGVhci1jZWxsLm1wMyc7XG5pbXBvcnQgY3Jvc3NTb3VuZEZpbGUgZnJvbSAnLi8uLi8uLi8uLi9hc3NldHMvc291bmQtZWZmZWN0cy9jcm9zcy1jZWxsLm1wMyc7XG5cbmNvbnN0IGZpZWxkU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbmZpZWxkU3R5bGVzLnRleHRDb250ZW50ID0gZmllbGRTdHlsZXNTdHI7XG5cbmNsYXNzIEdhbWVGaWVsZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGZpZWxkU3R5bGVzKTtcblxuICAgIHRoaXMubGV2ZWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKS5zcGxpdCgneCcpWzBdO1xuXG4gICAgdGhpcy5maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuZmllbGQuaWQgPSAnZmllbGQnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsOyBpICs9IDEpIHtcbiAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdyb3cnKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZXZlbDsgaiArPSAxKSB7XG4gICAgICAgIHJvdy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PmApO1xuICAgICAgfVxuICAgICAgdGhpcy5maWVsZC5hcHBlbmQocm93KTtcbiAgICB9XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZCh0aGlzLmZpZWxkKTtcblxuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmZpZWxkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG5cbiAgICB0aGlzLmN1cnJlbnRTb2x1dGlvbiA9XG4gICAgICB0aGlzLnNhdmVkU29sdXRpb24gfHwgbmV3IEFycmF5KHRoaXMuY2VsbHMubGVuZ3RoKS5maWxsKDApLmpvaW4oJycpO1xuXG4gICAgaWYgKHRoaXMuc2F2ZWRTb2x1dGlvbikge1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNhdmVkU29sdXRpb25baV0gPT09ICcxJykge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNyb3NzZWQpIHtcbiAgICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jcm9zc2VkW2ldID09PSAneCcpIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2Nyb3NzZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5jbGlja3NEaXNhYmxlZCkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5jbGlja3NEaXNhYmxlZCkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJyk7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdmaWxsZWQnKTtcblxuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtdXRlZCcpICE9PSAndHJ1ZScpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZmlsbGVkJykpIHtcbiAgICAgICAgICBuZXcgQXVkaW8oZmlsbFNvdW5kRmlsZSkucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ldyBBdWRpbyhjbGVhclNvdW5kRmlsZSkucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tTb2x1dGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2Nyb3NzZWQnKTtcblxuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtdXRlZCcpICE9PSAndHJ1ZScpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY3Jvc3NlZCcpKSB7XG4gICAgICAgICAgbmV3IEF1ZGlvKGNyb3NzU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3IEF1ZGlvKGNsZWFyU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja1NvbHV0aW9uKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGltZXJTdGFydGVkKSByZXR1cm47XG4gICAgICB0aGlzLnRpbWVyU3RhcnRlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuZmllbGQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzdGFydHRpbWVyJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRpbWVyU3RhcnRlZCkgcmV0dXJuO1xuICAgICAgdGhpcy50aW1lclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc3RhcnR0aW1lcicsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigncmVzdGFydCcsICgpID0+IHtcbiAgICAgIHRoaXMuZW5hYmxlQ2xpY2tzKCk7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJywgJ2Nyb3NzZWQnKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3NvbHV0aW9uJywgKGUpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUNsaWNrcygpO1xuXG4gICAgICBjb25zdCBzb2x1dGlvbiA9IGUuZGV0YWlsO1xuXG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgICAgaWYgKHNvbHV0aW9uW2ldKSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJyk7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nyb3NzZWQnKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignd2luJywgKCkgPT4ge1xuICAgICAgdGhpcy5kaXNhYmxlQ2xpY2tzKCk7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrU29sdXRpb24oKSB7XG4gICAgdGhpcy5jdXJyZW50U29sdXRpb24gPSBbLi4udGhpcy5jZWxsc10ucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgIHJldHVybiBjdXJyLmNsYXNzTGlzdC5jb250YWlucygnZmlsbGVkJykgPyBhY2MgKyAnMScgOiBhY2MgKyAnMCc7XG4gICAgfSwgJycpO1xuXG4gICAgdGhpcy5jdXJyZW50Q3Jvc3NlZCA9IFsuLi50aGlzLmNlbGxzXS5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgcmV0dXJuIGN1cnIuY2xhc3NMaXN0LmNvbnRhaW5zKCdjcm9zc2VkJykgPyBhY2MgKyAneCcgOiBhY2MgKyAnMCc7XG4gICAgfSwgJycpO1xuXG4gICAgdGhpcy5maWVsZC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdmaWxsJywge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGRpc2FibGVDbGlja3MoKSB7XG4gICAgdGhpcy5jbGlja3NEaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICBlbmFibGVDbGlja3MoKSB7XG4gICAgdGhpcy5jbGlja3NEaXNhYmxlZCA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVGaWVsZCB9O1xuIiwiaW1wb3J0IHRpbWVyU3R5bGVzU3RyIGZyb20gJy4vR2FtZVRpbWVyLnN0eWxlcy5zY3NzJztcblxuY29uc3QgdGltZXJTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xudGltZXJTdHlsZXMudGV4dENvbnRlbnQgPSB0aW1lclN0eWxlc1N0cjtcblxuY2xhc3MgR2FtZVRpbWVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmFwcGVuZCh0aW1lclN0eWxlcyk7XG5cbiAgICBpZiAoIXRoaXMucmVuZGVyZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLnJlbmRlcmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3dpbicsICgpID0+IHRoaXMuc3RvcCgpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgbWludXRlcyA9XG4gICAgICB0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpLmxlbmd0aCA9PT0gMVxuICAgICAgICA/IGAwJHt0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpfWBcbiAgICAgICAgOiB0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpO1xuXG4gICAgbGV0IHNlY29uZHMgPVxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKS5sZW5ndGggPT09IDFcbiAgICAgICAgPyBgMCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKX1gXG4gICAgICAgIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKTtcblxuICAgIGNvbnN0IGR1cmF0aW9uID0gYCR7bWludXRlc306JHtzZWNvbmRzfWA7XG5cbiAgICB0aGlzLm1pbnV0ZXMgPSBtaW51dGVzO1xuICAgIHRoaXMuc2Vjb25kcyA9IHNlY29uZHM7XG4gICAgdGhpcy5jdXJyZW50RHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICB0aGlzLmlubmVySFRNTCA9IGR1cmF0aW9uO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnbWludXRlcycsICdzZWNvbmRzJ107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGxhdW5jaCgpIHtcbiAgICBpZiAodGhpcy5jb250aW51ZSkge1xuICAgICAgY29uc3QgdGltZSA9IHRoaXMuY3VycmVudER1cmF0aW9uLnNwbGl0KCc6Jyk7XG4gICAgICBjb25zdCBtaW4gPSArdGltZVswXTtcbiAgICAgIGNvbnN0IHNlYyA9ICt0aW1lWzFdO1xuXG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCkgLSAobWluICogNjAgKyBzZWMpICogMTAwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKTtcblxuICAgIHRoaXMuaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGgudHJ1bmMoKG5vdyAtIHRoaXMuc3RhcnRUaW1lKSAvIDEwMDApO1xuXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2Vjb25kcycsIGR1cmF0aW9uICUgNjApO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnLCBNYXRoLmZsb29yKGR1cmF0aW9uIC8gNjApKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xuICB9XG5cbiAgcmVzdGFydCgpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XG4gICAgdGhpcy5jb250aW51ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlY29uZHMnLCAnMCcpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtaW51dGVzJywgJzAnKTtcblxuICAgIHRoaXMuc3RvcCgpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZVRpbWVyIH07XG4iLCJpbXBvcnQgcmVzdGFydEJ0blN0eWxlc1N0ciBmcm9tICcuL1Jlc3RhcnRCdG4uc3R5bGVzLnNjc3MnO1xuXG5jb25zdCByZXN0YXJ0QnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnJlc3RhcnRCdG5TdHlsZXMudGV4dENvbnRlbnQgPSByZXN0YXJ0QnRuU3R5bGVzU3RyO1xuXG5jbGFzcyBSZXN0YXJ0QnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+UmVzdGFydCBnYW1lPC9kaXY+XG4gICAgYDtcbiAgICBzaGFkb3dSb290LmFwcGVuZChyZXN0YXJ0QnRuU3R5bGVzKTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQub25jbGljayA9ICgpID0+IHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdyZXN0YXJ0Jywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IHsgUmVzdGFydEJ0biB9O1xuIiwiaW1wb3J0IG1vZGFsU3R5bGVzU3RyIGZyb20gJy4vUmVzdWx0TW9kYWwuc3R5bGVzLnNjc3MnO1xuXG5jb25zdCBtb2RhbFN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5tb2RhbFN0eWxlcy5pbm5lclRleHQgPSBtb2RhbFN0eWxlc1N0cjtcblxuY2xhc3MgUmVzdWx0TW9kYWwgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKG1vZGFsU3R5bGVzKTtcblxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICdtb2RhbF9fd3JhcHBlcic7XG5cbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1vZGFsLmNsYXNzTmFtZSA9ICdtb2RhbCc7XG5cbiAgICBpZiAodGhpcy5tZXNzYWdlKSB7XG4gICAgICBtb2RhbC50ZXh0Q29udGVudCA9IHRoaXMubWVzc2FnZTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNsb3NlLmNsYXNzTmFtZSA9ICdtb2RhbF9fY2xvc2UnO1xuICAgIGNsb3NlLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbF9fY2xvc2Utc3Ryb2tlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWxfX2Nsb3NlLXN0cm9rZVwiPjwvZGl2PlxuICAgIGA7XG5cbiAgICBtb2RhbC5hcHBlbmQoY2xvc2UpO1xuICAgIHdyYXBwZXIuYXBwZW5kKG1vZGFsKTtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh3cmFwcGVyKTtcblxuICAgIGNsb3NlLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4gd3JhcHBlci5yZW1vdmUoKSk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBSZXN1bHRNb2RhbCB9O1xuIiwiaW1wb3J0IHNhdmVCdG5TdHlsZXNTdHIgZnJvbSAnLi9TYXZlQnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3Qgc2F2ZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5zYXZlQnRuU3R5bGVzLnRleHRDb250ZW50ID0gc2F2ZUJ0blN0eWxlc1N0cjtcblxuY2xhc3MgU2F2ZUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvblwiPlNhdmUgZ2FtZTwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoc2F2ZUJ0blN0eWxlcyk7XG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLmN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzYXZlLWdhbWUnLCB7IGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IFNhdmVCdG4gfTtcbiIsImltcG9ydCBzb2x1dGlvbkJ0blN0eWxlc1N0ciBmcm9tICcuL1NvbHV0aW9uQnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3Qgc29sdXRpb25CdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuc29sdXRpb25CdG5TdHlsZXMudGV4dENvbnRlbnQgPSBzb2x1dGlvbkJ0blN0eWxlc1N0cjtcblxuY2xhc3MgU29sdXRpb25CdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIj5Tb2x1dGlvbjwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoc29sdXRpb25CdG5TdHlsZXMpO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgIGUuY3VycmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NvbHV0aW9uJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IHsgU29sdXRpb25CdG4gfTtcbiIsImltcG9ydCBoaWdoU2NvcmVTdHlsZXNTdHIgZnJvbSAnLi9IaWdoU2NvcmVUYWJsZS5zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIEhpZ2hTY29yZVRhYmxlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgbGV0IHJlc3VsdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWdoU2NvcmVUYWJsZScpKTtcblxuICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICByZXN1bHRzID0gcmVzdWx0cy5zbGljZSgwLCA1KTtcbiAgICAgIHJlc3VsdHMuc29ydCgoYSwgYikgPT4gYS5kdXJhdGlvbiAtIGIuZHVyYXRpb24pO1xuICAgICAgcmVzdWx0cyA9IHJlc3VsdHMubWFwKFxuICAgICAgICAocmVzdWx0LCBpKSA9PiBgICA8dHIgY2xhc3M9XCJoaWdoLXNjb3Jlc19fc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke2kgKyAxfS48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7cmVzdWx0LnRpbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3Jlc3VsdC5sZXZlbH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7cmVzdWx0Lm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICApO1xuICAgIH1cblxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiaGlnaC1zY29yZXNcIj5cbiAgICAgIDxoMj5MYXRlc3QgNSBzY29yZXM6PC9oMj5cbiAgICAgIDx0YWJsZSBjbGFzcz1cImhpZ2gtc2NvcmVzX19zY29yZXNcIj5cbiAgICAgICAgJHtcbiAgICAgICAgICByZXN1bHRzXG4gICAgICAgICAgICA/IGBcbiAgICAgICAgPHRyIGNsYXNzPVwiaGlnaC1zY29yZXNfX3Njb3JlIGhlYWRlclwiPlxuICAgICAgICA8dGg+Tm88L3RoPlxuICAgICAgICA8dGg+VGltZTwvdGg+XG4gICAgICAgIDx0aD5MZXZlbDwvdGg+XG4gICAgICAgIDx0aD5HYW1lIG5hbWU8L3RoPlxuICAgICAgICA8L3RyPlxuICAgICAgICBgXG4gICAgICAgICAgICA6ICcnXG4gICAgICAgIH0gXG4gICAgICAgICR7cmVzdWx0cyA/IHJlc3VsdHMuam9pbignXFxuJykgOiAnPHRyPjx0ZCBjb2xzcGFuPVwiNFwiPk5vIHNjb3JlcyB5ZXQuPC90ZD48L3RyPid9XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuYDtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICBjb25zdCBoaWdoU2NvcmVTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGhpZ2hTY29yZVN0eWxlcy50ZXh0Q29udGVudCA9IGhpZ2hTY29yZVN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChoaWdoU2NvcmVTdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEhpZ2hTY29yZVRhYmxlIH07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBDb2xvcnNcblxuOnJvb3Qge1xuICAtLWNvbG9yLWJhY2tncm91bmQ6ICNmYmYzZjI7XG4gIC0tY29sb3ItYWNjZW50OiAjMDA3NTk2O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMTogI2ZhOTkxYztcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTEtdHJhbnNwYXJlbnQ6ICNmYTk5MWMyNTtcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTI6ICNmMDMxNmE7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yLXRyYW5zcGFyZW50OiAjZmExYzY2MjU7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0zOiAjNmIzMmU2O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktNDogIzE2YTc3YztcblxuICAtLWNvbG9yLXRleHQtbWFpbjogIzI2MjYyNjtcbiAgLS1jb2xvci10ZXh0LXJldmVyc2U6ICNmZmZmZmY7XG4gIC0tY29sb3ItdGV4dC1saWdodDogI2ZmZmZmZjtcbn1cblxuOnJvb3QuZGFyayB7XG4gIC0tY29sb3ItYmFja2dyb3VuZDogIzI2MzIzODtcbiAgLS1jb2xvci1hY2NlbnQ6ICMxOTIyMjc7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0xOiAjYWE3MjI4O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMS10cmFuc3BhcmVudDogI2ZhOTkxYzI1O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMjogIzk2Mjg0OTtcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTItdHJhbnNwYXJlbnQ6ICNmYTFjNjYyNTtcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTM6ICM1ZTNlYTE7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS00OiAjMTc2ODUwO1xuXG4gIC0tY29sb3ItdGV4dC1tYWluOiAjZmZmZmZmO1xuICAtLWNvbG9yLXRleHQtcmV2ZXJzZTogIzI2MjYyNjtcbiAgLS1jb2xvci10ZXh0LWxpZ2h0OiAjZmZmZmZmO1xufVxuXG4vLyBTaXplc1xuXG46cm9vdCB7XG4gIC0tY2VsbC1zaXplOiBhdXRvO1xufVxuXG4vLyBGb250c1xuXG4kZm9udC1tYWluOiAnU2lnbmlrYSBOZWdhdGl2ZScsIHNhbnMtc2VyaWY7XG4iLCJAdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC9taXhpbnMnIGFzICo7XG5AdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbi5idXJnZXItaWNvbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG5cbiAgd2lkdGg6IDQ0cHg7XG4gIGhlaWdodDogNDRweDtcblxuICBAaW5jbHVkZSBtYXgtNzY4IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgfVxuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gICRidG46ICY7XG5cbiAgJi5hY3RpdmUge1xuICAgICN7JGJ0bn1fX3N0cm9rZSB7XG4gICAgICAmOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg1cHgpIHJvdGF0ZSg0NWRlZyk7XG4gICAgICB9XG5cbiAgICAgICY6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpIHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICZfX3N0cm9rZSB7XG4gICAgd2lkdGg6IDI0cHg7XG4gICAgaGVpZ2h0OiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItdGV4dC1saWdodCk7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuXG4gICAgdHJhbnNpdGlvbjogMC4zcztcbiAgfVxufVxuIiwiLyogRm9yIG1lZGlhIHF1ZXJpZXMgKi9cblxuQG1peGluIG1heC0xMjAwIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtaW4tMTAyNCB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMDI0cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTEwMjQge1xuICBAbWVkaWEgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1heC03Njgge1xuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTU3NiB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtYXgtMzgwIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDM4MHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIHBvcnRyYWl0IHtcbiAgQG1lZGlhIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuIiwiQHVzZSAnLi8uLi9hYnN0cmFjdC9taXhpbnMnIGFzICo7XG5AdXNlICcuLy4uL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuKiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmh0bWwge1xuICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcbn1cblxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQpO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcblxuICAmLnNjcm9sbC1kaXNhYmxlZCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cbn1cblxuLndyYXBwZXIge1xuICBtYXgtd2lkdGg6IDE0NDBweDtcbiAgcGFkZGluZzogMCA0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcblxuICBAaW5jbHVkZSBtYXgtNTc2IHtcbiAgICBwYWRkaW5nOiAwIDQuMjEwNTIlO1xuICB9XG59XG5cbi5zZWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMTAwcHg7XG59XG5cbmltZyB7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cblxuLnRyYW5zcGFyZW50IHtcbiAgb3BhY2l0eTogMDtcbn1cblxuOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbn1cbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L21peGlucycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2xheW91dC9iYXNpYycgYXMgKjtcblxuOmhvc3Qge1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFjY2VudCk7XG5cbiAgKiB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXRleHQtbGlnaHQpO1xuICB9XG59XG5cbmEge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMTBweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG5nYW1lLW1lbnUge1xuICBkaXNwbGF5OiBmbGV4O1xuICB0cmFuc2l0aW9uOiAwLjNzO1xuXG4gICYuaGVhZGVyIHtcbiAgICBAaW5jbHVkZSBtYXgtNzY4IHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgJi5oaWRkZW4ge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG5cbiAgJi5hYnNvbHV0ZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNzZweDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuXG4gICAgcGFkZGluZzogMCAxNnB4IDIwcHggMTZweDtcblxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQpO1xuICB9XG59XG5cbi53cmFwcGVyIHtcbiAgcGFkZGluZzogMTZweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDIwcHg7XG59XG5cbi5sZXZlbCB7XG4gICZfX2dhbWVzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBnYXA6IDEwcHg7XG4gIH1cbn1cblxuLm1lbnUge1xuICAmX19pdGVtIHtcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jb2xvci10ZXh0LW1haW4pO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yLXRyYW5zcGFyZW50KTtcblxuICAgIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0LW1haW4pO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblxuICAgIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMS10cmFuc3BhcmVudCk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICcuLy4uL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmJ1dHRvbiB7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuXG4gIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0LWxpZ2h0KTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTEpO1xuXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG5cbiAgdHJhbnNpdGlvbjogMC4zcztcblxuICAmOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDEyMCUpO1xuICB9XG5cbiAgJi5kaXNhYmxlZCB7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIGZpbHRlcjogb3BhY2l0eSgwLjYpIGdyYXlzY2FsZSgwLjUpO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICBmaWx0ZXI6IG9wYWNpdHkoMC42KSBncmF5c2NhbGUoMC41KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yKTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS00KTtcbn1cbiIsIi5idXR0b24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICB0cmFuc2l0aW9uOiAwLjNzO1xuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMC45KTtcbiAgfVxufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTMpO1xufVxuIiwiLmJ1dHRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwLjkpO1xuICB9XG59XG4iLCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXG5cbi8qIERvY3VtZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxuICovXG5cbmh0bWwge1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cbn1cblxuLyogU2VjdGlvbnNcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXG4gKi9cblxubWFpbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXG4gKi9cblxuaDEge1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcbn1cblxuLyogR3JvdXBpbmcgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXG4gKi9cblxuaHIge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xuICBoZWlnaHQ6IDA7IC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnByZSB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG5wIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxudWwge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXG4gKi9cblxuYWJiclt0aXRsZV0ge1xuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5jb2RlLFxua2JkLFxuc2FtcCB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnNtYWxsIHtcbiAgZm9udC1zaXplOiA4MCU7XG59XG5cbi8qKlxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXG4gKiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3ViLFxuc3VwIHtcbiAgZm9udC1zaXplOiA3NSU7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuc3ViIHtcbiAgYm90dG9tOiAtMC4yNWVtO1xufVxuXG5zdXAge1xuICB0b3A6IC0wLjVlbTtcbn1cblxuLyogRW1iZWRkZWQgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxuICovXG5cbmltZyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG59XG5cbi8qIEZvcm1zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmlucHV0LFxub3B0Z3JvdXAsXG5zZWxlY3QsXG50ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICBtYXJnaW46IDA7IC8qIDIgKi9cbn1cblxuYnV0dG9uIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4vKipcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCB7XG4gIC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXG4gKi9cblxuYnV0dG9uLFxuc2VsZWN0IHtcbiAgLyogMSAqL1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcblt0eXBlPSdidXR0b24nXSxcblt0eXBlPSdyZXNldCddLFxuW3R5cGU9J3N1Ym1pdCddIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XG4gIGFwcGVhcmFuY2U6IGJ1dHRvbjtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdidXR0b24nXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdyZXNldCddOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9J3N1Ym1pdCddOjotbW96LWZvY3VzLWlubmVyIHtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xufVxuXG4vKipcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cbiAqL1xuXG5idXR0b246LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0nYnV0dG9uJ106LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0ncmVzZXQnXTotbW96LWZvY3VzcmluZyxcblt0eXBlPSdzdWJtaXQnXTotbW96LWZvY3VzcmluZyB7XG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuZmllbGRzZXQge1xuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmxlZ2VuZCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4gKi9cblxucHJvZ3Jlc3Mge1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXG4gKi9cblxudGV4dGFyZWEge1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cbiAqL1xuXG5bdHlwZT0nY2hlY2tib3gnXSxcblt0eXBlPSdyYWRpbyddIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAyICovXG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxuICovXG5cblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPSdzZWFyY2gnXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXG4gIGFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cbiAqL1xuXG5bdHlwZT0nc2VhcmNoJ106Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cbiAqL1xuXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xufVxuXG4vKiBJbnRlcmFjdGl2ZVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXG4gKi9cblxuZGV0YWlscyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1bW1hcnkge1xuICBkaXNwbGF5OiBsaXN0LWl0ZW07XG59XG5cbi8qIE1pc2NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxuICovXG5cbnRlbXBsYXRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cbiAqL1xuXG5baGlkZGVuXSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4iLCJAdXNlICcuLy4uLy4uL3N0eWxlcy9iYXNlL25vcm1hbGl6ZScgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L21peGlucycgYXMgKjtcblxuOmhvc3Qge1xuICAqIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG59XG5cbi5hY3Rpb25zIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcblxuICB3aWR0aDogMTAwJTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5ub25vZ3JhbSB7XG4gICZfX2NvbnRhaW5lciB7XG4gICAgbWluLWhlaWdodDogY2FsYygxMDAlKTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIH1cblxuICAmX193cmFwcGVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICB3aWR0aDogNDAlO1xuXG4gIEBpbmNsdWRlIG1heC0xMjAwIHtcbiAgICB3aWR0aDogNTAlO1xuICB9XG5cbiAgQGluY2x1ZGUgcG9ydHJhaXQge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgQGluY2x1ZGUgbWF4LTc2OCB7XG4gICAgZm9udC1zaXplOiBtaW4oY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC44KSwgMnJlbSk7XG4gIH1cblxuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6XG4gICAgYXV0b1xuICAgIDFmciAxZnI7XG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XG4gICAgJ2EgYiBiJ1xuICAgICdjIGQgZCdcbiAgICAnYyBkIGQnO1xufVxuXG4uc3VtbWFyeSB7XG4gIHBhZGRpbmc6IDEwcHg7XG5cbiAgZ3JpZC1hcmVhOiBhO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDE2cHg7XG5cbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udG9wLXBhbmUge1xuICBncmlkLWFyZWE6IGI7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcblxuICBkaXNwbGF5OiBmbGV4O1xuXG4gIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItcmlnaHQ6IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDFmO1xuXG4gICZfX2hpbnQge1xuICAgIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuXG4gICAgYm9yZGVyLXRvcDogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggIzAwMCBzb2xpZDtcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICBib3JkZXItcmlnaHQ6IDJweCAjMDAwMDAwIHNvbGlkO1xuICAgIH1cbiAgfVxuXG4gICZfX251bWJlciB7XG4gICAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxufVxuXG4ubGVmdC1wYW5lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGdyaWQtYXJlYTogYztcblxuICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4ICMwMDAgc29saWQ7XG4gIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwMWY7XG5cbiAgJl9faGludCB7XG4gICAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblxuICAgIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1ib3R0b206IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICAgICY6bnRoLWNoaWxkKDVuKTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCAjMDAwMDAwIHNvbGlkO1xuICAgIH1cbiAgfVxuXG4gICZfX251bWJlciB7XG4gICAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG59XG5cbmdhbWUtZmllbGQge1xuICBncmlkLWFyZWE6IGQ7XG59XG5cbnJlc3VsdC1tb2RhbCB7XG4gIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgJi5oaWRkZW4ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB9XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9iYXNlL25vcm1hbGl6ZScgYXMgKjtcblxuOmhvc3Qge1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGJvcmRlcjogMXB4ICMwMDAwMDAgc29saWQ7XG5cbiAgKiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmZkNTtcbn1cblxuLnJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcblxuICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4ICMwMDAwMDAgc29saWQ7XG4gIH1cbn1cblxuLmNlbGwge1xuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICBib3JkZXI6IDFweCAjMDAwMDAwIHNvbGlkO1xuXG4gIHRyYW5zaXRpb246IDAuMnM7XG5cbiAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgIGJvcmRlci1yaWdodDogMnB4ICMwMDAwMDAgc29saWQ7XG4gIH1cblxuICAmLmZpbGxlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgfVxuXG4gICYuY3Jvc3NlZCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgJjo6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICBsZWZ0OiA1MCU7XG5cbiAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAwLjkpO1xuICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSByb3RhdGUoNDVkZWcpO1xuICAgIH1cbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbGVmdDogNTAlO1xuXG4gICAgICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC45KTtcbiAgICAgIGhlaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcblxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgcm90YXRlKC00NWRlZyk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbi5tb2RhbCB7XG4gICZfX3dyYXBwZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAxMDA7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDNmO1xuXG4gICAgdHJhbnNpdGlvbjogMC4zcztcblxuICAgICYuaGlkZGVuIHtcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICB9XG5cbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kKTtcblxuICAmX19jbG9zZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNXB4O1xuICAgIHJpZ2h0OiA1cHg7XG5cbiAgICB3aWR0aDogMzRweDtcbiAgICBoZWlnaHQ6IDM0cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG5cbiAgICAmLXN0cm9rZSB7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMnB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItdGV4dC1tYWluKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcblxuICAgICAgdHJhbnNpdGlvbjogMC4zcztcblxuICAgICAgJjpudGgtY2hpbGQoMSkge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KSByb3RhdGUoNDVkZWcpO1xuICAgICAgfVxuXG4gICAgICAmOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KSByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0zKTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yKTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmhpZ2gtc2NvcmVzIHtcbiAgJl9fc2NvcmVzIHtcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIH1cblxuICAmX19zY29yZSB7XG4gICAgdGgge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0xKTtcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0LXJldmVyc2UpO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICB0aCxcbiAgICB0ZCB7XG4gICAgICBwYWRkaW5nOiAxMHB4O1xuXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLXRleHQtbWFpbik7XG4gICAgfVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuL3N0eWxlcy9tYWluLnNjc3MnO1xuaW1wb3J0IHsgQXBwUm91dGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2FwcC1yb3V0ZXIvQXBwUm91dGVyJztcbmltcG9ydCB7IEdhbWVIZWFkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FtZUhlYWRlci9HYW1lSGVhZGVyJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLWhlYWRlcicsIEdhbWVIZWFkZXIpO1xuXG5kb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTChcbiAgJ2FmdGVyYmVnaW4nLFxuICBgXG5cdFx0PGdhbWUtaGVhZGVyPjwvZ2FtZS1oZWFkZXI+XG5cdFx0PG1haW4gaWQ9XCJtYWluXCIgY2xhc3M9XCJtYWluIHdyYXBwZXJcIj5cblx0XHQ8L21haW4+XG5cdGBcbik7XG5cbmNvbnN0IHJvdXRlciA9IG5ldyBBcHBSb3V0ZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IGRlZXBlc3RFbCA9IGUuY29tcG9zZWRQYXRoKClbMF07XG5cbiAgICBpZiAoZGVlcGVzdEVsLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW2RhdGEtbGlua10nKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcm91dGVyLmNoYW5nZUhhc2goZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcblxuICAgICAgbGV0IHBhcmFtcyA9IFtdO1xuICAgICAgaWYgKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSA9PT0gJ25vbm9ncmFtJykge1xuICAgICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnZ2FtZS1uYW1lJykpIHtcbiAgICAgICAgICBwYXJhbXMucHVzaChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdnYW1lLW5hbWUnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKSkge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2xldmVsJykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW3JhbmRvbV0nKSkge1xuICAgICAgICBwYXJhbXMucHVzaCgncmFuZG9tJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW2NvbnRpbnVlXScpKSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKCdjb250aW51ZScpO1xuICAgICAgfVxuXG4gICAgICByb3V0ZXIuc2hvd1JvdXRlKHBhcmFtcyk7XG4gICAgfVxuICB9KTtcblxuICB3aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHtcbiAgICByb3V0ZXIuc2hvd1JvdXRlKCk7XG4gIH07XG5cbiAgcm91dGVyLnNob3dSb3V0ZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiR2FtZU1lbnUiLCJHYW1lTm9ub2dyYW0iLCJIaWdoU2NvcmVUYWJsZSIsIm5vbm9ncmFtcyIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiQXBwUm91dGVyIiwiY29uc3RydWN0b3IiLCJhcHAiLCJyb3V0ZXMiLCJoYXNoIiwidmlldyIsIm5hbWUiLCJsZXZlbCIsInNhdmVkU29sdXRpb24iLCJjcm9zc2VkIiwibWludXRlcyIsInNlY29uZHMiLCJyZXNvbHZlZE5hbWUiLCJyZXNvbHZlZExldmVsIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJjaGFuZ2VIYXNoIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJzaG93Um91dGUiLCJwYXJhbXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJoZWFkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzaGFkb3dSb290IiwiYnVyZ2VyTWVudSIsImNsYXNzTGlzdCIsImFkZCIsImJ1cmdlckJ0biIsInJlbW92ZSIsIm5ld1BhcmFtcyIsInJhbmRvbU51bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbU5vbm9ncmFtIiwic2F2ZWQiLCJKU09OIiwicGFyc2UiLCJjdXJyZW50U29sdXRpb24iLCJ0aW1lIiwibWF0Y2giLCJmaW5kIiwiaXRlbSIsInNsaWNlIiwiaW5uZXJIVE1MIiwiYnVyZ2VyTWVudVN0eWxlc1N0ciIsIkJ1cmdlck1lbnVCdG4iLCJIVE1MRWxlbWVudCIsImNvbm5lY3RlZENhbGxiYWNrIiwiYXR0YWNoU2hhZG93IiwibW9kZSIsImJ1cmdlckJ0blN0eWxlcyIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZCIsImJ0biIsImdhbWVNZW51IiwiaXNCdXJnZXIiLCJhZnRlciIsIm9uY2xpY2siLCJ0b2dnbGUiLCJoZWFkZXJTdHlsZXNTdHIiLCJoZWFkZXJTdHlsZXMiLCJ0ZW1wbGF0ZSIsIkdhbWVIZWFkZXIiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiaW5IZWFkZXIiLCJnZXRFbGVtZW50QnlJZCIsIm1lbnVTdHlsZVN0ciIsIlJhbmRvbUJ0biIsIkNvbnRpbnVlQnRuIiwiVGVtcGxhdGVzQnRuIiwiSGlnaFNjb3JlQnRuIiwiVGhlbWVCdG4iLCJNdXRlQnRuIiwibGV2ZWxzIiwiU2V0IiwibWFwIiwibGV2ZWxzSFRNTCIsImdhbWVOYW1lcyIsImZpbHRlciIsImpvaW4iLCJtZW51U3R5bGVzIiwiYWN0aW9ucyIsImdldEF0dHJpYnV0ZSIsInN0eWxlIiwiZGlzcGxheSIsImxhc3RFbGVtZW50Q2hpbGQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImNvbnRpbnVlQnRuU3R5bGVzU3RyIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImlubmVyVGV4dCIsImNvbnRpbnVlQnRuU3R5bGVzIiwiaGlnaFNjb3JlQnRuU3R5bGVzU3RyIiwiaGlnaFNjb3JlQnRuU3R5bGVzIiwibXV0ZUJ0blN0eWxlc1N0ciIsIm11dGVCdG5TdHlsZXMiLCJjaG9vc2VJbWciLCJpc011dGVkIiwicmFuZG9tQnRuU3R5bGVzU3RyIiwicmFuZG9tQnRuU3R5bGVzIiwidGVtcGxhdGVzQnRuU3R5bGVzU3RyIiwidGVtcGxhdGVzQnRuU3R5bGVzIiwidGhlbWVCdG5TdHlsZXNTdHIiLCJ0aGVtZUJ0blN0eWxlcyIsInJvb3QiLCJkb2N1bWVudEVsZW1lbnQiLCJjb250YWlucyIsIm5vbm9ncmFtU3R5bGVzU3RyIiwiR2FtZUZpZWxkIiwiUmVzdGFydEJ0biIsIlNvbHV0aW9uQnRuIiwiU2F2ZUJ0biIsIkdhbWVUaW1lciIsIlJlc3VsdE1vZGFsIiwid2luU291bmRGaWxlIiwibm9ub2dyYW1TdHlsZXMiLCJ0aW1lciIsInNhdmVkTWludXRlcyIsInNhdmVkU2Vjb25kcyIsImNvbnRpbnVlIiwidG9VcHBlckNhc2UiLCJub25vZ3JhbSIsImZpZWxkIiwiaWQiLCJtYXRyaXgiLCJjb3JyZWN0U29sdXRpb24iLCJmbGF0IiwidG9TdHJpbmciLCJzdHIiLCJmb3JFYWNoIiwiZWwiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwic3F1YXJlIiwiY29uc29sZSIsImxvZyIsInRvcFBhbmUiLCJsZWZ0UGFuZSIsIm1heExlZnRIaW50cyIsImkiLCJsZWZ0SGludCIsInRvcEhpbnQiLCJjb3VudGVyTGVmdCIsImNvdW50ZXJUb3AiLCJqIiwiY2hpbGRyZW4iLCJub25vZ3JhbVdpZHRoIiwib2Zmc2V0V2lkdGgiLCJjZWxsU2l6ZSIsInNldFByb3BlcnR5IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwibWludXRlc1N0ciIsInNlY29uZHNTdHIiLCJBdWRpbyIsInBsYXkiLCJtb2RhbCIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0Iiwic2F2ZWRSZXN1bHQiLCJjdXJyZW50RHVyYXRpb24iLCJkdXJhdGlvbiIsImhpZ2hTY29yZVRhYmxlIiwidW5zaGlmdCIsInN0cmluZ2lmeSIsInRpbWVyU3RhcnRlZCIsInJlc3RhcnQiLCJzdG9wIiwiZGV0YWlsIiwiZ2FtZSIsImN1cnJlbnRDcm9zc2VkIiwiY29udGludWVCdG4iLCJpbm5lciIsImxhdW5jaCIsImZpZWxkU3R5bGVzU3RyIiwiZmlsbFNvdW5kRmlsZSIsImNsZWFyU291bmRGaWxlIiwiY3Jvc3NTb3VuZEZpbGUiLCJmaWVsZFN0eWxlcyIsInNwbGl0Iiwicm93IiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJmaWxsIiwiY2VsbCIsImUiLCJjbGlja3NEaXNhYmxlZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInRhcmdldCIsImNoZWNrU29sdXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImJ1YmJsZXMiLCJjb21wb3NlZCIsImVuYWJsZUNsaWNrcyIsImRpc2FibGVDbGlja3MiLCJzb2x1dGlvbiIsInRpbWVyU3R5bGVzU3RyIiwidGltZXJTdHlsZXMiLCJyZW5kZXJlZCIsInJlbmRlciIsIm9ic2VydmVkQXR0cmlidXRlcyIsImF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayIsIm1pbiIsInNlYyIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJjbGVhckludGVydmFsIiwiaW50ZXJ2YWxJRCIsInNldEludGVydmFsIiwidHJ1bmMiLCJkaXNjb25uZWN0ZWRDYWxsYmFjayIsInJlc3RhcnRCdG5TdHlsZXNTdHIiLCJyZXN0YXJ0QnRuU3R5bGVzIiwibW9kYWxTdHlsZXNTdHIiLCJtb2RhbFN0eWxlcyIsImFwcGVuZENoaWxkIiwid3JhcHBlciIsImNsYXNzTmFtZSIsImNsb3NlIiwic2F2ZUJ0blN0eWxlc1N0ciIsInNhdmVCdG5TdHlsZXMiLCJjdXJyZW50VGFyZ2V0Iiwic29sdXRpb25CdG5TdHlsZXNTdHIiLCJzb2x1dGlvbkJ0blN0eWxlcyIsImhpZ2hTY29yZVN0eWxlc1N0ciIsInJlc3VsdHMiLCJzb3J0IiwiYSIsImIiLCJyZXN1bHQiLCJoaWdoU2NvcmVTdHlsZXMiLCJib2R5Iiwicm91dGVyIiwiZGVlcGVzdEVsIiwiY29tcG9zZWRQYXRoIiwibWF0Y2hlcyIsInB1c2giLCJvbnBvcHN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==