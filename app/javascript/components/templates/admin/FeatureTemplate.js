import React from "react";
import axios from "axios";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import AdminStarter from "../../organisms/Starters/AdminStarter.jsx";
import {
  ToggleButton,
  DeleteButton,
} from "../../molecules/buttons/TableButtons.jsx";

export default function FeatureTemplate({ initialFeature, content }) {
  const [feature, setFeature] = React.useState(
    initialFeature || { feature_type: "", origin_id: null }
  );

  const handle_feature = f => {
    axios.post("/feature", f).then(res => {
      setFeature({
        feature_type: res.data.feature_type,
        origin_id: res.data.origin_id,
      });
    });
  };

  return (
    <>
      <HeaderAdminOrganism closeShown={"/"} backShown="js" />
      <AdminStarter title={"Фичер главной"} />
      <IssueTable
        feature={feature}
        handleFeature={handle_feature}
        initialContent={content}
      />
    </>
  );
}

function IssueTable({ feature, handleFeature, initialContent }) {
  const [content, setContent] = React.useState(initialContent);

  const handle_search = query => {
    setContent(
      initialContent.filter(issue => {
        return RegExp(query, "i").test(issue.title);
      })
    );
  };

  return (
    <div className="table-wrapper" style={{ marginTop: "3em" }}>
      <IssueTableHeader handleSearch={handle_search} />
      {content.map(issue => {
        return (
          <IssueTableRow
            key={issue.origin_id + issue.feature_type}
            title={issue.title}
            actions={[
              {
                name: ["Убрать фичер >", "Сделать фичером >"],
                uri: () => handleFeature(issue),
                state:
                  issue.origin_id == feature.origin_id &&
                  issue.feature_type == feature.feature_type,
              },
            ]}
          />
        );
      })}
    </div>
  );
}

function IssueTableHeader({ handleSearch }) {
  return (
    <div className="table-header-wrapper">
      <HeaderInput
        width="22em"
        onChange={handleSearch}
        placeholder="Название выпуска"
      />
      <h2 style={{ width: "30em" }}>Быстрые действия</h2>
    </div>
  );
}

function IssueTableRow(props) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "22em" }}>
        {props.title}
      </div>
      <div className="column" style={{ width: "30em" }}>
        {props.actions.map(action => {
          if (action.name !== "Удалить")
            return (
              <ToggleButton
                key={action.name[0]}
                onClick={action.uri}
                defaultState={action.state}
                activeText={action.name[0]}
                disabledText={action.name[1]}
              />
            );
          else {
            return <DeleteButton key={action.name} uri={action.uri} />;
          }
        })}
      </div>
    </div>
  );
}

function HeaderInput({ width, onChange, placeholder }) {
  return (
    <div style={{ width: width }}>
      <input
        placeholder={placeholder}
        autoComplete="false"
        onChange={e => onChange(e.target.value)}
        style={{
          fontSize: "1em",
          lineHeight: 1,
          fontWeight: 500,
          outline: 0,
          border: 0,
          width: "100%",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "0.09375em",
          backgroundColor: "#000",
          marginTop: "0.5em",
        }}
      ></div>
    </div>
  );
}
