import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { v4 } from "uuid";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import ImagePicker from "../../molecules/misc/ImagePicker.jsx";
import DefaultButton from "../../molecules/buttons/DefaultButton.jsx";
import {
  AuthorPicker,
  Author,
} from "../../molecules/misc/AuthorsInterface.jsx";
import { DeleteButton } from "../../molecules/buttons/TableButtons.jsx";

export default ({
  issue,
  coverUrl,
  postPath,
  origin,
  initialAuthors,
  initialPages,
  closePath,
  backPath,
}) => {
  const [saveText, setSaveText] = React.useState("Сохранить");
  const [title, setTitle] = React.useState(issue.title);
  const [cover, setCover] = React.useState(coverUrl);
  const [published, setPublished] = React.useState(issue.published);
  const [featured, setFeatured] = React.useState(issue.featured);
  const [description, setDescription] = React.useState(issue.description || "");
  const [publishDate, setPublishDate] = React.useState(issue.publish_date);
  const [purchaseLink, setPurchaseLink] = React.useState(issue.purchase_link);
  const [authors, setAuthors] = React.useState(
    initialAuthors.map(a => JSON.parse(a))
  );
  const [pages, setPages] = React.useState(initialPages);

  function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();
    const coverData = document.querySelector(".cover_image_input");
    if (cover !== coverUrl) formData.append("cover", coverData.files[0]);

    let pageCollection = pages.map(page => {
      const existing = initialPages.some(p => p.id == page.id);

      if (existing) {
        if (!page.file)
          return {
            status: "unchanged",
            id: page.id,
            page_number: page.page_number,
            page: page.file,
          };
        else
          return {
            status: "changed",
            id: page.id,
            page_number: page.page_number,
            page: page.file,
          };
      } else {
        if (page.file) {
          return {
            status: "new",
            page_number: page.page_number,
            page: page.file,
          };
        }
      }
    });

    formData.append("title", title);
    formData.append("published", published);
    formData.append("featured", featured);
    formData.append("description", description);
    formData.append("publish_date", publishDate);
    formData.append("purchase_link", purchaseLink);
    formData.append("authors", JSON.stringify(authors));

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
          pageCollection.forEach(page => {
            const data = new FormData();
            data.append("status", page.status);
            data.append("page_number", page.page_number);
            data.append("id", page.id);
            data.append("page", page.page);
            data.append("issue_id", res.data.id);

            axios.post("/offline_issue/handle_pages", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          });
          return res;
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
        .then(res => {
          pageCollection.forEach(page => {
            const data = new FormData();
            data.append("status", page.status);
            data.append("page_number", page.page_number);
            data.append("id", page.id);
            data.append("page", page.page);
            data.append("issue_id", res.data.id);

            axios.post("/offline_issue/handle_pages", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          });
          return res;
        })
        .then(() => {
          setSaveText("Готово!");
          setInterval(() => setSaveText("Сохранить"), 1000);
        });
    }
  }

  function handlePage(adding, page) {
    if (!adding && origin == "edit" && initialPages.some(p => p.id == page.id))
      axios.post("/offline_issue/delete_page", { id: page.id });
    const res = adding
      ? [...pages, page]
      : pages
          .filter(p => p.id != page.id)
          .map((p, i) => {
            p.page_number = i + 1;
            return p;
          });

    setPages(res);
  }

  function updatePage(id, uri, file) {
    setPages(
      pages.map(page => {
        if (page.id == id) {
          page.page = uri;
          page.file = file;
        }
        return page;
      })
    );
  }

  return (
    <>
      <HeaderAdminOrganism
        backShown={backPath}
        closeShown={closePath}
        onDoneClick={handleSubmit}
        doneActive={
          title && cover && authors.length && description && publishDate
        }
        doneText={saveText}
      />
      <div
        style={{
          width: "70em",
          margin: "7em auto 10em",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TextareaAutosize
          className="starters-heading-small textarea"
          value={title || ""}
          onChange={e => setTitle(e.target.value)}
          maxRows={2}
          placeholder={"Название материала"}
        />
        <ImagePicker
          width="28em"
          height="16em"
          cover={cover}
          setCover={setCover}
          style={{ margin: "3em auto 0" }}
          imageStyle={{ backgroundColor: "#000" }}
        />
        <div
          style={{
            width: "58em",
            margin: "2em auto 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "22em" }}>
            <input
              placeholder={"Дата публикации"}
              value={publishDate || ""}
              onChange={e => setPublishDate(e.target.value)}
              className="input"
              style={{ fontSize: "1em", lineHeight: 1 }}
            />
            <input
              placeholder={"Ссылка на покупку"}
              value={purchaseLink || ""}
              onChange={e => setPurchaseLink(e.target.value)}
              className="input"
              style={{
                marginTop: "0.5em",
                fontSize: "1em",
                lineHeight: 1,
              }}
            />
            <div style={{ marginTop: "1.5em" }}>
              <div style={{ marginBottom: "0.5em" }}>
                {authors.map(author => {
                  return (
                    <Author
                      key={author.name + author.id}
                      currentAuthors={authors}
                      setAuthors={setAuthors}
                      author={author}
                    />
                  );
                })}
              </div>
              <AuthorPicker
                currentAuthors={authors}
                setCurrentAuthors={setAuthors}
              />
            </div>
          </div>
          <TextareaAutosize
            className="textarea"
            value={description || ""}
            onChange={e => setDescription(e.target.value)}
            placeholder={
              "Опиши выпуск. Что это за выпуск, чему он посвящен и так далее. На самом деле не важно что ты напишешь. Да и вообще ничего не важно."
            }
            style={{
              width: "34em",
              fontSize: "1em",
              lineHeight: 1.5,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "3em auto 0",
          }}
        >
          <DefaultButton
            text={["Убрать фичер >", "Сделать фичером >"]}
            state={featured}
            onClick={() => setFeatured(!featured)}
            style={{ margin: "0 1em" }}
          />
          <DefaultButton
            text={["Закрыть для просмотра >", "Открыть для просмотра >"]}
            state={published}
            onClick={() => setPublished(!published)}
            style={{ margin: "0 1em" }}
          />
        </div>
        <Table pages={pages} handlePage={handlePage} updatePage={updatePage} />
      </div>
    </>
  );
};

function Table({ pages, handlePage, updatePage }) {
  return (
    <div className="table-wrapper" style={{ marginTop: "4em" }}>
      <TableHeader />
      {pages.map(page => {
        return (
          <TableRow
            key={page.id}
            page={page}
            updatePage={updatePage}
            action={{
              name: "Удалить",
              uri: () => handlePage(false, page),
            }}
          />
        );
      })}
      <CreatePage handlePage={handlePage} page_number={pages.length + 1} />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="table-header-wrapper">
      <h2 style={{ width: "22em" }}>Разворот</h2>
      <h2 style={{ width: "16em" }}>Номер страницы</h2>
      <h2 style={{ width: "16em" }}>Действия</h2>
    </div>
  );
}

function TableRow({ page, updatePage, action }) {
  const handleUpdatePage = (uri, file) => {
    updatePage(page.id, uri, file);
  };

  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "22em", lineHeight: 1.3 }}>
        <ImagePicker
          width="16.125em"
          height="9em"
          cover={page.page}
          setCover={handleUpdatePage}
          id={page.id}
          className="page_input"
          imageStyle={{ backgroundColor: "#000" }}
        />
      </div>
      <div className="column" style={{ width: "16em", lineHeight: 1.3 }}>
        <span style={{ fontSize: "1.5" }}>{page.page_number}</span>
      </div>
      <div className="column" style={{ width: "14em" }}>
        <DeleteButton key={action.name} uri={action.uri} />
      </div>
    </div>
  );
}

function CreatePage({ handlePage, page_number }) {
  const id = v4();

  const handlePageCreation = (uri, file) => {
    const page = { id: id, page_number: page_number, page: uri, file: file };
    handlePage(true, page);
  };

  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "22em", lineHeight: 1.3 }}>
        <ImagePicker
          width="16.125em"
          height="9em"
          cover={""}
          setCover={handlePageCreation}
          id={"page_creation"}
        />
      </div>
      <div className="column" style={{ width: "16em", lineHeight: 1.3 }}>
        <span style={{ fontSize: "1.5" }}>{page_number}</span>
      </div>
      <div className="column" style={{ width: "14em" }}></div>
    </div>
  );
}
