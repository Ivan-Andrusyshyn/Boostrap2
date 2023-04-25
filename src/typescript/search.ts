import { api } from './fetch';
import { objRefs } from './refs';
import Notiflix from 'notiflix';

const btnAdd = document.querySelector('[btn-active-add]') as HTMLButtonElement;
btnAdd.addEventListener('click', addCardtoLibrary);

takeImg();
takeWord();
objRefs.form.addEventListener('submit', makeOnSubm);
function makeOnSubm(e): void {
  e.preventDefault();
  let inputForm = e.currentTarget.elements.searchQuery.value.trim();
  api.query = inputForm;
  if (inputForm === '') return;
  takeImg();
  takeWord();
}
async function takeImg() {
  try {
    const { data } = await api.makeFetch();
    const template: string = `<img src="${data.hits[4].largeImageURL}" class="img-fluid" height="300px" image alt="">`;
    objRefs.divImg.innerHTML = template;
  } catch (err) {
    console.log(err);
  } finally {
    objRefs.form.reset();
  }
}
async function takeWord() {
  try {
    const { data } = await api.makeEnglishWords();
    const desrcWord: string = data[0].meanings[0].definitions[0].definition;
    objRefs.newScreen.textContent = data[0].word;
    objRefs.voisWords.src = data[0].phonetics[0].audio;
    objRefs.textDescr.textContent = desrcWord;
  } catch (err) {
    console.log(err);
  }
}
// ======================================================>
function addCardtoLibrary() {
  const imgSrc = document.querySelector('[image]') as HTMLImageElement;
  changeTextBtn();
  if (btnAdd.textContent === 'Delete') {
  }
  if (!localStorage.getItem('items')) {
    localStorage.setItem('items', JSON.stringify([]));
  }

  let description = objRefs.textDescr.textContent;
  let voisWords = objRefs.voisWords.src;
  let img = imgSrc.src;
  let word = objRefs.newScreen.textContent;
  const newInfo = localStorage.getItem('items');

  let newData = JSON.parse(newInfo);
  const removeData = newData.filter(el => {
    if (el[1] !== word) {
      return el;
    } else {
      Notiflix.Report.info('This card already exist !', '');
    }
  });

  removeData.push([
    'newData_' + newData.length,
    description,
    voisWords,
    img,
    word,
  ]);

  localStorage.setItem('items', JSON.stringify(removeData));
}
// ===========================================================>

function changeTextBtn() {
  if (btnAdd.textContent == 'Add') {
    btnAdd.textContent = 'Added';
    btnAdd.style.backgroundColor = 'green';
    setTimeout(() => {
      btnAdd.textContent = 'Add';
      btnAdd.style.backgroundColor = '';
    }, 2000);
  }
}
export function makeItemsList(): void {
  cleanAll();
  const elements = JSON.parse(localStorage.getItem('items'));
  objRefs.containerUl.insertAdjacentHTML('afterbegin', getTemplate(elements));
}

function getTemplate(value): string {
  console.log(value);
  return value.map(el => {
    return `
  <li class="d-flex flex-column align-items-center data-delete="${el[0]}"">
  <div
    class="pt-2 bg-success p-2"
    active-img
    style="width: 330px; height: 231px"
  ><img src="${el[3]}" class="img-fluid" height="300px" alt="">
</div>
  <div
    style="width: 330px"
    class="p-2 fs-3 fw-bold bg-success text-center text-primary text-dark justify-content-center"
    screen-active
  >
  ${el[4]}
  </div>
  <audio src="${el[2]}" controls  class="p-2 music"></audio>
  <p class="text-center p-2 text-danger fw-bold"
  style="width: 330px; margin-bottom: 0;"
  text-describe>${el[1]}</p>
  <button type="button" class="btn btn-outline-primary" btn-active-add>Delete</button>
</li>
  `;
  });
}
function cleanAll() {
  objRefs.containerUl.innerHTML = '';
}
