import BaseComponentView from '../../BaseComponent/BaseComponentView';

export default class ImgView extends BaseComponentView<HTMLImageElement> {
  constructor(src: string, alt: string = '', className?: string) {
    super({
      tagName: 'img',
      className,
      src,
      alt,
    });
  }

  protected override setParameters(params: Partial<HTMLImageElement>): void {
    super.setParameters(params);

    const { alt, src } = params;

    if (src) {
      this.element.src = src;
    }

    if (alt) {
      this.element.alt = alt;
    } else {
      this.element.alt = '';
    }
  }
}
