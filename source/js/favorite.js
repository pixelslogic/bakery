function updateFavoriteCounter(increment = true) {
  const favoriteCounter = document.querySelector('.nav__counter--favorite');
  if (!favoriteCounter) return;

  let favoriteCount = parseInt(localStorage.getItem('favoriteCount')) || 0;
  
  if (increment) {
    favoriteCount++;
  } else {
    favoriteCount = Math.max(0, favoriteCount - 1);
  }
  
  localStorage.setItem('favoriteCount', favoriteCount);
  favoriteCounter.textContent = favoriteCount;
  favoriteCounter.classList.add('counter-bump');
  setTimeout(() => favoriteCounter.classList.remove('counter-bump'), 200);
}

function attachFavoriteHandlers() {
  const favoriteButtons = document.querySelectorAll('.product-card__favorite');
  
  favoriteButtons.forEach(btn => {
    if (btn.dataset.favoriteHandler) return;
    btn.dataset.favoriteHandler = 'true';
    
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const svg = btn.querySelector('.product-card__favorite-svg');
      const isActive = svg.classList.contains('active');
      
      svg.classList.toggle('active');
      updateFavoriteCounter(!isActive);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const favoriteCounter = document.querySelector('.nav__counter--favorite');
  if (favoriteCounter) {
    const favoriteCount = parseInt(localStorage.getItem('favoriteCount')) || 0;
    favoriteCounter.textContent = favoriteCount;
  }
  
  attachFavoriteHandlers();

  const productsList = document.querySelector('#products-list, .card__list');
  
  if (productsList) {
    const observer = new MutationObserver(() => {
      attachFavoriteHandlers();
    });

    observer.observe(productsList, {
      childList: true,
      subtree: true
    });
  }

  const showMoreBtn = document.querySelector('.card__show-btn');

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      setTimeout(() => {
        attachFavoriteHandlers();
      }, 100);
    });
  }
});