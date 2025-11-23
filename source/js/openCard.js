import { getProductById, getAllProducts } from './cards.js';
import sprite from '../assets/images/icon/sprite.svg';

class ProductPage {
    constructor() {
        this.product = null;
        this.reviews = [
            { id: 1, author: 'Татьяна', rating: 5, date: '22.03.2020', text: 'Качественный товар, полностью соответствует ожиданиям.' },
            { id: 2, author: 'Мария', rating: 5, date: '15.04.2024', text: 'Очень понравилось! Все аккуратно, красиво и продумано.' },
            { id: 3, author: 'Алексей', rating: 4, date: '10.05.2022', text: 'Хорошее качество и выполнение. Единственное, есть небольшие моменты, но в целом доволен.' },
            { id: 4, author: 'Елена', rating: 5, date: '05.06.2021', text: 'Отличный товар! Покупаю не первый раз — всегда все на высоком уровне.' },
            { id: 5, author: 'Дмитрий', rating: 4, date: '20.07.2021', text: 'Хорошее соотношение цены и качества. Могу рекомендовать.' },
            { id: 6, author: 'Ольга', rating: 5, date: '12.08.2025', text: 'Все отлично! Соответствует описанию, претензий нет.' },
            { id: 7, author: 'Игорь', rating: 4, date: '03.09.2023', text: 'Хороший товар, но можно немного улучшить детали.' },
            { id: 8, author: 'Анна', rating: 5, date: '25.09.2020', text: 'Очень довольна покупкой! Буду заказывать снова.' }
        ];

        this.categoryNames = {
            baking: 'Выпечка',
            pastries: 'Пирожные',
            cakes: 'Торты',
            breakfasts: 'Завтраки',
            sandwiches: 'Сэндвичи',
            bread: 'Хлеб',
            lemonades: 'Морсы и лимонады',
            drinks: 'Кофе и напитки'
        };
    }

    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        if (!productId) return;

        this.product = getProductById(productId);
        if (!this.product) return;

        this.renderProduct();
        this.renderBreadcrumbs();
        this.renderSimilarProducts();
        this.renderReviews();
    }

    renderProduct() {
        const { name, price, oldPrice, imagePng, imageWebp } = this.product;
        const hasDiscount = oldPrice && oldPrice > price;

        document.title = `${name} - Тёплый Хлеб`;

        const titleEl = document.getElementById('category-title');
        if (titleEl) titleEl.textContent = name;

        const mainImage = document.querySelector('.goods__left picture');
        if (mainImage) {
            mainImage.innerHTML = `
                <source type="image/webp" srcset="${imageWebp} 1x">
                <source type="image/jpeg" srcset="${imagePng} 1x">
                <img src="${imagePng}" alt="${name}" width="544" height="320">
            `;
        }

        const priceWrapper = document.querySelector('.goods__price');
        if (priceWrapper) {
            priceWrapper.innerHTML = hasDiscount
                ? `
                <div class="goods__price-wrapper">
                    <span class="goods__price goods__span--old">${oldPrice} ₽</span>
                    <span class="goods__span-label">Обычная</span>
                </div>
                <div class="goods__price-wrapper">
                    <span class="goods__span goods__span--new">${price} ₽</span>
                    <span class="goods__span-label">Со скидкой</span>
                </div>
                `
                : `
                <div class="goods__price-wrapper">
                    <span class="goods__span goods__span--new">${price} ₽</span>
                    <span class="goods__span-label">Цена</span>
                </div>
                `;
        }

        const bonusEl = document.querySelector('.goods__bonus');
        if (bonusEl) {
            const bonusAmount = Math.floor(price * 0.05);
            bonusEl.innerHTML = `Вы получите <b>${bonusAmount} бонусов</b>`;
        }
    }

    renderBreadcrumbs() {
        const categoryName = this.categoryNames[this.product.category] || 'Товары';
        const breadcrumbNav = document.querySelector('.catalog__nav');
        if (!breadcrumbNav) return;

        breadcrumbNav.innerHTML = `
            <a class="catalog__text" href="index.html">Главная</a>
            <svg class="catalog__svg" width="24" height="24"><use href="${sprite}#arrow"></use></svg>
            <a class="catalog__text" href="index.html#catalog">Каталог</a>
            <svg class="catalog__svg" width="24" height="24"><use href="${sprite}#arrow"></use></svg>
            <a class="catalog__text" href="filter.html?category=${this.product.category}">${categoryName}</a>
            <svg class="catalog__svg" width="24" height="24"><use href="${sprite}#arrow"></use></svg>
            <span class="catalog__text">${this.product.name}</span>
        `;
    }

    renderSimilarProducts() {
        const allProducts = getAllProducts();
        const similarProducts = allProducts
            .filter(p => p.category === this.product.category && p.id !== this.product.id)
            .slice(0, 4);

        const similarList = document.querySelector('.card-aside');
        if (!similarList) return;

        similarList.innerHTML = similarProducts.map(product => `
            <li class="card-aside__item">
                <a class="card-aside__link" href="productCard.html?id=${product.id}">
                    <div class="card-aside__wrapper">
                        <picture>
                            <source type="image/webp" srcset="${product.imageWebp} 1x">
                            <source type="image/jpeg" srcset="${product.imagePng} 1x">
                            <img src="${product.imagePng}" alt="${product.name}" width="80" height="80">
                        </picture>
                    </div>
                    <div class="card-aside__price-wrapper">
                        <span>${product.price} ₽</span>
                    </div>
                </a>
            </li>
        `).join('');
    }

    renderReviews() {
    const reviews = [...this.reviews]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

        const reviewCount = document.querySelector('.page-card__article u');
        if (reviewCount) reviewCount.textContent = `${reviews.length} отзывов`;

        const userReviewList = document.querySelector('.user-review');
        if (!userReviewList) return;

        userReviewList.innerHTML = reviews.map(review => `
            <li class="user-review__item">
              <div class="user-review__wrapper">
                  <div class="user-review__img">
                      <svg width="16" height="16"><use href="${sprite}#user"></use></svg>
                      <span>${review.author}</span>
                  </div>

                  <div class="user-review__stars">
                      <svg width="96" height="16">
                        <use href="${sprite}#rating-${review.rating}"></use>
                      </svg>
                      <span class="user-review__date">${review.date}</span>
                  </div>

                  <p>${review.text}</p>
              </div>
          </li>
      `).join('');
    }
}

const productPage = new ProductPage();

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasIdParam = urlParams.has('id');
    const isProductPage = window.location.pathname.endsWith('productCard.html');
    if (isProductPage || hasIdParam) productPage.init();
});

export { productPage };