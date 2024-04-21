import { CustomEvents, StateKeys } from '../../../../types/enums';
import { isMessageData, isUserCredentials } from '../../../../types/typeGuards';
import { div } from '../../../../utils/tagViews';
import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import StateManagementService from '../../../services/StateManagementService/StateManagementService';
import WebSocketService from '../../../services/WebSocketService/WebSocketService';
import classes from './Chat.module.scss';
import MessageView from './Message/MessageVIew';
import MessageFormView from './MessageForm/MessageFormView';
import messageClasses from './Message/Message.module.scss';

export default class ChatView extends BaseComponentView<HTMLDivElement> {
  private readonly socket = WebSocketService.getInstance();

  private readonly state = StateManagementService.getInstance();

  private readonly messageHistory: BaseComponentView<HTMLDivElement>;

  private readonly messageForm: MessageFormView;

  private readonly username?: string;

  constructor(username?: string) {
    super({ tagName: 'div', className: classes.chat });

    this.messageHistory = div(classes.messageHistory);
    this.messageForm = new MessageFormView();

    this.addChildrenComponents(
      'end',
      this.messageHistory,
      div('', this.messageForm),
    );

    if (username) {
      this.username = username;

      // TODO request chat history
      // ? Also need to subscribe to receiving message history response
      // ? (compare nickname of the received history)

      this.messageForm.enable();
    }

    this.initListeners();

    this.state.subscribe(StateKeys.MessageSent, this.showSentMessage);
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

  private showSentMessage = (): void => {
    const message = this.state.getValue(StateKeys.MessageSent);

    if (isMessageData(message)) {
      const { from, to } = message;

      const currentUser = this.state.getValue(StateKeys.CurrentUser);

      if (
        isUserCredentials(currentUser) &&
        from === currentUser.login &&
        to === this.username
      ) {
        this.messageHistory.addChildrenComponents(
          'end',
          new MessageView(message, messageClasses.outgoing),
        );
      }
    }
  };
}
