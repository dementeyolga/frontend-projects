import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './Footer.module.scss';

export default class FooterView extends BaseComponentView<HTMLElement> {
  constructor(...children: BaseComponentView[]) {
    super(
      {
        tagName: 'footer',
        className: classes.footer,
      },
      ...children,
    );
  }
}
