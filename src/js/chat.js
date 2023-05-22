import HTMLElems from './htmlElems.js';
import Api from './api.js';

export default class Chat {
  constructor(body) {
    this.body = body;

    this.nickname = false;
    this.htmlElems = false;

    this.api = new Api('https://ws-backend-0o4w.onrender.com/');

    this.onSendBtn = this.onSendBtn.bind(this);
    this.onUnload = this.onUnload.bind(this);
  }

  init(nickname) {
    this.nickname = nickname;
    this.htmlElems = new HTMLElems(this.nickname);

    this.printChat();
    this.api.init(nickname, this.body);

    this.addListeners();
  }

  printChat() {
    this.body.appendChild(this.htmlElems.chat());
  }

  addListeners() {
    this.body.querySelector('.send__btn').addEventListener('click', this.onSendBtn);
    window.addEventListener('beforeunload', this.onUnload);
  }

  onUnload(e) {
    e.preventDefault();
    this.api.unLoadUser(this.nickname);
  }

  onSendBtn(e) {
    e.preventDefault();

    const input = this.body.querySelector('.messages_input');

    if (!input.value) return;

    const obj = {
      type: 'msg',
      nick: this.nickname,
      message: input.value,
    };
    this.api.sendWs(obj);

    input.value = '';
  }
}
