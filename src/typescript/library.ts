import { makeItemsList } from './search';
import { objRefs } from './refs';
objRefs.containerSearch.innerHTML = '';
makeItemsList();
const liItem = document.querySelectorAll('[data-delete]');
const localItem = JSON.parse(localStorage.getItem('items'));

liItem.forEach(el => {
  const id = el.id;
  el.addEventListener('click', e => {
    let targ = e.target.textContent;
    if (targ === 'Remove') {
      localItem.map(el => {
        if (el[0] == id) {
          localItem.splice(localItem.indexOf(el), 1);
          localStorage.setItem('items', JSON.stringify(localItem));
        }
      });
      el.remove();
    }
  });
});
