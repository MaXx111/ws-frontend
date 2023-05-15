import HTMLElems from './htmlElems.js';
import Api from './api.js';

export default class Chat {
    constructor(body) {
        this.body = body

        this.nickname = false;
        this.conteiner = false;

        this.htmlElems = new HTMLElems();
        this.api = new Api('http://localhost:7070/');

        this.onSendBtn = this.onSendBtn.bind(this);
    }

    init(nickname) {
        this.nickname = nickname;
        this.printChat();
        this.conteiner = this.body.querySelector('.messeges__items');

        this.api.wsInit(this.conteiner);

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
        console.log(this.body)

        let input = this.body.querySelector('.messages_input');

        if(!input.value) return;
        console.log(input.value)
        this.api.sendWs(input.value);

        input.value = "";
    }
}