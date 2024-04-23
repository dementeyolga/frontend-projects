import { Events, StateKeys } from '../../../../../types/enums';
import { isUserCredentials } from '../../../../../types/typeGuards';
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

  constructor() {
    super({
      tagName: 'div',
      className: `${classes.messageHistory}`,
    });

    this.initListeners();
  }

  setPlugText(username: string | undefined): void {
    this.plugText = p(
      `This is the very beginning of your conversation with ${username || 'user'}.`,
      classes.plugText,
    );

    this.addChildrenComponents('end', this.plugText);
  }

  removePlugText() {
    if (this.plugText) {
      this.removeChildComponent(this.plugText);
    }
  }

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

  readMessages = (): void => {
    const currentUser = this.state.getValue(StateKeys.CurrentUser);
    let login: string;

    if (isUserCredentials(currentUser)) {
      ({ login } = currentUser);
    }

    this.children.forEach((msg) => {
      if (msg instanceof MessageView && !msg.isReaded && login === msg.to) {
        console.log('READING MESSAGE');

        this.socket.sendReadMessageRequest(msg.id);
      }
    });
  };
}
