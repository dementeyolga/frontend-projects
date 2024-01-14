class VirtualKeyboard {
  create() {
    const keyboard = document.createElement("div");
    keyboard.className = "keyboard";
    let row = document.createElement("div");
    row.className = "keyboard__row";

    let counter = 0;

    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      row.insertAdjacentHTML(
        "beforeend",
        `<div class="keyboard__key">${letter}</div>`,
      );
      counter++;

      if (counter >= 9) {
        keyboard.append(row);
        row = document.createElement("div");
        row.className = "keyboard__row";
        counter = 0;
      }
    }

    keyboard.append(row);

    this.keyboardEl = keyboard;

    return this.keyboardEl;
  }
}

export { VirtualKeyboard };
