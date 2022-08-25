import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateCards({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      formName="add"
      btnText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        placeholder="Название"
        required
        minLength="{2}"
        maxLength="{30}"
        id="place-input"
        name="name"
        value={name}
        onChange={handleNameChange}
      />
      <span
        className="popup__error place-input-error"
        id="place-input-error"
      ></span>
      <input
        type="url"
        className="popup__input popup__input_type_about"
        placeholder="Ссылка на картинку"
        required
        id="link-input"
        name="link"
        value={link}
        onChange={handleLinkChange}
      />
      <span
        className="popup__error link-input-error"
        id="link-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
