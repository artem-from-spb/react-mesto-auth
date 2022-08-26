import { Link } from "react-router-dom";
import { useState } from "react";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onRegister({ email, password });
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form
        className="login__form"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          className="login__input"
          required
          minLength="5"
          maxLength="{200}"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email || ""}
        />
        <input
          type="password"
          className="login__input"
          required
          minLength="{2}"
          maxLength="{200}"
          placeholder="Пароль"
          onChange={handlePasswordChange}
          value={password || ""}
        />
        <button
          className="login__submit-button"
          type="submit"
          aria-label="Зарегистрироваться"
        >
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="login__enter-link">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;
