document.addEventListener("DOMContentLoaded", function () {
  const buttonBurger = document.querySelector('.catalog-btn');
  const siteList = document.querySelector('.nav-mobile');
  const siteLinks = document.querySelectorAll('.nav-mobile__link');

  if (!buttonBurger || !siteList) return;

  let scrollPosition = 0;

  function lockScroll() {
    scrollPosition = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
  }

  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
  }

  function handleBurgerClick(e) {
    const viewportWidth = window.innerWidth;

    if (viewportWidth >= 1280) {
      window.location.href = "catalog.html";
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const isActive = siteList.classList.toggle('active');
    buttonBurger.classList.toggle('active');

    if (isActive) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }

  buttonBurger.addEventListener('click', handleBurgerClick);

  document.addEventListener('click', function (e) {
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 1280) return;

    if (
      siteList.classList.contains('active') &&
      !siteList.contains(e.target) &&
      !buttonBurger.contains(e.target)
    ) {
      siteList.classList.remove('active');
      buttonBurger.classList.remove('active');
      unlockScroll();
    }
  });

  siteLinks.forEach(link => {
    link.addEventListener('click', function () {
      const viewportWidth = window.innerWidth;
      if (viewportWidth >= 1280) return;

      siteList.classList.remove('active');
      buttonBurger.classList.remove('active');
      unlockScroll();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) {
      siteList.classList.remove('active');
      buttonBurger.classList.remove('active');
      unlockScroll();
    }
  });
});