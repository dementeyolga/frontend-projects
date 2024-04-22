import { CustomEvents, StateKeys } from '../../../../types/enums';
import { isMessageData, isMessagesList } from '../../../../types/typeGuards';
import { div, p } from '../../../../utils/tagViews';
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
      this.addChildrenComponents('begin', p(username, classes.chatHeader));

      // TODO request chat history
      // ? Also need to subscribe to receiving message history response
      // ? (compare nickname of the received history)

      this.state.subscribe(StateKeys.MessageSent, this.showSentMessage);
      this.state.subscribe(StateKeys.MessageReceived, this.showReceivedMessage);
      this.state.subscribe(StateKeys.MessageHistory, this.showMessageHistory);

      this.messageForm.enable();

      this.socket.sendMessageHistoryRequest(username);
    } else {
      this.messageHistory.addChildrenComponents(
        'end',
        p('Select a chat to start messaging.', classes.disclaimer),
      );
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

  private showSentMessage = (): void => {
    const message = this.state.getValue(StateKeys.MessageSent);

    if (isMessageData(message)) {
      const { to } = message;

      if (to === this.username) {
        this.messageHistory.addChildrenComponents(
          'end',
          new MessageView(message, messageClasses.outgoing),
        );
      }
    }

    this.messageForm.clear();
  };

  private showReceivedMessage = (): void => {
    const message = this.state.getValue(StateKeys.MessageReceived);
    console.log('adding received message', isMessageData(message));

    if (isMessageData(message)) {
      const { from } = message;

      if (from === this.username) {
        this.messageHistory.addChildrenComponents(
          'end',
          new MessageView(message, messageClasses.incoming),
        );
      }
    }
  };

  private showMessageHistory = (): void => {
    const history = this.state.getValue(StateKeys.MessageHistory);

    if (isMessagesList(history)) {
      if (
        history.length &&
        (history[0].from === this.username || history[0].to === this.username)
      ) {
        history.forEach((msg) => {
          if (msg.from === this.username) {
            this.messageHistory.addChildrenComponents(
              'end',
              new MessageView(msg, messageClasses.incoming),
            );
          } else {
            this.messageHistory.addChildrenComponents(
              'end',
              new MessageView(msg, messageClasses.outgoing),
            );
          }
        });
      }
    }
  };
}
