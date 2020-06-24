import React from "react";
import EditorJs from "react-editor-js";
import Delimiter from "@editorjs/delimiter";
import Underline from "@editorjs/underline";

import Header from "../../../editor/heading/index";
import Paragraph from "../../../editor/paragraph/index";
import LineThrough from "../../../editor/overline/index";

const tools = {
  header: Header,
  paragraph: { class: Paragraph, inlineToolbar: true, preserveBlank: true },
  delimiter: { class: Delimiter },
  underline: Underline,
  linethrough: LineThrough,
};

export const Editor = ({ data, setRef, style }) => {
  return (
    <div style={style}>
      <EditorJs
        data={data}
        tools={tools}
        instanceRef={(ref) => setRef(ref)}
        placeholder="Пишите! Например:\n Килограмм салата рыбного"
      />
    </div>
  );
};
