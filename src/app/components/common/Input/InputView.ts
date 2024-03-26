import BaseComponentView from '../../BaseComponent/BaseComponentView';
import { InputTypes } from '../../../types/types';
import classes from './Input.module.scss';

export default class InputView extends BaseComponentView<HTMLInputElement> {
  private readonly type: InputTypes;

  constructor(
    type: InputTypes,
    name?: string,
    required?: boolean,
    minLength?: number,
    pattern?: string,
  ) {
    super({
      tagName: 'input',
      className: classes.input,
      type,
      name,
      required,
      minLength,
      pattern,
    });

    this.type = type;
  }

  getInputType(): InputTypes {
    return this.type;
  }

  getInputValue(): string {
    return this.element.value;
  }

  protected override setParameters(params: Partial<HTMLInputElement>): void {
    super.setParameters(params);

    const { type, name, required, minLength, pattern } = params;
    if (type) {
      this.element.type = type;
    }

    if (name) {
      this.element.name = name;
    }

    if (required) {
      this.element.required = required;
    }

    if (minLength) {
      this.element.minLength = minLength;
    }

    if (pattern) {
      this.element.pattern = pattern;
    }
  }
}
