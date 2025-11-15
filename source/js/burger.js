document.addEventListener("DOMContentLoaded", function () {
  const buttonBurger = document.querySelector('.catalog-btn');
  const siteList = document.querySelector('.nav-mobile');
  const siteLinks = document.querySelectorAll('.nav-mobile__link');

  if (!buttonBurger || !siteList) return;

  function lockScroll() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    document.body.style.overflow = '';
  }

  buttonBurger.addEventListener('click', function(e) {
    e.stopPropagation();
    const isActive = siteList.classList.toggle('active');
    buttonBurger.classList.toggle('active');
    
    if (isActive) {
      lockScroll();
    } else {
      unlockScroll();
    }
  });

  document.addEventListener('click', function(e) {
    if (siteList.classList.contains('active') && 
        !siteList.contains(e.target) && 
        !buttonBurger.contains(e.target)) {
      siteList.classList.remove('active');
      buttonBurger.classList.remove('active');
      unlockScroll();
    }
  });

  siteLinks.forEach(link => {
    link.addEventListener('click', function() {
      siteList.classList.remove('active');
      buttonBurger.classList.remove('active');
      unlockScroll();
    });
  });
});