import { LocalStorageValues } from '../../../types/enums';
import { EventCallbacks } from '../../../types/types';
import ButtonView from '../Button/ButtonView';
import classes from './LogoutButton.module.scss';

const buttonCallbacks: EventCallbacks<HTMLButtonElement> = {
  click() {
    localStorage.removeItem(LocalStorageValues.FormData);
  },
};

export default class LogoutButtonView extends ButtonView {
  constructor(link?: string) {
    super(
      classes.button,
      'button',
      'Logout',
      undefined,
      false,
      buttonCallbacks,
    );

    if (typeof link === 'string') {
      this.element.dataset.navigate = link;
    }
  }
}
