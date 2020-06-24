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
    return `<svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.80731 8.82853L8.27678 4.9727C8.30077 4.9352 8.30234 4.8876 8.28105 4.84865C8.25963 4.80955 8.21871 4.78532 8.17428 4.78532H6.28459C6.24223 4.78532 6.2029 4.80737 6.18074 4.84351L4.69672 7.27037L3.18128 4.84254C3.159 4.80687 3.12003 4.78532 3.07803 4.78532H1.17166C1.1271 4.78532 1.08594 4.80967 1.06475 4.84888C1.04345 4.8881 1.04528 4.93582 1.06951 4.9732L3.52765 8.76875L0.810907 12.9173C0.786437 12.9547 0.784368 13.0025 0.805675 13.0418C0.826981 13.0812 0.868141 13.1058 0.912823 13.1058H2.86863C2.91003 13.1058 2.94862 13.0847 2.97102 13.0499L4.66457 10.416L6.35288 13.0496C6.37528 13.0846 6.41388 13.1056 6.45539 13.1056H8.42226C8.4672 13.1056 8.50834 13.0809 8.52953 13.0414C8.55072 13.002 8.54841 12.9539 8.5237 12.9165L5.80731 8.82853Z" fill="black"/>
    <path d="M10.1333 5.39432C10.3613 5.18516 10.5157 5.02786 10.6054 4.91353C10.7399 4.74222 10.8402 4.57481 10.9033 4.4158C10.9677 4.25327 11.0003 4.08001 11.0003 3.90093C11.0003 3.57817 10.8835 3.30435 10.653 3.08679C10.4245 2.87116 10.1102 2.76183 9.71916 2.76183C9.36426 2.76183 9.06257 2.85497 8.82247 3.03869C8.57655 3.22679 8.42911 3.53434 8.38394 3.95255C8.38039 3.98482 8.39002 4.01709 8.41047 4.04229C8.43092 4.0675 8.46063 4.08343 8.49291 4.08672L9.19102 4.15649C9.19504 4.15686 9.19906 4.1571 9.2032 4.1571C9.23193 4.1571 9.25982 4.147 9.28184 4.12824C9.30706 4.10693 9.3225 4.07625 9.32469 4.04327C9.33579 3.8722 9.37546 3.74717 9.43962 3.6818C9.50282 3.6174 9.58852 3.58611 9.70176 3.58611C9.81704 3.58611 9.90264 3.61557 9.96338 3.67633C10.0241 3.73708 10.0536 3.82668 10.0536 3.9505C10.0536 4.06678 10.0118 4.1883 9.92942 4.31186C9.88474 4.37725 9.7502 4.5315 9.36683 4.88872C8.96274 5.26372 8.69792 5.55896 8.55767 5.79126C8.41606 6.02575 8.32988 6.27791 8.3015 6.54053C8.29774 6.57486 8.30894 6.6092 8.33193 6.63488C8.35507 6.66057 8.38793 6.67531 8.42253 6.67531H10.8783C10.9455 6.67531 11.0001 6.62076 11.0001 6.55356V5.90281C11.0001 5.83561 10.9455 5.78106 10.8783 5.78106H9.72879C9.78917 5.71537 9.92504 5.58534 10.1333 5.39432Z" fill="black"/>
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
