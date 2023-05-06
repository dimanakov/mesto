class Api {
  constructor() {
    this._address = 'https://mesto.nomoreparties.co/v1/cohort-65';
    this._authorization = '5fe7123c-7279-49b2-81ff-c2ec486e8681';
  }

  async getUserInfo() {
    try {
      const res = await fetch(`${this._address}/users/me`, {
        headers: { authorization: this._authorization }
      });
      if (!res.ok) {
        return Promise.reject(`Error getUserInfo: ${res.status}`)
      }
      return await res.json()
    }
    catch (err) {
      console.error(`Error getUserInfo: ${err}`)
    }
  }

  async setUserInfo(data) {
    try {
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
      if (!res.ok) {
        return Promise.reject(`Error setUserInfo: ${res.status}`)
      }
      return await res.json()
    }
    catch (err) {
      console.error(`Error setUserInfo: ${err}`)
    }
  }

  async setUserAvatar(link) {
    try {
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
      if (!res.ok) {
        return Promise.reject(`Error setUserAvatar: ${res.status}`)
      }
      return await res.json()
    }
    catch (err) {
      console.error(`Error setUserAvatar: ${err}`)
    }
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this._address}/cards`, {
        headers: { authorization: this._authorization }
      });
      if (!res.ok) {
        return Promise.reject(`Error getInitialCards: ${res.status}`)
      }
      return await res.json()
    }
    catch (err) {
      console.error(`Error getInitialCards: ${err}`)
    }
  }

  async addCard(data) {
    try {
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
      if (!res.ok) {
        return Promise.reject(`Error addCards: ${res.status}`)
      }
      return await res.json()
    }
    catch (err) {
      console.error(`Error addCards: ${err}`)
    }
  }

  async addLike(data) {
    try {
      const res = await fetch(`${this._address}/cards/${data._id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        return Promise.reject(`Error addLike: ${res.status}`);
      }
      return await res.json()
    }
    catch (err) {
      console.error(`Error addLike: ${err}`)
    }
  }

  async removeLike(data) {
    try {
      const res = await fetch(`${this._address}/cards/${data._id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        return Promise.reject(`Error addLike: ${res.status}`);
      }
      return await res.json();
    }
    catch (err) {
      console.error(`Error addLike: ${err}`)
    }
  }

  async removeCard(data) {
    try {
      const res = await fetch(`${this._address}/cards/${data._id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        return Promise.reject(`Error removeCard: ${res.status}`);
      }
      return await res.json();
    }
    catch (err) {
      console.error(`Error removeCard: ${err}`)
    }
  }
}

const api = new Api();

export { api };