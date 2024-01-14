import { VirtualKeyboard } from "./virtualKeyboard/virtualKeyboard.js";
import { randomInt } from "./../utils/randomInt.js";
import { words } from "./words.js";
import { hangmanDrawingGenerator } from "./hangmanDrawingGenerator.js";
import { GameOverModal } from "./gameOverModal/gameOverModal.js";

class HangmanGame {
  init() {
    const questionIndex = randomInt(0, words.length - 1);
    const currentQuestion = words[questionIndex];
    const currentWord = currentQuestion.word;

    console.log("index: ", questionIndex, ", answer: ", currentQuestion.word);

    const game = document.createElement("div");
    game.className = "hangman";

    const gameWrapper = document.createElement("div");
    gameWrapper.className = "wrapper hangman__wrapper";
    game.append(gameWrapper);
    document.body.innerHTML = "";
    document.body.append(game);

    const title = document.createElement("h2");
    title.className = "section-heading hangman__title";
    title.innerText = "HANGMAN game";
    gameWrapper.append(title);

    const gameBody = document.createElement("div");
    gameBody.className = "hangman__body";
    gameWrapper.append(gameBody);

    const gameBodyLeft = document.createElement("div");
    gameBodyLeft.className = "hangman__body-left";
    gameBodyLeft.height = "100%";
    gameBody.append(gameBodyLeft);

    const gameBodyRight = document.createElement("div");
    gameBodyRight.className = "hangman__body-right";
    gameBody.append(gameBodyRight);

    const input = document.createElement("div");
    input.className = "hangman__input";
    for (let i = 0; i < currentQuestion.word.length; i++) {
      const char = currentQuestion.word[i];
      const charEl = `<p class="hangman__input-char">
											${char === " " ? " " : "_"}
										</p>`;

      input.insertAdjacentHTML("beforeend", charEl);
    }
    gameBodyRight.append(input);

    const hint = document.createElement("p");
    hint.className = "hangman__hint";
    hint.innerText = currentQuestion.description;
    gameBodyRight.append(hint);

    const incorrectCounter = document.createElement("p");
    incorrectCounter.className = "hangman__counter";
    incorrectCounter.innerText = "Incorrect guesses: ";

    const incorrectGuesses = document.createElement("span");
    incorrectGuesses.textContent = "0";
    incorrectCounter.append(incorrectGuesses);
    incorrectCounter.insertAdjacentText("beforeend", " / 6");
    gameBodyRight.append(incorrectCounter);

    const keyboard = new VirtualKeyboard();
    gameBodyRight.append(keyboard.create());

    const gallows = document.createElement("canvas");

    const canvasWidth = gameBodyLeft.clientWidth;
    const canvasHeight = gameBodyLeft.clientHeight;
    console.log(canvasWidth, canvasHeight);
    gallows.width = canvasWidth;
    gallows.height = canvasHeight;
    gallows.className = "hangman__gallows";
    gallows.id = "hangman-gallows";
    gameBodyLeft.append(gallows);

    const ctx = gallows.getContext("2d");
    const generator = hangmanDrawingGenerator(
      ctx,
      "#022449",
      gallows.width,
      gallows.height,
    );
    generator.next();

    const gameOver = (win, handler) => {
      keyboard.keyboardEl.removeEventListener("click", handler);
      document.removeEventListener("keydown", handler);

      const modal = new GameOverModal(
        win,
        currentWord,
        currentQuestion.description,
      );

      const modalWrapper = modal.create();
      document.body.append(modalWrapper);
      modalWrapper.classList.add("active");
      modal.playAgainButton.onclick = () => {
        modalWrapper.classList.remove("active");
        modalWrapper.addEventListener("transitionend", () => this.init(), {
          once: true,
        });
      };
    };

    const keyboardHandler = function func(e) {
      console.log("type:", e.type);
      const keyElements =
        keyboard.keyboardEl.querySelectorAll(".keyboard__key");
      let targetVirtualKey;
      let chosenLetter;

      if (e.type === "keydown") {
        chosenLetter = e.key.toLowerCase();
        targetVirtualKey = [...keyElements].find(
          (el) => el.textContent.toLocaleLowerCase() === chosenLetter,
        );
      } else if (e.type === "click") {
        chosenLetter = e.target.textContent.toLowerCase();
        targetVirtualKey = [...keyElements].includes(e.target)
          ? e.target
          : undefined;
      }

      if (!targetVirtualKey) return;

      console.log(
        "targetVirtualKey:",
        targetVirtualKey,
        ", chosenLetter",
        chosenLetter,
      );

      if (
        targetVirtualKey.classList.contains("correct") ||
        targetVirtualKey.classList.contains("disabled")
      ) {
        return;
      }

      console.log(e.type, "happened");

      if (+incorrectGuesses.textContent >= 6) return;

      if (currentWord.includes(chosenLetter)) {
        targetVirtualKey.classList.add("correct");

        let pos = -1;
        while ((pos = currentWord.indexOf(chosenLetter, pos + 1)) != -1) {
          input.children[pos].innerText = chosenLetter.toUpperCase();
        }

        if ([...input.children].every((el) => el.textContent.trim() !== "_")) {
          console.log("you won the game");

          gameOver(true, func);
        }
      } else {
        generator.next();
        targetVirtualKey.classList.add("disabled");
        incorrectGuesses.textContent = +incorrectGuesses.textContent + 1;

        if (+incorrectGuesses.textContent >= 6) {
          console.log("oops, game over");
          gameOver(false, func);
        }
      }
    };

    keyboard.keyboardEl.addEventListener("click", keyboardHandler);
    document.addEventListener("keydown", keyboardHandler);
  }
}

export { HangmanGame };
