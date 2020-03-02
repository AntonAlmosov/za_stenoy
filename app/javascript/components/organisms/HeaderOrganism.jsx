import React from "react";
import logoImage from "images/logo-large.svg";
import flgasImage from "images/flags.svg";

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
        {logo && !menu.status && !search.status && (
          <a href="/" className="logo">
            <img src={logoImage} />
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
      <div className="menu-flags">
        <img src={flgasImage} />
        <div className="menu-info-wrapper">
          <div className="menu-links-wrapper">
            <a href="/">Новости</a>
            <a href="/">Авторские проекты</a>
            <a href="/">Журнал «За стеной»</a>
            <a href="/">Журнал «Флаги»</a>
            <a href="/">Магазин</a>
            <a href="/">О нас</a>
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
