class AuthModal {
    constructor() {
        this.selectors = {
            modal: '.auth-modal',
            overlay: '.auth-modal__overlay',
            close: '.auth-modal__close',
            content: '.auth-modal__content',
            loginContent: '.auth-modal__content--login',
            registerContent: '.auth-modal__content--register',
            
            loginForm: '#auth-modal-login-form',
            registerForm: '#auth-modal-register-form',
            
            togglePassword: '[data-toggle-password]',
            genderBtn: '[data-gender]',
            modalShow: '[data-modal-show]',
            
            genderInput: '#auth-modal-gender',
            regPassword: '#auth-modal-password',
            regPasswordRepeat: '#auth-modal-password-repeat'
        };
        
        this.modifiers = {
            active: 'auth-modal--active',
            contentActive: 'auth-modal__content--active',
            genderActive: 'auth-modal__gender-btn--active'
        };
        
        this.elements = {};
        
        this.template = `
            <div class="auth-modal" id="auth-modal">
                <div class="auth-modal__overlay"></div>
                <div class="auth-modal__container">
                    <button class="auth-modal__close" type="button" aria-label="Закрыть">✕</button>
                    <div class="auth-modal__content auth-modal__content--login" id="auth-modal-login">
                        <h2 class="auth-modal__title">Вход</h2>
                        <form class="auth-modal__form" id="auth-modal-login-form">
                            <div class="auth-modal__group">
                                <label class="auth-modal__label" for="auth-modal-login-phone">Телефон</label>
                                <input class="auth-modal__input" type="tel" id="auth-modal-login-phone" name="phone" placeholder="+7 9" required>
                            </div>
                            <div class="auth-modal__group">
                                <label class="auth-modal__label" for="auth-modal-login-password">Пароль</label>
                                <div class="auth-modal__password">
                                    <input class="auth-modal__input" type="password" id="auth-modal-login-password" name="password" required>
                                    <button class="auth-modal__toggle" type="button" data-toggle-password="auth-modal-login-password" aria-label="Показать пароль">👁</button>
                                </div>
                            </div>
                            <a href="#" class="auth-modal__link">Забыли пароль?</a>
                            <button class="auth-modal__submit" type="submit">Войти</button>
                            <button class="auth-modal__button auth-modal__button--secondary" type="button" data-modal-show="register">Регистрация</button>
                        </form>
                    </div>
                    <div class="auth-modal__content auth-modal__content--register" id="auth-modal-register">
                        <h2 class="auth-modal__title">Регистрация</h2>
                        <form class="auth-modal__form" id="auth-modal-register-form">
                            <div class="auth-modal__section">
                                <div class="auth-modal__grid">
                                    <div class="auth-modal__group">
                                        <label class="auth-modal__label" for="auth-modal-phone">Телефон</label>
                                        <input class="auth-modal__input" type="tel" id="auth-modal-phone" name="phone" placeholder="+7 9" required>
                                    </div>
                                    <div class="auth-modal__group">
                                        <label class="auth-modal__label" for="auth-modal-birthdate">Дата рождения</label>
                                        <input class="auth-modal__input" type="date" id="auth-modal-birthdate" name="birthdate" required>
                                    </div>
                                    <div class="auth-modal__group">
                                        <label class="auth-modal__label" for="auth-modal-surname">Фамилия</label>
                                        <input class="auth-modal__input" type="text" id="auth-modal-surname" name="surname" required>
                                    </div>
                                    <div class="auth-modal__group">
                                        <label class="auth-modal__label" for="auth-modal-name">Имя</label>
                                        <input class="auth-modal__input" type="text" id="auth-modal-name" name="name" required>
                                    </div>
                                    <div class="auth-modal__group">
                                        <label class="auth-modal__label" for="auth-modal-city">Населенный пункт</label>
                                        <select class="auth-modal__select" id="auth-modal-city" name="city" required>
                                            <option value="">Выберите населенный пункт</option>
                                            <option value="petrozavodsk">Петрозаводск</option>
                                            <option value="kostomuksha">Костомукша</option>
                                            <option value="kondopoga">Кондопога</option>
                                            <option value="sortavala">Сортавала</option>
                                            <option value="medvezhyegorsk">Медвежьегорск</option>
                                            <option value="olonets">Олонец</option>
                                            <option value="pudozh">Пудож</option>
                                            <option value="kem">Кемь</option>
                                            <option value="belomorsk">Беломорск</option>
                                        </select>
                                    </div>
                                    <div class="auth-modal__group">
                                        <label class="auth-modal__label" for="auth-modal-email">E-mail</label>
                                        <input class="auth-modal__input" type="email" id="auth-modal-email" name="email">
                                    </div>
                                    <div class="auth-modal__group">
                                        <label class="auth-modal__label" for="auth-modal-password">Пароль</label>
                                        <div class="auth-modal__password">
                                            <input class="auth-modal__input" type="password" id="auth-modal-password" name="password" required>
                                            <button class="auth-modal__toggle" type="button" data-toggle-password="auth-modal-password" aria-label="Показать пароль">👁</button>
                                        </div>
                                    </div>
                                    <div class="auth-modal__group">
                                        <label class="auth-modal__label" for="auth-modal-password-repeat">Повторите пароль</label>
                                        <div class="auth-modal__password">
                                            <input class="auth-modal__input" type="password" id="auth-modal-password-repeat" name="password-repeat" required>
                                            <button class="auth-modal__toggle" type="button" data-toggle-password="auth-modal-password-repeat" aria-label="Показать пароль">👁</button>
                                        </div>
                                    </div>
                                    <div class="auth-modal__group auth-modal__group--full">
                                        <label class="auth-modal__label">Пол</label>
                                        <div class="auth-modal__gender">
                                            <button class="auth-modal__gender-btn auth-modal__gender-btn--active" type="button" data-gender="male">Мужской</button>
                                            <button class="auth-modal__gender-btn" type="button" data-gender="female">Женский</button>
                                        </div>
                                        <input type="hidden" id="auth-modal-gender" name="gender" value="male">
                                    </div>
                                </div>
                            </div>
                            <div class="auth-modal__divider"></div>
                            <button class="auth-modal__submit" type="submit">Продолжить</button>
                            <button class="auth-modal__button auth-modal__button--secondary" type="button" data-modal-show="login">Вход</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        if (!document.querySelector(this.selectors.modal)) {
            document.body.insertAdjacentHTML('beforeend', this.template);
        }
        
        this.elements.modal = document.querySelector(this.selectors.modal);
        if (!this.elements.modal) return;
        
        this.elements.overlay = this.elements.modal.querySelector(this.selectors.overlay);
        this.elements.close = this.elements.modal.querySelector(this.selectors.close);
        this.elements.loginContent = this.elements.modal.querySelector(this.selectors.loginContent);
        this.elements.registerContent = this.elements.modal.querySelector(this.selectors.registerContent);
        this.elements.loginForm = document.querySelector(this.selectors.loginForm);
        this.elements.registerForm = document.querySelector(this.selectors.registerForm);
        
        this._initEventListeners();
    }

    _initEventListeners() {
        if (this.elements.overlay) {
            this.elements.overlay.addEventListener('click', () => this.close());
        }
        
        if (this.elements.close) {
            this.elements.close.addEventListener('click', () => this.close());
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) this.close();
        });
        
        document.querySelectorAll(this.selectors.modalShow).forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const type = btn.dataset.modalShow;
                if (type === 'login') this.showLogin();
                else if (type === 'register') this.showRegister();
            });
        });
        
        document.querySelectorAll(this.selectors.togglePassword).forEach(btn => {
            btn.addEventListener('click', () => {
                const inputId = btn.dataset.togglePassword;
                this.togglePassword(inputId);
            });
        });
        
        document.querySelectorAll(this.selectors.genderBtn).forEach(btn => {
            btn.addEventListener('click', () => {
                const gender = btn.dataset.gender;
                this.selectGender(btn, gender);
            });
        });
        
        if (this.elements.loginForm) {
            this.elements.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (this.elements.registerForm) {
            this.elements.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    showLogin() {
        if (!this.elements.modal) return;
        this._hideAllContent();
        this.elements.loginContent?.classList.add(this.modifiers.contentActive);
        this._open();
    }

    showRegister() {
        if (!this.elements.modal) return;
        this._hideAllContent();
        this.elements.registerContent?.classList.add(this.modifiers.contentActive);
        this._open();
    }

    close() {
        if (!this.elements.modal) return;
        this.elements.modal.classList.remove(this.modifiers.active);
        document.body.style.overflow = '';
    }

    isOpen() {
        return this.elements.modal?.classList.contains(this.modifiers.active) || false;
    }

    togglePassword(inputId) {
        const input = document.getElementById(inputId);
        if (input) input.type = input.type === 'password' ? 'text' : 'password';
    }

    selectGender(btn, gender) {
        document.querySelectorAll(this.selectors.genderBtn).forEach(button => {
            button.classList.remove(this.modifiers.genderActive);
        });
        btn.classList.add(this.modifiers.genderActive);
        const genderInput = document.querySelector(this.selectors.genderInput);
        if (genderInput) genderInput.value = gender;
    }

    handleLogin(e) {
        e.preventDefault();
        alert('Вход выполнен!');
        this.close();
    }

    handleRegister(e) {
        e.preventDefault();
        const password = document.querySelector(this.selectors.regPassword)?.value;
        const passwordRepeat = document.querySelector(this.selectors.regPasswordRepeat)?.value;
        if (password !== passwordRepeat) {
            alert('Пароли не совпадают!');
            return;
        }
        alert('Регистрация успешна!');
        this.close();
    }

    _open() {
        this.elements.modal.classList.add(this.modifiers.active);
        document.body.style.overflow = 'hidden';
    }

    _hideAllContent() {
        document.querySelectorAll(this.selectors.content).forEach(content => {
            content.classList.remove(this.modifiers.contentActive);
        });
    }
}

const authModal = new AuthModal();
window.authModal = authModal;

document.addEventListener('DOMContentLoaded', () => {
    authModal.init();
});

export default authModal;