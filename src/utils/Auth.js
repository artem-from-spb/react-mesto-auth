export const BASE_URL = " https://auth.nomoreparties.co";

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      try {
        if (response.status === 200) {
          return response.json();
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export function authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((response => response.json()))
    .then((data) => {
      if (data.jwt){
        localStorage.setItem('jwt', data.jwt);
        return data;
      }
    })
    .catch(err => console.log(err))
  }; 

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
