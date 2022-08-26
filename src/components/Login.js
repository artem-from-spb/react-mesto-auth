import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
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
          aria-label="Войти"
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
