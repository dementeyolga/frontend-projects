import BaseComponentView from '../components/BaseComponent/BaseComponentView';
import { EventCallbacks } from '../types/types';

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

export const div = (
  className: string,
  eventCallbacks?: EventCallbacks<HTMLElement>,
  ...children: BaseComponentView[]
) =>
  new BaseComponentView<HTMLDivElement>(
    { tagName: 'div', className },
    eventCallbacks,
    ...children,
  );

export const p = (className: string, textContent: string) =>
  new BaseComponentView<HTMLParagraphElement>({
    tagName: 'p',
    className,
    textContent,
  });
