import HTMLElems from './htmlElems.js';
import ToolTip from './toolTip.js';
import Chat from './chat.js';
import Api from './api.js';

export default class NicknameValidate {
    constructor(body) {
        this.body = body;

        this.nicknameBtn = false;
        this.nicknameInput = false;
        this.form = false;
        this.api = new Api('http://localhost:7070/');

        this.htmlElems = new HTMLElems();
        this.toolTip = new ToolTip();
        this.chat = new Chat(body)

        this.onBtnClick = this.onBtnClick.bind(this);

        this.isHereToolTip = false;
    }

    init() {
        this.printForm()
    }

    printForm() {
        this.form = this.htmlElems.nicknameForm();
        this.body.appendChild(this.form);

        this.nicknameBtn = this.body.querySelector('.nickname__btn');
        this.nicknameInput = this.body.querySelector('.nickname__input');

        this.nicknameBtn.addEventListener('click', this.onBtnClick);
    }

    onBtnClick(e) {
        e.preventDefault();
        let nickname = this.nicknameInput.value;
        
        if(nickname.length === 0 ) {
            if(!this.isHereToolTip){
                this.emptyToolTip()
            }
            this.isHereToolTip = true;
            return
        }

        if(this.isHereToolTip) {
            this.toolTip.removeTooltip();
            this.isHereToolTip = false;
        }

        let obj = {
            name: nickname
        }

        this.api.add(obj).then((body) => {
            if(body === 'OK') {
                this.chat.init(this.nicknameInput.value);

                this.form.remove();
                this.form = false;
            }
        }).catch(
            this.toolTip.showTooltip(this.nicknameInput, 0)
        );
    }

      emptyToolTip() {
        this.toolTip.showTooltip(this.nicknameInput, 1)
      }
}