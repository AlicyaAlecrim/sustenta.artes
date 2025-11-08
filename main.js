// main.js - Versão Corrigida e Simplificada

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Sustenta.Artes - Inicializando...');
    
    // ============================================
    // MENU DRAWER LATERAL - MOBILE
    // ============================================
    
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.querySelector('.nav-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const closeBtn = document.querySelector('.drawer-close');
    const body = document.body;
    
    function openDrawer() {
        if (drawer && overlay) {
            drawer.classList.add('active');
            overlay.classList.add('active');
            body.classList.add('drawer-open');
            hamburger.classList.add('active');
        }
    }
    
    function closeDrawer() {
        if (drawer && overlay) {
            drawer.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('drawer-open');
            hamburger.classList.remove('active');
        }
    }
    
    // Inicializar menu drawer se os elementos existirem
    if (hamburger && drawer && overlay) {
        // Abrir drawer ao clicar no hamburger
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            openDrawer();
        });
        
        // Fechar drawer ao clicar no X
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                closeDrawer();
            });
        }
        
        // Fechar drawer ao clicar no overlay
        overlay.addEventListener('click', function(e) {
            e.stopPropagation();
            closeDrawer();
        });
        
        // Fechar drawer ao clicar nos links
        document.querySelectorAll('.drawer-link').forEach(link => {
            link.addEventListener('click', function(e) {
                closeDrawer();
                
                // Atualizar link ativo no drawer
                document.querySelectorAll('.drawer-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Atualizar também no menu desktop se existir
                const href = this.getAttribute('href');
                document.querySelectorAll('.nav-link').forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('href') === href) {
                        l.classList.add('active');
                    }
                });
            });
        });
        
        // Fechar drawer com tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeDrawer();
            }
        });
        
        // Fechar drawer ao redimensionar para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 767) {
                closeDrawer();
            }
        });
    }
    
    // FALLBACK: Menu antigo caso drawer não funcione
    else if (hamburger) {
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                body.classList.toggle('menu-open');
            });
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                });
            });
            
            document.addEventListener('click', function(event) {
                if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });
        }
    }
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    
    function createScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: var(--color-primary, #246f24);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        `;
        
        document.body.appendChild(scrollButton);
        
        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top when clicked
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    createScrollToTopButton();
    
    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .feature, .section-title').forEach(el => {
        observer.observe(el);
    });
    
    // ============================================
    // PRODUCT CARD HOVER EFFECTS
    // ============================================
    
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================================
    // FORM VALIDATION (UTILITIES)
    // ============================================
    
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                showError(input, 'Este campo é obrigatório');
            } else {
                input.classList.remove('error');
                hideError(input);
            }
            
            // Email validation
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('error');
                    showError(input, 'Por favor, insira um email válido');
                }
            }
            
            // Phone validation (Brazilian format)
            if (input.type === 'tel' && input.value.trim()) {
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (!phoneRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('error');
                    showError(input, 'Formato: (11) 99999-9999');
                }
            }
        });
        
        return isValid;
    }
    
    function showError(input, message) {
        hideError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.25rem;
        `;
        input.parentNode.appendChild(errorDiv);
    }
    
    function hideError(input) {
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // ============================================
    // PHONE NUMBER FORMATTING
    // ============================================
    
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length >= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 6) {
            value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
        } else if (value.length >= 2) {
            value = value.replace(/(\d{2})/, '($1) ');
        }
        
        input.value = value;
    }
    
    // Apply phone formatting to tel inputs
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
    
    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    initLazyLoading();
    
    console.log('✅ Sustenta.Artes - Site carregado com sucesso!');
    console.log('💚 Arte que transforma e sustenta');
    
}); // Fecha DOMContentLoaded

// ============================================
// GLOBAL UTILITY FUNCTIONS
// ============================================

window.SustentaArtes = {
    // Show notification
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            border-radius: 5px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    },
    
    // Format currency
    formatCurrency: function(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },
    
    // Format date
    formatDate: function(date) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    }
};

// ============================================
// ADD CSS ANIMATIONS
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 5px rgba(231, 76, 60, 0.3) !important;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    /* Classe para controlar o scroll quando drawer mobile está aberto */
    body.drawer-open {
        overflow: hidden !important;
        position: fixed !important;
        width: 100% !important;
    }
    
    /* Fade in up animation */
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);