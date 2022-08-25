import edit from "../images/edit.svg";
import plus from "../images/plus.svg";
import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      {/* Кусто */}
      <section className="profile">
        <div className="profile__avatar-overlay">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
          <button
            className="profile__avatar-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div>
          <div className="profile__title-block">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            >
              <img
                src={edit}
                alt="Редактировать профиль"
                className="profile__edit-picture"
              />
            </button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        >
          <img src={plus} alt="Добавить" className="profile__plus" />
        </button>
      </section>

      {/* Карточки */}
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
