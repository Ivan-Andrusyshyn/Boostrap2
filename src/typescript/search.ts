import { api } from './fetch';
import { objRefs } from './refs';
const textDescr = document.querySelector(
  '[text-describe]'
) as HTMLParagraphElement;
const voisWords = document.querySelector('.music') as HTMLAudioElement;

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
    const template: string = `<img src="${data.hits[4].largeImageURL}" class="img-fluid" height="300px" alt="">`;
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
    console.log(data);
    const desrcWord: string = data[0].meanings[0].definitions[1].definition;
    objRefs.newScreen.textContent = data[0].word;
    voisWords.src = data[0].phonetics[0].audio;
    textDescr.textContent = desrcWord;
  } catch (err) {
    console.log(err);
  }
}
