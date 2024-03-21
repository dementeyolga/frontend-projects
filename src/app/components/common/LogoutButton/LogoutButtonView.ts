import { LocalStorageValues } from '../../../types/enums';
import { EventCallbacks } from '../../../types/types';
import ButtonView from '../Button/ButtonView';

const buttonCallbacks: EventCallbacks<HTMLButtonElement> = {
  click() {
    localStorage.removeItem(LocalStorageValues.FormData);
  },
};

export default class LogoutButtonView extends ButtonView {
  constructor(link?: string) {
    super('', 'button', 'Logout', undefined, false, buttonCallbacks);

    if (typeof link === 'string') {
      this.element.dataset.navigate = link;
    }
  }
}
