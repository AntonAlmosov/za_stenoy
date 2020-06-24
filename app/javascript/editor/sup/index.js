/**
 * Build styles
 */
require("./index.css").toString();

/**
 * Underline Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
class Sup {
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {
    return "cdx-sup";
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
    this.tag = "SUP";

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

    const termWrapper = this.api.selection.findParentTag(this.tag, Sup.CSS);

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

    del.classList.add(Sup.CSS);

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
    const termTag = this.api.selection.findParentTag(this.tag, Sup.CSS);

    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }

  /**
   * Get Tool icon's SVG
   *
   * @returns {string}
   */
  get toolboxIcon() {
    return `<svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.94712 6.30736V6.14894C5.81282 6.3367 5.67315 6.48926 5.52274 6.61834C5.37809 6.74268 5.2144 6.83804 5.03928 6.89998C4.86738 6.95866 4.66325 6.98799 4.443 6.98799C4.17441 6.98799 3.9273 6.92932 3.71243 6.8061C3.50523 6.6907 3.33207 6.51375 3.21285 6.29563C3.05524 5.94612 2.98307 5.55803 3.00334 5.16906V2.73404C3.00334 2.4876 3.05706 2.30571 3.15376 2.18249C3.26119 2.06514 3.39012 2.0006 3.55664 2.0006C3.63349 1.9968 3.71019 2.01107 3.78156 2.04246C3.85292 2.07384 3.91728 2.12159 3.97028 2.18249C4.07771 2.30571 4.12606 2.49347 4.12606 2.73404V4.70553C4.12606 4.98717 4.14755 5.22774 4.19052 5.42137C4.2335 5.61499 4.31408 5.76755 4.42688 5.87317C4.53969 5.99052 4.69548 6.04332 4.88886 6.04332C5.07688 6.04332 5.25415 5.97878 5.42605 5.85556C5.5872 5.73821 5.71076 5.57392 5.78596 5.37443C5.85042 5.1984 5.88266 4.81701 5.88266 4.23026V2.73404C5.88266 2.49347 5.93637 2.30571 6.04381 2.18249C6.1405 2.06514 6.28017 2.0006 6.4467 2.0006C6.60785 2.0006 6.74752 2.05928 6.84959 2.18249C6.95165 2.29984 7 2.4876 7 2.73404V6.29563C7 6.53033 6.95165 6.70635 6.85496 6.8237C6.80787 6.88129 6.7498 6.92689 6.68483 6.9573C6.61986 6.98771 6.54958 7.0022 6.47893 6.99973C6.40786 7.00147 6.33732 6.98607 6.27233 6.95463C6.20733 6.92319 6.14948 6.87649 6.1029 6.81784C5.99546 6.70049 5.94712 6.52446 5.94712 6.30736Z" fill="black"/>
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
      sup: {
        class: Sup.CSS,
      },
    };
  }
}

module.exports = Sup;
