import BaseComponentView from '../../BaseComponent/BaseComponentView';
import classes from './Anchor.module.scss';

export default class AnchorView extends BaseComponentView<HTMLAnchorElement> {
  constructor(href: string, content: string | BaseComponentView) {
    super({
      tagName: 'a',
      className: classes.anchor,
      href,
    });

    if (typeof content === 'string') {
      this.setTextContent(content);
    } else {
      this.addChildrenComponents('end', content);
    }
  }

  protected override setParameters(params: Partial<HTMLAnchorElement>): void {
    super.setParameters(params);

    const { href } = params;

    if (href) {
      this.element.href = href;
    }
  }
}
