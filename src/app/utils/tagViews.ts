import BaseComponentView from '../components/BaseComponent/BaseComponentView';

export const h1 = (textContent: string, className?: string) =>
  new BaseComponentView<HTMLHeadingElement>({
    tagName: 'h1',
    className,
    textContent,
  });

export const h2 = (textContent: string, className?: string) =>
  new BaseComponentView<HTMLHeadingElement>({
    tagName: 'h2',
    className,
    textContent,
  });

export const div = (className?: string, ...children: BaseComponentView[]) =>
  new BaseComponentView<HTMLDivElement>(
    { tagName: 'div', className },
    ...children,
  );

export const main = (className?: string, ...children: BaseComponentView[]) =>
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

export const table = (className?: string, ...children: BaseComponentView[]) =>
  new BaseComponentView<HTMLTableElement>(
    { tagName: 'table', className },
    ...children,
  );

export const tr = (className?: string, ...children: BaseComponentView[]) =>
  new BaseComponentView<HTMLTableRowElement>(
    { tagName: 'tr', className },
    ...children,
  );

export const td = (textContent: string, className?: string) =>
  new BaseComponentView<HTMLTableCellElement>({
    tagName: 'td',
    className,
    textContent,
  });

export const svg = (innerHTML: string, className?: string) =>
  new BaseComponentView<HTMLElement & SVGElement>({
    tagName: 'svg',
    className,
    innerHTML,
  });
