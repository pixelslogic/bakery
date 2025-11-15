const favoriteButtons = document.querySelectorAll('.product-card__favorite');

favoriteButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const svg = btn.querySelector('.product-card__favorite-svg');
    svg.classList.toggle('active');
  });
});
