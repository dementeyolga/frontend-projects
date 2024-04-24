import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './TextArea.module.scss';
import { CustomEvents, Events } from '../../../types/enums';

type TextAreaParams = {
  name?: string;
  disabled?: boolean;
  maxLength?: number;
};

export default class TextAreaView extends BaseComponentView<HTMLTextAreaElement> {
  constructor(params: TextAreaParams) {
    super({
      tagName: 'textarea',
      className: classes.textarea,
      ...params,
    });

    this.initListeners();
  }

  getValue(): string {
    return this.element.value;
  }

  setValue(value: string): void {
    this.element.value = value;
  }

  focus(): void {
    this.element.focus();
  }

  disable(): void {
    this.element.disabled = true;
  }

  enable(): void {
    this.element.disabled = false;
  }

  protected override setParameters(params: Partial<HTMLTextAreaElement>): void {
    super.setParameters(params);

    const { required, disabled } = params;

    if (required) {
      this.element.required = required;
    }

    if (disabled) {
      this.element.disabled = disabled;
    }
  }

  private initListeners(): void {
    this.element.addEventListener(Events.Input, () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.FormInput, {
          bubbles: true,
          detail: this.getValue(),
        }),
      );
    });

    this.element.addEventListener(Events.Change, () => {
      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.FormChange, {
          bubbles: true,
          detail: this.getValue(),
        }),
      );
    });
  }
}
