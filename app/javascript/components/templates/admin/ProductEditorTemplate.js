import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { isWebUri } from "valid-url";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import ImagePicker from "../../molecules/misc/ImagePicker.jsx";
import DefaultButton from "../../molecules/buttons/DefaultButton.jsx";

export default ({ product, coverUrl, postPath, origin }) => {
  const [saveText, setSaveText] = React.useState("Сохранить");
  const [name, setName] = React.useState(product.name);
  const [cover, setCover] = React.useState(coverUrl);
  const [price, setPrice] = React.useState(product.price);
  const [purchaseLink, setPurchaseLink] = React.useState(product.purchase_link);
  const [releaseDate, setReleaseDate] = React.useState(product.release_date);

  function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();
    const coverData = document.querySelector(".cover_image_input");
    if (cover !== coverUrl) formData.append("cover", coverData.files[0]);
    formData.append("name", name);
    formData.append("price", price);
    if (isWebUri(purchaseLink) == undefined) {
      formData.append("purchase_link", "http://" + purchaseLink);
    } else {
      formData.append("purchase_link", purchaseLink);
    }
    formData.append("release_date", releaseDate);

    if (origin === "new") {
      axios
        .post(postPath, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(() => {
          setSaveText("Ошибка");
          setInterval(() => setSaveText("Сохранить"), 1000);
        })
        .then(res => {
          setSaveText("Сохранить");
          window.location.replace(res.data.redirectPath);
        });
    } else if (origin === "edit") {
      axios
        .patch(postPath, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(() => {
          setSaveText("Ошибка");
          setInterval(() => setSaveText("Сохранить"), 1000);
        })
        .then(() => {
          setSaveText("Готово!");
          setInterval(() => setSaveText("Сохранить"), 1000);
        });
    }
  }

  return (
    <>
      <HeaderAdminOrganism
        backShown={"/admin/shop"}
        onDoneClick={handleSubmit}
        doneActive={name && purchaseLink && cover && releaseDate}
        doneText={saveText}
      />
      <div
        style={{
          width: "70em",
          margin: "7em auto 10em",
        }}
      >
        <TextareaAutosize
          className="starters-heading-small textarea"
          value={name || ""}
          onChange={e => setName(e.target.value)}
          placeholder={"Название товара"}
        />
        <ImagePicker
          width="28em"
          height="16em"
          cover={cover}
          setCover={setCover}
          style={{ margin: "3em auto 0" }}
          imageStyle={{ backgroundColor: "#000" }}
        />
        <input
          className="input"
          style={{
            margin: "1em auto 0",
            fontSize: "1.25em",
            lineHeight: 1.6,
            textAlign: "center",
          }}
          defaultValue={price || ""}
          onChange={e => setPrice(e.target.value)}
          placeholder={"Цена"}
        />
        <input
          className="input"
          style={{
            margin: "1em auto 0",
            fontSize: "1.25em",
            lineHeight: 1.6,
            textAlign: "center",
          }}
          defaultValue={purchaseLink || ""}
          onChange={e => setPurchaseLink(e.target.value)}
          placeholder={"Ссылка на товар"}
        />
        <input
          className="input"
          style={{
            margin: "1em auto 0",
            fontSize: "1.25em",
            lineHeight: 1.6,
            textAlign: "center",
          }}
          defaultValue={releaseDate || ""}
          onChange={e => setReleaseDate(e.target.value)}
          placeholder={"Дата выпуска"}
        />
      </div>
    </>
  );
};
