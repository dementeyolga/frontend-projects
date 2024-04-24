import { div, p } from '../../../utils/tagViews';
import BaseComponentView from '../../BaseComponent/BaseComponentView';
import AnchorView from '../Anchor/AnchorView';
import ImageView from '../Image/ImageView';
import classes from './Footer.module.scss';
import githubLogo from './github-logo.png';
import rsSchoolLogo from './rs-logo.webp';

export default class FooterView extends BaseComponentView<HTMLElement> {
  constructor() {
    super(
      {
        tagName: 'footer',
        className: classes.footer,
      },
      new AnchorView(
        'https://rs.school/',
        div(
          classes.link,
          new ImageView(rsSchoolLogo, 'rs-school logo', classes.logo),
          p('RS School '),
        ),
      ),
      p('2024'),
      new AnchorView(
        'https://github.com/dementeyolga',
        div(
          classes.link,
          new ImageView(githubLogo, 'github logo', classes.logo),
          p('Olga Dementey'),
        ),
      ),
    );
  }
}
