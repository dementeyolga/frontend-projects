import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './Header.module.scss';

export default class HeaderView extends BaseComponentView<HTMLElement> {
  constructor(...children: BaseComponentView[]) {
    super(
      {
        tagName: 'header',
        className: classes.header,
      },
      ...children,
    );
  }
}
