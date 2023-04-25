const objRefs = {
  newScreen: document.querySelector('[screen-active]') as HTMLDivElement,
  btns: document.querySelector('[button]') as HTMLButtonElement,
  progerssDiv: document.querySelector('[progerss]') as HTMLDivElement,
  backToStart: document.querySelector('[btn-back]') as HTMLButtonElement,
  divImg: document.querySelector('[active-img]') as HTMLDivElement,
  form: document.querySelector('[data-search-forms]') as HTMLFormElement,
  voisWords: document.querySelector('.music') as HTMLAudioElement,
  textDescr: document.querySelector('[text-describe]') as HTMLParagraphElement,
  containerUl: document.querySelector('[container]') as HTMLUListElement,
  containerSearch: document.querySelector(
    '[container-search]'
  ) as HTMLDivElement,
};
export { objRefs };
