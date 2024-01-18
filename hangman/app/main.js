import { HangmanGame } from './hangmanGame/hangmanGame.js';

sessionStorage.setItem('questionsCounter', 0);
sessionStorage.setItem('questionNumbers', JSON.stringify([]));
const hangman = new HangmanGame();
hangman.init();
