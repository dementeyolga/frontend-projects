import { Events, StateKeys } from '../../../../../types/enums';
import {
  isMessageDeletePayload,
  isUserCredentials,
} from '../../../../../types/typeGuards';
import { p } from '../../../../../utils/tagViews';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import StateManagementService from '../../../../services/StateManagementService/StateManagementService';
import WebSocketService from '../../../../services/WebSocketService/WebSocketService';
import MessageView from '../Message/MessageVIew';
import classes from './MessageHistory.module.scss';

export default class MessageHistoryView extends BaseComponentView<HTMLDivElement> {
  private plugText?: BaseComponentView<HTMLParagraphElement>;

  private readonly socket = WebSocketService.getInstance();

  private readonly state = StateManagementService.getInstance();

  private readonly username?: string;

  constructor(username?: string) {
    super({
      tagName: 'div',
      className: `${classes.messageHistory}`,
    });

    if (username) {
      this.username = username;
    }

    this.initListeners();
    this.state.subscribe(StateKeys.MessageDeleted, this.deleteMessage);
  }

  setPlugText(username: string | undefined): void {
    this.plugText = p(
      `This is the very beginning of your conversation with ${username || 'user'}.`,
      classes.plugText,
    );

    this.addChildrenComponents('end', this.plugText);
  }

  override destroy(): void {
    super.destroy();

    this.state.unsubscribe(StateKeys.MessageDeleted, this.deleteMessage);
  }

  removePlugText() {
    if (this.plugText) {
      this.removeChildComponent(this.plugText);
    }
  }

  readMessages = (): void => {
    const currentUser = this.state.getValue(StateKeys.CurrentUser);
    let login: string;

    if (isUserCredentials(currentUser)) {
      ({ login } = currentUser);
    }

    this.children.forEach((msg) => {
      if (msg instanceof MessageView && !msg.isReaded && login === msg.to) {
        this.socket.sendReadMessageRequest(msg.id);
      }
    });
  };

  private deleteMessage = (): void => {
    const payload = this.state.getValue(StateKeys.MessageDeleted);

    if (
      isMessageDeletePayload(payload) &&
      payload.message.status.isDeleted === true
    ) {
      const { id } = payload.message;

      const deletedMessage = this.children.find((msg) => msg.id === id);

      if (deletedMessage) {
        this.removeChildComponent(deletedMessage);

        if (this.children.length === 0) {
          this.setPlugText(this.username);
        }
      }
    }
  };

  private initListeners(): void {
    this.initScrollListener();
    this.initClickListener();
  }

  private initScrollListener(): void {
    this.element.addEventListener(Events.Scroll, this.readMessages);
  }

  private initClickListener(): void {
    this.element.addEventListener(Events.Click, this.readMessages);
  }
}
