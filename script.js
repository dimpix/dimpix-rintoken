// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initScrollHeader();
    initMobileMenu();
    initCopyAddressButton();
    initContractCopy();
    initModalHandlers();
    initAnimations();
    initScrollAnimations();
    initParallaxEffects();
    initFadeInElements();
    initCardTiltEffect();
    initLivePriceUpdates();
});

// Изменение стиля хедера при скролле
function initScrollHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
}

// Копирование адреса контракта в баннере
function initContractCopy() {
    const copyButton = document.getElementById('copy-contract');
    const contractAddress = document.getElementById('contract-address');
    const copyMessage = document.getElementById('copy-message');
    
    if (!copyButton || !contractAddress) return;
    
    copyButton.addEventListener('click', () => {
        const textToCopy = contractAddress.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Успешно скопировано
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.style.background = '#18ffff';
            copyMessage.classList.add('visible');
            
            // Вернуть оригинальную иконку через 2 секунды
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                copyButton.style.background = '';
                copyMessage.classList.remove('visible');
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
        });
    });
}

// Копирование адреса контракта
function initCopyAddressButton() {
    const copyButton = document.getElementById('copy-address');
    const contractText = document.getElementById('contract-text');
    
    if (!copyButton || !contractText) return;
    
    copyButton.addEventListener('click', () => {
        const textToCopy = contractText.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Успешно скопировано
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.style.color = '#43cea2';
            
            // Вернуть оригинальную иконку через 2 секунды
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                copyButton.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
        });
    });
}

// Обработчики модальных окон
function initModalHandlers() {
    const whitePaperBtn = document.getElementById('whitepaper-btn');
    const whitePaperModal = document.getElementById('whitepaper-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (!whitePaperBtn || !whitePaperModal || !closeModal) return;
    
    whitePaperBtn.addEventListener('click', (e) => {
        e.preventDefault();
        whitePaperModal.style.display = 'flex';
        setTimeout(() => {
            whitePaperModal.classList.add('active');
        }, 10);
    });
    
    closeModal.addEventListener('click', () => {
        whitePaperModal.classList.remove('active');
        setTimeout(() => {
            whitePaperModal.style.display = 'none';
        }, 300);
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === whitePaperModal) {
            whitePaperModal.classList.remove('active');
            setTimeout(() => {
                whitePaperModal.style.display = 'none';
            }, 300);
        }
    });
}

// Инициализация кастомного курсора с буквой "R"
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    const moveCursor = (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    // Эффект при наведении на ссылки и кнопки
    const links = document.querySelectorAll('a, button, .btn, .feature-card, .social-link');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-grow');
            cursorDot.classList.add('cursor-dot-grow');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
            cursorDot.classList.remove('cursor-dot-grow');
        });
    });
    
    // Показываем курсор только при движении мыши
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// Анимации элементов при прокрутке
function initAnimations() {
    const animatedElements = document.querySelectorAll('.section, .feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}
// Эффект параллакса для элементов
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Параллакс для фоновых элементов в hero секции
        document.querySelectorAll('.hero:before, .hero:after').forEach(element => {
            const speed = element.classList.contains('hero:before') ? 0.2 : 0.4;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Параллакс для изображений и карточек
        document.querySelectorAll('.hero-image, .feature-card').forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            
            if (rect.top < viewHeight && rect.bottom > 0) {
                const scrollSpeed = 0.1 + (index * 0.02);
                const yPos = (scrollTop - rect.top) * scrollSpeed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Анимация появления элементов при скролле
function initFadeInElements() {
    // Добавляем класс fade-in ко всем основным элементам
    const elements = document.querySelectorAll('.section-header, .feature-card, .info-item, .tokenomics-item, .step-card, .community-card');
    elements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Функция проверки видимости элементов
    function checkVisibility() {
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementVisible = 150;
            
            if (elementTop < viewHeight - elementVisible) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }
    
    // Проверяем при загрузке и скролле
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
}

// 3D эффект наклона для карточек при наведении
function initCardTiltEffect() {
    const cards = document.querySelectorAll('.feature-card, .info-item, .metric-card, .hero-feature-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            // Ограничиваем угол наклона до 10 градусов
            const tiltX = dy / yc * 10;
            const tiltY = -(dx / xc * 10);
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Обновление цены (имитация динамических данных)
function initLivePriceUpdates() {
    if (!document.querySelector('.live-price')) return;
    
    const priceValue = document.querySelector('.price-value');
    const priceChange = document.querySelector('.price-change');
    
    // Имитируем динамические обновления цены каждые 5 секунд
    setInterval(() => {
        // Генерируем случайные изменения цены в диапазоне ±0.0003
        const priceDelta = (Math.random() * 0.0006 - 0.0003).toFixed(6);
        const currentPrice = parseFloat(priceValue.textContent.replace('$', ''));
        const newPrice = (currentPrice + parseFloat(priceDelta)).toFixed(4);
        
        // Обновляем значение цены с анимацией
        priceValue.textContent = `$${newPrice}`;
        priceValue.classList.add('price-updated');
        setTimeout(() => priceValue.classList.remove('price-updated'), 500);
        
        // Обновляем процент изменения
        const changePercent = (priceDelta / currentPrice * 100).toFixed(2);
        if (changePercent >= 0) {
            priceChange.textContent = `+${changePercent}%`;
            priceChange.classList.remove('down');
            priceChange.classList.add('up');
        } else {
            priceChange.textContent = `${changePercent}%`;
            priceChange.classList.remove('up');
            priceChange.classList.add('down');
        }
    }, 5000);
}
