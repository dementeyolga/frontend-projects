import { CustomEventNames } from '../../../../../../types/enums';
import ButtonView from '../../../../../common/Button/ButtonView';
import classes from './AutoCompleteButton.module.scss';

export default class AutoCompleteButtonView extends ButtonView {
  constructor() {
    super(classes.button, 'button', 'Auto-Complete');

    this.initClickListener();
  }

  private initClickListener() {
    this.element.addEventListener('click', () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEventNames.AutoComplete, { bubbles: true }),
      );
    });
  }
}
