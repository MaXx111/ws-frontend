import HTMLElems from './htmlElems.js';
import ToolTip from './toolTip.js';

export default class NicknameValidate {
    constructor(body) {
        this.body = body;

        this.nicknameBtn = false;
        this.nicknameInput = false;
        this.form = false;

        this.htmlElems = new HTMLElems();
        this.toolTip = new ToolTip();

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
                this.showToolTip()
            }
            this.isHereToolTip = true;
            return
        }

        if(this.isHereToolTip) {
            this.toolTip.removeTooltip();
            this.isHereToolTip = false;
        }


        this.form.remove();
        this.form = false;

    }
    
      showToolTip() {
        this.toolTip.showTooltip(this.nicknameInput)
      }
}