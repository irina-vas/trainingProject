'use strict';
document.addEventListener('DOMContentLoaded', () => {


/* TABS */


const tabheader__items = document.querySelector('.tabheader__items'),
      tabheader__item = document.querySelectorAll('.tabheader__item'),
      tabcontent = document.querySelectorAll('.tabcontent');


function hideContent(x,y){
  x.forEach((btn) => {
    btn.classList.add('hidden');
    btn.classList.remove('shown');
  })
  
  y.forEach((item) => {
    item.classList.remove('tabheader__item_active');
  })
}

function showContent(x,y,z = 0){
  x[z].classList.add('shown'); 
  x[z].classList.remove('hidden');
  y[z].classList.add('tabheader__item_active');
}

hideContent(tabcontent,tabheader__item);
showContent(tabcontent,tabheader__item);

tabheader__items.addEventListener('click',(e) => {
  const target = e.target;
  if(target && target.classList.contains('tabheader__item')){
    tabheader__item.forEach((item,key) => {
      if(target == item){
        hideContent(tabcontent,tabheader__item);
        showContent(tabcontent,tabheader__item,key);
      }
    })
  } 
})


/*TIME*/


let Deadline = '2021-05-28';

function getRimining(time) {
  const endTime = Date.parse(time) - Date.parse(new Date());

  let endDay = Math.floor(endTime / (1000 * 60 * 60 * 24)),
    endHours = Math.floor((endTime / (1000 * 60 * 60) % 24)),
    endMinutes = Math.floor((endTime / 1000 / 60) % 60),
    endSeconds = Math.floor((endTime / 1000) % 60);

  return {
    'miliSeconds': endTime,
    'Days': endDay,
    'Hours': endHours,
    'Minutes': endMinutes,
    'Seconds': endSeconds
  }
}


function setClock(parent, endTime) {

  const timer = document.querySelector(parent),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds');
  
  function updateClock() {
    const left = getRimining(endTime);
    days.innerHTM = zero(left.Days);
    hours.innerHTML = zero(left.Hours);
    minutes.innerHTML = zero(left.Minutes);
    seconds.innerHTML = zero(left.Seconds);
    if(left.miliSeconds <= 0) {
      clearInterval(timerInterval)
    }
  }
  const timerInterval = setInterval(updateClock, 1000);
  updateClock();
}

setClock('.timer', Deadline);

function zero(number) {
  if(number < 10) {
    return '0' + number;
  } else {
    return number;
  }
}
    

/*--MODAL--- */


const modalBtn = document.querySelectorAll('.btn'),
      modal = document.querySelector('.modal'),
      modalClose = document.querySelector('.modal__close'),
      btnMin = modal.querySelector('.btn_min');


function modalShow() {
  modal.classList.add('shown');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  clearInterval(timerPopUp);
}

function modalHide() {
  modal.classList.add('hidden');
  modal.classList.remove('shown');
  document.body.style.overflow = '';
}

modalBtn.forEach(i => {
  i.addEventListener('click', modalShow)
})

modalClose.addEventListener('click', modalHide);

btnMin.addEventListener('click', modalHide);

document.addEventListener('keydown', (e) => {
  if(e.code == 'Escape' && modal.classList.contains('shown')) {
    modalHide();
  }
})

const timerPopUp = setTimeout(modalShow,3000);

function scrollBottom() {
  if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    modalShow();
    window.removeEventListener('scroll', scrollBottom);
  }
}
window.addEventListener('scroll', scrollBottom);


/*-----CLASS создание карточек товара------ */


class Cards {
  constructor(src, alt, title, description, price, parent,...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;//заголовок
    this.description = description;//текст
    this.price = price;//цена
    this.parent = document.querySelector(parent);
    this.currency = 27;
    this.classes = classes;
    this.converter();
  }
  createBlock() {
    const div = document.createElement('div');
    if(this.classes.length === 0 || this.classes.length > 0 ) {
    this.element = 'menu__item';
    div.classList.add(this.element);
    this.classes.forEach(classname => div.classList.add(classname))
    } 
     
  div.innerHTML = `
    <div>
      <img src= ${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.description}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div> `
                
  this.parent.append(div);       
  }

  converter() {
    this.price = this.price * this.currency;
  }
}

new Cards("img/tabs/vegy.jpg", 
"vegy", 
'Меню "Фитнес"', 
'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
10,
'.menu .container'
)
.createBlock();


new Cards ("img/tabs/elite.jpg", 
"elite", 
'Меню “Премиум”', 
'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
15,
'.menu .container')
.createBlock();

new Cards ("img/tabs/post.jpg", 
"post", 
'Меню "Постное"', 
'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
13,
'.menu .container',
'big')
.createBlock();

const forms = document.querySelectorAll('form');
const message = {
  loading: 'Загрузка',
  success: ' Спасибо, ваша форма отправлена',
  erorr: 'Что-то не так'
}

forms.forEach(item => {
  postdata(item)
})

function postdata(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    statusMessage.textContent = message.loading;
    form.append(statusMessage);

    const request = new XMLHttpRequest();
    request.open('POST','server.php');
    /*request.setRequestHeader('Content-type','multipart/form-data');*/
    const formData = new FormData(form)
    request.send(formData)
    request.addEventListener('load', () => {
      if(request.status === 200){
        console.log(request.response);
        statusMessage.textContent = message.success;
      } else {
        statusMessage.textContent = message.erorr;
      }
    })
  })
}


/* Calculator */


const result = document.querySelector('.calculating__result span');
let gender = 'female',
    height,  
    weight, 
    age,
    ratio = 1.375;

function calcTotal() {
  if (!gender || !height || !weight || !age || !ratio) {
    result.textContent = '0'; 
    return;
  }
  if (gender === 'female') {
    result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
  } else {
    result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
  }
}

calcTotal();

function getStaticInformation(parentSelector, activeClass) {
  const elements = document.querySelectorAll(`${parentSelector} div`);

  elements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio');
      } else {
        gender = e.target.getAttribute('id');
      }

  elements.forEach(elem => {
    elem.classList.remove(activeClass);
  });

  e.target.classList.add(activeClass);

  calcTotal();
    });
  });
}

getStaticInformation('#gender', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {
    switch(input.getAttribute('id')) {  
      case "height":
      height = +input.value;
      break;
      case "weight":
      weight = +input.value;
      break;
      case "age":
      age = +input.value;
      break;
  }

calcTotal();
  });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');




})


