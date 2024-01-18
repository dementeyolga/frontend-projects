import { VirtualKeyboard } from './virtualKeyboard/virtualKeyboard.js';
import { randomInt } from './../utils/randomInt.js';
import { words } from './words.js';
import { hangmanDrawingGenerator } from './hangmanDrawingGenerator.js';
import { GameOverModal } from './gameOverModal/gameOverModal.js';
import './hangmanGame.js';

class HangmanGame {
  init() {
    let counter = +sessionStorage.getItem('questionsCounter');

    sessionStorage.setItem('questionsCounter', ++counter);

    const lastQuestion = counter === words.length;

    let questionNumbers = JSON.parse(sessionStorage.getItem('questionNumbers'));

    let questionIndex = randomInt(0, words.length - 1);

    while (questionNumbers.includes(questionIndex)) {
      questionIndex = randomInt(0, words.length - 1);
    }

    questionNumbers.push(questionIndex);

    sessionStorage.setItem('questionNumbers', JSON.stringify(questionNumbers));

    const currentQuestion = words[questionIndex];
    const currentWord = currentQuestion.word;

    console.log('index: ', questionIndex, ', answer: ', currentQuestion.word);

    const game = document.createElement('div');
    game.className = 'hangman';

    const gameWrapper = document.createElement('div');
    gameWrapper.className = 'wrapper hangman__wrapper';
    game.append(gameWrapper);
    document.body.innerHTML = '';
    document.body.append(game);

    const title = document.createElement('h2');
    title.className = 'section-heading hangman__title';
    title.innerText = 'HANGMAN game';
    gameWrapper.append(title);

    const questionNo = document.createElement('p');
    questionNo.className = 'hangman__question-number';
    questionNo.innerText = `Question No: ${counter} / ${words.length}`;
    gameWrapper.append(questionNo);

    const gameBody = document.createElement('div');
    gameBody.className = 'hangman__body';
    gameWrapper.append(gameBody);

    const gameBodyLeft = document.createElement('div');
    gameBodyLeft.className = 'hangman__body-left';
    gameBodyLeft.height = '100%';
    gameBody.append(gameBodyLeft);

    const gameBodyRight = document.createElement('div');
    gameBodyRight.className = 'hangman__body-right';
    gameBody.append(gameBodyRight);

    const input = document.createElement('div');
    input.className = 'hangman__input';
    for (let i = 0; i < currentQuestion.word.length; i++) {
      const char = currentQuestion.word[i];
      const charEl = `<p class="hangman__input-char">
											${char === ' ' ? ' ' : '_'}
										</p>`;

      input.insertAdjacentHTML('beforeend', charEl);
    }
    gameBodyRight.append(input);

    const hint = document.createElement('p');
    hint.className = 'hangman__hint';
    hint.innerText = currentQuestion.description;
    gameBodyRight.append(hint);

    const incorrectCounter = document.createElement('p');
    incorrectCounter.className = 'hangman__counter';
    incorrectCounter.innerText = 'Incorrect guesses: ';

    const incorrectGuesses = document.createElement('span');
    incorrectGuesses.textContent = '0';
    incorrectCounter.append(incorrectGuesses);
    incorrectCounter.insertAdjacentText('beforeend', ' / 6');
    gameBodyRight.append(incorrectCounter);

    const keyboard = new VirtualKeyboard();
    gameBodyRight.append(keyboard.create());

    const gallows = document.createElement('canvas');

    const canvasWidth = gameBodyLeft.clientWidth;
    const canvasHeight = gameBodyLeft.clientHeight * 0.9;
    gallows.width =
      canvasWidth > canvasHeight * 2 ? canvasHeight * 1.5 : canvasWidth;
    gallows.height = canvasHeight;
    gallows.className = 'hangman__gallows';
    gallows.id = 'hangman-gallows';
    gameBodyLeft.append(gallows);

    const ctx = gallows.getContext('2d');
    const generator = hangmanDrawingGenerator(
      ctx,
      '#022449',
      gallows.width,
      gallows.height
    );
    generator.next();

    const gameOver = (win, handler) => {
      keyboard.keyboardEl.removeEventListener('click', handler);
      document.removeEventListener('keydown', handler);

      const modal = new GameOverModal(
        win,
        currentWord,
        currentQuestion.description,
        lastQuestion
      );

      const modalWrapper = modal.create();
      document.body.append(modalWrapper);
      //Initiate reflow after appending modal, but before 'active' class styles are applied
      modalWrapper.offsetWidth;
      modalWrapper.classList.add('active');
      document.body.classList.add('scroll-disabled');
      modal.playAgainButton.onclick = () => {
        if (lastQuestion) {
          sessionStorage.setItem('questionsCounter', 0);
          sessionStorage.setItem('questionNumbers', JSON.stringify([]));
        }

        modalWrapper.classList.remove('active');
        modalWrapper.addEventListener(
          'transitionend',
          () => {
            document.body.classList.remove('scroll-disabled');
            this.init();
          },
          {
            once: true,
          }
        );
      };
    };

    const keyboardHandler = function func(e) {
      const keyElements =
        keyboard.keyboardEl.querySelectorAll('.keyboard__key');
      let targetVirtualKey;
      let chosenLetter;

      if (e.type === 'keydown') {
        chosenLetter = e.key.toLowerCase();
        targetVirtualKey = [...keyElements].find(
          (el) => el.textContent.toLocaleLowerCase() === chosenLetter
        );
      } else if (e.type === 'click') {
        chosenLetter = e.target.textContent.toLowerCase();
        targetVirtualKey = [...keyElements].includes(e.target)
          ? e.target
          : undefined;
      }

      if (!targetVirtualKey) return;

      if (
        targetVirtualKey.classList.contains('correct') ||
        targetVirtualKey.classList.contains('disabled')
      ) {
        return;
      }

      if (+incorrectGuesses.textContent >= 6) return;

      if (currentWord.includes(chosenLetter)) {
        targetVirtualKey.classList.add('correct');

        let pos = -1;
        while ((pos = currentWord.indexOf(chosenLetter, pos + 1)) != -1) {
          input.children[pos].innerText = chosenLetter.toUpperCase();
        }

        if ([...input.children].every((el) => el.textContent.trim() !== '_')) {
          gameOver(true, func);
        }
      } else {
        generator.next();
        targetVirtualKey.classList.add('disabled');
        incorrectGuesses.textContent = +incorrectGuesses.textContent + 1;

        if (+incorrectGuesses.textContent >= 6) {
          gameOver(false, func);
        }
      }
    };

    keyboard.keyboardEl.addEventListener('click', keyboardHandler);
    document.addEventListener('keydown', keyboardHandler);
  }
}

export { HangmanGame };
