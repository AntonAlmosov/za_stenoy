import React from "react";
import logoImage from "images/logo-large.svg";
import logoInversed from "images/logo-inverse.svg";
import flgasImage from "images/flags.svg";
import axios from "axios";

export default function HeaderTemplate({ logo, inverse }) {
  const [searchOpened, setSearchOpened] = React.useState(false);
  const [menuOpened, setMenuOpened] = React.useState(false);
  const [pages, setPages] = React.useState([]);
  const [data, setData] = React.useState({
    pieces: [],
    projects: [],
    authors: [],
  });

  React.useEffect(() => {
    axios.get("/menu").then(data => setPages(data.data));

    axios.get("/menu/get_data").then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <HeaderRow
        logo={logo}
        inverse={searchOpened || menuOpened ? true : inverse}
        search={{ status: searchOpened, setSearchOpened }}
        menu={{ status: menuOpened, setMenuOpened }}
      />
      {searchOpened && <SearchOrganism data={data} />}
      {menuOpened && <MenuOrganism pages={pages} />}
    </>
  );
}

function HeaderRow({ logo, inverse, search, menu }) {
  return (
    <div className={"header-wrapper " + (inverse && "inverse")}>
      <div className="header">
        <a
          onClick={() => {
            menu.setMenuOpened(false);
            search.setSearchOpened(!search.status);
          }}
        >
          {search.status ? "Закрыть" : "Поиск"}
        </a>
        {logo && !menu.status && !search.status && (
          <a href="/" className="logo">
            <img src={inverse ? logoInversed : logoImage} />
          </a>
        )}
        <a
          onClick={() => {
            search.setSearchOpened(false);
            menu.setMenuOpened(!menu.status);
          }}
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
        {data.map(el => {
          return (
            <a href={el.url} key={el.url}>
              {el.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

function SearchOrganism({ data }) {
  const [authors, setAuthors] = React.useState(data.authors || []);
  const [pieces, setPieces] = React.useState(data.pieces || []);
  const [projects, setProjects] = React.useState(data.projects || []);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setAuthors(
      data.authors.filter(el => {
        return RegExp(search, "i").test(el.title);
      })
    );
    setPieces(
      data.pieces.filter(el => {
        return RegExp(search, "i").test(el.title);
      })
    );
    setProjects(
      data.projects.filter(el => {
        return RegExp(search, "i").test(el.title);
      })
    );
  }, [search]);

  return (
    <div className="header-menu-wrapper">
      <div className="search-wrapper">
        <div className="main-search-input">
          <input
            type="text"
            autoComplete="false"
            onChange={e => setSearch(e.target.value)}
            placeholder={
              "Введите имя автора, название проекта или произведения"
            }
          />
          <div className="divider"></div>
        </div>
        <div className="additional-search-wrapper">
          <AdditionalSearch data={authors} title={"Авторы"} />
          <AdditionalSearch data={projects} title={"Проекты"} />
          <AdditionalSearch data={pieces} title={"Название произведения"} />
        </div>
      </div>
    </div>
  );
}

function MenuOrganism({ pages }) {
  return (
    <div className="header-menu-wrapper">
      <div className="menu-flags">
        <img src={flgasImage} />
        <div className="menu-info-wrapper">
          <div className="menu-links-wrapper">
            {pages.map(page => {
              return (
                <a
                  href={"/page/" + page.slug}
                  key={page.slug}
                  style={{ textTransform: "capitalize" }}
                >
                  {page.page_type == "magasine" ||
                  page.page_type == "magasine_inversed"
                    ? "Журнал " + page.title
                    : page.title}
                </a>
              );
            })}
          </div>
          <div className="menu-adress">
            <a href="tel: 8-(966)-046-89-30">8-(966)-046-89-30</a>
            <a href="email: flagi@gmail.com">flagi@gmail.com</a>
            <a href="https://vk.com/flagi">vk.com/flagi</a>
          </div>
        </div>
      </div>
    </div>
  );
}
