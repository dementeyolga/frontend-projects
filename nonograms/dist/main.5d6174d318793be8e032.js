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
    const header = document.querySelector('game-header');
    const burgerMenu = header.shadowRoot.querySelector('game-menu.absolute');
    if (burgerMenu) {
      burgerMenu.classList.add('hidden');
    }
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
      <svg width="38px" height="38px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9395 17.72C12.9395 19.5 15.3895 20.72 16.5495 20.33C18.6495 19.55 18.9995 15.3299 18.9995 12.4099C18.9995 11.5999 18.9995 10.68 18.8895 9.77002" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.1292 6.28008C18.0012 5.89129 17.795 5.53273 17.5233 5.22661C17.2516 4.9205 16.9201 4.67327 16.5493 4.50005C15.3193 4.04005 12.7093 5.49996 10.5493 7.40996H8.94922C7.88835 7.40996 6.87093 7.83145 6.12079 8.58159C5.37064 9.33174 4.94922 10.3491 4.94922 11.41V13.41C4.9489 14.1811 5.17151 14.936 5.59021 15.5835C6.00892 16.2311 6.60585 16.7438 7.3092 17.06" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 2.42004L2 22.42" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
    } else {
      this.btn.innerHTML = `
      <svg width="38px" height="38px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        let minutesStr = !minutes || `${minutes} minute`;
        minutesStr = +minutes > 1 ? minutesStr + 's ' : minutesStr + ' ';
        const seconds = timer.getAttribute('seconds');
        let secondsStr = !seconds || `${seconds} second`;
        secondsStr = +seconds > 1 ? secondsStr + 's' : secondsStr;
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
      console.log(inner);
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
    let results = JSON.parse(localStorage.getItem('highScoreTable')).slice(0, 5);
    results.sort((a, b) => a.duration - b.duration);
    results = results.map((result, i) => `  <tr class="high-scores__score">
                      <td>${i + 1}.</td>
                      <td>${result.time}</td>
                      <td>${result.level}</td>
                      <td>${result.name}</td>
                    </tr>
                  `);
    template.innerHTML = `
    <div class="high-scores">
      <h2>Latest 5 scores:</h2>
      <table class="high-scores__scores">
        <tr class="high-scores__score header">
          <th>No</th>
          <th>Time</th>
          <th>Level</th>
          <th>Game name</th>
        </tr>
        ${results.join('\n')}
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

        const styles = `:root{--color-background: #fbf3f2;--color-accent: #007596;--color-accent-secondary-1: #fa991c;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #f0316a;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #6b32e6;--color-accent-secondary-4: #16a77c;--color-text-main: #262626;--color-text-reverse: #ffffff;--color-text-light: #ffffff}:root.dark{--color-background: #263238;--color-accent: #192227;--color-accent-secondary-1: #aa7228;--color-accent-secondary-1-transparent: #fa991c25;--color-accent-secondary-2: #962849;--color-accent-secondary-2-transparent: #fa1c6625;--color-accent-secondary-3: #5e3ea1;--color-accent-secondary-4: #176850;--color-text-main: #ffffff;--color-text-reverse: #262626;--color-text-light: #ffffff}:root{--cell-size: auto}.burger-icon{display:none;width:44px;height:44px}@media(max-width: 768px){.burger-icon{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}}.burger-icon:hover{cursor:pointer}.burger-icon.active .burger-icon__stroke:nth-child(1){transform:translateY(5px) rotate(45deg)}.burger-icon.active .burger-icon__stroke:nth-child(2){transform:translateY(-5px) rotate(-45deg)}.burger-icon__stroke{width:24px;height:2px;background-color:var(--color-background);border-radius:2px;transition:.3s}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsTUFBTSxDQUFDLENBQUM7TUFFakQsSUFBSW5FLE1BQU0sR0FBRyxFQUFFO01BQ2YsSUFBSWtPLFNBQVMsQ0FBQy9KLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxVQUFVLEVBQUU7UUFDakQsSUFBSStKLFNBQVMsQ0FBQy9KLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTtVQUN2Q25FLE1BQU0sQ0FBQ3FPLElBQUksQ0FBQ0gsU0FBUyxDQUFDL0osWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xEO1FBRUEsSUFBSStKLFNBQVMsQ0FBQy9KLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtVQUNuQ25FLE1BQU0sQ0FBQ3FPLElBQUksQ0FBQ0gsU0FBUyxDQUFDL0osWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDO01BQ0Y7TUFFQSxJQUFJK0osU0FBUyxDQUFDRSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakNwTyxNQUFNLENBQUNxTyxJQUFJLENBQUMsUUFBUSxDQUFDO01BQ3ZCO01BRUEsSUFBSUgsU0FBUyxDQUFDRSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDbkNwTyxNQUFNLENBQUNxTyxJQUFJLENBQUMsVUFBVSxDQUFDO01BQ3pCO01BRUFKLE1BQU0sQ0FBQ2xPLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDO0lBQzFCO0VBQ0YsQ0FBQyxDQUFDO0VBRUZILE1BQU0sQ0FBQ3lPLFVBQVUsR0FBRyxNQUFNO0lBQ3hCTCxNQUFNLENBQUNsTyxTQUFTLENBQUMsQ0FBQztFQUNwQixDQUFDO0VBRURrTyxNQUFNLENBQUNsTyxTQUFTLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2FwcC1yb3V0ZXIvQXBwUm91dGVyLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2J1cmdlck1lbnUvQnVyZ2VyTWVudUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lSGVhZGVyL0dhbWVIZWFkZXIuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvR2FtZU1lbnUuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvY29udGludWVCdG4vQ29udGludWVCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvaGlnaFNjb3JlQnRuL0hpZ2hTY29yZUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9tdXRlQnRuL011dGVCdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvcmFuZG9tQnRuL1JhbmRvbkJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS90ZW1wbGF0ZXNCdG4vVGVtcGxhdGVzQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L3RoZW1lQnRuL1RoZW1lQnRuLmpzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9HYW1lTm9ub2dyYW0uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL2dhbWVGaWVsZC9HYW1lRmllbGQuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL2dhbWVUaW1lci9HYW1lVGltZXIuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3Jlc3RhcnRCdG4vUmVzdGFydEJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vcmVzdWx0TW9kYWwvUmVzdWx0TW9kYWwuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NhdmVCdG4vU2F2ZUJ0bi5qcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTm9ub2dyYW0vc29sdXRpb25CdG4vU29sdXRpb25CdG4uanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvaGlnaFNjb3JlVGFibGUvSGlnaFNjb3JlVGFibGUuanMiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/ZmM3NyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2Fic3RyYWN0L192YXJpYWJsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9idXJnZXJNZW51L0J1cmdlck1lbnVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9hYnN0cmFjdC9fbWl4aW5zLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL3N0eWxlcy9sYXlvdXQvX2Jhc2ljLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZUhlYWRlci9HYW1lSGVhZGVyLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVNZW51L0dhbWVNZW51LnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9zdHlsZXMvY29tcG9uZW50cy9fYnV0dG9uLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvY29udGludWVCdG4vQ29udGludWVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvaGlnaFNjb3JlQnRuL0hpZ2hTY29yZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS9tdXRlQnRuL011dGVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU1lbnUvdGVtcGxhdGVzQnRuL1RlbXBsYXRlc0J0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvY29tcG9uZW50cy9nYW1lTWVudS90aGVtZUJ0bi9UaGVtZUJ0bi5zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvc3R5bGVzL2Jhc2UvX25vcm1hbGl6ZS5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9HYW1lTm9ub2dyYW0uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL2dhbWVGaWVsZC9HYW1lRmllbGQuc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3Jlc3VsdE1vZGFsL1Jlc3VsdE1vZGFsLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2dhbWVOb25vZ3JhbS9zYXZlQnRuL1NhdmVCdG4uc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vbm9ub2dyYW1zLy4vc3JjL2NvbXBvbmVudHMvZ2FtZU5vbm9ncmFtL3NvbHV0aW9uQnRuL1NvbHV0aW9uQnRuLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy8uL3NyYy9jb21wb25lbnRzL2hpZ2hTY29yZVRhYmxlL0hpZ2hTY29yZVRhYmxlLnN0eWxlcy5zY3NzIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25vbm9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9ub25vZ3JhbXMvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNZW51IH0gZnJvbSAnLi4vZ2FtZU1lbnUvR2FtZU1lbnUnO1xuaW1wb3J0IHsgR2FtZU5vbm9ncmFtIH0gZnJvbSAnLi4vZ2FtZU5vbm9ncmFtL0dhbWVOb25vZ3JhbSc7XG5pbXBvcnQgeyBIaWdoU2NvcmVUYWJsZSB9IGZyb20gJy4uL2hpZ2hTY29yZVRhYmxlL0hpZ2hTY29yZVRhYmxlJztcbmltcG9ydCBub25vZ3JhbXMgZnJvbSAnLi4vLi4vcmVzb3VyY2VzL25vbm9ncmFtcy5qc29uJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLW1lbnUnLCBHYW1lTWVudSk7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2dhbWUtbm9ub2dyYW0nLCBHYW1lTm9ub2dyYW0pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdoaWdoLXNjb3JlLXRhYmxlJywgSGlnaFNjb3JlVGFibGUpO1xuXG5jbGFzcyBBcHBSb3V0ZXIge1xuICBjb25zdHJ1Y3RvcihhcHApIHtcbiAgICB0aGlzLmFwcCA9IGFwcDtcblxuICAgIHRoaXMucm91dGVzID0gW1xuICAgICAge1xuICAgICAgICBoYXNoOiAnJyxcbiAgICAgICAgdmlldzogKCkgPT4gJzxnYW1lLW1lbnUgbWFpbi1wYWdlPVwidHJ1ZVwiPjwvZ2FtZS1tZW51PicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBoYXNoOiAnbm9ub2dyYW0nLFxuICAgICAgICB2aWV3OiAobmFtZSwgbGV2ZWwsIHNhdmVkU29sdXRpb24sIGNyb3NzZWQsIG1pbnV0ZXMsIHNlY29uZHMpID0+IHtcbiAgICAgICAgICBsZXQgcmVzb2x2ZWROYW1lO1xuICAgICAgICAgIGxldCByZXNvbHZlZExldmVsO1xuXG4gICAgICAgICAgaWYgKG5hbWUgJiYgbGV2ZWwpIHtcbiAgICAgICAgICAgIHJlc29sdmVkTmFtZSA9IG5hbWU7XG4gICAgICAgICAgICByZXNvbHZlZExldmVsID0gbGV2ZWw7XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLW5hbWUnLCBuYW1lKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lLWxldmVsJywgbGV2ZWwpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1uYW1lJykgJiZcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLWxldmVsJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc29sdmVkTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lLW5hbWUnKTtcbiAgICAgICAgICAgIHJlc29sdmVkTGV2ZWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZS1sZXZlbCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlZE5hbWUgPSBub25vZ3JhbXNbMF0ubmFtZTtcbiAgICAgICAgICAgIHJlc29sdmVkTGV2ZWwgPSBub25vZ3JhbXNbMF0ubGV2ZWw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxnYW1lLW5vbm9ncmFtIG5hbWU9XCIke3Jlc29sdmVkTmFtZX1cIiBsZXZlbD1cIiR7cmVzb2x2ZWRMZXZlbH1cIiAgc2F2ZWRzb2x1dGlvbj1cIiR7c2F2ZWRTb2x1dGlvbiB8fCAnJ31cIiBjcm9zc2VkPVwiJHtjcm9zc2VkIHx8ICcnfVwiIG1pbnV0ZXM9XCIke21pbnV0ZXMgfHwgJzAnfVwiIHNlY29uZHM9XCIke3NlY29uZHMgfHwgJzAnfVwiPlxuICAgICAgICAgICAgPC9nYW1lLW5vbm9ncmFtPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBoYXNoOiAnaGlnaC1zY29yZScsXG4gICAgICAgIHZpZXc6ICgpID0+ICc8aGlnaC1zY29yZS10YWJsZT48L2hpZ2gtc2NvcmUtdGFibGU+JyxcbiAgICAgIH0sXG4gICAgXTtcbiAgfVxuXG4gIGNoYW5nZUhhc2godXJsKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB1cmw7XG4gIH1cblxuICBzaG93Um91dGUocGFyYW1zID0gW10pIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdnYW1lLWhlYWRlcicpO1xuICAgIGNvbnN0IGJ1cmdlck1lbnUgPSBoZWFkZXIuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdnYW1lLW1lbnUuYWJzb2x1dGUnKTtcbiAgICBpZiAoYnVyZ2VyTWVudSkge1xuICAgICAgYnVyZ2VyTWVudS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdQYXJhbXMgPSBbLi4ucGFyYW1zXTtcblxuICAgIGlmIChwYXJhbXNbMF0gPT09ICdyYW5kb20nKSB7XG4gICAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBub25vZ3JhbXMubGVuZ3RoKTtcbiAgICAgIGNvbnN0IHJhbmRvbU5vbm9ncmFtID0gbm9ub2dyYW1zW3JhbmRvbU51bV07XG5cbiAgICAgIG5ld1BhcmFtc1swXSA9IHJhbmRvbU5vbm9ncmFtLm5hbWU7XG4gICAgICBuZXdQYXJhbXNbMV0gPSByYW5kb21Ob25vZ3JhbS5sZXZlbDtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zWzBdID09PSAnY29udGludWUnKSB7XG4gICAgICBjb25zdCBzYXZlZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkR2FtZScpKTtcblxuICAgICAgbmV3UGFyYW1zWzBdID0gc2F2ZWQubmFtZTtcbiAgICAgIG5ld1BhcmFtc1sxXSA9IHNhdmVkLmxldmVsO1xuICAgICAgbmV3UGFyYW1zWzJdID0gc2F2ZWQuY3VycmVudFNvbHV0aW9uO1xuICAgICAgbmV3UGFyYW1zWzNdID0gc2F2ZWQuY3Jvc3NlZDtcbiAgICAgIG5ld1BhcmFtc1s0XSA9IHNhdmVkLnRpbWUubWludXRlcztcbiAgICAgIG5ld1BhcmFtc1s1XSA9IHNhdmVkLnRpbWUuc2Vjb25kcztcbiAgICB9XG5cbiAgICBsZXQgbWF0Y2ggPSB0aGlzLnJvdXRlcy5maW5kKFxuICAgICAgKGl0ZW0pID0+IGl0ZW0uaGFzaCA9PT0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSlcbiAgICApO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgbWF0Y2ggPSB0aGlzLnJvdXRlcy5maW5kKChpdGVtKSA9PiBpdGVtLmhhc2ggPT09ICcnKTtcbiAgICB9XG5cbiAgICB0aGlzLmFwcC5pbm5lckhUTUwgPSBtYXRjaC52aWV3KC4uLm5ld1BhcmFtcyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQXBwUm91dGVyIH07XG4iLCJpbXBvcnQgYnVyZ2VyTWVudVN0eWxlc1N0ciBmcm9tICcuL0J1cmdlck1lbnVCdG4uc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBCdXJnZXJNZW51QnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnVyZ2VyQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBidXJnZXJCdG5TdHlsZXMudGV4dENvbnRlbnQgPSBidXJnZXJNZW51U3R5bGVzU3RyO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ1cmdlckJ0blN0eWxlcyk7XG5cbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnVyZ2VyLWljb24nKTtcbiAgICBidG4uaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1cmdlci1pY29uX19zdHJva2VcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJidXJnZXItaWNvbl9fc3Ryb2tlXCI+PC9kaXY+XG4gICAgYDtcblxuICAgIGNvbnN0IGdhbWVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ2FtZS1tZW51Jyk7XG4gICAgZ2FtZU1lbnUuaXNCdXJnZXIgPSB0cnVlO1xuICAgIHRoaXMuYWZ0ZXIoZ2FtZU1lbnUpO1xuICAgIGdhbWVNZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIGdhbWVNZW51LmNsYXNzTGlzdC5hZGQoJ2Fic29sdXRlJyk7XG5cbiAgICBidG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgIGdhbWVNZW51LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgIH07XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZChidG4pO1xuICB9XG59XG5cbmV4cG9ydCB7IEJ1cmdlck1lbnVCdG4gfTtcbiIsImltcG9ydCBoZWFkZXJTdHlsZXNTdHIgZnJvbSAnLi9HYW1lSGVhZGVyLnN0eWxlcy5zY3NzJztcbmltcG9ydCB7IEJ1cmdlck1lbnVCdG4gfSBmcm9tICcuLi9idXJnZXJNZW51L0J1cmdlck1lbnVCdG4nO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2J1cmdlci1idG4nLCBCdXJnZXJNZW51QnRuKTtcblxuY29uc3QgaGVhZGVyU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbmhlYWRlclN0eWxlcy50ZXh0Q29udGVudCA9IGhlYWRlclN0eWxlc1N0cjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8ZGl2IGlkPVwid3JhcHBlclwiIGNsYXNzPVwid3JhcHBlclwiPlxuICAgIDxhIGhyZWY9XCJcIiBkYXRhLWxpbms+Tm9ub2dyYW1zPC9hPlxuICAgIDxidXJnZXItYnRuPjwvYnVyZ2VyLWJ0bj5cbiAgPC9kaXY+ICBcbmA7XG5jbGFzcyBHYW1lSGVhZGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQoaGVhZGVyU3R5bGVzKTtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICBjb25zdCBnYW1lTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dhbWUtbWVudScpO1xuICAgIGdhbWVNZW51LmluSGVhZGVyID0gdHJ1ZTtcbiAgICBnYW1lTWVudS5jbGFzc0xpc3QuYWRkKCdoZWFkZXInKTtcbiAgICBzaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCd3cmFwcGVyJykuYXBwZW5kKGdhbWVNZW51KTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lSGVhZGVyIH07XG4iLCJpbXBvcnQgbWVudVN0eWxlU3RyIGZyb20gJy4vR2FtZU1lbnUuc3R5bGVzLnNjc3MnO1xuaW1wb3J0IG5vbm9ncmFtcyBmcm9tICcuLi8uLi9yZXNvdXJjZXMvbm9ub2dyYW1zLmpzb24nO1xuaW1wb3J0IHsgUmFuZG9tQnRuIH0gZnJvbSAnLi9yYW5kb21CdG4vUmFuZG9uQnRuJztcbmltcG9ydCB7IENvbnRpbnVlQnRuIH0gZnJvbSAnLi9jb250aW51ZUJ0bi9Db250aW51ZUJ0bic7XG5pbXBvcnQgeyBUZW1wbGF0ZXNCdG4gfSBmcm9tICcuL3RlbXBsYXRlc0J0bi9UZW1wbGF0ZXNCdG4nO1xuaW1wb3J0IHsgSGlnaFNjb3JlQnRuIH0gZnJvbSAnLi9oaWdoU2NvcmVCdG4vSGlnaFNjb3JlQnRuJztcbmltcG9ydCB7IFRoZW1lQnRuIH0gZnJvbSAnLi90aGVtZUJ0bi9UaGVtZUJ0bic7XG5pbXBvcnQgeyBNdXRlQnRuIH0gZnJvbSAnLi9tdXRlQnRuL011dGVCdG4nO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3JhbmRvbS1idG4nLCBSYW5kb21CdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb250aW51ZS1idG4nLCBDb250aW51ZUJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3RlbXBsYXRlcy1idG4nLCBUZW1wbGF0ZXNCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdoaWdoLXNjb3JlLWJ0bicsIEhpZ2hTY29yZUJ0bik7XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3RoZW1lLWJ0bicsIFRoZW1lQnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbXV0ZS1idG4nLCBNdXRlQnRuKTtcblxuY29uc3QgbGV2ZWxzID0gWy4uLm5ldyBTZXQobm9ub2dyYW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5sZXZlbCkpXTtcblxubGV0IGxldmVsc0hUTUwgPSBsZXZlbHNcbiAgLm1hcCgobGV2ZWwpID0+IHtcbiAgICBjb25zdCBnYW1lTmFtZXMgPSBub25vZ3JhbXNcbiAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09IGxldmVsKVxuICAgICAgLm1hcChcbiAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgYDxhIGhyZWY9XCJub25vZ3JhbVwiIGNsYXNzPVwibWVudV9faXRlbVwiIGxldmVsPVwiJHtsZXZlbH1cIiBnYW1lLW5hbWU9XCIke2l0ZW0ubmFtZX1cIiBkYXRhLWxpbms+JHtpdGVtLm5hbWV9PC9hPlxcbmBcbiAgICAgIClcbiAgICAgIC5qb2luKCdcXG4nKTtcblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibGV2ZWxcIj5cbiAgICAgICAgPGgzIGNsYXNzPVwibGV2ZWxfX3RpdGxlXCI+JHtsZXZlbH08L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGV2ZWxfX2dhbWVzXCI+XG4gICAgICAgICAgJHtnYW1lTmFtZXN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfSlcbiAgLmpvaW4oJ1xcbicpO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImFjdGlvbnNcIiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtdXRlLWJ0bj48L211dGUtYnRuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZW1lLWJ0bj48L3RoZW1lLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZXMtYnRuPjwvdGVtcGxhdGVzLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxyYW5kb20tYnRuPjwvcmFuZG9tLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjb250aW51ZS1idG4+PC9jb250aW51ZS1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aGlnaC1zY29yZS1idG4+PC9oaWdoLXNjb3JlLWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbmA7XG5cbmNsYXNzIEdhbWVNZW51IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgY29uc3QgbWVudVN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgbWVudVN0eWxlcy50ZXh0Q29udGVudCA9IG1lbnVTdHlsZVN0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChtZW51U3R5bGVzKTtcblxuICAgIGNvbnN0IGFjdGlvbnMgPSBzaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCdhY3Rpb25zJyk7XG5cbiAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ21haW4tcGFnZScpKSB7XG4gICAgICBhY3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzQnVyZ2VyICYmICF0aGlzLmluSGVhZGVyKSB7XG4gICAgICBzaGFkb3dSb290Lmxhc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGxldmVsc0hUTUwpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0J1cmdlcikge1xuICAgICAgYWN0aW9ucy5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ2NvbHVtbic7XG4gICAgICBhY3Rpb25zLnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZU1lbnUgfTtcbiIsImltcG9ydCBjb250aW51ZUJ0blN0eWxlc1N0ciBmcm9tICcuL0NvbnRpbnVlQnRuLnN0eWxlcy5zY3NzJztcblxuY2xhc3MgQ29udGludWVCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYnRuLmhyZWYgPSAnbm9ub2dyYW0nO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdjb250aW51ZScsIHRydWUpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycsIHRydWUpO1xuICAgIGJ0bi5pbm5lclRleHQgPSAnQ29udGludWUgZ2FtZSc7XG5cbiAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZEdhbWUnKSkge1xuICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcblxuICAgIGNvbnN0IGNvbnRpbnVlQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBjb250aW51ZUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IGNvbnRpbnVlQnRuU3R5bGVzU3RyO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGNvbnRpbnVlQnRuU3R5bGVzKTtcbiAgfVxufVxuXG5leHBvcnQgeyBDb250aW51ZUJ0biB9O1xuIiwiaW1wb3J0IGhpZ2hTY29yZUJ0blN0eWxlc1N0ciBmcm9tICcuL0hpZ2hTY29yZUJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIEhpZ2hTY29yZUJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBidG4uaHJlZiA9ICdoaWdoLXNjb3JlJztcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rJywgdHJ1ZSk7XG4gICAgYnRuLmlubmVyVGV4dCA9ICdTY29yZXMnO1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcblxuICAgIGNvbnN0IGhpZ2hTY29yZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgaGlnaFNjb3JlQnRuU3R5bGVzLnRleHRDb250ZW50ID0gaGlnaFNjb3JlQnRuU3R5bGVzU3RyO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGhpZ2hTY29yZUJ0blN0eWxlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgSGlnaFNjb3JlQnRuIH07XG4iLCJpbXBvcnQgbXV0ZUJ0blN0eWxlc1N0ciBmcm9tICcuL011dGVCdG4uc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBNdXRlQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHRoaXMuYnRuID0gYnRuO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCBtdXRlQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBtdXRlQnRuU3R5bGVzLnRleHRDb250ZW50ID0gbXV0ZUJ0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChtdXRlQnRuU3R5bGVzKTtcblxuICAgIHRoaXMuY2hvb3NlSW1nKCk7XG5cbiAgICBidG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgIGxldCBpc011dGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ211dGVkJyk7XG5cbiAgICAgIGlmICghaXNNdXRlZCkge1xuICAgICAgICBpc011dGVkID0gJ3RydWUnO1xuICAgICAgfSBlbHNlIGlmIChpc011dGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgaXNNdXRlZCA9ICdmYWxzZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc011dGVkID0gJ3RydWUnO1xuICAgICAgfVxuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbXV0ZWQnLCBpc011dGVkKTtcblxuICAgICAgdGhpcy5jaG9vc2VJbWcoKTtcbiAgICB9O1xuICB9XG5cbiAgY2hvb3NlSW1nKCkge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXV0ZWQnKSA9PT0gJ3RydWUnKSB7XG4gICAgICB0aGlzLmJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICA8c3ZnIHdpZHRoPVwiMzhweFwiIGhlaWdodD1cIjM4cHhcIiB2aWV3Qm94PVwiLTAuNSAwIDI1IDI1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICA8cGF0aCBkPVwiTTEwLjkzOTUgMTcuNzJDMTIuOTM5NSAxOS41IDE1LjM4OTUgMjAuNzIgMTYuNTQ5NSAyMC4zM0MxOC42NDk1IDE5LjU1IDE4Ljk5OTUgMTUuMzI5OSAxOC45OTk1IDEyLjQwOTlDMTguOTk5NSAxMS41OTk5IDE4Ljk5OTUgMTAuNjggMTguODg5NSA5Ljc3MDAyXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNMTguMTI5MiA2LjI4MDA4QzE4LjAwMTIgNS44OTEyOSAxNy43OTUgNS41MzI3MyAxNy41MjMzIDUuMjI2NjFDMTcuMjUxNiA0LjkyMDUgMTYuOTIwMSA0LjY3MzI3IDE2LjU0OTMgNC41MDAwNUMxNS4zMTkzIDQuMDQwMDUgMTIuNzA5MyA1LjQ5OTk2IDEwLjU0OTMgNy40MDk5Nkg4Ljk0OTIyQzcuODg4MzUgNy40MDk5NiA2Ljg3MDkzIDcuODMxNDUgNi4xMjA3OSA4LjU4MTU5QzUuMzcwNjQgOS4zMzE3NCA0Ljk0OTIyIDEwLjM0OTEgNC45NDkyMiAxMS40MVYxMy40MUM0Ljk0ODkgMTQuMTgxMSA1LjE3MTUxIDE0LjkzNiA1LjU5MDIxIDE1LjU4MzVDNi4wMDg5MiAxNi4yMzExIDYuNjA1ODUgMTYuNzQzOCA3LjMwOTIgMTcuMDZcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuICAgICAgPHBhdGggZD1cIk0yMiAyLjQyMDA0TDIgMjIuNDJcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuICAgICAgPC9zdmc+XG4gICAgICBgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICA8c3ZnIHdpZHRoPVwiMzhweFwiIGhlaWdodD1cIjM4cHhcIiB2aWV3Qm94PVwiLTAuNSAwIDI1IDI1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICA8cGF0aCBkPVwiTTEyLjU0OTMgNC41MDAwNUMxMS4zMTkzIDQuMDQwMDUgOC43MDkyNiA1LjQ5OTk2IDYuNTQ5MjYgNy40MDk5Nkg0Ljk0OTIyQzMuODg4MzUgNy40MDk5NiAyLjg3MDkzIDcuODMxNDUgMi4xMjA3OSA4LjU4MTU5QzEuMzcwNjQgOS4zMzE3NCAwLjk0OTIxOSAxMC4zNDkxIDAuOTQ5MjE5IDExLjQxVjEzLjQxQzAuOTQ5MjE5IDE0LjQ3MDggMS4zNzA2NCAxNS40ODgzIDIuMTIwNzkgMTYuMjM4NUMyLjg3MDkzIDE2Ljk4ODYgMy44ODgzNSAxNy40MSA0Ljk0OTIyIDE3LjQxSDYuNTQ5MjZDOC42NTkyNiAxOS4zNSAxMS4yNjkzIDIwLjc4IDEyLjU0OTMgMjAuMzNDMTQuNjQ5MyAxOS41NSAxNC45OTkyIDE1LjMzIDE0Ljk5OTIgMTIuNDFDMTQuOTk5MiA5LjQ4OTk2IDE0LjY0OTMgNS4yODAwNSAxMi41NDkzIDQuNTAwMDVaXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNMjAuNjYwMiA2LjcxOTk3QzIyLjE1OTMgOC4yMjAxMSAyMy4wMDE1IDEwLjI1NDIgMjMuMDAxNSAxMi4zNzVDMjMuMDAxNSAxNC40OTU4IDIyLjE1OTMgMTYuNTI5OSAyMC42NjAyIDE4LjAzXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNMTguNTM5MSAxNS45NUMxOS40NzY0IDE1LjAxMjMgMjAuMDAzIDEzLjc0MDcgMjAuMDAzIDEyLjQxNDlDMjAuMDAzIDExLjA4OTEgMTkuNDc2NCA5LjgxNzY0IDE4LjUzOTEgOC44OFwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8L3N2Zz5cbiAgICAgIGA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IE11dGVCdG4gfTtcbiIsImltcG9ydCByYW5kb21CdG5TdHlsZXNTdHIgZnJvbSAnLi9SYW5kb21CdG4uc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBSYW5kb21CdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYnRuLmhyZWYgPSAnbm9ub2dyYW0nO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdyYW5kb20nLCB0cnVlKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnLCB0cnVlKTtcbiAgICBidG4uaW5uZXJUZXh0ID0gJ1JhbmRvbSc7XG5cbiAgICBzaGFkb3dSb290LmFwcGVuZChidG4pO1xuXG4gICAgY29uc3QgcmFuZG9tQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICByYW5kb21CdG5TdHlsZXMudGV4dENvbnRlbnQgPSByYW5kb21CdG5TdHlsZXNTdHI7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQocmFuZG9tQnRuU3R5bGVzKTtcbiAgfVxufVxuXG5leHBvcnQgeyBSYW5kb21CdG4gfTtcbiIsImltcG9ydCB0ZW1wbGF0ZXNCdG5TdHlsZXNTdHIgZnJvbSAnLi9UZW1wbGF0ZXNCdG4uc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBUZW1wbGF0ZXNCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYnRuLmhyZWYgPSAnJztcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rJywgdHJ1ZSk7XG4gICAgYnRuLmlubmVyVGV4dCA9ICdUZW1wbGF0ZXMnO1xuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQoYnRuKTtcblxuICAgIGNvbnN0IHRlbXBsYXRlc0J0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGVtcGxhdGVzQnRuU3R5bGVzLnRleHRDb250ZW50ID0gdGVtcGxhdGVzQnRuU3R5bGVzU3RyO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRlbXBsYXRlc0J0blN0eWxlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgVGVtcGxhdGVzQnRuIH07XG4iLCJpbXBvcnQgdGhlbWVCdG5TdHlsZXNTdHIgZnJvbSAnLi9UaGVtZUJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIFRoZW1lQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHRoaXMuYnRuID0gYnRuO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcblxuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKGJ0bik7XG5cbiAgICBjb25zdCB0aGVtZUJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGhlbWVCdG5TdHlsZXMudGV4dENvbnRlbnQgPSB0aGVtZUJ0blN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0aGVtZUJ0blN0eWxlcyk7XG5cbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIHRoaXMuY2hvb3NlSW1nKCk7XG5cbiAgICBidG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgIHJvb3QuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycpO1xuICAgICAgdGhpcy5jaG9vc2VJbWcoKTtcbiAgICB9O1xuICB9XG5cbiAgY2hvb3NlSW1nKCkge1xuICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrJykpIHtcbiAgICAgIHRoaXMuYnRuLmlubmVySFRNTCA9IGBcbiAgICAgIDxzdmcgd2lkdGg9XCIzNHB4XCIgaGVpZ2h0PVwiMzRweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgIDxwYXRoIGQ9XCJNMjEuMDY3MiAxMS44NTY4TDIwLjQyNTMgMTEuNDY5TDIxLjA2NzIgMTEuODU2OFpNMTIuMTQzMiAyLjkzMjc2TDExLjc1NTMgMi4yOTA4NVYyLjI5MDg1TDEyLjE0MzIgMi45MzI3NlpNNy4zNzU1NCAyMC4wMTNDNy4wMTcgMTkuODA1NiA2LjU1ODIgMTkuOTI4MSA2LjM1MDggMjAuMjg2NkM2LjE0MzM5IDIwLjY0NTIgNi4yNjU5MSAyMS4xMDQgNi42MjQ0NiAyMS4zMTE0TDcuMzc1NTQgMjAuMDEzWk0yLjY4ODYyIDE3LjM3NTVDMi44OTYwMiAxNy43MzQxIDMuMzU0ODIgMTcuODU2NiAzLjcxMzM3IDE3LjY0OTJDNC4wNzE5MSAxNy40NDE4IDQuMTk0NDMgMTYuOTgzIDMuOTg3MDMgMTYuNjI0NUwyLjY4ODYyIDE3LjM3NTVaTTIxLjI1IDEyQzIxLjI1IDE3LjEwODYgMTcuMTA4NiAyMS4yNSAxMiAyMS4yNVYyMi43NUMxNy45MzcxIDIyLjc1IDIyLjc1IDE3LjkzNzEgMjIuNzUgMTJIMjEuMjVaTTIuNzUgMTJDMi43NSA2Ljg5MTM3IDYuODkxMzcgMi43NSAxMiAyLjc1VjEuMjVDNi4wNjI5NCAxLjI1IDEuMjUgNi4wNjI5NCAxLjI1IDEySDIuNzVaTTE1LjUgMTQuMjVDMTIuMzI0NCAxNC4yNSA5Ljc1IDExLjY3NTYgOS43NSA4LjVIOC4yNUM4LjI1IDEyLjUwNDEgMTEuNDk1OSAxNS43NSAxNS41IDE1Ljc1VjE0LjI1Wk0yMC40MjUzIDExLjQ2OUMxOS40MTcyIDEzLjEzNzMgMTcuNTg4MiAxNC4yNSAxNS41IDE0LjI1VjE1Ljc1QzE4LjEzNDkgMTUuNzUgMjAuNDQwNyAxNC4zNDM5IDIxLjcwOTIgMTIuMjQ0N0wyMC40MjUzIDExLjQ2OVpNOS43NSA4LjVDOS43NSA2LjQxMTgyIDEwLjg2MjcgNC41ODI4IDEyLjUzMSAzLjU3NDY3TDExLjc1NTMgMi4yOTA4NUM5LjY1NjA5IDMuNTU5MyA4LjI1IDUuODY1MDkgOC4yNSA4LjVIOS43NVpNMTIgMi43NUMxMS45MTE1IDIuNzUgMTEuODA3NyAyLjcxMDA4IDExLjczMjQgMi42MzE2OEMxMS42Njg2IDIuNTY1MjcgMTEuNjUzOCAyLjUwMjQ0IDExLjY1MDMgMi40NzcwM0MxMS42NDYxIDIuNDQ1ODcgMTEuNjQ4MiAyLjM1NTU3IDExLjc1NTMgMi4yOTA4NUwxMi41MzEgMy41NzQ2N0MxMy4wMzQyIDMuMjcwNjUgMTMuMTk2IDIuNzEzOTggMTMuMTM2OCAyLjI3NjI3QzEzLjA3NTQgMS44MjEyNiAxMi43MTY2IDEuMjUgMTIgMS4yNVYyLjc1Wk0yMS43MDkyIDEyLjI0NDdDMjEuNjQ0NCAxMi4zNTE4IDIxLjU1NDEgMTIuMzUzOSAyMS41MjMgMTIuMzQ5N0MyMS40OTc2IDEyLjM0NjIgMjEuNDM0NyAxMi4zMzE0IDIxLjM2ODMgMTIuMjY3NkMyMS4yODk5IDEyLjE5MjMgMjEuMjUgMTIuMDg4NSAyMS4yNSAxMkgyMi43NUMyMi43NSAxMS4yODM0IDIyLjE3ODcgMTAuOTI0NiAyMS43MjM3IDEwLjg2MzJDMjEuMjg2IDEwLjgwNCAyMC43MjkzIDEwLjk2NTggMjAuNDI1MyAxMS40NjlMMjEuNzA5MiAxMi4yNDQ3Wk0xMiAyMS4yNUMxMC4zMTM5IDIxLjI1IDguNzM1MzMgMjAuNzk5NiA3LjM3NTU0IDIwLjAxM0w2LjYyNDQ2IDIxLjMxMTRDOC4yMDY0IDIyLjIyNjUgMTAuMDQzMiAyMi43NSAxMiAyMi43NVYyMS4yNVpNMy45ODcwMyAxNi42MjQ1QzMuMjAwNDMgMTUuMjY0NyAyLjc1IDEzLjY4NjEgMi43NSAxMkgxLjI1QzEuMjUgMTMuOTU2OCAxLjc3MzUxIDE1Ljc5MzYgMi42ODg2MiAxNy4zNzU1TDMuOTg3MDMgMTYuNjI0NVpcIiBmaWxsPVwiI2ZmZmZmZlwiLz5cbiAgICA8L3N2Zz5cbiAgICAgIGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnRuLmlubmVySFRNTCA9IGBcbiAgICAgIDxzdmcgd2lkdGg9XCIzNHB4XCIgaGVpZ2h0PVwiMzRweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgIDxwYXRoIGQ9XCJNNy4yODQ1MSAxMC4zMzMzQzcuMTAwMjYgMTAuODU0NiA3IDExLjQxNTYgNyAxMkM3IDE0Ljc2MTQgOS4yMzg1OCAxNyAxMiAxN0MxNC43NjE0IDE3IDE3IDE0Ljc2MTQgMTcgMTJDMTcgOS4yMzg1OCAxNC43NjE0IDcgMTIgN0MxMS40MTU2IDcgMTAuODU0NiA3LjEwMDI2IDEwLjMzMzMgNy4yODQ1MVwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgPHBhdGggZD1cIk0xMiAyVjRcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNMTIgMjBWMjJcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNNCAxMkwyIDEyXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTIyIDEyTDIwIDEyXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTE5Ljc3NzggNC4yMjI2NkwxNy41NTU4IDYuMjU0MjRcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNNC4yMjIxNyA0LjIyMjY2TDYuNDQ0MTggNi4yNTQyNFwiIHN0cm9rZT1cIiNmZmZmZmZcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIvPlxuICAgICAgPHBhdGggZD1cIk02LjQ0NDM0IDE3LjU1NTdMNC4yMjIxMSAxOS43Nzc5XCIgc3Ryb2tlPVwiI2ZmZmZmZlwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIi8+XG4gICAgICA8cGF0aCBkPVwiTTE5Ljc3NzggMTkuNzc3M0wxNy41NTU4IDE3LjU1NTFcIiBzdHJva2U9XCIjZmZmZmZmXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICAgYDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgVGhlbWVCdG4gfTtcbiIsImltcG9ydCBub25vZ3JhbVN0eWxlc1N0ciBmcm9tICcuL0dhbWVOb25vZ3JhbS5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgeyBHYW1lRmllbGQgfSBmcm9tICcuL2dhbWVGaWVsZC9HYW1lRmllbGQnO1xuaW1wb3J0IHsgUmVzdGFydEJ0biB9IGZyb20gJy4vcmVzdGFydEJ0bi9SZXN0YXJ0QnRuJztcbmltcG9ydCB7IFNvbHV0aW9uQnRuIH0gZnJvbSAnLi9zb2x1dGlvbkJ0bi9Tb2x1dGlvbkJ0bic7XG5pbXBvcnQgeyBTYXZlQnRuIH0gZnJvbSAnLi9zYXZlQnRuL1NhdmVCdG4nO1xuaW1wb3J0IHsgR2FtZVRpbWVyIH0gZnJvbSAnLi9nYW1lVGltZXIvR2FtZVRpbWVyJztcbmltcG9ydCB7IFJlc3VsdE1vZGFsIH0gZnJvbSAnLi9yZXN1bHRNb2RhbC9SZXN1bHRNb2RhbCc7XG5pbXBvcnQgbm9ub2dyYW1zIGZyb20gJy4uLy4uL3Jlc291cmNlcy9ub25vZ3JhbXMuanNvbic7XG5pbXBvcnQgd2luU291bmRGaWxlIGZyb20gJy4vLi4vLi4vYXNzZXRzL3NvdW5kLWVmZmVjdHMvd2luLWdhbWUubXAzJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLWZpZWxkJywgR2FtZUZpZWxkKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgncmVzdGFydC1idG4nLCBSZXN0YXJ0QnRuKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc29sdXRpb24tYnRuJywgU29sdXRpb25CdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdzYXZlLWJ0bicsIFNhdmVCdG4pO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLXRpbWVyJywgR2FtZVRpbWVyKTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgncmVzdWx0LW1vZGFsJywgUmVzdWx0TW9kYWwpO1xuXG5jb25zdCBub25vZ3JhbVN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5ub25vZ3JhbVN0eWxlcy50ZXh0Q29udGVudCA9IG5vbm9ncmFtU3R5bGVzU3RyO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxkaXYgY2xhc3M9XCJub25vZ3JhbV9fY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgIDxyZXN0YXJ0LWJ0bj48L3Jlc3RhcnQtYnRuPlxuICAgICAgPHNhdmUtYnRuPjwvc2F2ZS1idG4+XG4gICAgICA8Z2FtZS10aW1lciBpZD1cImdhbWUtdGltZXJcIiBtaW51dGVzPVwiMFwiIHNlY29uZHM9XCIwXCI+PC9nYW1lLXRpbWVyPlxuICAgICAgPHNvbHV0aW9uLWJ0bj48L3NvbHV0aW9uLWJ0bj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgaWQ9XCJzdW1tYXJ5XCIgY2xhc3M9XCJzdW1tYXJ5XCI+XG4gICAgICA8L2Rpdj4gIFxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJub25vZ3JhbV9fd3JhcHBlclwiPlxuICAgICAgPGRpdiBpZD1cIm5vbm9ncmFtXCIgY2xhc3M9XCJub25vZ3JhbVwiPlxuICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b3AtcGFuZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdC1wYW5lXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4gIFxuICAgIFxuICA8L2Rpdj5cbmA7XG5cbmNsYXNzIEdhbWVOb25vZ3JhbSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICBzaGFkb3dSb290LmFwcGVuZChub25vZ3JhbVN0eWxlcyk7XG5cbiAgICBjb25zdCBsZXZlbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdsZXZlbCcpO1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgIGNvbnN0IHNhdmVkU29sdXRpb24gPSB0aGlzLmdldEF0dHJpYnV0ZSgnc2F2ZWRzb2x1dGlvbicpO1xuICAgIGNvbnN0IGNyb3NzZWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnY3Jvc3NlZCcpO1xuXG4gICAgY29uc3QgdGltZXIgPSBzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLXRpbWVyJyk7XG4gICAgY29uc29sZS5sb2coJ25vbm9ncmFtIGFkZGVkIHRvIHRoZSBkb2MnKTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKCdtaW51dGVzJykgIT09ICcwJyB8fFxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKSAhPT0gJzAnXG4gICAgKSB7XG4gICAgICBjb25zdCBzYXZlZE1pbnV0ZXMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbWludXRlcycpO1xuICAgICAgY29uc3Qgc2F2ZWRTZWNvbmRzID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKTtcblxuICAgICAgdGltZXIuc2V0QXR0cmlidXRlKCdtaW51dGVzJywgc2F2ZWRNaW51dGVzKTtcbiAgICAgIHRpbWVyLnNldEF0dHJpYnV0ZSgnc2Vjb25kcycsIHNhdmVkU2Vjb25kcyk7XG5cbiAgICAgIHRpbWVyLmNvbnRpbnVlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKCdzdW1tYXJ5JykuaW5uZXJIVE1MID0gYFxuICAgICAgPHAgY2xhc3M9XCJzdW1tYXJ5X19sZXZlbFwiPiR7bGV2ZWx9PC9wPlxuICAgICAgPHAgY2xhc3M9XCJzdW1tYXJ5X19uYW1lXCI+ICR7bmFtZVswXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKX08L3A+XG4gICAgYDtcblxuICAgIGNvbnN0IG5vbm9ncmFtID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjbm9ub2dyYW0nKTtcbiAgICBjb25zdCBmaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2dhbWUtZmllbGQnKTtcbiAgICBmaWVsZC5pZCA9ICdnYW1lLWZpZWxkJztcbiAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdnYW1lLWZpZWxkJyk7XG4gICAgZmllbGQuc2F2ZWRTb2x1dGlvbiA9IHNhdmVkU29sdXRpb247XG4gICAgZmllbGQuY3Jvc3NlZCA9IGNyb3NzZWQ7XG4gICAgZmllbGQuc2V0QXR0cmlidXRlKCdsZXZlbCcsIGxldmVsKTtcblxuICAgIG5vbm9ncmFtLmFwcGVuZChmaWVsZCk7XG5cbiAgICBjb25zdCB7IG1hdHJpeCB9ID0gbm9ub2dyYW1zLmZpbmQoXG4gICAgICAoaXRlbSkgPT4gaXRlbS5uYW1lID09PSBuYW1lICYmIGl0ZW0ubGV2ZWwgPT09IGxldmVsXG4gICAgKTtcblxuICAgIGNvbnN0IGNvcnJlY3RTb2x1dGlvbiA9IG1hdHJpeC5mbGF0KCkuam9pbignJykudG9TdHJpbmcoKTtcblxuICAgIC8vIERyYXcgbWF0cml4IHNvbHV0aW9uXG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIG1hdHJpeC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgc3RyICs9IGVsLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGN1cnIgPyAn4pagJyA6ICfilqEnO1xuICAgICAgICByZXR1cm4gYWNjICsgc3F1YXJlO1xuICAgICAgfSwgJycpO1xuICAgICAgc3RyICs9ICdcXG4nO1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKHN0cik7XG5cbiAgICBjb25zdCB0b3BQYW5lID0gc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcudG9wLXBhbmUnKTtcbiAgICBjb25zdCBsZWZ0UGFuZSA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLmxlZnQtcGFuZScpO1xuICAgIGxldCBtYXhMZWZ0SGludHMgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxlZnRIaW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBsZWZ0SGludC5jbGFzc0xpc3QuYWRkKCdsZWZ0LXBhbmVfX2hpbnQnKTtcblxuICAgICAgY29uc3QgdG9wSGludCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9wSGludC5jbGFzc0xpc3QuYWRkKCd0b3AtcGFuZV9faGludCcpO1xuXG4gICAgICBsZXQgY291bnRlckxlZnQgPSAwO1xuICAgICAgbGV0IGNvdW50ZXJUb3AgPSAwO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBpZiAobWF0cml4W2ldW2pdKSB7XG4gICAgICAgICAgY291bnRlckxlZnQgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAoY291bnRlckxlZnQgJiYgIW1hdHJpeFtpXVtqXSkgfHxcbiAgICAgICAgICAoY291bnRlckxlZnQgJiYgaiA9PT0gbWF0cml4Lmxlbmd0aCAtIDEpXG4gICAgICAgICkge1xuICAgICAgICAgIGxlZnRIaW50Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgICAgICAgYFxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGVmdC1wYW5lX19udW1iZXJcIj4ke2NvdW50ZXJMZWZ0fTwvZGl2PlxuXHRcdFx0XHRcdFx0YFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb3VudGVyTGVmdCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0cml4W2pdW2ldKSB7XG4gICAgICAgICAgY291bnRlclRvcCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChjb3VudGVyVG9wICYmICFtYXRyaXhbal1baV0pIHx8XG4gICAgICAgICAgKGNvdW50ZXJUb3AgJiYgaiA9PT0gbWF0cml4Lmxlbmd0aCAtIDEpXG4gICAgICAgICkge1xuICAgICAgICAgIHRvcEhpbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAgICAgICBgXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidG9wLXBhbmVfX251bWJlclwiPiR7Y291bnRlclRvcH08L2Rpdj5cblx0XHRcdFx0XHRcdGBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY291bnRlclRvcCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGVmdFBhbmUuYXBwZW5kKGxlZnRIaW50KTtcbiAgICAgIHRvcFBhbmUuYXBwZW5kKHRvcEhpbnQpO1xuXG4gICAgICBpZiAobGVmdEhpbnQuY2hpbGRyZW4ubGVuZ3RoID4gbWF4TGVmdEhpbnRzKSB7XG4gICAgICAgIG1heExlZnRIaW50cyA9IGxlZnRIaW50LmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYWxjdWxhdGUgY2VsbCBzaXplXG4gICAgY29uc3Qgbm9ub2dyYW1XaWR0aCA9IG5vbm9ncmFtLm9mZnNldFdpZHRoO1xuXG4gICAgbGV0IGNlbGxTaXplID0gbm9ub2dyYW1XaWR0aCAvIChtYXhMZWZ0SGludHMgKyBtYXRyaXgubGVuZ3RoKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY2VsbC1zaXplJywgY2VsbFNpemUgKyAncHgnKTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignZmlsbCcsICgpID0+IHtcbiAgICAgIGlmIChjb3JyZWN0U29sdXRpb24gPT09IGZpZWxkLmN1cnJlbnRTb2x1dGlvbikge1xuICAgICAgICBmaWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnd2luJykpO1xuICAgICAgICB0aW1lci5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnd2luJykpO1xuICAgICAgICBjb25zdCBtaW51dGVzID0gdGltZXIuZ2V0QXR0cmlidXRlKCdtaW51dGVzJyk7XG5cbiAgICAgICAgbGV0IG1pbnV0ZXNTdHIgPSAhbWludXRlcyB8fCBgJHttaW51dGVzfSBtaW51dGVgO1xuICAgICAgICBtaW51dGVzU3RyID0gK21pbnV0ZXMgPiAxID8gbWludXRlc1N0ciArICdzICcgOiBtaW51dGVzU3RyICsgJyAnO1xuXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSB0aW1lci5nZXRBdHRyaWJ1dGUoJ3NlY29uZHMnKTtcbiAgICAgICAgbGV0IHNlY29uZHNTdHIgPSAhc2Vjb25kcyB8fCBgJHtzZWNvbmRzfSBzZWNvbmRgO1xuICAgICAgICBzZWNvbmRzU3RyID0gK3NlY29uZHMgPiAxID8gc2Vjb25kc1N0ciArICdzJyA6IHNlY29uZHNTdHI7XG5cbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtdXRlZCcpICE9PSAndHJ1ZScpIHtcbiAgICAgICAgICBuZXcgQXVkaW8od2luU291bmRGaWxlKS5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Jlc3VsdC1tb2RhbCcpO1xuICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgbW9kYWwubWVzc2FnZSA9IGBHcmVhdCEgWW91IGhhdmUgc29sdmVkIHRoZSBub25vZ3JhbSAke25hbWVbMF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSl9IGluICR7bWludXRlc1N0cn0ke3NlY29uZHNTdHJ9IWA7XG4gICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kKG1vZGFsKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgY29uc3Qgc2F2ZWRSZXN1bHQgPSB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBsZXZlbCxcbiAgICAgICAgICB0aW1lOiB0aW1lci5jdXJyZW50RHVyYXRpb24sXG4gICAgICAgICAgZHVyYXRpb246ICttaW51dGVzICogNjAgKyArc2Vjb25kcyxcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgaGlnaFNjb3JlVGFibGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWdoU2NvcmVUYWJsZScpKTtcbiAgICAgICAgaWYgKCFoaWdoU2NvcmVUYWJsZSkgaGlnaFNjb3JlVGFibGUgPSBbXTtcbiAgICAgICAgaGlnaFNjb3JlVGFibGUudW5zaGlmdChzYXZlZFJlc3VsdCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICdoaWdoU2NvcmVUYWJsZScsXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoaGlnaFNjb3JlVGFibGUuc2xpY2UoMCwgNSkpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc3RhcnQnLCAoKSA9PiB7XG4gICAgICBmaWVsZC50aW1lclN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyZXN0YXJ0JykpO1xuICAgICAgdGltZXIucmVzdGFydCgpO1xuICAgIH0pO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdzb2x1dGlvbicsICgpID0+IHtcbiAgICAgIHRpbWVyLnN0b3AoKTtcblxuICAgICAgZmllbGQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzb2x1dGlvbicsIHtcbiAgICAgICAgICBkZXRhaWw6IG1hdHJpeC5mbGF0KCksXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgc2hhZG93Um9vdC5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdzYXZlLWdhbWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBnYW1lID0ge1xuICAgICAgICBsZXZlbCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY3VycmVudFNvbHV0aW9uOiBmaWVsZC5jdXJyZW50U29sdXRpb24sXG4gICAgICAgIGNyb3NzZWQ6IGZpZWxkLmN1cnJlbnRDcm9zc2VkLFxuICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgbWludXRlczogdGltZXIubWludXRlcyxcbiAgICAgICAgICBzZWNvbmRzOiB0aW1lci5zZWNvbmRzLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NhdmVkR2FtZScsIEpTT04uc3RyaW5naWZ5KGdhbWUpKTtcblxuICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZ2FtZS1oZWFkZXInKTtcbiAgICAgIGNvbnN0IGNvbnRpbnVlQnRuID0gaGVhZGVyLnNoYWRvd1Jvb3RcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ2dhbWUtbWVudS5oZWFkZXInKVxuICAgICAgICAuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdjb250aW51ZS1idG4nKTtcbiAgICAgIGNvbnN0IGlubmVyID0gY29udGludWVCdG4uc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uJyk7XG4gICAgICBpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuXG4gICAgICBjb25zb2xlLmxvZyhpbm5lcik7XG4gICAgfSk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3N0YXJ0dGltZXInLCAoKSA9PiB7XG4gICAgICB0aW1lci5sYXVuY2goKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lTm9ub2dyYW0gfTtcbiIsImltcG9ydCBmaWVsZFN0eWxlc1N0ciBmcm9tICcuL0dhbWVGaWVsZC5zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgZmlsbFNvdW5kRmlsZSBmcm9tICcuLy4uLy4uLy4uL2Fzc2V0cy9zb3VuZC1lZmZlY3RzL2ZpbGwtY2VsbC5tcDMnO1xuaW1wb3J0IGNsZWFyU291bmRGaWxlIGZyb20gJy4vLi4vLi4vLi4vYXNzZXRzL3NvdW5kLWVmZmVjdHMvY2xlYXItY2VsbC5tcDMnO1xuaW1wb3J0IGNyb3NzU291bmRGaWxlIGZyb20gJy4vLi4vLi4vLi4vYXNzZXRzL3NvdW5kLWVmZmVjdHMvY3Jvc3MtY2VsbC5tcDMnO1xuXG5jb25zdCBmaWVsZFN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5maWVsZFN0eWxlcy50ZXh0Q29udGVudCA9IGZpZWxkU3R5bGVzU3RyO1xuXG5jbGFzcyBHYW1lRmllbGQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmFwcGVuZChmaWVsZFN0eWxlcyk7XG5cbiAgICB0aGlzLmxldmVsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xldmVsJykuc3BsaXQoJ3gnKVswXTtcblxuICAgIHRoaXMuZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmZpZWxkLmlkID0gJ2ZpZWxkJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZXZlbDsgaSArPSAxKSB7XG4gICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGV2ZWw7IGogKz0gMSkge1xuICAgICAgICByb3cuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5gKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmllbGQuYXBwZW5kKHJvdyk7XG4gICAgfVxuXG4gICAgc2hhZG93Um9vdC5hcHBlbmQodGhpcy5maWVsZCk7XG5cbiAgICB0aGlzLmNlbGxzID0gdGhpcy5maWVsZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuXG4gICAgdGhpcy5jdXJyZW50U29sdXRpb24gPVxuICAgICAgdGhpcy5zYXZlZFNvbHV0aW9uIHx8IG5ldyBBcnJheSh0aGlzLmNlbGxzLmxlbmd0aCkuZmlsbCgwKS5qb2luKCcnKTtcblxuICAgIGlmICh0aGlzLnNhdmVkU29sdXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zYXZlZFNvbHV0aW9uW2ldID09PSAnMScpIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jcm9zc2VkKSB7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY3Jvc3NlZFtpXSA9PT0gJ3gnKSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjcm9zc2VkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2xpY2tzRGlzYWJsZWQpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2xpY2tzRGlzYWJsZWQpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpO1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZmlsbGVkJyk7XG5cbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXV0ZWQnKSAhPT0gJ3RydWUnKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpbGxlZCcpKSB7XG4gICAgICAgICAgbmV3IEF1ZGlvKGZpbGxTb3VuZEZpbGUpLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXcgQXVkaW8oY2xlYXJTb3VuZEZpbGUpLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrU29sdXRpb24oKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdjcm9zc2VkJyk7XG5cbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXV0ZWQnKSAhPT0gJ3RydWUnKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nyb3NzZWQnKSkge1xuICAgICAgICAgIG5ldyBBdWRpbyhjcm9zc1NvdW5kRmlsZSkucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ldyBBdWRpbyhjbGVhclNvdW5kRmlsZSkucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tTb2x1dGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRpbWVyU3RhcnRlZCkgcmV0dXJuO1xuICAgICAgdGhpcy50aW1lclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLmZpZWxkLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc3RhcnR0aW1lcicsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy50aW1lclN0YXJ0ZWQpIHJldHVybjtcbiAgICAgIHRoaXMudGltZXJTdGFydGVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3N0YXJ0dGltZXInLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc3RhcnQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmVuYWJsZUNsaWNrcygpO1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcsICdjcm9zc2VkJykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdzb2x1dGlvbicsIChlKSA9PiB7XG4gICAgICB0aGlzLmRpc2FibGVDbGlja3MoKTtcblxuICAgICAgY29uc3Qgc29sdXRpb24gPSBlLmRldGFpbDtcblxuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgIGlmIChzb2x1dGlvbltpXSkge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnY3Jvc3NlZCcpO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjcm9zc2VkJyk7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3dpbicsICgpID0+IHtcbiAgICAgIHRoaXMuZGlzYWJsZUNsaWNrcygpO1xuICAgICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nyb3NzZWQnKSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NvbHV0aW9uKCkge1xuICAgIHRoaXMuY3VycmVudFNvbHV0aW9uID0gWy4uLnRoaXMuY2VsbHNdLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICByZXR1cm4gY3Vyci5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpbGxlZCcpID8gYWNjICsgJzEnIDogYWNjICsgJzAnO1xuICAgIH0sICcnKTtcblxuICAgIHRoaXMuY3VycmVudENyb3NzZWQgPSBbLi4udGhpcy5jZWxsc10ucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgIHJldHVybiBjdXJyLmNsYXNzTGlzdC5jb250YWlucygnY3Jvc3NlZCcpID8gYWNjICsgJ3gnIDogYWNjICsgJzAnO1xuICAgIH0sICcnKTtcblxuICAgIHRoaXMuZmllbGQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnZmlsbCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBkaXNhYmxlQ2xpY2tzKCkge1xuICAgIHRoaXMuY2xpY2tzRGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgZW5hYmxlQ2xpY2tzKCkge1xuICAgIHRoaXMuY2xpY2tzRGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lRmllbGQgfTtcbiIsImltcG9ydCB0aW1lclN0eWxlc1N0ciBmcm9tICcuL0dhbWVUaW1lci5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHRpbWVyU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnRpbWVyU3R5bGVzLnRleHRDb250ZW50ID0gdGltZXJTdHlsZXNTdHI7XG5cbmNsYXNzIEdhbWVUaW1lciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5hcHBlbmQodGltZXJTdHlsZXMpO1xuXG4gICAgaWYgKCF0aGlzLnJlbmRlcmVkKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5yZW5kZXJlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd3aW4nLCAoKSA9PiB0aGlzLnN0b3AoKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IG1pbnV0ZXMgPVxuICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKS5sZW5ndGggPT09IDFcbiAgICAgICAgPyBgMCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKX1gXG4gICAgICAgIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ21pbnV0ZXMnKTtcblxuICAgIGxldCBzZWNvbmRzID1cbiAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJykubGVuZ3RoID09PSAxXG4gICAgICAgID8gYDAke3RoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyl9YFxuICAgICAgICA6IHRoaXMuZ2V0QXR0cmlidXRlKCdzZWNvbmRzJyk7XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IGAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xuXG4gICAgdGhpcy5taW51dGVzID0gbWludXRlcztcbiAgICB0aGlzLnNlY29uZHMgPSBzZWNvbmRzO1xuICAgIHRoaXMuY3VycmVudER1cmF0aW9uID0gZHVyYXRpb247XG4gICAgdGhpcy5pbm5lckhUTUwgPSBkdXJhdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ21pbnV0ZXMnLCAnc2Vjb25kcyddO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCkge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBsYXVuY2goKSB7XG4gICAgaWYgKHRoaXMuY29udGludWUpIHtcbiAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmN1cnJlbnREdXJhdGlvbi5zcGxpdCgnOicpO1xuICAgICAgY29uc3QgbWluID0gK3RpbWVbMF07XG4gICAgICBjb25zdCBzZWMgPSArdGltZVsxXTtcblxuICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpIC0gKG1pbiAqIDYwICsgc2VjKSAqIDEwMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJRCk7XG5cbiAgICB0aGlzLmludGVydmFsSUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLnRydW5jKChub3cgLSB0aGlzLnN0YXJ0VGltZSkgLyAxMDAwKTtcblxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlY29uZHMnLCBkdXJhdGlvbiAlIDYwKTtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtaW51dGVzJywgTWF0aC5mbG9vcihkdXJhdGlvbiAvIDYwKSk7XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKTtcbiAgfVxuXG4gIHJlc3RhcnQoKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBudWxsO1xuICAgIHRoaXMuY29udGludWUgPSBmYWxzZTtcblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWNvbmRzJywgJzAnKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbWludXRlcycsICcwJyk7XG5cbiAgICB0aGlzLnN0b3AoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVUaW1lciB9O1xuIiwiaW1wb3J0IHJlc3RhcnRCdG5TdHlsZXNTdHIgZnJvbSAnLi9SZXN0YXJ0QnRuLnN0eWxlcy5zY3NzJztcblxuY29uc3QgcmVzdGFydEJ0blN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5yZXN0YXJ0QnRuU3R5bGVzLnRleHRDb250ZW50ID0gcmVzdGFydEJ0blN0eWxlc1N0cjtcblxuY2xhc3MgUmVzdGFydEJ0biBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvblwiPlJlc3RhcnQgZ2FtZTwvZGl2PlxuICAgIGA7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQocmVzdGFydEJ0blN0eWxlcyk7XG5cbiAgICBzaGFkb3dSb290LmZpcnN0RWxlbWVudENoaWxkLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgncmVzdGFydCcsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IFJlc3RhcnRCdG4gfTtcbiIsImltcG9ydCBtb2RhbFN0eWxlc1N0ciBmcm9tICcuL1Jlc3VsdE1vZGFsLnN0eWxlcy5zY3NzJztcblxuY29uc3QgbW9kYWxTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xubW9kYWxTdHlsZXMuaW5uZXJUZXh0ID0gbW9kYWxTdHlsZXNTdHI7XG5cbmNsYXNzIFJlc3VsdE1vZGFsIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZChtb2RhbFN0eWxlcyk7XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgd3JhcHBlci5jbGFzc05hbWUgPSAnbW9kYWxfX3dyYXBwZXInO1xuXG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtb2RhbC5jbGFzc05hbWUgPSAnbW9kYWwnO1xuXG4gICAgaWYgKHRoaXMubWVzc2FnZSkge1xuICAgICAgbW9kYWwudGV4dENvbnRlbnQgPSB0aGlzLm1lc3NhZ2U7XG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjbG9zZS5jbGFzc05hbWUgPSAnbW9kYWxfX2Nsb3NlJztcbiAgICBjbG9zZS5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWxfX2Nsb3NlLXN0cm9rZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsX19jbG9zZS1zdHJva2VcIj48L2Rpdj5cbiAgICBgO1xuXG4gICAgbW9kYWwuYXBwZW5kKGNsb3NlKTtcbiAgICB3cmFwcGVyLmFwcGVuZChtb2RhbCk7XG4gICAgc2hhZG93Um9vdC5hcHBlbmQod3JhcHBlcik7XG5cbiAgICBjbG9zZS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHdyYXBwZXIucmVtb3ZlKCkpO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IHsgUmVzdWx0TW9kYWwgfTtcbiIsImltcG9ydCBzYXZlQnRuU3R5bGVzU3RyIGZyb20gJy4vU2F2ZUJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHNhdmVCdG5TdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuc2F2ZUJ0blN0eWxlcy50ZXh0Q29udGVudCA9IHNhdmVCdG5TdHlsZXNTdHI7XG5cbmNsYXNzIFNhdmVCdG4gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICBzaGFkb3dSb290LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25cIj5TYXZlIGdhbWU8L2Rpdj5cbiAgICBgO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHNhdmVCdG5TdHlsZXMpO1xuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5jdXJyZW50VGFyZ2V0LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2F2ZS1nYW1lJywgeyBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBTYXZlQnRuIH07XG4iLCJpbXBvcnQgc29sdXRpb25CdG5TdHlsZXNTdHIgZnJvbSAnLi9Tb2x1dGlvbkJ0bi5zdHlsZXMuc2Nzcyc7XG5cbmNvbnN0IHNvbHV0aW9uQnRuU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbnNvbHV0aW9uQnRuU3R5bGVzLnRleHRDb250ZW50ID0gc29sdXRpb25CdG5TdHlsZXNTdHI7XG5cbmNsYXNzIFNvbHV0aW9uQnRuIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgc2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uXCI+U29sdXRpb248L2Rpdj5cbiAgICBgO1xuICAgIHNoYWRvd1Jvb3QuYXBwZW5kKHNvbHV0aW9uQnRuU3R5bGVzKTtcblxuICAgIHNoYWRvd1Jvb3QuZmlyc3RFbGVtZW50Q2hpbGQub25jbGljayA9IChlKSA9PiB7XG4gICAgICBlLmN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzb2x1dGlvbicsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IFNvbHV0aW9uQnRuIH07XG4iLCJpbXBvcnQgaGlnaFNjb3JlU3R5bGVzU3RyIGZyb20gJy4vSGlnaFNjb3JlVGFibGUuc3R5bGVzLnNjc3MnO1xuXG5jbGFzcyBIaWdoU2NvcmVUYWJsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuXG4gICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgIGxldCByZXN1bHRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlnaFNjb3JlVGFibGUnKSkuc2xpY2UoXG4gICAgICAwLFxuICAgICAgNVxuICAgICk7XG4gICAgcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBhLmR1cmF0aW9uIC0gYi5kdXJhdGlvbik7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHMubWFwKFxuICAgICAgKHJlc3VsdCwgaSkgPT4gYCAgPHRyIGNsYXNzPVwiaGlnaC1zY29yZXNfX3Njb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7aSArIDF9LjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7cmVzdWx0LnRpbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtyZXN1bHQubGV2ZWx9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtyZXN1bHQubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgYFxuICAgICk7XG5cbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImhpZ2gtc2NvcmVzXCI+XG4gICAgICA8aDI+TGF0ZXN0IDUgc2NvcmVzOjwvaDI+XG4gICAgICA8dGFibGUgY2xhc3M9XCJoaWdoLXNjb3Jlc19fc2NvcmVzXCI+XG4gICAgICAgIDx0ciBjbGFzcz1cImhpZ2gtc2NvcmVzX19zY29yZSBoZWFkZXJcIj5cbiAgICAgICAgICA8dGg+Tm88L3RoPlxuICAgICAgICAgIDx0aD5UaW1lPC90aD5cbiAgICAgICAgICA8dGg+TGV2ZWw8L3RoPlxuICAgICAgICAgIDx0aD5HYW1lIG5hbWU8L3RoPlxuICAgICAgICA8L3RyPlxuICAgICAgICAke3Jlc3VsdHMuam9pbignXFxuJyl9XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuYDtcbiAgICBzaGFkb3dSb290LmFwcGVuZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICBjb25zdCBoaWdoU2NvcmVTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGhpZ2hTY29yZVN0eWxlcy50ZXh0Q29udGVudCA9IGhpZ2hTY29yZVN0eWxlc1N0cjtcbiAgICBzaGFkb3dSb290LmFwcGVuZChoaWdoU2NvcmVTdHlsZXMpO1xuICB9XG59XG5cbmV4cG9ydCB7IEhpZ2hTY29yZVRhYmxlIH07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBDb2xvcnNcblxuOnJvb3Qge1xuICAtLWNvbG9yLWJhY2tncm91bmQ6ICNmYmYzZjI7XG4gIC0tY29sb3ItYWNjZW50OiAjMDA3NTk2O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMTogI2ZhOTkxYztcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTEtdHJhbnNwYXJlbnQ6ICNmYTk5MWMyNTtcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTI6ICNmMDMxNmE7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yLXRyYW5zcGFyZW50OiAjZmExYzY2MjU7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0zOiAjNmIzMmU2O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktNDogIzE2YTc3YztcblxuICAtLWNvbG9yLXRleHQtbWFpbjogIzI2MjYyNjtcbiAgLS1jb2xvci10ZXh0LXJldmVyc2U6ICNmZmZmZmY7XG4gIC0tY29sb3ItdGV4dC1saWdodDogI2ZmZmZmZjtcbn1cblxuOnJvb3QuZGFyayB7XG4gIC0tY29sb3ItYmFja2dyb3VuZDogIzI2MzIzODtcbiAgLS1jb2xvci1hY2NlbnQ6ICMxOTIyMjc7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0xOiAjYWE3MjI4O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMS10cmFuc3BhcmVudDogI2ZhOTkxYzI1O1xuICAtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMjogIzk2Mjg0OTtcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTItdHJhbnNwYXJlbnQ6ICNmYTFjNjYyNTtcbiAgLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTM6ICM1ZTNlYTE7XG4gIC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS00OiAjMTc2ODUwO1xuXG4gIC0tY29sb3ItdGV4dC1tYWluOiAjZmZmZmZmO1xuICAtLWNvbG9yLXRleHQtcmV2ZXJzZTogIzI2MjYyNjtcbiAgLS1jb2xvci10ZXh0LWxpZ2h0OiAjZmZmZmZmO1xufVxuXG4vLyBTaXplc1xuXG46cm9vdCB7XG4gIC0tY2VsbC1zaXplOiBhdXRvO1xufVxuXG4vLyBGb250c1xuXG4kZm9udC1tYWluOiAnU2lnbmlrYSBOZWdhdGl2ZScsIHNhbnMtc2VyaWY7XG4iLCJAdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC9taXhpbnMnIGFzICo7XG5AdXNlICcuLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbi5idXJnZXItaWNvbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG5cbiAgd2lkdGg6IDQ0cHg7XG4gIGhlaWdodDogNDRweDtcblxuICBAaW5jbHVkZSBtYXgtNzY4IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgfVxuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gICRidG46ICY7XG5cbiAgJi5hY3RpdmUge1xuICAgICN7JGJ0bn1fX3N0cm9rZSB7XG4gICAgICAmOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg1cHgpIHJvdGF0ZSg0NWRlZyk7XG4gICAgICB9XG5cbiAgICAgICY6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpIHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICZfX3N0cm9rZSB7XG4gICAgd2lkdGg6IDI0cHg7XG4gICAgaGVpZ2h0OiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmFja2dyb3VuZCk7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuXG4gICAgdHJhbnNpdGlvbjogMC4zcztcbiAgfVxufVxuIiwiLyogRm9yIG1lZGlhIHF1ZXJpZXMgKi9cblxuQG1peGluIG1heC0xMjAwIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtaW4tMTAyNCB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMDI0cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTEwMjQge1xuICBAbWVkaWEgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG1heC03Njgge1xuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG5AbWl4aW4gbWF4LTU3NiB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBtYXgtMzgwIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDM4MHB4KSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIHBvcnRyYWl0IHtcbiAgQG1lZGlhIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuIiwiQHVzZSAnLi8uLi9hYnN0cmFjdC9taXhpbnMnIGFzICo7XG5AdXNlICcuLy4uL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuKiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmh0bWwge1xuICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcbn1cblxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJhY2tncm91bmQpO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcblxuICAmLnNjcm9sbC1kaXNhYmxlZCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cbn1cblxuLndyYXBwZXIge1xuICBtYXgtd2lkdGg6IDE0NDBweDtcbiAgcGFkZGluZzogMCA0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcblxuICBAaW5jbHVkZSBtYXgtNTc2IHtcbiAgICBwYWRkaW5nOiAwIDQuMjEwNTIlO1xuICB9XG59XG5cbi5zZWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMTAwcHg7XG59XG5cbmltZyB7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cblxuLnRyYW5zcGFyZW50IHtcbiAgb3BhY2l0eTogMDtcbn1cblxuOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbn1cbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L21peGlucycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2xheW91dC9iYXNpYycgYXMgKjtcblxuOmhvc3Qge1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFjY2VudCk7XG5cbiAgKiB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXRleHQtbGlnaHQpO1xuICB9XG59XG5cbmEge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMTBweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG5nYW1lLW1lbnUge1xuICBkaXNwbGF5OiBmbGV4O1xuICB0cmFuc2l0aW9uOiAwLjNzO1xuXG4gICYuaGVhZGVyIHtcbiAgICBAaW5jbHVkZSBtYXgtNzY4IHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgJi5oaWRkZW4ge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG5cbiAgJi5hYnNvbHV0ZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNzZweDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuXG4gICAgcGFkZGluZzogMCAxNnB4IDIwcHggMTZweDtcblxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQpO1xuICB9XG59XG5cbi53cmFwcGVyIHtcbiAgcGFkZGluZzogMTZweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDIwcHg7XG59XG5cbi5sZXZlbCB7XG4gICZfX2dhbWVzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBnYXA6IDEwcHg7XG4gIH1cbn1cblxuLm1lbnUge1xuICAmX19pdGVtIHtcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jb2xvci10ZXh0LW1haW4pO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yLXRyYW5zcGFyZW50KTtcblxuICAgIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0LW1haW4pO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblxuICAgIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFjY2VudC1zZWNvbmRhcnktMS10cmFuc3BhcmVudCk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICcuLy4uL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmJ1dHRvbiB7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuXG4gIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0LWxpZ2h0KTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTEpO1xuXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG5cbiAgdHJhbnNpdGlvbjogMC4zcztcblxuICAmOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZmlsdGVyOiBicmlnaHRuZXNzKDEyMCUpO1xuICB9XG5cbiAgJi5kaXNhYmxlZCB7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIGZpbHRlcjogb3BhY2l0eSgwLjYpIGdyYXlzY2FsZSgwLjUpO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICBmaWx0ZXI6IG9wYWNpdHkoMC42KSBncmF5c2NhbGUoMC41KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yKTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS00KTtcbn1cbiIsIi5idXR0b24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICB0cmFuc2l0aW9uOiAwLjNzO1xuXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMC45KTtcbiAgfVxufVxuIiwiQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvYWJzdHJhY3QvdmFyaWFibGVzJyBhcyAqO1xuQHVzZSAnLi8uLi8uLi8uLi9zdHlsZXMvY29tcG9uZW50cy9idXR0b24nIGFzICo7XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hY2NlbnQtc2Vjb25kYXJ5LTMpO1xufVxuIiwiLmJ1dHRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwLjkpO1xuICB9XG59XG4iLCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXG5cbi8qIERvY3VtZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxuICovXG5cbmh0bWwge1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cbn1cblxuLyogU2VjdGlvbnNcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXG4gKi9cblxubWFpbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXG4gKi9cblxuaDEge1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcbn1cblxuLyogR3JvdXBpbmcgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXG4gKi9cblxuaHIge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xuICBoZWlnaHQ6IDA7IC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnByZSB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG5wIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxudWwge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXG4gKi9cblxuYWJiclt0aXRsZV0ge1xuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5jb2RlLFxua2JkLFxuc2FtcCB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnNtYWxsIHtcbiAgZm9udC1zaXplOiA4MCU7XG59XG5cbi8qKlxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXG4gKiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3ViLFxuc3VwIHtcbiAgZm9udC1zaXplOiA3NSU7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuc3ViIHtcbiAgYm90dG9tOiAtMC4yNWVtO1xufVxuXG5zdXAge1xuICB0b3A6IC0wLjVlbTtcbn1cblxuLyogRW1iZWRkZWQgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxuICovXG5cbmltZyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG59XG5cbi8qIEZvcm1zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmlucHV0LFxub3B0Z3JvdXAsXG5zZWxlY3QsXG50ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICBtYXJnaW46IDA7IC8qIDIgKi9cbn1cblxuYnV0dG9uIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4vKipcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCB7XG4gIC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXG4gKi9cblxuYnV0dG9uLFxuc2VsZWN0IHtcbiAgLyogMSAqL1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcblt0eXBlPSdidXR0b24nXSxcblt0eXBlPSdyZXNldCddLFxuW3R5cGU9J3N1Ym1pdCddIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XG4gIGFwcGVhcmFuY2U6IGJ1dHRvbjtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdidXR0b24nXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPSdyZXNldCddOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9J3N1Ym1pdCddOjotbW96LWZvY3VzLWlubmVyIHtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xufVxuXG4vKipcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cbiAqL1xuXG5idXR0b246LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0nYnV0dG9uJ106LW1vei1mb2N1c3JpbmcsXG5bdHlwZT0ncmVzZXQnXTotbW96LWZvY3VzcmluZyxcblt0eXBlPSdzdWJtaXQnXTotbW96LWZvY3VzcmluZyB7XG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuZmllbGRzZXQge1xuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmxlZ2VuZCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4gKi9cblxucHJvZ3Jlc3Mge1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXG4gKi9cblxudGV4dGFyZWEge1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cbiAqL1xuXG5bdHlwZT0nY2hlY2tib3gnXSxcblt0eXBlPSdyYWRpbyddIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAyICovXG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxuICovXG5cblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcblt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPSdzZWFyY2gnXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXG4gIGFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cbiAqL1xuXG5bdHlwZT0nc2VhcmNoJ106Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cbiAqL1xuXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xufVxuXG4vKiBJbnRlcmFjdGl2ZVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXG4gKi9cblxuZGV0YWlscyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1bW1hcnkge1xuICBkaXNwbGF5OiBsaXN0LWl0ZW07XG59XG5cbi8qIE1pc2NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxuICovXG5cbnRlbXBsYXRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cbiAqL1xuXG5baGlkZGVuXSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4iLCJAdXNlICcuLy4uLy4uL3N0eWxlcy9iYXNlL25vcm1hbGl6ZScgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L21peGlucycgYXMgKjtcblxuOmhvc3Qge1xuICAqIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG59XG5cbi5hY3Rpb25zIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcblxuICB3aWR0aDogMTAwJTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5ub25vZ3JhbSB7XG4gICZfX2NvbnRhaW5lciB7XG4gICAgbWluLWhlaWdodDogY2FsYygxMDAlKTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIH1cblxuICAmX193cmFwcGVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICB3aWR0aDogNDAlO1xuXG4gIEBpbmNsdWRlIG1heC0xMjAwIHtcbiAgICB3aWR0aDogNTAlO1xuICB9XG5cbiAgQGluY2x1ZGUgcG9ydHJhaXQge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgQGluY2x1ZGUgbWF4LTc2OCB7XG4gICAgZm9udC1zaXplOiBtaW4oY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC44KSwgMnJlbSk7XG4gIH1cblxuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6XG4gICAgYXV0b1xuICAgIDFmciAxZnI7XG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XG4gICAgJ2EgYiBiJ1xuICAgICdjIGQgZCdcbiAgICAnYyBkIGQnO1xufVxuXG4uc3VtbWFyeSB7XG4gIHBhZGRpbmc6IDEwcHg7XG5cbiAgZ3JpZC1hcmVhOiBhO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDE2cHg7XG5cbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udG9wLXBhbmUge1xuICBncmlkLWFyZWE6IGI7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcblxuICBkaXNwbGF5OiBmbGV4O1xuXG4gIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItcmlnaHQ6IDFweCAjMDAwIHNvbGlkO1xuICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDFmO1xuXG4gICZfX2hpbnQge1xuICAgIHdpZHRoOiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuXG4gICAgYm9yZGVyLXRvcDogMXB4ICMwMDAgc29saWQ7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggIzAwMCBzb2xpZDtcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgc29saWQ7XG5cbiAgICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICBib3JkZXItcmlnaHQ6IDJweCAjMDAwMDAwIHNvbGlkO1xuICAgIH1cbiAgfVxuXG4gICZfX251bWJlciB7XG4gICAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxufVxuXG4ubGVmdC1wYW5lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGdyaWQtYXJlYTogYztcblxuICBib3JkZXItdG9wOiAxcHggIzAwMCBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4ICMwMDAgc29saWQ7XG4gIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwMWY7XG5cbiAgJl9faGludCB7XG4gICAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblxuICAgIGJvcmRlci10b3A6IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1ib3R0b206IDFweCAjMDAwIHNvbGlkO1xuICAgIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBzb2xpZDtcblxuICAgICY6bnRoLWNoaWxkKDVuKTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCAjMDAwMDAwIHNvbGlkO1xuICAgIH1cbiAgfVxuXG4gICZfX251bWJlciB7XG4gICAgd2lkdGg6IHZhcigtLWNlbGwtc2l6ZSk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG59XG5cbmdhbWUtZmllbGQge1xuICBncmlkLWFyZWE6IGQ7XG59XG5cbnJlc3VsdC1tb2RhbCB7XG4gIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgJi5oaWRkZW4ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB9XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5AdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9iYXNlL25vcm1hbGl6ZScgYXMgKjtcblxuOmhvc3Qge1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGJvcmRlcjogMXB4ICMwMDAwMDAgc29saWQ7XG5cbiAgKiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmZkNTtcbn1cblxuLnJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogdmFyKC0tY2VsbC1zaXplKTtcblxuICAmOm50aC1jaGlsZCg1bik6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4ICMwMDAwMDAgc29saWQ7XG4gIH1cbn1cblxuLmNlbGwge1xuICB3aWR0aDogdmFyKC0tY2VsbC1zaXplKTtcbiAgaGVpZ2h0OiB2YXIoLS1jZWxsLXNpemUpO1xuICBib3JkZXI6IDFweCAjMDAwMDAwIHNvbGlkO1xuXG4gIHRyYW5zaXRpb246IDAuMnM7XG5cbiAgJjpudGgtY2hpbGQoNW4pOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgIGJvcmRlci1yaWdodDogMnB4ICMwMDAwMDAgc29saWQ7XG4gIH1cblxuICAmLmZpbGxlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgfVxuXG4gICYuY3Jvc3NlZCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgJjo6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICBsZWZ0OiA1MCU7XG5cbiAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWNlbGwtc2l6ZSkgKiAwLjkpO1xuICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSByb3RhdGUoNDVkZWcpO1xuICAgIH1cbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbGVmdDogNTAlO1xuXG4gICAgICB3aWR0aDogY2FsYyh2YXIoLS1jZWxsLXNpemUpICogMC45KTtcbiAgICAgIGhlaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcblxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgcm90YXRlKC00NWRlZyk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICcuLy4uLy4uLy4uL3N0eWxlcy9hYnN0cmFjdC92YXJpYWJsZXMnIGFzICo7XG5cbi5tb2RhbCB7XG4gICZfX3dyYXBwZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAxMDA7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDNmO1xuXG4gICAgdHJhbnNpdGlvbjogMC4zcztcblxuICAgICYuaGlkZGVuIHtcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICB9XG5cbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kKTtcblxuICAmX19jbG9zZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNXB4O1xuICAgIHJpZ2h0OiA1cHg7XG5cbiAgICB3aWR0aDogMzRweDtcbiAgICBoZWlnaHQ6IDM0cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG5cbiAgICAmLXN0cm9rZSB7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMnB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItdGV4dC1tYWluKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcblxuICAgICAgdHJhbnNpdGlvbjogMC4zcztcblxuICAgICAgJjpudGgtY2hpbGQoMSkge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KSByb3RhdGUoNDVkZWcpO1xuICAgICAgfVxuXG4gICAgICAmOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KSByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0zKTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcbkB1c2UgJy4vLi4vLi4vLi4vc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9uJyBhcyAqO1xuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0yKTtcbn1cbiIsIkB1c2UgJy4vLi4vLi4vc3R5bGVzL2Fic3RyYWN0L3ZhcmlhYmxlcycgYXMgKjtcblxuLmhpZ2gtc2NvcmVzIHtcbiAgJl9fc2NvcmVzIHtcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIH1cblxuICAmX19zY29yZSB7XG4gICAgdGgge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWNjZW50LXNlY29uZGFyeS0xKTtcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0LXJldmVyc2UpO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICB0aCxcbiAgICB0ZCB7XG4gICAgICBwYWRkaW5nOiAxMHB4O1xuXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLXRleHQtbWFpbik7XG4gICAgfVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuL3N0eWxlcy9tYWluLnNjc3MnO1xuaW1wb3J0IHsgQXBwUm91dGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2FwcC1yb3V0ZXIvQXBwUm91dGVyJztcbmltcG9ydCB7IEdhbWVIZWFkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FtZUhlYWRlci9HYW1lSGVhZGVyJztcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdnYW1lLWhlYWRlcicsIEdhbWVIZWFkZXIpO1xuXG5kb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTChcbiAgJ2FmdGVyYmVnaW4nLFxuICBgXG5cdFx0PGdhbWUtaGVhZGVyPjwvZ2FtZS1oZWFkZXI+XG5cdFx0PG1haW4gaWQ9XCJtYWluXCIgY2xhc3M9XCJtYWluIHdyYXBwZXJcIj5cblx0XHQ8L21haW4+XG5cdGBcbik7XG5cbmNvbnN0IHJvdXRlciA9IG5ldyBBcHBSb3V0ZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IGRlZXBlc3RFbCA9IGUuY29tcG9zZWRQYXRoKClbMF07XG5cbiAgICBpZiAoZGVlcGVzdEVsLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW2RhdGEtbGlua10nKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcm91dGVyLmNoYW5nZUhhc2goZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcblxuICAgICAgbGV0IHBhcmFtcyA9IFtdO1xuICAgICAgaWYgKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSA9PT0gJ25vbm9ncmFtJykge1xuICAgICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnZ2FtZS1uYW1lJykpIHtcbiAgICAgICAgICBwYXJhbXMucHVzaChkZWVwZXN0RWwuZ2V0QXR0cmlidXRlKCdnYW1lLW5hbWUnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVlcGVzdEVsLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKSkge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKGRlZXBlc3RFbC5nZXRBdHRyaWJ1dGUoJ2xldmVsJykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW3JhbmRvbV0nKSkge1xuICAgICAgICBwYXJhbXMucHVzaCgncmFuZG9tJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWVwZXN0RWwubWF0Y2hlcygnW2NvbnRpbnVlXScpKSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKCdjb250aW51ZScpO1xuICAgICAgfVxuXG4gICAgICByb3V0ZXIuc2hvd1JvdXRlKHBhcmFtcyk7XG4gICAgfVxuICB9KTtcblxuICB3aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHtcbiAgICByb3V0ZXIuc2hvd1JvdXRlKCk7XG4gIH07XG5cbiAgcm91dGVyLnNob3dSb3V0ZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiR2FtZU1lbnUiLCJHYW1lTm9ub2dyYW0iLCJIaWdoU2NvcmVUYWJsZSIsIm5vbm9ncmFtcyIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiQXBwUm91dGVyIiwiY29uc3RydWN0b3IiLCJhcHAiLCJyb3V0ZXMiLCJoYXNoIiwidmlldyIsIm5hbWUiLCJsZXZlbCIsInNhdmVkU29sdXRpb24iLCJjcm9zc2VkIiwibWludXRlcyIsInNlY29uZHMiLCJyZXNvbHZlZE5hbWUiLCJyZXNvbHZlZExldmVsIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW0iLCJjaGFuZ2VIYXNoIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJzaG93Um91dGUiLCJwYXJhbXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJoZWFkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJidXJnZXJNZW51Iiwic2hhZG93Um9vdCIsImNsYXNzTGlzdCIsImFkZCIsIm5ld1BhcmFtcyIsInJhbmRvbU51bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbU5vbm9ncmFtIiwic2F2ZWQiLCJKU09OIiwicGFyc2UiLCJjdXJyZW50U29sdXRpb24iLCJ0aW1lIiwibWF0Y2giLCJmaW5kIiwiaXRlbSIsInNsaWNlIiwiaW5uZXJIVE1MIiwiYnVyZ2VyTWVudVN0eWxlc1N0ciIsIkJ1cmdlck1lbnVCdG4iLCJIVE1MRWxlbWVudCIsImNvbm5lY3RlZENhbGxiYWNrIiwiYXR0YWNoU2hhZG93IiwibW9kZSIsImJ1cmdlckJ0blN0eWxlcyIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZCIsImJ0biIsImdhbWVNZW51IiwiaXNCdXJnZXIiLCJhZnRlciIsIm9uY2xpY2siLCJ0b2dnbGUiLCJoZWFkZXJTdHlsZXNTdHIiLCJoZWFkZXJTdHlsZXMiLCJ0ZW1wbGF0ZSIsIkdhbWVIZWFkZXIiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiaW5IZWFkZXIiLCJnZXRFbGVtZW50QnlJZCIsIm1lbnVTdHlsZVN0ciIsIlJhbmRvbUJ0biIsIkNvbnRpbnVlQnRuIiwiVGVtcGxhdGVzQnRuIiwiSGlnaFNjb3JlQnRuIiwiVGhlbWVCdG4iLCJNdXRlQnRuIiwibGV2ZWxzIiwiU2V0IiwibWFwIiwibGV2ZWxzSFRNTCIsImdhbWVOYW1lcyIsImZpbHRlciIsImpvaW4iLCJtZW51U3R5bGVzIiwiYWN0aW9ucyIsImdldEF0dHJpYnV0ZSIsInN0eWxlIiwiZGlzcGxheSIsImxhc3RFbGVtZW50Q2hpbGQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImNvbnRpbnVlQnRuU3R5bGVzU3RyIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImlubmVyVGV4dCIsImNvbnRpbnVlQnRuU3R5bGVzIiwiaGlnaFNjb3JlQnRuU3R5bGVzU3RyIiwiaGlnaFNjb3JlQnRuU3R5bGVzIiwibXV0ZUJ0blN0eWxlc1N0ciIsIm11dGVCdG5TdHlsZXMiLCJjaG9vc2VJbWciLCJpc011dGVkIiwicmFuZG9tQnRuU3R5bGVzU3RyIiwicmFuZG9tQnRuU3R5bGVzIiwidGVtcGxhdGVzQnRuU3R5bGVzU3RyIiwidGVtcGxhdGVzQnRuU3R5bGVzIiwidGhlbWVCdG5TdHlsZXNTdHIiLCJ0aGVtZUJ0blN0eWxlcyIsInJvb3QiLCJkb2N1bWVudEVsZW1lbnQiLCJjb250YWlucyIsIm5vbm9ncmFtU3R5bGVzU3RyIiwiR2FtZUZpZWxkIiwiUmVzdGFydEJ0biIsIlNvbHV0aW9uQnRuIiwiU2F2ZUJ0biIsIkdhbWVUaW1lciIsIlJlc3VsdE1vZGFsIiwid2luU291bmRGaWxlIiwibm9ub2dyYW1TdHlsZXMiLCJ0aW1lciIsImNvbnNvbGUiLCJsb2ciLCJzYXZlZE1pbnV0ZXMiLCJzYXZlZFNlY29uZHMiLCJjb250aW51ZSIsInRvVXBwZXJDYXNlIiwibm9ub2dyYW0iLCJmaWVsZCIsImlkIiwibWF0cml4IiwiY29ycmVjdFNvbHV0aW9uIiwiZmxhdCIsInRvU3RyaW5nIiwic3RyIiwiZm9yRWFjaCIsImVsIiwicmVkdWNlIiwiYWNjIiwiY3VyciIsInNxdWFyZSIsInRvcFBhbmUiLCJsZWZ0UGFuZSIsIm1heExlZnRIaW50cyIsImkiLCJsZWZ0SGludCIsInRvcEhpbnQiLCJjb3VudGVyTGVmdCIsImNvdW50ZXJUb3AiLCJqIiwiY2hpbGRyZW4iLCJub25vZ3JhbVdpZHRoIiwib2Zmc2V0V2lkdGgiLCJjZWxsU2l6ZSIsInNldFByb3BlcnR5IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwibWludXRlc1N0ciIsInNlY29uZHNTdHIiLCJBdWRpbyIsInBsYXkiLCJtb2RhbCIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwic2F2ZWRSZXN1bHQiLCJjdXJyZW50RHVyYXRpb24iLCJkdXJhdGlvbiIsImhpZ2hTY29yZVRhYmxlIiwidW5zaGlmdCIsInN0cmluZ2lmeSIsInRpbWVyU3RhcnRlZCIsInJlc3RhcnQiLCJzdG9wIiwiZGV0YWlsIiwiZ2FtZSIsImN1cnJlbnRDcm9zc2VkIiwiY29udGludWVCdG4iLCJpbm5lciIsImxhdW5jaCIsImZpZWxkU3R5bGVzU3RyIiwiZmlsbFNvdW5kRmlsZSIsImNsZWFyU291bmRGaWxlIiwiY3Jvc3NTb3VuZEZpbGUiLCJmaWVsZFN0eWxlcyIsInNwbGl0Iiwicm93IiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJmaWxsIiwiY2VsbCIsImUiLCJjbGlja3NEaXNhYmxlZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInRhcmdldCIsImNoZWNrU29sdXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImJ1YmJsZXMiLCJjb21wb3NlZCIsImVuYWJsZUNsaWNrcyIsImRpc2FibGVDbGlja3MiLCJzb2x1dGlvbiIsInRpbWVyU3R5bGVzU3RyIiwidGltZXJTdHlsZXMiLCJyZW5kZXJlZCIsInJlbmRlciIsIm9ic2VydmVkQXR0cmlidXRlcyIsImF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayIsIm1pbiIsInNlYyIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJjbGVhckludGVydmFsIiwiaW50ZXJ2YWxJRCIsInNldEludGVydmFsIiwidHJ1bmMiLCJkaXNjb25uZWN0ZWRDYWxsYmFjayIsInJlc3RhcnRCdG5TdHlsZXNTdHIiLCJyZXN0YXJ0QnRuU3R5bGVzIiwibW9kYWxTdHlsZXNTdHIiLCJtb2RhbFN0eWxlcyIsImFwcGVuZENoaWxkIiwid3JhcHBlciIsImNsYXNzTmFtZSIsImNsb3NlIiwic2F2ZUJ0blN0eWxlc1N0ciIsInNhdmVCdG5TdHlsZXMiLCJjdXJyZW50VGFyZ2V0Iiwic29sdXRpb25CdG5TdHlsZXNTdHIiLCJzb2x1dGlvbkJ0blN0eWxlcyIsImhpZ2hTY29yZVN0eWxlc1N0ciIsInJlc3VsdHMiLCJzb3J0IiwiYSIsImIiLCJyZXN1bHQiLCJoaWdoU2NvcmVTdHlsZXMiLCJib2R5Iiwicm91dGVyIiwiZGVlcGVzdEVsIiwiY29tcG9zZWRQYXRoIiwibWF0Y2hlcyIsInB1c2giLCJvbnBvcHN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==