import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import ButtonView from '../../../common/Button/ButtonView';
import InputView from '../../../common/Input/InputView';
import classes from './CarForm.module.scss';

export default class CarFormView extends BaseComponentView<HTMLFormElement> {
  protected inputs: InputView[];

  constructor(buttonName: string, buttonClass?: string) {
    const inputs = [
      new InputView('text', 'Car name', true, 2),
      new InputView('color'),
    ];

    super(
      {
        tagName: 'form',
        className: classes.form,
      },
      ...inputs,
      new ButtonView(`${classes.button} ${buttonClass}`, 'submit', buttonName),
    );

    this.inputs = inputs;

    this.initListeners();
  }

  protected initListeners(): void {
    this.element.onsubmit = () => false;
  }
}
