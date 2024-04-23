import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import { CustomEvents, Events } from '../../../../../types/enums';
import classes from './MessageForm.module.scss';
import ButtonView from '../../../../common/Button/ButtonView';
import TextAreaView from '../../../../common/TextArea/TextAreaView';

export default class MessageFormView extends BaseComponentView<HTMLFormElement> {
  private readonly messageTextArea: TextAreaView;

  private readonly sendButton: ButtonView;

  constructor() {
    super({ tagName: 'form', className: classes.form, novalidate: true });

    this.messageTextArea = new TextAreaView({
      disabled: true,
    });

    this.sendButton = new ButtonView({
      type: 'submit',
      textContent: 'Send',
      disabled: true,
    });

    this.addChildrenComponents('end', this.messageTextArea, this.sendButton);

    this.initListeners();
  }

  enable(): void {
    this.messageTextArea.enable();
  }

  clear(): void {
    this.messageTextArea.setValue('');
  }

  protected override setParameters(params: Partial<HTMLFormElement>): void {
    super.setParameters(params);

    const { novalidate } = params;
    if (novalidate) {
      this.element.noValidate = novalidate;
    }
  }

  private initListeners(): void {
    this.initSubmitListener();
    this.initFormInputListener();
  }

  private initSubmitListener(): void {
    this.element.addEventListener(Events.Submit, (e) => {
      e.preventDefault();

      const text = this.messageTextArea.getValue();

      this.element.dispatchEvent(
        new CustomEvent(CustomEvents.SendChatMessage, {
          bubbles: true,
          detail: text,
        }),
      );
    });
  }

  private initFormInputListener(): void {
    this.element.addEventListener(CustomEvents.FormInput, () => {
      console.log('event');

      if (this.messageTextArea.getValue().length === 0) {
        this.sendButton.disable();
      } else {
        this.sendButton.enable();
      }
    });
  }
}
