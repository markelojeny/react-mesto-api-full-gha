class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
    
  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    });
  };
    
  addCard(data) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        link: `${data.link}`
      }),
    });
  }

  editUser(data) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`
      }),
    });
  }
    
  addLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return (
      isLiked ? (
        this.deleteLike(cardId)
      ) : (
        this.addLike(cardId)
      )
    )
  }
    
  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
    
  changeAvatar({ avatar }) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    });
  }

  _handleResponse (res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка в ${res.status}`);
  }

  _request(url, config) {
    const updatedOptions = {
      ...config,
      credentials: "include",
    };

    return fetch(url, updatedOptions)
    .then((res) => this._handleResponse(res));
  }

} 


const api = new Api ({
  url: 'https://api.mesto.marjen.nomoredo.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;