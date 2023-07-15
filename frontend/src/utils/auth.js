class Auth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  register (email, password) {
    console.log(password, email);
    return this._request(`${this._url}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ password, email }),
    })
  };

  authorize (email, password) {
    console.log(email, password);
    return this._request(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
  };

  checkToken() {
    return this._request(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
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

const auth = new Auth({
  url: 'https://api.mesto.marjen.nomoredo.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default auth;