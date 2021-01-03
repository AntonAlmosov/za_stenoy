import React from "react";
import logoImage from "images/logo-large.svg";
import logoInversed from "images/logo-inverse.svg";
import flgasImage from "images/flags.svg";
import axios from "axios";
import { addMiddlename } from "../misc/addMiddlename";

export default function HeaderTemplate({ logo, inverse, editPath }) {
  const [searchOpened, setSearchOpened] = React.useState(false);
  const [menuOpened, setMenuOpened] = React.useState(false);
  const [pages, setPages] = React.useState([]);
  const [data, setData] = React.useState({
    pieces: [],
    projects: [],
    authors: [],
  });

  React.useEffect(() => {
    axios.get("/menu").then((data) => setPages(data.data));

    axios.get("/menu/get_data").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <HeaderRow
        logo={logo}
        editPath={editPath}
        inverse={searchOpened || menuOpened ? true : inverse}
        search={{ status: searchOpened, setSearchOpened }}
        menu={{ status: menuOpened, setMenuOpened }}
      />
      {searchOpened && <SearchOrganism data={data} />}
      {menuOpened && <MenuOrganism pages={pages} />}
    </>
  );
}

function HeaderRow({ logo, inverse, search, menu, editPath }) {
  return (
    <div className={"header-wrapper " + (inverse && "inverse")}>
      <div className="header">
        <a
          className={"first"}
          onClick={() => {
            menu.setMenuOpened(false);
            search.setSearchOpened(!search.status);
          }}
        >
          {search.status ? "Закрыть" : "Поиск"}
        </a>
        {logo && !menu.status && !search.status && !editPath && (
          <a href="/" className="logo second">
            <img src={inverse ? logoInversed : logoImage} />
          </a>
        )}
        {editPath && !menu.status && !search.status && (
          <a href={editPath} className="close second">
            Admin
          </a>
        )}
        <a
          onClick={() => {
            search.setSearchOpened(false);
            menu.setMenuOpened(!menu.status);
          }}
          className={"third"}
        >
          {menu.status ? "Закрыть" : "Меню"}
        </a>
      </div>
    </div>
  );
}

const AdditionalSearch = ({ data, title }) => {
  return (
    <div className="additional-search">
      <div className="additional-search-input">
        <h4>{title}</h4>
        <div className="divider"></div>
      </div>
      <div className="additional-results">
        {data.map((el) => {
          return (
            <div key={el.url}>
              <a href={el.url}>{el.title}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AdditionalSearchMobile = ({ data, title }) => {
  const isLong = data.length > 7;
  const [opened, setOpened] = React.useState(false);

  return (
    <div className="additional-search">
      <div className="additional-search-input">
        <h4>{title}</h4>
        <div className="divider"></div>
      </div>
      <div className="additional-results">
        {!isLong &&
          data.map((el) => {
            return (
              <a href={el.url} key={el.url}>
                {el.title}
              </a>
            );
          })}
        {isLong && (
          <>
            {data.slice(0, 6).map((el) => {
              return (
                <a
                  href={el.url}
                  key={el.url}
                  className={opened ? "" : "isopened"}
                >
                  {el.title}
                </a>
              );
            })}
            {!opened && (
              <span onClick={() => setOpened(true)}>Показать еще...</span>
            )}
            {opened &&
              data.slice(6, data.length - 1).map((el) => {
                return (
                  <a href={el.url} key={el.url}>
                    {el.title}
                  </a>
                );
              })}
            {opened && <span onClick={() => setOpened(false)}>Скрыть</span>}
          </>
        )}
      </div>
    </div>
  );
};

const sortAuthors = (authors) => {
  const reverseName = (v) => {
    const splittedName = v.split(" ");
    return splittedName[1] + " " + splittedName[0];
  };
  return authors
    .map((v) => {
      return { ...v, title: reverseName(v.title) };
    })
    .sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    })
    .map((v) => {
      return { ...v, title: reverseName(v.title) };
    });
};

function SearchOrganism({ data }) {
  const [authors, setAuthors] = React.useState(sortAuthors(data.authors) || []);
  const [pieces, setPieces] = React.useState(data.pieces || []);
  const [projects, setProjects] = React.useState(data.projects || []);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setAuthors(
      sortAuthors(
        data.authors.filter((el) => {
          return RegExp(search, "i").test(el.title);
        })
      )
    );
    setPieces(
      data.pieces.filter((el) => {
        return RegExp(search, "i").test(el.title);
      })
    );
    setProjects(
      data.projects.filter((el) => {
        return RegExp(search, "i").test(el.title);
      })
    );
  }, [search]);

  const mobile = window.innerWidth <= 512;

  return (
    <div className="header-menu-wrapper">
      <div className="search-wrapper">
        <div className="main-search-input">
          <input
            type="text"
            autoComplete="false"
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              "Введите имя автора, название проекта или произведения"
            }
          />
          <div className="divider"></div>
        </div>
        <div className="additional-search-wrapper">
          {!mobile && (
            <>
              <AdditionalSearch
                data={authors.map((author) => {
                  return {
                    ...author,
                    title: addMiddlename(author, true),
                  };
                })}
                title={"Авторы"}
              />
              <AdditionalSearch data={projects} title={"Проекты"} />
              <AdditionalSearch data={pieces} title={"Произведения"} />
            </>
          )}
          {mobile && (
            <>
              <AdditionalSearchMobile data={authors} title={"Авторы"} />
              <AdditionalSearchMobile data={projects} title={"Проекты"} />
              <AdditionalSearchMobile data={pieces} title={"Произведения"} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MenuOrganism({ pages }) {
  return (
    <div className="header-menu-wrapper">
      <div className="menu-flags">
        <a href="/">
          <img src={flgasImage} />
        </a>
        <div className="menu-info-wrapper">
          <div className="menu-links-wrapper">
            {!pages[0].hidden && (
              <a href={"/page/" + pages[0].slug} key={pages[0].slug}>
                {pages[0].page_type == "magasine" ||
                pages[0].page_type == "magasine_inversed"
                  ? "Журнал " + pages[0].title
                  : pages[0].title}
              </a>
            )}
            {!pages[1].hidden && (
              <a href={"/page/" + pages[1].slug} key={pages[1].slug}>
                {pages[1].page_type == "magasine" ||
                pages[1].page_type == "magasine_inversed"
                  ? "Журнал " + pages[1].title
                  : pages[1].title}
              </a>
            )}
            {!pages[2].hidden && (
              <a href={"/page/" + pages[2].slug} key={pages[2].slug}>
                {pages[2].page_type == "magasine" ||
                pages[2].page_type == "magasine_inversed"
                  ? "Журнал " + pages[2].title
                  : pages[2].title}
              </a>
            )}
            {!pages[5].hidden && (
              <a href={"/page/" + pages[5].slug} key={pages[5].slug}>
                {pages[5].page_type == "magasine" ||
                pages[5].page_type == "magasine_inversed"
                  ? "Журнал " + pages[5].title
                  : pages[5].title}
              </a>
            )}
            {!pages[3].hidden && (
              <a href={"/page/" + pages[3].slug} key={pages[3].slug}>
                {pages[3].page_type == "magasine" ||
                pages[3].page_type == "magasine_inversed"
                  ? "Журнал " + pages[3].title
                  : pages[3].title}
              </a>
            )}
            {!pages[4].hidden && (
              <a href={"/page/" + pages[4].slug} key={pages[4].slug}>
                {pages[4].page_type == "magasine" ||
                pages[4].page_type == "magasine_inversed"
                  ? "Журнал " + pages[4].title
                  : pages[4].title}
              </a>
            )}
          </div>
          <div className="menu-adress">
            <a href="tel: 8-(952)-517-37-91">8(952) 517 37 91</a>
            <a href="mailto: flagspublishing@gmail.com">
              flagspublishing@gmail.com
            </a>
            <a href="https://vk.com/projectflagi" target="_blank">
              vk.com/projectflagi
            </a>
            <a href="https://fb.com/projectflagi" target="_blank">
              fb.com/projectflagi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
