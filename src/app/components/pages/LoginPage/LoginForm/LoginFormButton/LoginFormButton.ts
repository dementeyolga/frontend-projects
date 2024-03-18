import { EventCallbacks } from '../../../../../types/types';
import classes from './LoginFormButton.module.scss';
import ButtonView from '../../../../common/Button/ButtonView';

const buttonCallbacks: EventCallbacks<HTMLButtonElement> = {
  click(event) {
    if (event.isTrusted) {
      event.stopPropagation();
    }
  },
};

export default class LoginFormButtonView extends ButtonView {
  constructor(link?: string, disabled?: boolean) {
    super(classes.button, 'submit', 'Login', link, disabled, buttonCallbacks);
  }
}
