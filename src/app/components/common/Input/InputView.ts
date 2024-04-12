import BaseComponentView from '../../BaseComponent/BaseComponentView';
import { InputTypes } from '../../../types/types';
import classes from './Input.module.scss';
import { CustomEvents, Events } from '../../../types/enums';

type InputParams = {
  type: InputTypes;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  pattern?: string;
};

export default class InputView extends BaseComponentView<HTMLInputElement> {
  private readonly type: InputTypes;

  constructor(params: InputParams) {
    const { type } = params;

    super({
      tagName: 'input',
      className: classes.input,
      ...params,
    });

    this.type = type;
    this.initListeners();
  }

  getInputType(): InputTypes {
    return this.type;
  }

  getInputValue(): string {
    return this.element.value;
  }

  setInputValue(value: string): void {
    this.element.value = value;
  }

  focus(): void {
    this.element.focus();
  }

  protected override setParameters(params: Partial<HTMLInputElement>): void {
    super.setParameters(params);

    const { type, name, required, disabled, minLength, pattern } = params;

    if (type) {
      this.element.type = type;
    }

    if (name) {
      this.element.name = name;
    }

    if (required) {
      this.element.required = required;
    }

    if (disabled) {
      this.element.disabled = disabled;
    }

    if (minLength) {
      this.element.minLength = minLength;
    }

    if (pattern) {
      this.element.pattern = pattern;
    }
  }

  private initListeners(): void {
    this.element.addEventListener(Events.Input, () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.FormInput, { bubbles: true }),
      );
    });
  }
}
