import React from "react";
import logo from "images/logo-large.svg";

export default function HeaderTemplate({ logo, inverse }) {
  const [searchOpened, setSearchOpened] = React.useState(false);
  const [menuOpened, setMenuOpened] = React.useState(false);
  return (
    <>
      <HeaderRow
        logo={logo}
        inverse={searchOpened || menuOpened ? true : inverse}
        search={{ status: searchOpened, setSearchOpened }}
        menu={{ status: menuOpened, setMenuOpened }}
      />
      {searchOpened && <SearchOrganism />}
      {menuOpened && <MenuOrganism />}
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
        {logo && (!menu.status || !search.status) && (
          <a href="/" className="logo">
            <img src={logo} />
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

function SearchOrganism() {
  const AdditionalSearch = () => {
    return (
      <div className="additional-search">
        <div className="additional-search-input">
          <input type="text" autoComplete="false" placeholder={"Авторы"} />
          <div className="divider"></div>
        </div>
        <div className="additional-results">
          <a href="/">{"Василий Молоствов"}</a>
          <a href="/">{"Василий Молоствов"}</a>
          <a href="/">{"Василий Молоствов"}</a>
          <a href="/">{"Василий Молоствов"}</a>
          <a href="/">{"Василий Молоствов"}</a>
          <a href="/">{"Василий Молоствов"}</a>
        </div>
      </div>
    );
  };

  return (
    <div className="header-menu-wrapper">
      <div className="search-wrapper">
        <div className="main-search-input">
          <input
            type="text"
            autoComplete="false"
            placeholder={
              "Введите имя автора, название проекта или произведения"
            }
          />
          <div className="divider"></div>
        </div>
        <div className="additional-search-wrapper">
          <AdditionalSearch />
          <AdditionalSearch />
          <AdditionalSearch />
        </div>
      </div>
    </div>
  );
}

function MenuOrganism() {
  return (
    <div className="header-menu-wrapper">
      <p style={{ color: "#fff" }}>penis</p>
    </div>
  );
}
