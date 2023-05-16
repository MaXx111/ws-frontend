import HTMLElems from './htmlElems.js';
import Api from './api.js';

export default class Chat {
    constructor(body) {
        this.body = body

        this.nickname = false;
        this.conteiner = false;
        this.htmlElems = false;

        this.api = new Api('https://ws-backend-0o4w.onrender.com/');

        this.onSendBtn = this.onSendBtn.bind(this);
    }

    init(nickname) {
        this.nickname = nickname;
        this.htmlElems = new HTMLElems(this.nickname);

        this.printChat();
        this.conteiner = this.body.querySelector('.messeges__items');

        this.api.wsInit(this.conteiner, this.nickname);

        this.addListeners();
    }

    printChat() {
        this.body.appendChild(this.htmlElems.chat());
    }

    addListeners() {

        this.body.querySelector('.send__btn').addEventListener('click', this.onSendBtn);

    }

    onSendBtn(e) {
        e.preventDefault();

        let input = this.body.querySelector('.messages_input');

        if(!input.value) return;

        let obj = {
            nick: this.nickname,
            message: input.value
        }
        this.api.sendWs(obj);

        input.value = "";
    }
}