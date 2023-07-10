class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResponse (res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка в ${res.status}`);
  }
    
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      return this._handleResponse(res)
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then((res) => {
      return this._handleResponse(res)
    });
  }
    
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        link: `${data.link}`
      })
    })
    .then((res) => {
      return this._handleResponse(res)
    });
  }

  editUser(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`
      })
    })
    .then((res) => {
      return this._handleResponse(res)
    });
  }
    
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => {
      return this._handleResponse(res)
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._handleResponse(res)
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
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._handleResponse(res)
    });
  }
    
  changeAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatar}`
      })
    })
    .then((res) => {
      return this._handleResponse(res)
    });
  }
} 

const api = new Api ({
  url: 'http://api.mesto.marjen.nomoredo.nomoredomains.work',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
})

export default api;