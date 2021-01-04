/**
 * Build styles
 */
require("./index.css").toString();

/**
 * Base Paragraph Block for the Editor.js.
 * Represents simple paragraph
 *
 * @author CodeX (team@codex.so)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 */

/**
 * @typedef {object} ParagraphConfig
 * @property {string} placeholder - placeholder for the empty paragraph
 * @property {boolean} preserveBlank - Whether or not to keep blank paragraphs when saving editor data
 */

/**
 * @typedef {Object} ParagraphData
 * @description Tool's input and output data format
 * @property {String} text — Paragraph's content. Can include HTML tags: <a><b><i>
 */
class Paragraph {
  /**
   * Default placeholder for Paragraph Tool
   *
   * @return {string}
   * @constructor
   */
  static get DEFAULT_PLACEHOLDER() {
    return "";
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - constructor params
   * @param {ParagraphData} params.data - previously saved data
   * @param {ParagraphConfig} params.config - user config for Tool
   * @param {object} params.api - editor.js api
   */
  constructor({ data, config, api }) {
    this.api = api;
    this.wrapper = undefined;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-paragraph",
    };
    this.onKeyUp = this.onKeyUp.bind(this);

    this.settings = [
      {
        name: "alignLeft",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 10C2 9.44772 2.44772 9 3 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H3C2.44772 11 2 10.5523 2 10Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 14C2 13.4477 2.44772 13 3 13H21C21.5523 13 22 13.4477 22 14C22 14.5523 21.5523 15 21 15H3C2.44772 15 2 14.5523 2 14Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 18C2 17.4477 2.44772 17 3 17H17C17.5523 17 18 17.4477 18 18C18 18.5523 17.5523 19 17 19H3C2.44772 19 2 18.5523 2 18Z" fill="black"/></svg>`,
      },
      {
        name: "alignCenter",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 10C5 9.44772 5.44772 9 6 9H18C18.5523 9 19 9.44772 19 10C19 10.5523 18.5523 11 18 11H6C5.44772 11 5 10.5523 5 10Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 14C2 13.4477 2.44772 13 3 13H21C21.5523 13 22 13.4477 22 14C22 14.5523 21.5523 15 21 15H3C2.44772 15 2 14.5523 2 14Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 18C5 17.4477 5.44772 17 6 17H18C18.5523 17 19 17.4477 19 18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18Z" fill="black"/></svg>`,
      },
      {
        name: "alignRight",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 10C6 9.44772 6.44772 9 7 9H21C21.5523 9 22 9.44772 22 10C22 10.5523 21.5523 11 21 11H7C6.44772 11 6 10.5523 6 10Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 14C2 13.4477 2.44772 13 3 13H21C21.5523 13 22 13.4477 22 14C22 14.5523 21.5523 15 21 15H3C2.44772 15 2 14.5523 2 14Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6 18C6 17.4477 6.44772 17 7 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H7C6.44772 19 6 18.5523 6 18Z" fill="black"/></svg>`,
      },
      {
        name: "alignJustify",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 10C2 9.44772 2.55965 9 3.25 9H20.75C21.4404 9 22 9.44772 22 10C22 10.5523 21.4404 11 20.75 11H3.25C2.55965 11 2 10.5523 2 10Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 14C2 13.4477 2.44772 13 3 13H21C21.5523 13 22 13.4477 22 14C22 14.5523 21.5523 15 21 15H3C2.44772 15 2 14.5523 2 14Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 18C2 17.4477 2.55965 17 3.25 17H20.75C21.4404 17 22 17.4477 22 18C22 18.5523 21.4404 19 20.75 19H3.25C2.55965 19 2 18.5523 2 18Z" fill="black"/></svg>`,
      },
      {
        name: "textIdent",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6.98901H8.07031V8.57143H24V6.98901Z" fill="black"/>
        <path d="M24 2.76929H0V4.3517H24V2.76929Z" fill="black"/>
        <path d="M24 19.6484H0V21.2309H24V19.6484Z" fill="black"/>
        <path d="M24 15.4287H8.07031V17.0111H24V15.4287Z" fill="black"/>
        <path d="M24 11.2087H8.07031V12.7912H24V11.2087Z" fill="black"/>
        <path d="M0.263794 15.2948L3.55855 12.0001L0.263794 8.70532V15.2948Z" fill="black"/>
        </svg>        
     `,
      },
    ];

    /**
     * Placeholder for paragraph if it is first Block
     * @type {string}
     */
    this._placeholder = config.placeholder
      ? config.placeholder
      : Paragraph.DEFAULT_PLACEHOLDER;
    this._data = {};
    this._element = this.drawView();
    this._preserveBlank =
      config.preserveBlank !== undefined ? config.preserveBlank : false;
    this.data = {
      text: data.text || "",
      alignLeft: data.alignLeft !== undefined ? data.alignLeft : true,
      alignCenter: data.alignCenter !== undefined ? data.alignCenter : false,
      alignRight: data.alignRight !== undefined ? data.alignRight : false,
      alignJustify: data.alignJustify !== undefined ? data.alignJustify : false,
      textIdent: data.textIdent !== undefined ? data.textIdent : false,
    };
    this.settings.forEach((tune) => {
      if (this.data[tune.name]) {
        this.wrapper.classList.add(tune.name);
      }
    });
  }

  renderSettings() {
    const wrapper = document.createElement("div");

    this.settings.forEach((tune) => {
      let button = document.createElement("div");

      button.classList.add("cdx-settings-button");
      button.classList.toggle(
        "cdx-settings-button--active",
        this.data[tune.name]
      );
      button.innerHTML = tune.icon;
      wrapper.appendChild(button);

      button.addEventListener("click", () => {
        this._toggleTune(tune.name);
        const buttons = document.querySelectorAll(".cdx-settings-button");
        buttons.forEach((el) => {
          el.classList.remove("cdx-settings-button--active");
        });
        button.classList.add("cdx-settings-button--active");
      });
    });

    return wrapper;
  }

  /**
   * Check if text content is empty and set empty string to inner html.
   * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
   *
   * @param {KeyboardEvent} e - key up event
   */
  onKeyUp(e) {
    if (e.code !== "Backspace" && e.code !== "Delete") {
      return;
    }

    const { textContent } = this._element;

    if (textContent === "") {
      this._element.innerHTML = "";
    }
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    let div = document.createElement("DIV");

    div.classList.add(this._CSS.wrapper, this._CSS.block);
    div.contentEditable = true;
    div.dataset.placeholder = this._placeholder;

    div.addEventListener("keyup", this.onKeyUp);

    this.wrapper = div;
    return div;
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    return this._element;
  }

  /**
   * Method that specified how to merge two Text blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   * @param {ParagraphData} data
   * @public
   */
  merge(data) {
    let newData = {
      text: this.data.text + data.text,
      alignLeft: this.data.alignLeft,
      alignCenter: this.data.alignCenter,
      alignRight: this.data.alignRight,
      alignJustify: this.data.alignJustify, 
      textIdent: this.data.textIdent,
    };

    this.data = newData;
  }

  /**
   * Validate Paragraph block data:
   * - check for emptiness
   *
   * @param {ParagraphData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate() {
    return true;
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {ParagraphData} - saved data
   * @public
   */
  save(toolsContent) {
    return Object.assign(this.data, {
      text: toolsContent.innerHTML,
    });
  }

  /**
   * On paste callback fired from Editor.
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(event) {
    const data = {
      text: event.detail.data.innerHTML,
    };

    this.data = data;
  }

  _toggleTune(tune) {
    this.data["alignLeft"] = false;
    this.data["alignCenter"] = false;
    this.data["alignRight"] = false;
    this.data["alignJustify"] = false;
    this.data["textIdent"] = false;
    this.data[tune] = true;
    this._acceptTuneView();
  }

  _acceptTuneView() {
    this.settings.forEach((tune) => {
      this.wrapper.classList.toggle(tune.name, !!this.data[tune.name]);
    });
  }

  // /**
  //  * Enable Conversion Toolbar. Paragraph can be converted to/from other tools
  //  */
  // static get conversionConfig() {
  //   return {
  //     export: "text", // to convert Paragraph to other block, use 'text' property of saved data
  //     import: "text", // to covert other block's exported string to Paragraph, fill 'text' property of tool data
  //   };
  // }

  /**
   * Sanitizer rules
   */
  static get sanitize() {
    return {
      text: {
        br: true,
      },
    };
  }

  /**
   * Get current Tools`s data
   * @returns {ParagraphData} Current data
   * @private
   */
  get data() {
    let text = this._element.innerHTML;

    this._data.text = text;

    return this._data;
  }

  /**
   * Store data in plugin:
   * - at the this._data property
   * - at the HTML
   *
   * @param {ParagraphData} data — data to set
   * @private
   */
  set data(data) {
    this._data = data || {};

    this._element.innerHTML = this._data.text || "";
  }

  /**
   * Used by Editor paste handling API.
   * Provides configuration to handle P tags.
   *
   * @returns {{tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: ["P"],
    };
  }

  /**
   * Icon and title for displaying at the Toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.2 -0.3 9 11.4" width="12" height="14"><path d="M0 2.77V.92A1 1 0 01.2.28C.35.1.56 0 .83 0h7.66c.28.01.48.1.63.28.14.17.21.38.21.64v1.85c0 .26-.08.48-.23.66-.15.17-.37.26-.66.26-.28 0-.5-.09-.64-.26a1 1 0 01-.21-.66V1.69H5.6v7.58h.5c.25 0 .45.08.6.23.17.16.25.35.25.6s-.08.45-.24.6a.87.87 0 01-.62.22H3.21a.87.87 0 01-.61-.22.78.78 0 01-.24-.6c0-.25.08-.44.24-.6a.85.85 0 01.61-.23h.5V1.7H1.73v1.08c0 .26-.08.48-.23.66-.15.17-.37.26-.66.26-.28 0-.5-.09-.64-.26A1 1 0 010 2.77z"/></svg>',
      title: "Text",
    };
  }
}

module.exports = Paragraph;
