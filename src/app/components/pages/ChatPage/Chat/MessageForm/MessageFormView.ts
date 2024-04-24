import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import { CustomEvents, Events } from '../../../../../types/enums';
import classes from './MessageForm.module.scss';
import ButtonView from '../../../../common/Button/ButtonView';
import TextAreaView from '../../../../common/TextArea/TextAreaView';

export default class MessageFormView extends BaseComponentView<HTMLFormElement> {
  editingMessage: {
    id: string;
    text: string;
  } | null = null;

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

  enableEditMode(id: string, text: string): void {
    this.messageTextArea.focus();
    this.messageTextArea.setValue(text);
    this.editingMessage = {
      id,
      text,
    };
    this.defineButtonState();
    this.sendButton.addClass(classes.edit);
    this.sendButton.setTextContent('Edit');
  }

  disableEditMode(): void {
    this.messageTextArea.setValue('');
    this.editingMessage = null;
    this.defineButtonState();
    this.sendButton.removeClass(classes.edit);
    this.sendButton.setTextContent('Send');
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
    this.element.addEventListener(
      CustomEvents.FormInput,
      this.defineButtonState,
    );
  }

  private defineButtonState = (): void => {
    console.log('event');

    if (this.messageTextArea.getValue().length === 0) {
      this.sendButton.disable();
    } else {
      this.sendButton.enable();
    }
  };
}
