import { CustomEvents, StateKeys } from '../../../../types/enums';
import { isMessageData, isMessagesList } from '../../../../types/typeGuards';
import { div, p } from '../../../../utils/tagViews';
import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import StateManagementService from '../../../../services/StateManagementService/StateManagementService';
import WebSocketService from '../../../../services/WebSocketService/WebSocketService';
import classes from './Chat.module.scss';
import MessageView from './Message/MessageVIew';
import MessageFormView from './MessageForm/MessageFormView';
import messageClasses from './Message/Message.module.scss';
import MessageHistoryView from './MessageHistory/MessageHistoryView';

export default class ChatView extends BaseComponentView<HTMLDivElement> {
  private readonly socket = WebSocketService.getInstance();

  private readonly state = StateManagementService.getInstance();

  private readonly messageHistory: MessageHistoryView;

  private readonly messageForm: MessageFormView;

  private readonly username?: string;

  constructor(username?: string) {
    super({ tagName: 'div', className: classes.chat });

    this.messageHistory = new MessageHistoryView(username);
    this.messageForm = new MessageFormView();

    this.addChildrenComponents(
      'end',
      this.messageHistory,
      div('', this.messageForm),
    );

    if (username) {
      this.username = username;
      this.addChildrenComponents('begin', p(username, classes.chatHeader));

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

  override destroy(): void {
    super.destroy();

    this.state.unsubscribe(StateKeys.MessageSent, this.showSentMessage);
    this.state.unsubscribe(StateKeys.MessageReceived, this.showReceivedMessage);
    this.state.unsubscribe(StateKeys.MessageHistory, this.showMessageHistory);
  }

  initListeners(): void {
    this.initSendMessageListener();
    this.editMessageListener();
  }

  private initSendMessageListener(): void {
    this.element.addEventListener(CustomEvents.SendChatMessage, (ev) => {
      if (ev instanceof CustomEvent) {
        const text = ev.detail;

        if (this.username && typeof text === 'string') {
          if (this.messageForm.editingMessage) {
            const { id } = this.messageForm.editingMessage;

            this.socket.sendEditMessageRequest(id, text);
            this.messageForm.disableEditMode();
          } else {
            this.socket.sendChatMessage(this.username, text);
          }
        }
        this.messageForm.defineButtonState();
        this.messageForm.focus();
        this.messageHistory.readMessages();
      }
    });
  }

  private editMessageListener(): void {
    this.element.addEventListener(CustomEvents.EditMessage, (ev) => {
      if (ev instanceof CustomEvent) {
        const info = ev.detail;

        if (
          info instanceof Object &&
          typeof info.text === 'string' &&
          typeof info.id === 'string'
        ) {
          const { text, id } = info;

          this.messageForm.enableEditMode(id, text);
        }
      }
    });
  }

  private showSentMessage = (): void => {
    const message = this.state.getValue(StateKeys.MessageSent);

    if (isMessageData(message)) {
      const { to } = message;

      if (to === this.username) {
        this.messageHistory.removePlugText();

        const newMessage = new MessageView(message, messageClasses.outgoing);

        this.messageHistory.addChildrenComponents('end', newMessage);

        newMessage.getElement().scrollIntoView();
      }
    }

    this.messageForm.clear();
  };

  private showReceivedMessage = (): void => {
    const message = this.state.getValue(StateKeys.MessageReceived);

    if (isMessageData(message)) {
      const { from } = message;

      if (from === this.username) {
        this.messageHistory.removePlugText();

        const newMessage = new MessageView(message, messageClasses.incoming);

        this.messageHistory.addChildrenComponents('end', newMessage);

        newMessage.getElement().scrollIntoView();
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

        this.messageHistory.children[this.messageHistory.children.length - 1]
          .getElement()
          .scrollIntoView();
      } else {
        this.messageHistory.setPlugText(this.username);
      }
    }
  };
}
