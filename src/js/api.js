import HTMLElems from './htmlElems.js';

export default class Api {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.nickname = false;
    this.htmlElems = false;
    this.conteinerForMsg = false;
    this.conteinerForPlayers = false;
    this.ws = false;

    this.wsInit = this.wsInit.bind(this);
  }

  init(nickname, body) {
    this.htmlElems = new HTMLElems(nickname);
    this.conteinerForMsg = body.querySelector('.messeges__items');
    this.conteinerForPlayers = body.querySelector('.players_wrapper');

    this.wsInit();
  }

  wsInit() {
    this.ws = new WebSocket('wss://ws-backend-0o4w.onrender.com/messages/unread/ws');

    this.ws.addEventListener('open', (e) => {
      console.log(e);

      console.log('ws open');
    });

    this.ws.addEventListener('close', (e) => {
      console.log(e);
      console.log('ws close');
    });

    this.ws.addEventListener('error', (e) => {
      console.log(e);

      console.log('ws error');
    });

    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      const { chat } = data;
      const { players } = data;

      if (chat) {
        if (chat.length === 0) return;
        chat.forEach((item) => {
          this.conteinerForMsg.appendChild(this.htmlElems.htmlMessage(item));
        });
      }

      if (players) {
        if (players.length === 0) return;

        const users = document.querySelectorAll('.player');

        users.forEach((item) => item.remove());

        players.forEach((item) => {
          this.conteinerForPlayers.appendChild(this.htmlElems.htmlPlayer(item));
        });
      }
    });
  }

  sendWs(obj) {
    this.ws.send(JSON.stringify(obj));
  }

  unLoadUser(nickname) {
    this.ws.send(JSON.stringify({ type: 'unLoadPlayer', nick: nickname }));
  }

  async add(user) {
    const request = fetch(`${this.apiUrl}players/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });

    const result = await request;

    if (!result.ok) {
      return result;
    }

    const json = await result.json();
    const { status } = json;

    return status;
  }
}
