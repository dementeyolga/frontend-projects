import { StateKeys } from '../../../../../types/enums';
import {
  isMessageDeliveredPayload,
  isMessageReadPayload,
  isUserCredentials,
} from '../../../../../types/typeGuards';
import { MessageData } from '../../../../../types/types';
import { div, p } from '../../../../../utils/tagViews';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import StateManagementService from '../../../../services/StateManagementService/StateManagementService';
import classes from './Message.module.scss';

export default class MessageView extends BaseComponentView<HTMLDivElement> {
  readonly id: string;

  private readonly datetime: number;

  private readonly state = StateManagementService.getInstance();

  private editedStatusComp?: BaseComponentView<HTMLParagraphElement>;

  private deliveredStatusComp?: BaseComponentView<HTMLDivElement>;

  private readStatusComp?: BaseComponentView<HTMLDivElement>;

  private deliveredReadStatusComp?: BaseComponentView<HTMLDivElement>;

  to: string;

  isReaded: boolean;

  isDelivered: boolean;

  isEdited: boolean;

  constructor(message: MessageData, className?: string) {
    const { to, id, datetime, status } = message;
    const { isReaded, isDelivered, isEdited } = status;

    super({
      tagName: 'div',
      className: `${classes.message} ${className}`,
    });

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
  }

  override destroy(): void {
    super.destroy();

    this.state.unsubscribe(
      StateKeys.MessageDelivered,
      this.changeDeliveredStatus,
    );
    this.state.unsubscribe(StateKeys.MessageRead, this.changeReadStatus);
  }

  private renderMessageInfo(message: MessageData) {
    const { text, from, status } = message;
    const { isDelivered, isEdited, isReaded } = status;

    const user = this.state.getValue(StateKeys.CurrentUser);

    const bottomInfoComponents = [];

    let fromUser = from;
    if (isUserCredentials(user) && user.login === from) {
      fromUser = 'you';

      this.editedStatusComp = p(isEdited ? 'edited' : '');
      this.deliveredStatusComp = p(
        isDelivered ? '🗸' : '🕐',
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

      bottomInfoComponents.push(
        this.editedStatusComp,
        this.deliveredReadStatusComp,
      );
    }

    const timeComp = p(this.formatDateTime());

    bottomInfoComponents.splice(
      Math.ceil(bottomInfoComponents.length / 2),
      0,
      timeComp,
    );

    this.addChildrenComponents(
      'end',
      p(fromUser, classes.fromUser),
      p(text),
      div(classes.messageInfo, ...bottomInfoComponents),
    );
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
}
