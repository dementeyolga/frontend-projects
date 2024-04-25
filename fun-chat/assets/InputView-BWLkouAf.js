var u = Object.defineProperty;
var p = (n, t, e) =>
  t in n
    ? u(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (n[t] = e);
var a = (n, t, e) => (p(n, typeof t != 'symbol' ? t + '' : t, e), e);
import { B as o, E as c, C as d } from './index-BU131wYh.js';
const g = '_input_1dh2a_1',
  v = { input: g };
class L extends o {
  constructor(e, s) {
    const { type: i } = e;
    super({ tagName: 'input', className: v.input, ...e });
    a(this, 'type');
    a(this, 'patternMessage');
    (this.type = i),
      (this.patternMessage =
        s ||
        `${this.getName() || 'Value'} doesn't match the pattern: ${e.pattern}`),
      this.initListeners();
  }
  getType() {
    return this.type;
  }
  getValue() {
    return this.element.value;
  }
  setValue(e) {
    this.element.value = e;
  }
  getName() {
    return this.element.name;
  }
  getMinLength() {
    return this.element.minLength;
  }
  focus() {
    this.element.focus();
  }
  checkTooShort() {
    return this.element.validity.tooShort;
  }
  checkPatternMismatch() {
    return this.element.validity.patternMismatch;
  }
  checkValid() {
    return this.element.validity.valid;
  }
  setParameters(e) {
    super.setParameters(e);
    const {
      type: s,
      name: i,
      required: r,
      disabled: h,
      minLength: l,
      pattern: m,
    } = e;
    s && (this.element.type = s),
      i && (this.element.name = i),
      r && (this.element.required = r),
      h && (this.element.disabled = h),
      l && (this.element.minLength = l),
      m && (this.element.pattern = m);
  }
  initListeners() {
    this.element.addEventListener(c.Input, () => {
      this.element.dispatchEvent(
        new CustomEvent(d.FormInput, { bubbles: !0, detail: this.getValue() })
      );
    });
  }
}
export { L as I };
