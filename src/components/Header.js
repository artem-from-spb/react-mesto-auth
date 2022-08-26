import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__block">
        <img src={logo} className="header__logo" alt="Логотип Место" />
        <a className="header__enter-link" href="">
          Войти
        </a>
      </div>
    </header>
  );
}

export default Header;
