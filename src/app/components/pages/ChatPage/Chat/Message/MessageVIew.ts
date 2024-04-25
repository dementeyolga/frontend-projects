import { CustomEvents, Events, StateKeys } from '../../../../../types/enums';
import {
  isMessageDeliveredPayload,
  isMessageEditPayload,
  isMessageReadPayload,
  isUserCredentials,
} from '../../../../../types/typeGuards';
import { MessageData } from '../../../../../types/types';
import { div, p } from '../../../../../utils/tagViews';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import StateManagementService from '../../../../../services/StateManagementService/StateManagementService';
import WebSocketService from '../../../../../services/WebSocketService/WebSocketService';
import classes from './Message.module.scss';

export default class MessageView extends BaseComponentView<HTMLDivElement> {
  to: string;

  isReaded: boolean;

  isDelivered: boolean;

  isEdited: boolean;

  readonly id: string;

  private readonly socket = WebSocketService.getInstance();

  private readonly datetime: number;

  private readonly state = StateManagementService.getInstance();

  private textComp?: BaseComponentView<HTMLParagraphElement>;

  private editedStatusComp?: BaseComponentView<HTMLParagraphElement>;

  private deliveredStatusComp?: BaseComponentView<HTMLDivElement>;

  private readStatusComp?: BaseComponentView<HTMLDivElement>;

  private deleteButton?: BaseComponentView<HTMLParagraphElement>;

  private editButton?: BaseComponentView<HTMLParagraphElement>;

  private deliveredReadStatusComp?: BaseComponentView<HTMLDivElement>;

  private readonly from: string;

  constructor(message: MessageData, className?: string) {
    const { from, to, id, datetime, status } = message;
    const { isReaded, isDelivered, isEdited } = status;

    super({
      tagName: 'div',
      className: `${classes.message} ${className}`,
    });

    this.from = from;
    this.to = to;
    this.id = id;
    this.datetime = datetime;
    this.isReaded = isReaded;
    this.isDelivered = isDelivered;
    this.isEdited = isEdited;

    this.renderMessageInfo(message);

    if (!isDelivered) {
      this.state.subscribe(
        StateKeys.MessageDelivered,
        this.changeDeliveredStatus,
      );
    }

    if (!isReaded) {
      this.state.subscribe(StateKeys.MessageRead, this.changeReadStatus);
    }

    this.state.subscribe(StateKeys.MessageEdited, this.editMessage);

    this.initListeners();
  }

  override destroy(): void {
    super.destroy();

    this.state.unsubscribe(
      StateKeys.MessageDelivered,
      this.changeDeliveredStatus,
    );
    this.state.unsubscribe(StateKeys.MessageRead, this.changeReadStatus);
    this.state.unsubscribe(StateKeys.MessageEdited, this.editMessage);
  }

  private initListeners(): void {
    this.initDeleteListener();
    this.initEditListener();
  }

  private initDeleteListener(): void {
    if (this.deleteButton) {
      this.deleteButton.getElement().addEventListener(Events.Click, () => {
        this.socket.sendDeleleMessageRequest(this.id);
      });
    }
  }

  private initEditListener(): void {
    if (this.editButton) {
      this.editButton.getElement().addEventListener(Events.Click, () => {
        this.editButton?.getElement().dispatchEvent(
          new CustomEvent(CustomEvents.EditMessage, {
            bubbles: true,
            detail: { text: this.textComp?.getTextContent(), id: this.id },
          }),
        );
      });
    }
  }

  private renderMessageInfo(message: MessageData) {
    const { text, from, status } = message;
    const { isDelivered, isEdited, isReaded } = status;

    this.textComp = p(text);

    const topInfoComponents = [];

    const bottomInfoComponents = [];

    let fromUser = from;
    if (this.isMesageFromCurrentUser()) {
      fromUser = 'you';

      this.deleteButton = p('✖');
      this.editButton = p('✎');

      topInfoComponents.push(
        div(classes.actionButtons, this.editButton, this.deleteButton),
      );

      this.deliveredStatusComp = p(
        isDelivered ? '🗸' : '◔',
        classes.deliveredStatus,
      );
      this.readStatusComp = p(
        isDelivered && isReaded ? '🗸' : '',
        classes.readStatus,
      );
      this.deliveredReadStatusComp = div(
        classes.statusContainer,
        this.deliveredStatusComp,
        this.readStatusComp,
      );

      bottomInfoComponents.push(this.deliveredReadStatusComp);
    }

    topInfoComponents.unshift(p(fromUser, classes.fromUser));

    const timeComp = p(this.formatDateTime());

    bottomInfoComponents.unshift(
      (this.editedStatusComp = p(isEdited ? 'edited' : '')),
      timeComp,
    );

    this.addChildrenComponents(
      'end',
      div(classes.topInfo, ...topInfoComponents),
      this.textComp,
      div(classes.bottomInfo, ...bottomInfoComponents),
    );
  }

  private isMesageFromCurrentUser(): boolean {
    const user = this.state.getValue(StateKeys.CurrentUser);

    if (isUserCredentials(user) && user.login === this.from) {
      return true;
    }

    return false;
  }

  private formatDateTime(): string {
    const date = new Date(this.datetime);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = `${hours < 10 ? `0${hours}` : hours}`;
    const formattedMinutes = `${minutes < 10 ? `0${minutes}` : minutes}`;

    const result = `${formattedHours}:${formattedMinutes}`;

    return result;
  }

  private changeDeliveredStatus = (): void => {
    const payload = this.state.getValue(StateKeys.MessageDelivered);

    if (
      isMessageDeliveredPayload(payload) &&
      payload.message.id === this.id &&
      payload.message.status.isDelivered === true
    ) {
      this.deliveredStatusComp?.setTextContent('🗸');
      this.isDelivered = true;

      this.state.unsubscribe(
        StateKeys.MessageDelivered,
        this.changeDeliveredStatus,
      );
    }
  };

  private changeReadStatus = (): void => {
    const payload = this.state.getValue(StateKeys.MessageRead);

    if (
      isMessageReadPayload(payload) &&
      payload.message.id === this.id &&
      payload.message.status.isReaded === true
    ) {
      this.readStatusComp?.setTextContent('🗸');
      this.isReaded = true;

      this.state.unsubscribe(StateKeys.MessageRead, this.changeReadStatus);
    }
  };

  private editMessage = (): void => {
    const payload = this.state.getValue(StateKeys.MessageEdited);

    if (
      isMessageEditPayload(payload) &&
      payload.message.id === this.id &&
      payload.message.status.isEdited === true
    ) {
      this.isEdited = true;
      this.editedStatusComp?.setTextContent('edited');
      this.textComp?.setTextContent(payload.message.text);
    }
  };
}
