import bin from "../images/recycle-bin.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__recycle-bin ${
    isOwn ? "" : "card__recycle-bin_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__button-like ${
    isLiked ? "card__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <div className="card">
      <img
        src={bin}
        alt="Корзина"
        className={cardDeleteButtonClassName}
        id="bin"
        onClick={handleDeleteClick}
      />

      <img
        src={card.link}
        className="card__image"
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-section">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
