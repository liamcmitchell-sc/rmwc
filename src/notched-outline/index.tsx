import * as React from 'react';
import { FoundationComponent } from '@rmwc/base';
// @ts-ignore
import { MDCNotchedOutlineFoundation } from '@material/notched-outline';

export type NotchedOutlinePropsT = {};

export class NotchedOutlineIdle extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="mdc-notched-outline__idle" />;
  }
}

export class NotchedOutline extends FoundationComponent<NotchedOutlinePropsT> {
  static displayName = 'NotchedOutline';
  root_: null | HTMLElement = null;
  path_: null | SVGPathElement = null;

  constructor(props: NotchedOutlinePropsT) {
    super(props);
    this.createClassList('root_');
    this.createPropsList('root_');
  }

  getDefaultFoundation() {
    return new MDCNotchedOutlineFoundation({
      getWidth: () => this.root_ && this.root_.offsetWidth,
      getHeight: () => this.root_ && this.root_.offsetHeight,
      addClass: (className: string) => this.classList.root_.add(className),
      removeClass: (className: string) =>
        this.classList.root_.remove(className),
      setOutlinePathAttr: (value: string) =>
        this.path_ && this.path_.setAttribute('d', value),

      getIdleOutlineStyleValue: (propertyName: string): any => {
        if (this.root_) {
          const idleOutlineElement = this.root_.nextElementSibling;
          if (!idleOutlineElement) return undefined;
          return window
            .getComputedStyle(idleOutlineElement)
            .getPropertyValue(propertyName);
        }
      }
    });
  }

  /**
   * Updates outline selectors and SVG path to open notch.
   * @param {number} notchWidth The notch width in the outline.
   * @param {boolean=} isRtl Determines if outline is rtl. If rtl is true, notch
   * will be right justified in outline path, otherwise left justified.
   */
  notch(notchWidth: number, isRtl: boolean) {
    this.foundation.notch(notchWidth, isRtl);
  }

  /**
   * Updates the outline selectors to close notch and return it to idle state.
   */
  closeNotch() {
    this.foundation.closeNotch();
  }

  render() {
    return (
      <div
        {...this.props}
        {...this.propsList.root_.all()}
        ref={ref => (this.root_ = ref)}
        className={`mdc-notched-outline ${this.classList.root_.renderToString()}`}
      >
        <svg>
          <path
            className="mdc-notched-outline__path"
            ref={ref => (this.path_ = ref)}
          />
        </svg>
      </div>
    );
  }
}
