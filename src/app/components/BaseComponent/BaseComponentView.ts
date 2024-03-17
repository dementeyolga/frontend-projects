import { EventCallbacks } from '../../types/types';

export default class BaseComponentView<T extends HTMLElement = HTMLElement> {
  protected children: BaseComponentView[] = [];

  protected readonly element: T;

  constructor(
    params: Partial<T>,
    eventCallbacks?: EventCallbacks<T>,
    ...children: BaseComponentView[]
  ) {
    const element = document.createElement(params.tagName || 'div') as T;
    this.element = element;
    this.setParameters(params);

    if (children.length) {
      this.addChildrenComponents('end', ...children);
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

  async addChildrenComponents(
    position?: 'begin' | 'end',
    ...children: BaseComponentView[]
  ): Promise<void> {
    children.forEach(async (component) => {
      await this.addChild(component.getElement(), position);
      this.children.push(component);
    });
  }

  async removeChildrenComponents() {
    this.children.length = 0;

    const currentEl = this.getElement();
    currentEl.innerHTML = '';
  }

  removeChildComponent(element: HTMLElement) {
    const component = this.children.find(
      (comp) => comp.getElement() === element,
    );

    if (component) {
      const index = this.children.indexOf(component);
      this.children.splice(index, 1);

      element.remove();
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

  protected async addChild(
    element: HTMLElement,
    position?: 'begin' | 'end',
  ): Promise<void> {
    if (position === 'begin') {
      this.element.prepend(element);
    } else {
      this.element.append(element);
    }
  }

  protected setClassName(className: string): void {
    this.element.className = className;
  }

  protected addClass(className: string): void {
    this.element.classList.add(className);
  }

  protected removeClass(className: string): void {
    this.element.classList.remove(className);
  }
}
