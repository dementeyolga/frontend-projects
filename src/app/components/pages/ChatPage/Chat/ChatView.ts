import BaseComponentView from '../../../BaseComponent/BaseComponentView';
import classes from './Chat.module.scss';

export default class ChatView extends BaseComponentView<HTMLDivElement> {
  constructor() {
    super({ tagName: 'div', className: classes.chat });
  }
}
