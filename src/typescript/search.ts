import { AxiosPromise, AxiosResponse } from 'axios';
import { api } from './fetch';
import { objRefs } from './refs';
import Notiflix from 'notiflix';
objRefs.btnAdd.addEventListener('click', addCardtoLibrary);

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
    console.log(api.makeFetch());

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
    const data = await api.makeEnglishWords();
    const desrcWord: string =
      data?.data[0].meanings[0].definitions[0].definition;
    objRefs.newScreen.textContent = data?.data[0].word;
    objRefs.voisWords.src = data?.data[0].phonetics[0].audio;
    objRefs.textDescr.textContent = desrcWord;
  } catch (err) {
    console.log(err);
  }
}
// ======================================================>
function addCardtoLibrary() {
  const imgSrc = document.querySelector('[image]') as HTMLImageElement;
  changeTextBtn();

  if (!localStorage.getItem('items')) {
    localStorage.setItem('items', JSON.stringify([]));
  }

  let description = objRefs.textDescr.textContent;
  let voisWords = objRefs.voisWords.src;
  let img = imgSrc.src;
  let word = objRefs.newScreen.textContent;

  let newData = JSON.parse(localStorage.getItem('items'));

  const removeData = newData.filter(el => {
    if (el[4] !== word) {
      return el;
    } else {
      Notiflix.Report.warning('This card already exist !', '', '');
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
  if (objRefs.btnAdd.textContent == 'Add') {
    objRefs.btnAdd.textContent = 'Added';
    objRefs.btnAdd.style.backgroundColor = 'green';
    setTimeout(() => {
      objRefs.btnAdd.textContent = 'Add';
      objRefs.btnAdd.style.backgroundColor = '';
    }, 2000);
  }
}
export function makeItemsList() {
  cleanAll();
  const elements = JSON.parse(localStorage.getItem('items'));
  objRefs.containerUl.insertAdjacentHTML('afterbegin', getTemplate(elements));
}

function getTemplate(value): string {
  return value
    .map(el => {
      return `
  <li class="d-flex flex-column align-items-center "data-delete id="${el[0]}">
  <div
    class="pt-2 d-flex flex-column gap-2 justify-content-center  bg-warning p-2 align-items-center "
    active-img
    style="width: 330px;overflow: hidden;"
  >
  <img src="${el[3]}" class="img-fluid" height="300px" alt="">
  <button type="button" class="btn btn-outline-danger"  btn-active-remove>Remove</button>

</div>
<div class="card text-white bg-warning mb-3" style="width: 330px; ">
    <div class="card-header fs-3 text-center"screen-active>${el[4]} </div>
  <div class="card-body d-flex flex-column gap-3 align-items-center">
    <audio src="${el[2]}" controls  class="p-2 music"></audio>
    <p class="card-text text-center"text-describe>${el[1]}</p>
  </div>
</div>
  </li>
  `;
    })
    .join('');
}
function cleanAll() {
  objRefs.containerUl.innerHTML = '';
}
