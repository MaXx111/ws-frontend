export default class ToolTip {
    constructor() {
      this.errors = [
        'Ужу занято :3',
        'Псевдоним не может быть пустым так то O_o'
      ]
    }
  
    showTooltip(elem, i) {
      const element = document.createElement('div');
      element.classList.add('tooltip');
      element.textContent = this.errors[i];
    
      document.body.appendChild(element);
      const { right, top } = elem.getBoundingClientRect();
      element.style.left = `${right + 5}px`;
      element.style.top = `${top + elem.offsetHeight / 2 - element.offsetHeight / 2}px`;
    }
  
    removeTooltip() {
      const tooltip = document.querySelector('.tooltip');
      tooltip.remove();
    }
  }