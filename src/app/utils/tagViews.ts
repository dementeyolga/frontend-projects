import BaseComponentView from '../components/BaseComponent/BaseComponentView';

export const h1 = (className: string, textContent: string) =>
  new BaseComponentView<HTMLHeadingElement>({
    tagName: 'h1',
    className,
    textContent,
  });

export const h2 = (className: string, textContent: string) =>
  new BaseComponentView<HTMLHeadingElement>({
    tagName: 'h2',
    className,
    textContent,
  });

export const div = (className: string, ...children: BaseComponentView[]) =>
  new BaseComponentView<HTMLDivElement>(
    { tagName: 'div', className },
    ...children,
  );

export const main = (className: string, ...children: BaseComponentView[]) =>
  new BaseComponentView<HTMLElement>(
    { tagName: 'main', className },
    ...children,
  );

export const p = (textContent: string, className?: string) =>
  new BaseComponentView<HTMLParagraphElement>({
    tagName: 'p',
    className,
    textContent,
  });

export const svg = (innerHTML: string, className?: string) =>
  new BaseComponentView<HTMLParagraphElement>({
    tagName: 'svg',
    className,
    innerHTML,
  });
