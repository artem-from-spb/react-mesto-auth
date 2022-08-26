import ok from "../images/Union.png";
import error from "../images/Unionred.png";
import Close_Icon from "../images/Close_Icon.svg";

function InfoTooltip() {
  return (
    <div className="infoTooltip">
      <div className="infoTooltip__popup">
        <img src={ok} className="infoTooltip__image" alt="Success" />
        <p className="infoTooltip__message">sssssssssssssssssssss</p>
        <button
          type="button"
          className="popup__button-close" /* onClick={onClose} */
        >
          <img
            src={Close_Icon}
            alt="Закрыть окно"
            className="popup__close-img"
          />
        </button>
      </div>
    </div>
  );
}

//{loggedIn ? ok : error}
//{loggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}

export default InfoTooltip;
