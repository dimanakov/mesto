class Api {
  constructor({baseUrl, token}) {
    this._address = baseUrl;
    this._authorization = token;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json();
  }

  async getUserInfo() {
    const res = await fetch(`${this._address}/users/me`, {
      headers: { authorization: this._authorization }
    });
    return this._getResponseData(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._address}/cards`, {
      headers: { authorization: this._authorization }
    });
    return this._getResponseData(res);
  }

  async setUserInfo(data) {
    const res = await fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
    return this._getResponseData(res);
  }

  async setUserAvatar(link) {
    const res = await fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link.avatar
      })
    });
    return this._getResponseData(res);
  }

  async addCard(data) {
    const res = await fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
    return this._getResponseData(res);
  }

  async addLike(data) {
    const res = await fetch(`${this._address}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    });
    return this._getResponseData(res);
  }

  async removeLike(data) {
    const res = await fetch(`${this._address}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    });
    return this._getResponseData(res);
  }

  async removeCard(data) {
    const res = await fetch(`${this._address}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    });
    return this._getResponseData(res);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  token: '5fe7123c-7279-49b2-81ff-c2ec486e8681'
});

export { api };