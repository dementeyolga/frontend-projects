import { MessageData } from '../../../../../types/types';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import classes from './Message.module.scss';

export default class MessageView extends BaseComponentView<HTMLDivElement> {
  constructor(message: MessageData, className?: string) {
    const { text } = message;

    super({
      tagName: 'div',
      className: `${classes.message} ${className}`,
      textContent: text,
    });
  }
}
