class GameOverModal {
  constructor(win = true, word, hint) {
    this.win = win;
    this.word = word;
    this.hint = hint;
  }

  create() {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'hangman__modal-wrapperse modal__wrapper';

    modalWrapper.innerHTML = `
      <div class="hangman__modal modal">
        <h3 class="hangman__modal-heading modal__heading ${
          this.win ? 'win' : 'lose'
        }">
          ${this.win ? 'Congrats! You won!' : 'Oops, game over... '}
        </h3> 
        <p class="hangman__modal-hint modal__hint modal__text"><span class="accent">Hint:</span> ${
          this.hint
        }</p>
        <p class="hangman__modal-word modal__word modal__text"><span class="accent">Answer:</span> ${
          this.word
        }</p>
        <button class="hangman__modal-button modal__button">Play again</button>
      </div>
    `;

    this.modalWrapper = modalWrapper;
    this.playAgainButton = modalWrapper.querySelector('.hangman__modal-button');

    return modalWrapper;
  }
}

export { GameOverModal };
