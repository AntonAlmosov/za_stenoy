import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { v4 } from "uuid";
import { isWebUri } from "valid-url";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import ImagePicker from "../../molecules/misc/ImagePickerPage.jsx";
import DefaultButton from "../../molecules/buttons/DefaultButton.jsx";
import {
  AuthorPicker,
  Author,
} from "../../molecules/misc/AuthorsInterface.jsx";
import { DeleteButton } from "../../molecules/buttons/TableButtons.jsx";

export default ({
 initialRecords
}) => {
  const [saveText, setSaveText] = React.useState("Сохранить");
  const [records, setRecords] = React.useState(initialRecords?.sort((a, b) => a.order - b.order) || []);

  React.useEffect(() => {
    records.forEach((record, i) => {
      record.order = i + 1;
    });
    console.log(records);
  }, [records]);

  function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();

    formData.append("records", JSON.stringify(records));

    axios
      .post('/admin/0/handle_reorder', formData)
      .catch(() => {
        setSaveText("Ошибка");
        setInterval(() => setSaveText("Сохранить"), 1000);
      })
      .then(() => {
        setSaveText("Готово!");
        setInterval(() => setSaveText("Сохранить"), 1000);
      });
  }

  function handleReorder(record, action) {
    const index = records.findIndex((el) => el.id === record.id && el.type === record.type);
    const recordsCopy = Array.from(records);
    recordsCopy.splice(index, 1)
    // console.log(recordsCopy)
    switch(action){
      case 'up':
        if(index <= 0){
          return;
        }
        recordsCopy.splice(index - 1, 0, record)
        break;
      case 'down': 
        recordsCopy.splice(index + 1, 0, record)
        break;
    }
    // console.log(recordsCopy);
    setRecords(recordsCopy);
  }

  return (
    <>
      <HeaderAdminOrganism
        backShown={'/admin'}
        closeShown={'/'}
        onDoneClick={handleSubmit}
        doneActive
        doneText={saveText}
      />
      <Table records={records} handleReorder={handleReorder} />
    </>
  );
};

function Table({ records, handleReorder }) {
  return (
    <div className="table-wrapper" style={{ marginTop: "12em" }}>
      <TableHeader />
      {records.map((record) => {
        return (
          <TableRow
            key={record.order}
            record={record}
            actions={[{
              name: "Вверх >",
              uri: () => handleReorder(record, 'up'),
            }, {
              name: "Вниз >",
              uri: () => handleReorder(record, 'down'),
            }]}
          />
        );
      })}
    </div>
  );
}

function TableHeader() {
  return (
    <div className="table-header-wrapper">
      <h2 style={{ width: "22em" }}>Название страницы</h2>
      <h2 style={{ width: "22em" }}>Действия</h2>
    </div>
  );
}

function TableRow({ record, actions }) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "22em", lineHeight: 1.3 }}>
        {record.title}
      </div>
      <div className="column" style={{ width: "22em" }}>
        {actions.map(action =>
          <span
              onClick={action.uri}
              style={{ margin: "0 1em", cursor: 'pointer' }}
            >{action.name}</span>)}
      </div>
    </div>
  );
}