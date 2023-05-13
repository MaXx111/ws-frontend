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
}