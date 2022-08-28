import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import React from "react";

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__block">
        <img src={logo} className="header__logo" alt="Логотип Место" />
        <div className="header__login-block">
          {props.loggedIn ? <p className="header__email">{props.email}</p> : ""}

          {props.loggedIn ? (
            <Link
              className="header__enter-link"
              onClick={props.onSignOut}
              to="/sign-up"
            >
              Выйти
            </Link>
          ) : (
            <Link
              className="header__enter-link"
              to={location.pathname === "/sign-up" ? "/sign-in" : "/sign-up"}
            >
              {location.pathname === "/sign-up" ? "Вход" : "Регистрация"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
