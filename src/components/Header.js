import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__block">
        <img src={logo} className="header__logo" alt="Логотип Место" />
        <div className="header__login-block">
          <p className="header__email">email@mail.com</p>
          <a className="header__enter-link" href="">
            Войти
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
