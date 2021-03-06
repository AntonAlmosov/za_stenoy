/**
 * Build styles
 */
require("./index.css").toString();

/**
 * Underline Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
class LineThrough {
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {
    return "cdx-linethrough";
  }

  /**
   * @param {{api: object}}  - Editor.js API
   */
  constructor({ api }) {
    this.api = api;

    /**
     * Toolbar Button
     *
     * @type {HTMLElement|null}
     */
    this.button = null;

    /**
     * Tag represented the term
     *
     * @type {string}
     */
    this.tag = "DEL";

    /**
     * CSS classes
     */
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
  }

  /**
   * Specifies Tool as Inline Toolbar Tool
   *
   * @returns {boolean}
   */
  static get isInline() {
    return true;
  }

  /**
   * Create button element for Toolbar
   *
   * @returns {HTMLElement}
   */
  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  /**
   * Wrap/Unwrap selected fragment
   *
   * @param {Range} range - selected fragment
   */
  surround(range) {
    if (!range) {
      return;
    }

    const termWrapper = this.api.selection.findParentTag(
      this.tag,
      LineThrough.CSS
    );

    /**
     * If start or end of selection is in the highlighted block
     */
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(range) {
    /**
     * Create a wrapper for highlighting
     */
    const del = document.createElement(this.tag);

    del.classList.add(LineThrough.CSS);

    /**
     * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
     *
     * // range.surroundContents(span);
     */
    del.appendChild(range.extractContents());
    range.insertNode(del);

    /**
     * Expand (add) selection to highlighted block
     */
    this.api.selection.expandToTag(del);
  }

  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(termWrapper) {
    /**
     * Expand selection to all term-tag
     */
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    const range = sel.getRangeAt(0);

    const unwrappedContent = range.extractContents();

    /**
     * Remove empty term-tag
     */
    termWrapper.parentNode.removeChild(termWrapper);

    /**
     * Insert extracted content
     */
    range.insertNode(unwrappedContent);

    /**
     * Restore selection
     */
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /**
   * Check and change Term's state for current selection
   */
  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, LineThrough.CSS);

    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }

  /**
   * Get Tool icon's SVG
   *
   * @returns {string}
   */
  get toolboxIcon() {
    return `<svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.82333 7.21581C2.65333 6.86724 2.56667 6.45997 2.56667 5.994C2.56667 5.54636 2.65333 5.13909 2.83 4.76851C3.00667 4.39793 3.25333 4.08239 3.57333 3.82188C3.89333 3.56137 4.27 3.35957 4.71 3.21648C5.15 3.07338 5.63 3 6.15667 3C6.69667 3 7.18667 3.08072 7.62667 3.24583C8.06667 3.41094 8.44333 3.63843 8.75667 3.93562C9.07 4.22915 9.31 4.57772 9.48 4.98499C9.65 5.38859 9.73333 5.83256 9.73333 6.31321H7.72667C7.72667 6.08939 7.69333 5.88025 7.63 5.68946C7.56667 5.495 7.46667 5.32989 7.33333 5.19413C7.2 5.05837 7.03333 4.9483 6.83333 4.87492C6.63333 4.79787 6.39667 4.76117 6.12333 4.76117C5.86 4.76117 5.63333 4.7942 5.43667 4.85657C5.24333 4.91895 5.08333 5.007 4.95667 5.12075C4.83 5.23449 4.73333 5.36658 4.67 5.51701C4.60667 5.66744 4.57333 5.83256 4.57333 6.00133C4.57333 6.35357 4.73667 6.65077 5.06333 6.88926C5.31333 7.06905 5.57333 7.24149 6 7.40294H2.92667C2.89333 7.34056 2.85667 7.28185 2.82333 7.21581V7.21581ZM12 9.6044V8.13676H0V9.6044H6.41667C6.53667 9.65577 6.68333 9.70714 6.78333 9.75484C7.03 9.87592 7.22333 10.0043 7.36333 10.1291C7.50333 10.2575 7.59667 10.3969 7.64667 10.5437C7.69667 10.6941 7.72 10.8629 7.72 11.0464C7.72 11.2188 7.69 11.3803 7.63 11.527C7.57 11.6775 7.47667 11.8059 7.35333 11.9123C7.23 12.0187 7.07 12.1031 6.88 12.1654C6.68667 12.2278 6.46333 12.2572 6.20333 12.2572C5.91333 12.2572 5.65 12.2241 5.41333 12.1618C5.17667 12.0994 4.97667 11.9967 4.81 11.8572C4.64333 11.7178 4.51333 11.5344 4.42 11.3105C4.32667 11.0867 4.25 10.7492 4.25 10.4263H2.26667C2.26667 10.8299 2.32 11.2555 2.42333 11.5857C2.52667 11.9159 2.67333 12.2131 2.85667 12.4736C3.04 12.7342 3.26 12.958 3.51 13.1488C3.76 13.3396 4.03 13.501 4.32333 13.6258C4.61667 13.7542 4.92 13.8496 5.24333 13.9083C5.56333 13.9706 5.88667 14 6.20667 14C6.74 14 7.22667 13.934 7.66 13.7982C8.09333 13.6624 8.46667 13.468 8.77333 13.2185C9.08 12.9653 9.31667 12.6571 9.48667 12.2865C9.65667 11.9159 9.73667 11.4977 9.73667 11.028C9.73667 10.5877 9.66667 10.1915 9.53 9.8429C9.49667 9.75851 9.46 9.67779 9.41667 9.59706H12V9.6044Z" fill="#010101"/>
    </svg>         
    `;
  }

  /**
   * Sanitizer rule
   *
   * @returns {{u: {class: string}}}
   */
  static get sanitize() {
    return {
      del: {
        class: LineThrough.CSS,
      },
    };
  }
}

module.exports = LineThrough;
