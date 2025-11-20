import { getProductsByCategory } from './cards.js';

class CategoryProducts {
    constructor() {
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

        this.currentCategory = null;
    }

    init() {
        const urlParams = new URLSearchParams(window.location.search);
        this.currentCategory = urlParams.get('category') || 'pastries';
        this.updatePageInfo();
        this.renderProducts();
    }

    updatePageInfo() {
        const categoryName = this.categoryNames[this.currentCategory] || 'Товары';

        const breadcrumb = document.getElementById('breadcrumb-category');
        if (breadcrumb) breadcrumb.textContent = categoryName;

        const title = document.getElementById('category-title');
        if (title) title.textContent = categoryName;

        document.title = `${categoryName} - Тёплый Хлеб`;
    }

    renderProducts() {
        const productsList = document.getElementById('products-list');
        if (!productsList) return;

        const products = getProductsByCategory(this.currentCategory);

        if (products.length === 0) {
            productsList.innerHTML = `
                <li class="card__empty">
                    <p>В этой категории пока нет товаров</p>
                </li>
            `;
            return;
        }

        const html = products.map(product => this.createProductCard(product)).join('');
        productsList.innerHTML = html;

        this.initProductHandlers();
    }

    createProductCard(product) {
        const hasDiscount = product.oldPrice && product.oldPrice > product.price;
        const badge = product.badge || '';

        return `
            <li class="card__item">
                <div class="product-card">
                    <a class="product-card__link" href="product.html?id=${product.id}">
                        <div class="product-card__image">
                            <picture>
                                <source type="image/webp" srcset="${product.image}.webp 1x">
                                <source type="image/jpeg" srcset="${product.image}.png 1x">
                                <img src="${product.image}.png" alt="${product.name}" width="272" height="160" loading="lazy">
                            </picture>
                            ${badge ? `<span class="product-card__discount">${badge}</span>` : ''}
                        </div>

                        <div class="product-card__info">
                            <div class="product-card__price">
                                <div class="product-card__price-right">
                                    <span class="product-card__price-new">${product.price} ₽</span>
                                    ${hasDiscount ? `<span class="product-card__price-label">Со скидкой</span>` : ''}
                                </div>
                                <div class="product-card__price-left">
                                  ${hasDiscount ? `<span class="product-card__price-old">${product.oldPrice} ₽</span>` : ''}
                                  ${hasDiscount ? `<span class="product-card__price-label">Обычная</span>` : ''}
                                </div>
                            </div>

                            <h3 class="product-card__title">${product.name}</h3>

                            <div class="product-card__rating"></div>
                        </div>
                    </a>

                    <button 
                        class="product-card__favorite" 
                        aria-label="Добавить в избранное"
                        data-product-id="${product.id}"
                        data-favorite
                    >
                        <svg class="product-card__favorite-svg" width="24" height="24">
                            <use href="./assets/images/icon/sprite.svg#heart"></use>
                        </svg>
                    </button>

                    <button 
                        class="product-card__btn"
                        data-product-id="${product.id}"
                        data-add-to-cart
                    >
                        В корзину
                    </button>
                </div>
            </li>
        `;
    }

    renderRating(rating) {
        const fullStars = Math.floor(rating);
        let stars = '';

        for (let i = 0; i < 5; i++) {
            stars += `
                <svg width="16" height="16" fill="${i < fullStars ? '#ffc107' : '#e0e0e0'}">
                    <use href="./assets/images/icon/sprite.svg#star"></use>
                </svg>
            `;
        }

        return stars;
    }

    initProductHandlers() {
        document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                this.addToCart(productId);
            });
        });

        document.querySelectorAll('[data-favorite]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                this.toggleFavorite(productId, e.currentTarget);
            });
        });
    }

    addToCart(productId) {}

    toggleFavorite(productId, button) {
        button.classList.toggle('product-card__favorite--active');
    }
}

const categoryProducts = new CategoryProducts();
window.categoryProducts = categoryProducts;

document.addEventListener('DOMContentLoaded', () => {
    categoryProducts.init();
});

export default categoryProducts;