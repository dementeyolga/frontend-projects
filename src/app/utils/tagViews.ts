import BaseComponentView from '../components/BaseComponent/BaseComponentView';

export const h1 = (className: string, textContent: string) =>
  new BaseComponentView({ tagName: 'h1', className, textContent });

export const h2 = (className: string, textContent: string) =>
  new BaseComponentView({ tagName: 'h2', className, textContent });
