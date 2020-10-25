import React from "react";
import { v4 } from "uuid";

import HeaderTemplate from "../organisms/HeaderOrganism";
import { isWebUri } from "valid-url";
import { addMiddlename } from "../misc/addMiddlename";

export default ({ issue, pages, authors, inversed, editPath }) => {
  const [page, setPage] = React.useState(0);
  const [opened, setOpened] = React.useState(false);
  const [isInversed, setIsInversed] = React.useState(inversed);

  React.useEffect(() => {
    if (opened && window.innerWidth < 511) {
      setIsInversed(false);
    }
    if (!opened && window.innerWidth < 511) {
      setIsInversed(true);
    }
  }, [opened]);

  const handlePageSwitch = nextPage => {
    if (nextPage && page !== pages.length - 1) {
      setPage(page + 1);
    }
    if (!nextPage && page !== 0) {
      setPage(page - 1);
    }
  };

  React.useEffect(() => {
    if (inversed) document.body.classList.add("bg-black");
    document.title = issue.title + " — Культурный проект «ФЛАГИ»";
  }, []);

  return (
    <>
      <HeaderTemplate inverse={isInversed} logo editPath={editPath} />
      <div className="offline-issue-wrapper">
        <div className={"issue-page" + (opened ? " moved" : "")}>
          {pages.map((curPage, i) => {
            return (
              <div className="issue-image" key={i}>
                {i == page && <img src={curPage} />}
              </div>
            );
          })}
          <div className="issue-page-switches-wrapper">
            <div
              onClick={() => handlePageSwitch(false)}
              className="page-switch left"
            ></div>
            <div
              onClick={() => handlePageSwitch(true)}
              className="page-switch right"
            ></div>
          </div>
        </div>
        {opened && (
          <div className="description-wrapper-issue">
            <div className="description-inner">
              <h1>{issue.title}</h1>
              <span>{issue.publish_date}</span>
              <div className="authors-block">
                <div>Авторы:</div>
                {authors.map(author => {
                  return (
                    <span key={v4()}>
                      <a href={author.url} target="_blank">
                        {addMiddlename(author)}
                      </a>
                      <br />
                    </span>
                  );
                })}
              </div>
              <pre>
                <p>{issue.description}</p>
              </pre>
            </div>
            <div className="description-menu">
              <a href={issue.purchase_link} target="_blank">
                {isWebUri(issue.purchase_link) ? "Купить" : ""}
              </a>
              <a onClick={() => setOpened(false)}>Закрыть</a>
            </div>
          </div>
        )}
      </div>
      {!opened && (
        <div className="bottom-menu">
          <a href={issue.purchase_link} target="_blank">
            {isWebUri(issue.purchase_link) ? "Купить" : ""}
          </a>
          <a onClick={() => setOpened(true)}>Подробнее</a>
        </div>
      )}
    </>
  );
};
