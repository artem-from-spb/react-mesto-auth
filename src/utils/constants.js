// Попап 1 (Кусто данные)
export const profilePopup = document.querySelector(".popup_profile");
export const profileEditButton = document.querySelector(".profile__edit");
export const profilePopupCloseButton =
  document.querySelector(".popup__close-img");

export const profileForm = profilePopup.querySelector(".popup__form_edit");
export const nameInput = profilePopup.querySelector(".popup__input_type_name");
export const jobInput = profilePopup.querySelector(".popup__input_type_about");

export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

// Попап 2 (Место добавить)
export const placeAddPopup = document.querySelector(".popup_add");
export const placeAddButton = document.querySelector(".profile__add-button");
export const placeAddPopupCloseButton =
  placeAddPopup.querySelector(".popup__close-img");
export const placeAddPopupSaveButton = placeAddPopup.querySelector(
  ".popup__button-save"
);

export const placeInput = placeAddPopup.querySelector(
  ".popup__input_type_name"
);
export const pictureInput = placeAddPopup.querySelector(
  ".popup__input_type_about"
);
export const placeAddForm = placeAddPopup.querySelector(".popup__form_add");

export const cardTemplate = document.querySelector("#card-template").content;
export const elements = document.querySelector(".elements");

// Попап 3 (большая картинка)
export const bigPicturePopup = document.querySelector(".popup_big-picture");
export const bigPicturePopupCloseButton =
  bigPicturePopup.querySelector(".popup__close-img");

export const pictureXl = bigPicturePopup.querySelector(".popup__picture-xl");
export const pictureCaption = bigPicturePopup.querySelector(
  ".popup__pic-caption"
);

///Попап 4 (Кусто картинка)
export const avatarPopup = document.querySelector(".popup_avatar");
export const avatarChangeForm = avatarPopup.querySelector(
  ".popup__form_avatar"
);
export const avatarEditButton = document.querySelector(
  ".profile__avatar-button"
);

///config
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};
