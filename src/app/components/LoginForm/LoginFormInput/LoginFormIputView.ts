import { EventCallbacks } from '../../../types/types';
import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './LoginFormInput.module.scss';
import errorClasses from '../LoginFormErrorMessage/LoginFormErrorMessage.module.scss';

const validationCallbacks: EventCallbacks<HTMLInputElement> = {
  input: (ev: Event) => {
    if (ev.currentTarget instanceof HTMLInputElement) {
      const input = ev.currentTarget;
      const errorMessage = input.nextElementSibling;

      if (errorMessage) {
        if (input.validity.valid) {
          errorMessage.textContent = '';
          errorMessage.classList.remove(errorClasses.active);
        } else if (input.validity.tooShort) {
          errorMessage.textContent = `${input.name || 'Value'} must contain at least ${input.minLength} characters, you typed ${input.value.length}.`;
          errorMessage.classList.add(errorClasses.active);
        } else if (input.validity.patternMismatch) {
          errorMessage.textContent = `${input.name || 'Value'} must start with uppercase letter and contain only English letters or '-'.`;
          errorMessage.classList.add(errorClasses.active);
        }
      }
    }
  },
};

export default class LoginFormInputView extends BaseComponentView<HTMLInputElement> {
  constructor(
    type: string,
    name?: string,
    required?: boolean,
    minLength?: number,
    pattern?: string,
  ) {
    super(
      {
        tagName: 'input',
        className: classes.input,
        type,
        name,
        required,
        minLength,
        pattern,
      },
      validationCallbacks,
    );
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
