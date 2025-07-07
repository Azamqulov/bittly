// Header Mobile Menu
class Header {
    constructor() {
        this.header = document.querySelector('[data-js-header]');
        this.overlay = document.querySelector('[data-js-header-overlay]');
        this.burgerButton = document.querySelector('[data-js-header-burger-button]');
        
        if (this.burgerButton) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.burgerButton.addEventListener('click', this.toggleMenu.bind(this));
        
        // Close menu when clicking on overlay
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.closeMenu();
                }
            });
        }
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen()) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.isMenuOpen()) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.burgerButton.classList.add('is-active');
        this.overlay.classList.add('is-active');
        document.documentElement.classList.add('is-lock');
    }

    closeMenu() {
        this.burgerButton.classList.remove('is-active');
        this.overlay.classList.remove('is-active');
        document.documentElement.classList.remove('is-lock');
    }

    isMenuOpen() {
        return this.overlay.classList.contains('is-active');
    }
}

// Exchange Form Logic
class ExchangeForm {
    constructor() {
        this.initCurrencySelectors();
        this.initFormValidation();
    }

    initCurrencySelectors() {
        const currencySelectors = document.querySelectorAll('.currency-selector');
        
        currencySelectors.forEach(selector => {
            const options = selector.querySelectorAll('.currency-option');
            
            options.forEach(option => {
                option.addEventListener('click', () => {
                    // Remove active class from all options in this selector
                    options.forEach(opt => opt.classList.remove('currency-option--active'));
                    
                    // Add active class to clicked option
                    option.classList.add('currency-option--active');
                    
                    // Update related input icon and currency
                    this.updateInputDisplay(selector, option);
                });
            });
        });
    }

    updateInputDisplay(selector, selectedOption) {
        const card = selector.closest('.exchange-card');
        const inputIcon = card.querySelector('.input-group__icon img');
        const currencySpan = card.querySelector('.input-group__currency');
        
        const optionIcon = selectedOption.querySelector('img');
        const optionText = selectedOption.querySelector('span').textContent;
        
        if (inputIcon && optionIcon) {
            inputIcon.src = optionIcon.src;
            inputIcon.alt = optionIcon.alt;
        }
        
        if (currencySpan) {
            // Extract currency code from option text
            const currencyCode = optionText.split(' ').pop();
            currencySpan.textContent = currencyCode;
        }
    }

    initFormValidation() {
        const form = document.querySelector('.exchange-form__form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }

        // Real-time validation
        const inputs = document.querySelectorAll('.input-group__field');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const isValid = field.checkValidity();
        
        if (!isValid) {
            field.style.borderColor = 'var(--color-primary)';
        } else {
            field.style.borderColor = 'var(--color-border)';
        }
        
        return isValid;
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const isValid = form.checkValidity();
        
        if (isValid) {
            // Here you would typically send data to your backend
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Show success message or redirect
            this.showSuccessMessage();
        } else {
            // Validate all fields to show errors
            const inputs = form.querySelectorAll('.input-group__field');
            inputs.forEach(input => this.validateField(input));
        }
    }

    showSuccessMessage() {
        // Simple success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-primary);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 600;
        `;
        notification.textContent = 'Заявка успешно отправлена!';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Smooth Scrolling for Anchor Links
class SmoothScroll {
    constructor() {
        this.initSmoothScroll();
    }

    initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Responsive Card Visibility (from original code)
class ResponsiveCards {
    constructor() {
        this.handleCardVisibility();
        window.addEventListener('resize', () => this.handleCardVisibility());
    }

    handleCardVisibility() {
        const card = document.querySelector('.hero__item--alt');
        if (!card) return;

        const screenWidth = window.innerWidth;
        const shouldBeVisible = screenWidth >= 767.98 && screenWidth <= 1279.98;

        card.classList.toggle('visually-hidden', !shouldBeVisible);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Header();
    new ExchangeForm();
    new SmoothScroll();
    new ResponsiveCards();
});

// Export for potential external use
export { Header, ExchangeForm, SmoothScroll, ResponsiveCards };