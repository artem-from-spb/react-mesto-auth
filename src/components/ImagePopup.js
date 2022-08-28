import Close_Icon from "../images/Close_Icon.svg";

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_big-picture ${card.link && "popup_opened"}`}
    >
      <div className="popup__container popup__container_size_xl">
        <img className="popup__picture-xl" alt={card.name} src={card.link} />
        <p className="popup__pic-caption">{card.name}</p>
        <button type="button" className="popup__button-close" onClick={onClose}>
          <img
            src={Close_Icon}
            alt="Закрыть окно"
            className="popup__close-img"
          />
        </button>
      </div>
    </section>
  );
}

export default ImagePopup;
