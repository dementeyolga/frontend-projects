class HangmanGame {
	constructor() {}

	init() {
		const gameWrapper = document.createElement('div');
		gameWrapper.classList.add('wrapper');
		gameWrapper.innerText = 'HANGMAN initiated';
		document.body.append(gameWrapper);
	}
}

export { HangmanGame };
