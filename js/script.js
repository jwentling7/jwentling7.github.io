'use strict';

/*---------------------------------------------------*/
// NOTES**********************************************
// 1) TODO Find way not to include the project div in event
// listener projects.addEventListener('click', closeProj);
// Reorder some html elements?
/*---------------------------------------------------*/

/*---------------------------------------------------*/
// Selecting Elements from DOM
/*---------------------------------------------------*/
const fade = document.querySelectorAll('.fade');
const appear = document.querySelector('appear');

const mainNavBar = document.querySelector('.main-nav');
const openIcon = document.querySelector('.ham-icon');
const closeIcon = document.querySelector('.close-icon');
const mobileNavLinks = document.querySelector('.mobile-nav-links');
const mobileLink = document.querySelectorAll('.mobile-link');
const externalLinks = document.querySelector('.external-links');
const toTopButton = document.querySelector('.return-to-top');
const footerLinks = document.querySelector('footer-links');

let experience = document.getElementsByClassName('exp');

const progButton = document.querySelector('.button-programming');
const gameButton = document.querySelector('.button-gaming');
const gardenButton = document.querySelector('.button-gardening');
const projects = document.querySelector('.projects');
const proj = document.querySelector('.project');
const projProg = document.querySelector('.project-programming');
const projGame = document.querySelector('.project-gaming');
const projGarden = document.querySelector('.project-gardening');
const closeProjButton = document.querySelector('.close-project');

const bodyEL = document.querySelector('body');
const pageContentEL = document.querySelector('.page-content');

/*---------------------------------------------------*/
// Media Queries
/*---------------------------------------------------*/
const mediaQuery768 = window.matchMedia('(max-width: 768px)');

/*---------------------------------------------------*/
// Fade-in Scroll Functions
/*---------------------------------------------------*/
const appearOptions = {
  threshold: 0.25,
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

fade.forEach((fade) => {
  appearOnScroll.observe(fade);
});

/*---------------------------------------------------*/
// Navigation Functions
/*---------------------------------------------------*/

window.onload = (e) => {
  setTimeout(() => {
    showMainNav();
  }, 1000);
  setTimeout(() => {
    showExtLinks();
  }, 1750);
};

// Show main nav bar
const showMainNav = function () {
  setTimeout(() => {
    mainNavBar.style.transform = 'scale(1, 1)';
  }, 200);
};

// Hides main nav bar
const hideMainNav = function () {
  setTimeout(() => {
    mainNavBar.style.transform = 'scale(1, 0)';
  }, 200);
};

// Open mobile nav
const openMobileNav = function () {
  if (mobileNavLinks.classList.contains('hidden')) {
    closeIcon.classList.remove('hidden');
    openIcon.classList.add('hidden');
    mobileNavLinks.classList.remove('hidden');
    mobileNavLinks.classList.add('flex');
    //animate mobile nav
    setTimeout(() => {
      mobileNavLinks.style.transform = 'scale(1, 1)';
    }, 200);
    toTopButton.classList.add('hidden');
    bodyEL.classList.add('stop-scroll');
    pageContentEL.classList.add('blur');
  }
};

// Close mobile nav
const closeMobileNav = function () {
  if (!mobileNavLinks.classList.contains('hidden')) {
    closeIcon.classList.add('hidden');
    openIcon.classList.remove('hidden');
    mobileNavLinks.classList.add('hidden');
    mobileNavLinks.classList.remove('flex');
    mobileNavLinks.style.transform = 'scale(0, 1)';
    toTopButton.classList.remove('hidden');
    bodyEL.classList.remove('stop-scroll');
    pageContentEL.classList.remove('blur');
  }
};

// Press "Esc" on keyboard to close mobile nav
const closeMobileNavEsc = function (event) {
  event.preventDefault();
  if (event.key === 'Escape' && !closeIcon.classList.contains('hidden'))
    closeMobileNav();
};

// Hides main nav bar when scrolling down.
// It pops back up at the top of the page and when scrolling up.
let prevScrollPos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (
    prevScrollPos > currentScrollPos &&
    projects.classList.contains('hidden')
  ) {
    showMainNav();
  } else {
    hideMainNav();
  }
  prevScrollPos = currentScrollPos;

  if (currentScrollPos < 700) {
    toTopButton.classList.add('hidden');
  } else if (currentScrollPos >= 700) {
    toTopButton.classList.remove('hidden');
  }
};

const showExtLinks = function () {
  externalLinks.classList.remove('hidden');
};

const hideExtLinks = function () {
  externalLinks.classList.add('hidden');
};

/*---------------------------------------------------*/
// Experience Functions
/*---------------------------------------------------*/
let expIndex = 1;

// Hides all exp that are not being called
// Display block exp that is being shown
const showExp = function (n) {
  for (let i = 0; i < experience.length; i++) {
    experience[i].style.display = 'none';
  }
  experience[expIndex - 1].style.display = 'block';
};

// Called by clicking exp button and sets the expIndex
// Calls showExp function above
const currentExp = function (n) {
  showExp((expIndex = n));
};

showExp(expIndex);

/*---------------------------------------------------*/
// Project Functions
/*---------------------------------------------------*/
// project window item (programming, gaming, gardening)
let item = '';

// Open project window used with three functions below
const openProj = function () {
  if (projects.classList.contains('hidden')) {
    mainNavBar.classList.add('hidden');
    showExtLinks();
    toTopButton.classList.add('hidden');
    closeProjButton.classList.remove('hidden');
    projects.classList.remove('hidden');
    projects.classList.add('flex');
    //delay the animation the project window on open
    setTimeout(() => {
      item.style.transform = 'scale(1, 1)';
    }, 200);
    bodyEL.classList.add('stop-scroll');
  }
};

// Opens programming window
const openProg = function () {
  item = projProg;
  openProj();
  projProg.classList.remove('hidden');
};

// Opens gaming window
const openGame = function () {
  item = projGame;
  openProj();
  projGame.classList.remove('hidden');
};

// Opens gardening window
const openGarden = function () {
  item = projGarden;
  openProj();
  projGarden.classList.remove('hidden');
};

// Close project window
const closeProj = function () {
  if (!projects.classList.contains('hidden')) {
    mainNavBar.classList.remove('hidden');
    mainNavBar.classList.add('flex');
    hideExtLinks();
    toTopButton.classList.remove('hidden');
    closeProjButton.classList.add('hidden');
    projects.classList.add('hidden');
    projects.classList.remove('flex');
    //reset the project window scale to reopen with animation
    item.style.transform = 'scale(0, 0)';
    item.classList.add('hidden');
    projGame.classList.add('hidden');
    projGarden.classList.add('hidden');
    bodyEL.classList.remove('stop-scroll');
  }
};

// Press "Esc" on keyboard to close project window
const closeProjEsc = function (event) {
  event.preventDefault();
  if (event.key === 'Escape' && !closeProjButton.classList.contains('hidden'))
    closeProj(item);
};

/*---------------------------------------------------*/
// Main
/*---------------------------------------------------*/

// Opens mobile nav
openIcon.addEventListener('click', openMobileNav);

// Closes mobole nav when user clicks "X"
closeIcon.addEventListener('click', closeMobileNav);

// Closes mobile nav when a link is clicked
mobileLink.forEach((item) => {
  item.addEventListener('click', closeMobileNav);
});

// Closes mobile nav when clicking outside of it
pageContentEL.addEventListener('click', closeMobileNav);

// Closes mobile nav if screen size is too large (>768px)
window.addEventListener('resize', function () {
  if (!mediaQuery768.matches) {
    closeMobileNav();
  }
});

// Opens respective project window
progButton.addEventListener('click', openProg);
gameButton.addEventListener('click', openGame);
gardenButton.addEventListener('click', openGarden);

// Closes project window when user clicks on "X"
closeProjButton.addEventListener('click', closeProj);

// Closes either mobile nav or project window when user presses the "ESC" key
document.addEventListener('keydown', function (event) {
  closeMobileNavEsc(event);
  closeProjEsc(event);
});

// Closes mobile nav and project window when clicking backbutton on device
document.addEventListener('backbutton', function () {
  closeMobileNav();
  closeProj();
});
