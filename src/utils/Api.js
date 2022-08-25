class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  ///0. repeat part
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject("Что-то пошло не так :(");
  }

  ///1. Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  ///2. Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //3. Редактирование профиля
  editProfileData(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  //4. Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  // 7. Удаление карточки
  removeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  ///8. Постановка и снятие лайка
  // setLike(cardId) {
  //   return fetch(`${this._url}cards/${cardId}/likes`, {
  //     method: "PUT",
  //     headers: this._headers,
  //   }).then(this._checkResponse);
  // }

  // removeLike(cardId) {
  //   return fetch(`${this._url}cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then(this._checkResponse);
  // }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  }

  ///9. Обновление аватара пользователя
  avatarPictureNew(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "d9187298-bc53-4629-9e17-1bb6bde52016",
    "content-type": "application/json",
  },
});
