import React from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import axios from "axios";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import ImagePicker from "../../molecules/misc/ImagePicker";

export default function EditTemplate({ page, initialCover, postUrl, token }) {
  const [description, setDescription] = React.useState(
    JSON.parse(page.description || '{"blocks": []}')
  );
  const [cover, setCover] = React.useState(initialCover);
  const [coverData, setCoverData] = React.useState({});
  const [saveText, setSaveText] = React.useState("Сохранить");

  const handleImage = (url, img) => {
    setCover(url);
    setCoverData(img);
  };

  React.useEffect(() => {
    const editor = new EditorJS({
      holderId: "description",
      placeholder: "Описание странцы!",
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
      data: description,
      onChange: api => {
        api.saver.save().then(res => {
          setDescription(res);
        });
      },
    });
  }, []);

  const handleSubmit = () => {
    setSaveText("Обработка");

    const formData = new FormData();
    formData.append("description", JSON.stringify(description));
    formData.append("token", token);
    if (initialCover !== cover) formData.append("cover", coverData);
    axios
      .patch(postUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setInterval(() => setSaveText("Сохранить"), 1000);
      });
  };

  return (
    <>
      <HeaderAdminOrganism
        backShown
        doneActive={description}
        doneText={saveText}
        onDoneClick={() => handleSubmit()}
      />
      <div
        style={{
          width: "36em",
          margin: "10em auto 10em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {page.page_type == "about_us" && (
          <ImagePicker
            width="26em"
            height="14.75em"
            cover={cover}
            setCover={handleImage}
            style={{ margin: "0 auto 3.75em" }}
          />
        )}
        <div id="description"></div>
      </div>
    </>
  );
}
