import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form
        className="login__form"
        noValidate
        //     name={formName}
        //     onSubmit={onSubmit}
      >
        <input
          type="email"
          className="login__input"
          required
          minLength="5"
          maxLength="{200}"
          placeholder="Email"
          //        onChange={handleNameChange}
          //       value={email || ''}
        />
        <input
          type="password"
          className="login__input"
          required
          minLength="{2}"
          maxLength="{200}"
          placeholder="Пароль"
          //         onChange={handleDescriptionChange}
          //        value={password || ""}
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
