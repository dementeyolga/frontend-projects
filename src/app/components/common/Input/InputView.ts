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

  patternMessage: string;

  constructor(params: InputParams, patternMessage?: string) {
    const { type } = params;

    super({
      tagName: 'input',
      className: classes.input,
      ...params,
    });

    this.type = type;

    this.patternMessage =
      patternMessage ||
      `${this.getName() || 'Value'} doesn't match the pattern: ${params.pattern}`;

    this.initListeners();
  }

  getType(): InputTypes {
    return this.type;
  }

  getValue(): string {
    return this.element.value;
  }

  setValue(value: string): void {
    this.element.value = value;
  }

  getName(): string {
    return this.element.name;
  }

  getMinLength(): number {
    return this.element.minLength;
  }

  focus(): void {
    this.element.focus();
  }

  checkTooShort(): boolean {
    return this.element.validity.tooShort;
  }

  checkPatternMismatch(): boolean {
    return this.element.validity.patternMismatch;
  }

  checkValid(): boolean {
    return this.element.validity.valid;
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
        new CustomEvent<string>(CustomEvents.FormInput, {
          bubbles: true,
          detail: this.getValue(),
        }),
      );
    });
  }
}
