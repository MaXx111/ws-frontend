export default class HTMLElems {
    constructor() {

    }

    nicknameForm() {
        const div = document.createElement('div');
        div.className = 'nickname__conteiner';

        const wrapper = document.createElement('div');
        wrapper.className = "nickname__wrapper";

        const title = document.createElement('h2');
        title.className = 'nickname__title';
        title.textContent = 'Выберете псевдоним';

        const input = document.createElement('input');
        input.className = "nickname__input";

        const btn = document.createElement('button');
        btn.className = 'nickname__btn';
        btn.textContent = 'Продолжить';

        wrapper.appendChild(title);
        wrapper.appendChild(input);
        wrapper.appendChild(btn);

        div.appendChild(wrapper);

        return div;
    }

    chat() {
        const conteiner = document.createElement('div');
        conteiner.className = 'chat__conteiner';

        const wrapper = document.createElement('div');
        wrapper.className = "chat__wrapper";

        const players = document.createElement('div')
        players.className = "chat__players"

        const playersWrapper = document.createElement('div')
        playersWrapper.className = "players_wrapper";

        players.appendChild(playersWrapper);

        const messages = document.createElement('div');
        messages.classList = 'chat__messages'

        const messagesWrapper = document.createElement('div');
        messagesWrapper.className = 'messages__wrapper';


        const sendConteiner = document.createElement('div');
        sendConteiner.className = "send__conteiner";

        const btnSend = document.createElement('button')
        btnSend.className = 'send__btn';
        btnSend.textContent = 'Отправить';

        const input = document.createElement('input');
        input.className = 'messages_input';

        sendConteiner.appendChild(btnSend);
        sendConteiner.appendChild(input);

        const msgItems = document.createElement('div');
        msgItems.className = 'messeges__items';
        msgItems.textContent = "kjbjhvjhvj"

        messagesWrapper.appendChild(msgItems);
        messagesWrapper.appendChild(sendConteiner);
        messages.appendChild(messagesWrapper);

        wrapper.appendChild(players);
        wrapper.appendChild(messages);

        conteiner.appendChild(wrapper);

        return conteiner;

    }

    htmlMessage(msg) {
        const div = document.createElement('div');
        div.textContent = msg;
        return div;

    }

}