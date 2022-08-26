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
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";

function App() {
  //////////////////////////////////////////////////////////////////////////////////////////
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      Auth(jwt);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) history.push("/main");
  }, [loggedIn]);

  function onRegister({ password, email }) {
    return Auth.register(password, email).then((res) => {
      if (!res || res.statusCode === 400)
        throw new Error("Что-то пошло не так");
      return res;
    });
  }

  function onLogin({ email, password }) {
    return Auth.authorize(email, password).then((res) => {
      if (!res) throw new Error("Неправильные имя пользователя или пароль");
      if (res.jwt) {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.jwt);
      }
    });
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => alert(err));
  }, []);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => alert(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
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

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header />

        <InfoTooltip />

        <Switch>
          <Route path="/sign-up">
            <Register />
          </Route>

          <Route path="/sign-in">
            <Login />
          </Route>

          <ProtectedRoute
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            path="/"
            component={Main}
            loggedIn={loggedIn}
          />
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
