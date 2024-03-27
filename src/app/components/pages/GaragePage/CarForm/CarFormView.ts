import { Car } from '../../../../types/types';
import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import ButtonView from '../../../common/Button/ButtonView';
import InputView from '../../../common/Input/InputView';
import classes from './CarForm.module.scss';

export default class CarFormView extends BaseComponentView<HTMLFormElement> {
  inputs: InputView[];

  constructor(buttonName: string, disabled?: boolean, buttonClass?: string) {
    const inputs = [
      new InputView('text', 'Car name', true, disabled, 2),
      new InputView('color', '', true, disabled),
    ];

    super(
      {
        tagName: 'form',
        className: classes.form,
      },
      ...inputs,
      new ButtonView(
        `${classes.button} ${buttonClass}`,
        'submit',
        buttonName,
        undefined,
        disabled,
      ),
    );

    this.inputs = inputs;

    this.initListeners();
  }

  disableForm(): void {
    this.children.forEach((comp) => {
      const element = comp.getElement();

      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLButtonElement
      ) {
        element.disabled = true;
      }

      if (element instanceof HTMLInputElement) {
        element.value = '';
      }
    });
  }

  enableForm() {
    this.children.forEach((comp) => {
      const element = comp.getElement();

      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLButtonElement
      ) {
        element.disabled = false;
      }
    });
  }

  protected getCarObjectFromInputs(): Partial<Car> {
    const car = this.inputs.reduce<Partial<Car>>((acc, input) => {
      if (input.getInputType() === 'color') {
        acc.color = input.getInputValue();
      }

      if (input.getInputType() === 'text') {
        acc.name = input.getInputValue();
      }

      return acc;
    }, {});

    return car;
  }

  protected initListeners(): void {
    this.element.onsubmit = () => false;
  }
}
