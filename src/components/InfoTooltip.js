
import Close_Icon from "../images/Close_Icon.svg";

function InfoTooltip(props) {
  return (
    <div className={`infoTooltip ${
      props.isOpen ? "infoTooltip_opened" : ""
    }`}>
      <div
        className='infoTooltip__popup'
      >
        <img src={props.image} className="infoTooltip__image" alt="Success" />
        <p className="infoTooltip__message">{props.message}</p>
        <button
          type="button"
          className="popup__button-close"
          onClick={props.onClose}
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

export default InfoTooltip;
