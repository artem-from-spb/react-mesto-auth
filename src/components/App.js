import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import bin from "../images/recycle-bin.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import Register from "./Register";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";

import ok from "../images/Union.png";
import error from "../images/Unionred.png";

function App() {
  //////////////////////////////////////////////////////////////////////////////////////////
  const history = useHistory();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState(ok);
  const [message, setMessage] = useState("");

  function checkToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      Auth.checkData(token)
        .then((res) => {
          if (res.data) {
            setUserEmail(res.data.email);
            //Авторизуем пользователя
            setLoggedIn(true);

            //Переадресация пользователя на основную страницу со всей функциональностью приложения
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setInfoTooltipOpen(false);
  }

  function handleUpdateUser(user) {
    api
      .editProfileData(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  function handleUpdateAvatar(src) {
    api
      .avatarPictureNew(src.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => alert(err));
  }

  function handleCardDelete(id) {
    api
      .removeCard(id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== id));
      })
      .catch((err) => alert(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  function handleRegister({ password, email }) {
    Auth.register(password, email)
      .then(() => {
        setInfoTooltipImage(ok);
        setMessage("Вы успешно зарегистрировались!");
        setInfoTooltipOpen(true);

        history.push("/sign-in");
      })
      .catch((err) => {
        setInfoTooltipImage(error);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipOpen(true);

        console.log(`Ошибка ${err}`);
      });
  }

  function handleLogin({ email, password }) {
    Auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          checkToken();

          //Переадресация пользователя на основную страницу со всей функциональностью приложения
          history.push("/");
        }
      })
      .catch((err) => {
        //Попап ошибки входа
        setInfoTooltipImage(error);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipOpen(true);

        console.log(`Ошибка ${err}`);
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  }




  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header
          userEmail={userEmail}
          onSignOut={handleLogOut}
          loggedIn={loggedIn}
        />

        <InfoTooltip
          isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          image={infoTooltipImage}
          message={message}
        />

        <Switch>
          <Route exact path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route exact path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <ProtectedRoute
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
          />

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        {/* Попап редактирования Кусто */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Попап добавления карточек */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* Подтвердить удаление */}
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          formName="null"
          btnText="Да"
          isOpen={false}
        ></PopupWithForm>

        {/* Обновить аватар */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
