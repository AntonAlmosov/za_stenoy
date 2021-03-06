import React from "react";
import EditorJs from "react-editor-js";
import Delimiter from "@editorjs/delimiter";
import Underline from "@editorjs/underline";
import Image from "@editorjs/image";

import Header from "../../../editor/heading/index";
import Paragraph from "../../../editor/paragraph/index";
import LineThrough from "../../../editor/overline/index";
import Sup from "../../../editor/sup/index";
import List from "../../../editor/list/index";
import Small from "../../../editor/small/index";

const tools = {
  header: Header,
  list: { class: List, inlineToolbar: true },
  paragraph: { class: Paragraph, inlineToolbar: true, preserveBlank: true },
  delimiter: { class: Delimiter },
  underline: { class: Underline, shortcut: "CMD+U" },
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: "/picture/upload_image",
        byUrl: "/picture/upload_url",
      },
    },
  },
  linethrough: { class: LineThrough, shortcut: "CMD+L" },
  sup: { class: Sup, shortcut: "CMD+Y" },
  small: { class: Small },
};

export const Editor = ({ data, setRef, style, placeholder, id }) => {
  return (
    <div style={style}>
      <EditorJs
        holder={id}
        data={data}
        tools={tools}
        instanceRef={(ref) => setRef(ref)}
        placeholder={
          placeholder || "Пишите! Например:\n Килограмм салата рыбного"
        }
      >
        <div id={id || "editorjs"}></div>
      </EditorJs>
    </div>
  );
};
