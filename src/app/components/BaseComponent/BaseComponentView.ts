export default class BaseComponentView<T extends HTMLElement = HTMLElement> {
  children: BaseComponentView[] = [];

  protected readonly element: T;

  readonly id?: number | string;

  constructor(params: Partial<T>, ...children: BaseComponentView[]) {
    const element = document.createElement(params.tagName || 'div') as T;
    this.element = element;
    this.setParameters(params);

    if (children.length) {
      this.addChildrenComponents('end', ...children);
    }
  }

  getElement(): T {
    return this.element;
  }

  getElementWidth(): number {
    return this.element.offsetWidth;
  }

  setTextContent(text: string): void {
    this.element.textContent = text;
  }

  setInnerHTML(html: string): void {
    this.element.innerHTML = html;
  }

  getTextContent(): string | null {
    return this.element.textContent;
  }

  protected setParameters(params: Partial<T>) {
    const { textContent, className, id, innerHTML } = params;

    if (textContent) {
      this.element.textContent = textContent;
    }

    if (className) {
      this.setClassName(className);
    }

    if (id) {
      this.element.id = id;
    }

    if (innerHTML) {
      this.element.innerHTML = innerHTML;
    }
  }

  addChildrenComponents(
    position?: 'begin' | 'end',
    ...children: typeof this.children
  ): void {
    children.forEach(async (component) => {
      this.addChild(component.getElement(), position);

      if (position === 'end') {
        this.children.push(component);
      } else {
        this.children.unshift(component);
      }
    });
  }

  removeChildrenComponents(): void {
    this.children.length = 0;

    const currentEl = this.getElement();
    currentEl.innerHTML = '';
  }

  removeChildComponent(
    param: BaseComponentView | HTMLElement | number | string,
  ): void {
    let component;

    if (param instanceof BaseComponentView) {
      component = param;
    } else if (typeof param === 'number') {
      component = this.findChildComponentById(param);
    } else if (param instanceof HTMLElement) {
      component = this.findChildComponentByElement(param);
    } else if (typeof param === 'string') {
      component = this.findChildComponentByTextContent(param);
    }

    if (component) {
      const index = this.children.indexOf(component);
      this.children.splice(index, 1);

      component.destroy();
    }
  }

  destroy() {
    this.element.remove();
  }

  findChildComponentByElement(
    element: HTMLElement,
  ): BaseComponentView | undefined {
    const component = this.children.find(
      (comp) => comp.getElement() === element,
    );

    return component;
  }

  findChildComponentById(id: number): BaseComponentView | undefined {
    const component = this.children.find((comp) => {
      if (comp.id) {
        return comp.id === id;
      }

      return false;
    });

    return component;
  }

  findChildComponentByTextContent(text: string): BaseComponentView | undefined {
    const component = this.children.find((comp) => {
      if (comp.getTextContent()) {
        return comp.getTextContent() === text;
      }

      return false;
    });

    return component;
  }

  setClassName(className: string): void {
    this.element.className = className;
  }

  addClass(className: string): void {
    this.element.classList.add(className);
  }

  removeClass(className: string): void {
    this.element.classList.remove(className);
  }

  protected addChild(element: HTMLElement, position?: 'begin' | 'end'): void {
    if (position === 'begin') {
      this.element.prepend(element);
    } else {
      this.element.append(element);
    }
  }
}
