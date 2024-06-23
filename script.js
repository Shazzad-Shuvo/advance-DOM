'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//////////////////////////////////////////////////////////
// Modal window

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

//////////////////////////////////////////////////////////
// Implement Smooth Scroll

// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  // 1. Older way
  const s1Coords = section1.getBoundingClientRect();
  console.log(s1Coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll(X/Y):', window.scrollX, window.scrollY);

  // Show width/height of viewport
  console.log(
    'Height/Width of viewport:',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(s1Coords.left, s1Coords.top);
  // window.scrollTo(s1Coords.left + window.scrollX, s1Coords.top + window.scrollY);

  // window.scrollTo({
  //   left:s1Coords.left + window.scrollX,
  //   top: s1Coords.top + window.scrollY,
  //   behavior: 'smooth'
  // });

  // 2. Modern way of scrolling  --------------------------

  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////////////////////

//Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})

//   });
// });

// Event Delegation  -------------------------------------
// 1. Add event listener to common parent element
// 2. Determine which element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // activate Content Area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation  -----------------------------------------
// 1. Not a good way to do scroll effect
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function(){
//   console.log(window.scrollY);

//   if(this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })

// Sticky Navigation: Intersection Observer API  --------------
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);


const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function(entries){
  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Selecting Elements
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
*/
/*
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating & Inserting Elements
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and seamless user experience';

message.innerHTML =
  'We use cookies for improved functionality and seamless user experience. <button class="btn btn-close-cookie">Got it!</button>';

header.prepend(message);
header.append(message);
header.append(message.cloneNode(true));

header.before(message);
header.after(message);
*/

// Delete Elements
/*
document.querySelector('.btn-close-cookie').addEventListener('click', function(){
  // new way of removing element
  message.remove();
  // old way to remove element
  message.parentElement.removeChild(message);
});
*/

// Styles
/*
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered')

console.log(document.documentElement.style.getPropertyValue('--color-primary'));
*/

// Attributes
/*
const logo = document.querySelector('.nav__logo');

console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful logo';
*/

// non-standard
/*
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));
*/

// Data Attributes
// console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'd');
logo.classList.remove('c', 'd');
logo.classList.toggle('c');
logo.classList.contains('c');

///////////////////////////////////////////////////////////////
// Types of Events & Event Handlers

/*
 const h1 = document.querySelector('h1');

const alertH1 = function () {
  alert('addEventListener: Great! you are reading the heading...');

  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000);

h1.addEventListener('mouseenter', function () {
  alert('addEventListener2');
});
*/

// Old way to handle event -------------------------------
/*
h1.onmouseenter = function () {
  alert('addEventListener Old way: Great! you are reading the heading...');
};
*/

// Event Propagation: Bubbling & Capturing
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link: ', e.target, e.currentTarget);
  console.log(this);
  console.log(e.currentTarget === this);

  // Stop Propagation
  // e.stopPropagation();  //not good to use
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container: ', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('Nav: ', e.target, e.currentTarget);
  },
  true
);
*/

// DOM Traversing  ----------------------------------------

// const h1 = document.querySelector('h1');

// Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// Going Upwards: parents

// 1.direct parent
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// 2. select closest parent with a class -------------------
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going Sideways: siblings  ------------------------
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// get all siblings ------------------------------
/**
console.log(h1.parentElement.children);
console.log([...h1.parentElement.children]);

[...h1.parentElement.children].forEach(function(el){
  if(el !==h1) el.style.transform = 'scale(0.5)';
})
 */
