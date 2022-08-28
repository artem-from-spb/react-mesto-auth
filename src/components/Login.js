import { useState } from "react";

function Login(props) {
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

    props.onLogin({ email, password });
    setEmail("");
    setPassword("");
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
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
          aria-label="Войти"
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
