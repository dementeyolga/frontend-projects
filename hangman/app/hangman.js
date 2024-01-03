class HangmanGame {
	constructor() {}

	init() {
		const game = document.createElement('div');
		game.className = 'hangman';

		const gameWrapper = document.createElement('div');
		gameWrapper.className = 'wrapper hangman__wrapper';
		game.append(gameWrapper);
		document.body.prepend(game);

		const title = document.createElement('h2');
		title.className = 'section__title hangman__title';
		title.innerText = 'HANGMAN game';
		gameWrapper.append(title);

		const gameBody = document.createElement('div');
		gameBody.className = 'hangman__body';
		gameWrapper.append(gameBody);

		const gallows = document.createElement('div');
		gameBody.className = 'hangman__gallows';
		gameBody.append(gallows);
	}
}

export { HangmanGame };
