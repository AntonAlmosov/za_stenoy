/**
 * Build styles
 */
require("./index.css").toString();

/**
 * Underline Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
class Small {
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {
    return "cdx-small";
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
    this.tag = "SMALL";

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

    const termWrapper = this.api.selection.findParentTag(this.tag, Small.CSS);

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

    del.classList.add(Small.CSS);

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
    const termTag = this.api.selection.findParentTag(this.tag, Small.CSS);

    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }

  /**
   * Get Tool icon's SVG
   *
   * @returns {string}
   */
  get toolboxIcon() {
    return `<svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.22717 1.4H0.77689C0.602808 1.4 0.433606 1.46039 0.306978 1.57119C0.179881 1.6824 0.105572 1.83629 0.105572 2C0.105572 2.16371 0.179881 2.3176 0.306978 2.42881C0.433606 2.53961 0.602808 2.6 0.77689 2.6H3.32835V11C3.32835 11.1638 3.40281 11.3176 3.52986 11.4288C3.65649 11.5396 3.82569 11.6 3.99977 11.6C4.17386 11.6 4.34306 11.5396 4.46969 11.4288C4.59674 11.3176 4.6712 11.1638 4.6712 11V2.6H7.22717C7.40125 2.6 7.57046 2.53961 7.69708 2.42881C7.82414 2.31764 7.8986 2.16377 7.8986 2C7.8986 1.83623 7.82414 1.68236 7.69708 1.57119C7.57046 1.46039 7.40125 1.4 7.22717 1.4Z" fill="black" stroke="black" stroke-width="0.2"/>
    </svg>`;
  }

  /**
   * Sanitizer rule
   *
   * @returns {{u: {class: string}}}
   */
  static get sanitize() {
    return {
      small: {
        class: Small.CSS,
      },
    };
  }
}

module.exports = Small;
