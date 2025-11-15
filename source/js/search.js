document.addEventListener("DOMContentLoaded", function () {
  
  const searchInput = document.querySelector('.search__input');
  const searchForm = document.querySelector('.search');
  const resultsBox = document.querySelector('.search-results');

  if (!searchInput || !resultsBox) {
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
    'Пончик глазированный',
    'Пирожное "Картошка"',
    'Рулет бисквитный шоколадный',
    'Пирожное "Шоколадное" с трюфельным кремом'
  ];

  function showResults(text) {
    resultsBox.innerHTML = "";

    if (text.trim() === "") {
      resultsBox.style.cssText = 'display: none !important';
      return;
    }

    const filtered = allProducts.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );

    if (filtered.length === 0) {
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

    resultsBox.style.cssText = 'display: block !important';
  }

  searchInput.addEventListener('input', (e) => {
    showResults(e.target.value);
  });

  searchInput.addEventListener('focus', () => {
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