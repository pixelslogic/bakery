document.addEventListener("DOMContentLoaded", function () {
  
  console.log('Script loaded');
  
  const searchInput = document.querySelector('.search__input');
  const searchForm = document.querySelector('.search');
  const resultsBox = document.querySelector('.search-results');

  console.log('searchInput:', searchInput);
  console.log('resultsBox:', resultsBox);

  if (!searchInput || !resultsBox) {
    console.error('Элементы поиска не найдены!');
    return;
  }

  const allProducts = [
    'Пирожное "Медовик"',
    'Хлеб Ржаной на закваске',
    'Пай творожный с малиной',
    'Донатс',
    'Торт Шоколадный с кремом чиз и клубникой',
    'Торт Ягодный с йогуртовой начинкой',
    'Сэндвич с бужениной',
    'Сырники 5 штук с начинкой на выбор',
    'Пирожное "Тирамису"',
    'Блины с вишневой начинкой 3 штуки',
    'Сосиска в тесте',
    'Круассан классический',
    'Круассан с шоколадом',
    'Эклер заварной',
    'Пирог с яблоками',
    'Пирог с вишней',
    'Ватрушка с творогом',
    'Булочка с корицей',
    'Багет французский',
    'Хлеб пшеничный',
    'Хлеб бородинский',
    'Печенье овсяное',
    'Печенье шоколадное',
    'Маффин черничный',
    'Маффин шоколадный',
    'Чизкейк классический',
    'Чизкейк с малиной',
    'Наполеон',
    'Штрудель яблочный',
    'Пончик с джемом',
    'Пончик глазированный'
  ];

  console.log('Products array:', allProducts);

  function showResults(text) {
    console.log('showResults called with:', text);
    
    resultsBox.innerHTML = "";

    if (text.trim() === "") {
      console.log('Empty text, hiding results');
      resultsBox.style.cssText = 'display: none !important';
      return;
    }

    const filtered = allProducts.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );

    console.log('Filtered results:', filtered);

    if (filtered.length === 0) {
      console.log('No results found');
      resultsBox.innerHTML = '<div class="search-results__item search-results__item--empty">Ничего не найдено</div>';
      resultsBox.style.cssText = 'display: block !important';
      return;
    }

    filtered.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('search-results__item');
      div.textContent = item;

      div.addEventListener('click', () => {
        searchInput.value = item;
        resultsBox.style.cssText = 'display: none !important';
      });

      resultsBox.appendChild(div);
    });

    console.log('Showing results box');
    resultsBox.style.cssText = 'display: block !important';
  }

  searchInput.addEventListener('input', (e) => {
    console.log('Input event:', e.target.value);
    showResults(e.target.value);
  });

  searchInput.addEventListener('focus', () => {
    console.log('Focus event');
    if (searchInput.value.trim() !== "") {
      showResults(searchInput.value);
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.style.cssText = 'display: none !important';
    }
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submit prevented');
  });

  const favoriteButtons = document.querySelectorAll('.product-card__favorite');
  const favoriteCounter = document.querySelector('.nav__counter--favorite');

  let favoriteCount = 0;

  favoriteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      
      if (btn.classList.contains('active')) {
        favoriteCount++;
      } else {
        favoriteCount--;
      }
      
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