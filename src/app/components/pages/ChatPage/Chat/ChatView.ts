import { CustomEvents } from '../../../../types/enums';
import { div } from '../../../../utils/tagViews';
import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import WebSocketService from '../../../services/WebSocketService/WebSocketService';
import classes from './Chat.module.scss';
import MessageFormView from './MessageForm/MessageFormView';

export default class ChatView extends BaseComponentView<HTMLDivElement> {
  private readonly socket = WebSocketService.getInstance();

  private readonly messageHistory: BaseComponentView<HTMLDivElement>;

  private readonly messageForm: MessageFormView;

  private readonly username?: string;

  constructor(username?: string) {
    super({ tagName: 'div', className: classes.chat });

    if (username) {
      this.username = username;
    }

    this.messageHistory = div(classes.messageHistory);
    this.messageForm = new MessageFormView();

    this.addChildrenComponents(
      'end',
      this.messageHistory,
      div('', this.messageForm),
    );

    if (username) {
      // TODO request chat history
      // ? Also need to subscribe to receiving message history response
      // ? (compare nickname of the received history)

      this.messageForm.enable();
    }

    this.initListeners();
  }

  initListeners(): void {
    this.element.addEventListener(CustomEvents.SendChatMessage, (ev) => {
      if (ev instanceof CustomEvent) {
        const text = ev.detail;

        if (this.username && typeof text === 'string') {
          this.socket.sendChatMessage(this.username, text);
        }
      }
    });
  }
}
