'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//внедрение плавной прокрутки к первому разделу по нажатию кнопки
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
//Реализация плавной прокрутки по ссылкам навигации
//при помощи делегирования событий
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href'); //находим по отрибуту
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

//   });
// });
//1. Добавление прослушивателя событий к общему родительскому элементу нужных для нас элементов

//2. Определить какой элемент инициировал событие, чтобы затем можно было работать с тем элементом, где событие было фактически создано

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  //стратегия подбора
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); //находим по отрибуту
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//компоненты табов
//выбор вкладок
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//добавление обработчиков событий
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); //чтобы выбрать все содержимое кнопки
  // console.log(clicked);

  if (!clicked) return;

  //Удаление класса active со всех
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //После удаления всех active добавляем этот класс на определенную нажатую кнопку

  clicked.classList.add('operations__tab--active');

  //активация области содержимого
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//Эффект для элементов навигации в шапке страницы.
const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //выбираем все элементы
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    //изменяем непрозрачность для всех дочерних элементов
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

//отмена применения непрозрачности
nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //выбираем все элементы
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    //изменяем непрозрачность для всех дочерних элементов
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});
/*
рефакторинг(как можно было сделать по-другому)
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //выбираем все элементы
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    //изменяем непрозрачность для всех дочерних элементов
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//еще один способ
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //выбираем все элементы
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    //изменяем непрозрачность для всех дочерних элементов
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseover', handleHover.bind(1))

*/
