import { EventCallbacks } from '../../types/types';

export default class BaseComponentView<T extends HTMLElement = HTMLElement> {
  private readonly children: BaseComponentView[] = [];

  protected readonly element: T;

  constructor(
    params: Partial<T>,
    eventCallbacks?: EventCallbacks<T>,
    ...children: BaseComponentView[]
  ) {
    const element = document.createElement(params.tagName || 'div') as T;
    this.element = element;
    this.setParameters(params);

    if (children) {
      this.children = children;
      this.addChildrenComponents(children);
    }

    if (eventCallbacks) {
      this.setEventCallbacks(eventCallbacks);
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  protected setParameters(params: Partial<T>) {
    const { textContent, className } = params;

    if (textContent) {
      this.element.textContent = textContent;
    }

    if (className) {
      this.setClassName(className);
    }
  }

  protected setEventCallbacks(validationCallbacks: EventCallbacks<T>): void {
    Object.keys(validationCallbacks).forEach((key) => {
      this.element.addEventListener(
        key as keyof EventCallbacks<T>,
        validationCallbacks[
          key as keyof EventCallbacks<T>
        ] as EventListenerOrEventListenerObject,
      );
    });
  }

  private addChildrenComponents(children: BaseComponentView[]): void {
    children.forEach((component) => this.addChild(component.getElement()));
    this.children.push(...children);
  }

  private addChild(element: HTMLElement): void {
    this.element.append(element);
  }

  private setClassName(className: string): void {
    this.element.className = className;
  }

  private addClass(className: string): void {
    this.element.classList.add(className);
  }

  private removeClass(className: string): void {
    this.element.classList.remove(className);
  }
}
