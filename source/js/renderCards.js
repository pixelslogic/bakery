import { getProductsByCategory } from './cards.js';
import sprite from '../assets/images/icon/sprite.svg';

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

        productsList.innerHTML = products
            .map(product => this.createProductCard(product))
            .join('');

        this.initProductHandlers();
        this.renderAllStars();
    }

    createProductCard(product) {
        const hasDiscount = product.oldPrice && product.oldPrice > product.price;
        const badge = product.badge || '';

        return `
            <li class="card__item">
                <div class="product-card">
                    <a class="product-card__link" href="productCard.html?id=${product.id}">
                        <div class="product-card__image">
                            <picture>
                                <source type="image/webp" srcset="${product.imageWebp} 1x">
                                <source type="image/jpeg" srcset="${product.imagePng} 1x">
                                <img src="${product.imagePng}" alt="${product.name}" width="272" height="160" loading="lazy">
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

                            <div class="stars-svg" data-rating="${product.rating}"></div>
                        </div>
                    </a>

                    <button 
                        class="product-card__favorite" 
                        aria-label="Добавить в избранное"
                        data-product-id="${product.id}"
                        data-favorite
                    >
                        <svg class="product-card__favorite-svg" width="24" height="24">
                            <use href="${sprite}#heart"></use>
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

    renderAllStars() {
        const containers = document.querySelectorAll('.stars-svg[data-rating]');
        containers.forEach(container => {
            const rating = parseFloat(container.dataset.rating);
            container.innerHTML = this.renderStars(rating);
        });
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        let stars = '';

        for (let i = 0; i < 5; i++) {
            const color = i < fullStars ? '#b2793e' : '#e0e0e0';
            stars += `
                <svg width="16" height="16">
                    <use href="${sprite}#star" style="color: ${color}"></use>
                </svg>
            `;
        }

        return stars;
    }

    initProductHandlers() {
        const cartButtons = document.querySelectorAll('[data-add-to-cart]');
        const favoriteButtons = document.querySelectorAll('[data-favorite]');

        cartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const productId = e.currentTarget.dataset.productId;
                this.addToCart(productId);
            });
        });

        favoriteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const productId = e.currentTarget.dataset.productId;
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

document.addEventListener('DOMContentLoaded', () => {
    categoryProducts.init();
});

export default categoryProducts;