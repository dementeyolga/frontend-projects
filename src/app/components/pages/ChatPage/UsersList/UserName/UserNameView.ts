import StateManagementService from '../../../../../services/StateManagementService/StateManagementService';
import WebSocketService from '../../../../../services/WebSocketService/WebSocketService';
import { StateKeys } from '../../../../../types/enums';
import { isMessageData, isMessagesList } from '../../../../../types/typeGuards';
import { p } from '../../../../../utils/tagViews';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import classes from './UserName.module.scss';

export default class UserNameView extends BaseComponentView<HTMLParagraphElement> {
  private readonly unreadMessageCounter: BaseComponentView<HTMLParagraphElement>;

  private readonly state = StateManagementService.getInstance();

  private readonly socket = WebSocketService.getInstance();

  readonly username: string;

  constructor(textContent: string, className: string) {
    super({
      tagName: 'p',
      className,
      textContent,
    });

    this.username = textContent;

    this.unreadMessageCounter = p(
      '',
      `${classes.counter} ${classes.invisible}`,
    );

    this.addChildrenComponents('end', this.unreadMessageCounter);

    this.state.subscribe(StateKeys.MessageHistory, this.handleMessageHistory);
    this.state.subscribe(
      StateKeys.MessageReceived,
      this.incrementUnreadMessages,
    );
    this.state.subscribe(
      StateKeys.ResetUnreadMessages,
      this.resetUnreadMessages,
    );

    this.socket.sendMessageHistoryRequest(this.username);
  }

  override destroy(): void {
    super.destroy();

    this.state.unsubscribe(StateKeys.MessageHistory, this.handleMessageHistory);
    this.state.unsubscribe(
      StateKeys.MessageReceived,
      this.incrementUnreadMessages,
    );
    this.state.unsubscribe(
      StateKeys.ResetUnreadMessages,
      this.resetUnreadMessages,
    );
  }

  private handleMessageHistory = () => {
    const history = this.state.getValue(StateKeys.MessageHistory);

    if (
      isMessagesList(history) &&
      history.length &&
      history[0].from === this.username
    ) {
      const unreadMessageQuantity = history.filter(
        (msg) => msg.status.isReaded === false && msg.from === this.username,
      ).length;

      this.unreadMessageCounter.setTextContent(String(unreadMessageQuantity));

      if (unreadMessageQuantity) {
        this.unreadMessageCounter.removeClass(classes.invisible);
      }
    }
  };

  private incrementUnreadMessages = (): void => {
    const message = this.state.getValue(StateKeys.MessageReceived);

    if (isMessageData(message)) {
      const { from } = message;

      if (from === this.username) {
        console.log('need to increment unred');

        const count = this.unreadMessageCounter.getTextContent();

        const numberCount = count ? parseInt(count, 10) : 0;

        if (Number.isFinite(numberCount)) {
          this.unreadMessageCounter.setTextContent(String(numberCount + 1));
          this.unreadMessageCounter.removeClass(classes.invisible);
        }
      }
    }
  };

  private resetUnreadMessages = (): void => {
    const username = this.state.getValue(StateKeys.ResetUnreadMessages);

    if (typeof username === 'string') {
      this.unreadMessageCounter.setTextContent('');
      this.unreadMessageCounter.addClass(classes.invisible);
    }
  };
}
