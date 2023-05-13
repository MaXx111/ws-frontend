export default class ToolTip {
    constructor() {

    }
  
    showTooltip(elem) {
      const element = document.createElement('div');
      element.classList.add('tooltip');
      element.textContent = 'Псевдоним не может быть пустым так то O_o';
    
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