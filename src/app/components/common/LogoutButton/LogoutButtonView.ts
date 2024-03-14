import { LocalStorageValues } from '../../../types/enums';
import { EventCallbacks } from '../../../types/types';
import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './LogoutButton.module.scss';

const buttonCallbacks: EventCallbacks<HTMLButtonElement> = {
  click() {
    localStorage.removeItem(LocalStorageValues.FormData);
  },
};

export default class LogoutButtonView extends BaseComponentView<HTMLButtonElement> {
  constructor(link?: string) {
    super(
      {
        tagName: 'button',
        className: classes.button,
        textContent: 'Logout',
      },
      buttonCallbacks,
    );

    if (typeof link === 'string') {
      this.element.dataset.navigate = link;
    }
  }
}
