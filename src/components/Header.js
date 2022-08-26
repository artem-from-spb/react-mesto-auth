import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__block">
        <img src={logo} className="header__logo" alt="Логотип Место" />
        <div className="header__login-block">
          <p className="header__email">email@mail.com</p>
          <Link className="header__enter-link" to="/">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
