function updateCartCounter() {
  const cartCounter = document.querySelector('.nav__item:nth-child(3) .nav__counter');
  if (!cartCounter) return;

  let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
  cartCount++;
  
  localStorage.setItem('cartCount', cartCount);
  cartCounter.textContent = cartCount;
  
  cartCounter.classList.add('counter-bump');
  setTimeout(() => cartCounter.classList.remove('counter-bump'), 200);
}

function attachCartHandlers() {
  const addToCartButtons = document.querySelectorAll('.product-card__btn');
  
  addToCartButtons.forEach(btn => {
    if (btn.dataset.cartHandler) return;
    btn.dataset.cartHandler = 'true';
    
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      updateCartCounter();
      
      const originalText = btn.textContent;
      btn.textContent = 'Добавлено!';
      btn.style.backgroundColor = '#57330d';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
      }, 1000);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const cartCounter = document.querySelector('.nav__item:nth-child(3) .nav__counter');
  if (cartCounter) {
    const cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    cartCounter.textContent = cartCount;
  }
  
  attachCartHandlers();

  const productsList = document.querySelector('#products-list, .card__list');
  
  if (productsList) {
    const observer = new MutationObserver(() => {
      attachCartHandlers();
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
        attachCartHandlers();
      }, 100);
    });
  }
});