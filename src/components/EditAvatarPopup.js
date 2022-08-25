import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      formName="avatar"
      btnText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input_avatar"
        placeholder="Ссылка на картинку"
        required
        id="avatar-input"
        name="avatar"
        ref={avatarRef}
      />
      <span className="popup__error avatar-input-error" id="avatar-input-error">
        dddddddddd
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
