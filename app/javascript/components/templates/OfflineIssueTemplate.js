import React from "react";
import { v4 } from "uuid";

import HeaderTemplate from "../organisms/HeaderOrganism";

export default ({ issue, pages, authors, inversed }) => {
  const [page, setPage] = React.useState(0);
  const [opened, setOpened] = React.useState(false);

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
    document.title = issue.title;
  }, []);

  return (
    <>
      <HeaderTemplate inverse={inversed} logo />
      <div className="offline-issue-wrapper">
        <div className={"issue-page" + (opened ? " moved" : "")}>
          <img src={pages[page]} />
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
          <div className="description-wrapper">
            <div className="description-inner">
              <h1>{issue.title}</h1>
              <span>{issue.publish_date}</span>
              <div className="authors-block">
                <div>Авторы:</div>
                {authors.map(author => {
                  return (
                    <span key={v4()}>
                      <a href={author.url} target="_blank">
                        {author.name}
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
              <a href={issue.purchase_link}>Купить</a>
              <a onClick={() => setOpened(false)}>Закрыть</a>
            </div>
          </div>
        )}
      </div>
      {!opened && (
        <div className="bottom-menu">
          <a href={issue.purchase_link} target="_blank">
            Купить
          </a>
          <a onClick={() => setOpened(true)}>Подробнее</a>
        </div>
      )}
    </>
  );
};
