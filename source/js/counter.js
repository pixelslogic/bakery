document.addEventListener("DOMContentLoaded", function () {
  const favoriteButtons = document.querySelectorAll('.product-card__favorite');
  const favoriteCounter = document.querySelector('.nav__counter--favorite');

  let favoriteCount = 0;

  favoriteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      favoriteCount++;
      favoriteCounter.textContent = favoriteCount;

      favoriteCounter.classList.add('counter-bump');
      setTimeout(() => favoriteCounter.classList.remove('counter-bump'), 200);
    });
  });

  const addToCartButtons = document.querySelectorAll('.product-card__btn');
  const cartCounter = document.querySelector('.nav__item:nth-child(3) .nav__counter');

  let cartCount = 0;

  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      cartCounter.textContent = cartCount;

      cartCounter.classList.add('counter-bump');
      setTimeout(() => cartCounter.classList.remove('counter-bump'), 200);
    });
  });
});