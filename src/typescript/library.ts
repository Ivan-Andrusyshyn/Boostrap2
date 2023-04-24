import { api } from './fetch';
import { objRefs } from './refs';

const btnAdd = document.querySelector('[btn-active-add]') as HTMLButtonElement;
btnAdd.addEventListener('click', addCardtoLibrary);
function addCardtoLibrary() {
  console.log('Hello');
  changeTextBtn();
}
function changeTextBtn() {
  if (btnAdd.textContent == 'Add') {
    btnAdd.textContent = 'delete';
  } else {
    btnAdd.textContent = 'Add';
  }
}
