// const div = document.querySelector('.navbar');
// div.textContent = 'dd';
// class Human {
//   name: string;
//   age: number;
//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }
// let user: Human = new Human('Ivan', 28);
// console.log(user);

// let firstName: string = 'Ivan';
// let secindName: string = 'Andrusyshyn';
// if (firstName === 'Ivan') {
//   console.log('true');
// }
// void func does not return any value
// function printHello(): void {
//   console.log('Hello!');
// }

// +===========================+
// +===========================+
// let list: number[] = [1, 2, 3]; //==>
// let y: [string, number] = ['Hello', 42]; //==>
// let z: Array<number> = [1, 2, 3]; //

// =========================================>
// ENUM
// enum newConst {
//   Up = 2,
//   Down = 4,
//   Left = 6,
//   Right,
// }
// newConst.Up;
// newConst.Down;
// newConst.Left;

// console.log(newConst.Right);
// =======================================>
// =======================================>
// function Expre
// const createPasword =
//  (name: string, age: number | string) => `${name}, ${age}`;
// console.log(createPasword('Ivan', 28));
//
// void if nothins return or never =>if must return error
//
// function declaretion
// function oldFunc(name: string): void {
//   alert();
// }
// vatiable type function==>
// let myName;
// function oldFunc(name: string): void {
//   alert();
// }
// o
// type Person = {
//   name: string;
//   age: number;
//   nickName?: string;this one i can change bellow
//   getPass?: () => string;this one i can change bellow
// };
// let user: Person = {
//   name: 'Ivan',
//   age: 23,
//   nickName: 'Tractor',
// };
// let admin: Person = {
//   name: 'Ivan',
//   age: 23,
//   getPass(): string {
//     return `${this.name}${this.age}`;
//   },
// };
// myName = oldFunc;
import { arr } from './words';
import { api } from './fetch';
const newScreen = document.querySelector('[screen-active]') as HTMLDivElement;
const btns = document.querySelector('[button]') as HTMLButtonElement;
const progerssDiv = document.querySelector('[progerss]') as HTMLDivElement;
const backToStart = document.querySelector('[btn-back]') as HTMLButtonElement;
const divImg = document.querySelector('[active-img]') as HTMLDivElement;
let count = 0;
let procent = 0;
backToStart.addEventListener('click', e => {
  count = 0;
  procent = 0;
});
takeImg();
btns.addEventListener('click', searchNewBtn);
function searchNewBtn(e): void {
  const target = e.target.textContent;
  if (target == '>') increment();
  else if (target == '<') decrement();
  api.query = arr[count].word;
  takeImg();
  progerssDiv.style.width = procent + '%';
  // progerssDiv.textContent = `${Math.floor(procent)}`;
  newScreen.textContent = arr[count].word;
}
async function takeImg() {
  try {
    const { data } = await api.makeFetch();
    divImg.innerHTML = `<img src="${data.hits[1].largeImageURL}" class="img-fluid" alt="">`;
    console.log(data.hits);
  } catch (err) {
    console.log(err);
  }
}
newScreen.addEventListener('click', e => {
  if (newScreen.textContent == arr[count].word) {
    changeBgDiv();
    newScreen.textContent = arr[count].translite;
  } else if (newScreen.textContent == arr[count].translite) {
    newScreen.classList.remove('bg-danger');
    divImg.classList.remove('bg-danger');

    newScreen.textContent = arr[count].word;
  }
});
function changeBgDiv() {
  newScreen.classList.remove('bg-seccess');
  newScreen.classList.add('bg-danger');
  divImg.classList.remove('bg-seccess');
  divImg.classList.add('bg-danger');
}
function increment(): void {
  moreThenZero((count += 1));
  moreProcent((procent += 1.15));
}
function decrement(): void {
  moreThenZero((count -= 1));
  moreProcent((procent -= 1.15));
}
function moreThenZero(num): void {
  if (num < 0) {
    count = arr.length - 1;
  } else if (num > arr.length - 1) {
    count = 0;
  }
}
function moreProcent(proc): void {
  if (proc < 0) {
    procent = 100;
  } else if (proc > 100) {
    procent = 0;
  }
}
