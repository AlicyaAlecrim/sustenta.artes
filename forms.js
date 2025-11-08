// Forms JavaScript for Sustenta.Artes

document.addEventListener('DOMContentLoaded', function() {
    // Order Form Handler
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleOrderSubmit(this);
        });
    }
    
    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmit(this);
        });
    }
    
    // FAQ Toggle
    initFAQ();
    
    // Form validation
    initFormValidation();
    
    function handleOrderSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!validateOrderForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Create WhatsApp message
        const message = createOrderWhatsAppMessage(data);
        
        // Simulate form processing
        setTimeout(() => {
            // Open WhatsApp
            const whatsappUrl = `https://wa.me/5517981009230?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showSuccessMessage('Encomenda enviada! Você será redirecionado para o WhatsApp.');
            
            // Reset form
            form.reset();
            
            // Reset button
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }, 1000);
    }
    
    function handleContactSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!validateContactForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Create WhatsApp message
        const message = createContactWhatsAppMessage(data);
        
        // Simulate form processing
        setTimeout(() => {
            // Open WhatsApp
            const whatsappUrl = `https://wa.me/5517981009230?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showSuccessMessage('Mensagem enviada! Você será redirecionado para o WhatsApp.');
            
            // Reset form
            form.reset();
            
            // Reset button
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }, 1000);
    }
    
    function createOrderWhatsAppMessage(data) {
        let message = `🎨 *NOVA ENCOMENDA - SUSTENTA.ARTES*\n\n`;
        message += `👤 *Cliente:* ${data.name}\n`;
        message += `📧 *E-mail:* ${data.email}\n`;
        message += `📱 *WhatsApp:* ${data.phone}\n`;
        
        if (data.city) {
            message += `🏙️ *Cidade:* ${data.city}\n`;
        }
        
        message += `\n🛍️ *DETALHES DA ENCOMENDA:*\n`;
        message += `📦 *Tipo de Produto:* ${getProductTypeLabel(data['product-type'])}\n`;
        message += `📝 *Descrição:* ${data.description}\n`;
        
        if (data.deadline) {
            message += `⏰ *Prazo Desejado:* ${getDeadlineLabel(data.deadline)}\n`;
        }
        
        if (data.budget) {
            message += `💰 *Orçamento Estimado:* ${getBudgetLabel(data.budget)}\n`;
        }
        
        if (data.references) {
            message += `🎯 *Referências:* ${data.references}\n`;
        }
        
        if (data['additional-info']) {
            message += `ℹ️ *Informações Adicionais:* ${data['additional-info']}\n`;
        }
        
        message += `\n✅ *Status:* Aguardando orçamento`;
        
        return message;
    }
    
    function createContactWhatsAppMessage(data) {
        let message = `💬 *CONTATO - SUSTENTA.ARTES*\n\n`;
        message += `👤 *Nome:* ${data.name}\n`;
        message += `📧 *E-mail:* ${data.email}\n`;
        
        if (data.phone) {
            message += `📱 *WhatsApp:* ${data.phone}\n`;
        }
        
        message += `📋 *Assunto:* ${getSubjectLabel(data.subject)}\n`;
        message += `💬 *Mensagem:* ${data.message}`;
        
        return message;
    }
    
    function getProductTypeLabel(value) {
        const labels = {
            'cinzeiro': 'Cinzeiro/Porta-objetos',
            'acessorio': 'Acessórios (Chaveiros, Brincos, etc.)',
            'quadro': 'Quadros e Artes em Resina',
            'customizacao-roupa': 'Customização de Roupas',
            'bolsa': 'Bolsas Customizadas',
            'outro': 'Outro'
        };
        return labels[value] || value;
    }
    
    function getDeadlineLabel(value) {
        const labels = {
            '1-semana': '1 semana',
            '2-semanas': '2 semanas',
            '1-mes': '1 mês',
            '2-meses': '2 meses ou mais'
        };
        return labels[value] || value;
    }
    
    function getBudgetLabel(value) {
        const labels = {
            'ate-50': 'Até R$ 50',
            '50-100': 'R$ 50 - R$ 100',
            '100-200': 'R$ 100 - R$ 200',
            '200-mais': 'R$ 200 ou mais'
        };
        return labels[value] || value;
    }
    
    function getSubjectLabel(value) {
        const labels = {
            'duvida-produto': 'Dúvida sobre produto',
            'encomenda': 'Interesse em encomenda',
            'orcamento': 'Solicitação de orçamento',
            'parcerias': 'Parcerias',
            'sugestao': 'Sugestões',
            'outro': 'Outro'
        };
        return labels[value] || value;
    }
    
    function validateOrderForm(data) {
        const required = ['name', 'email', 'phone', 'product-type', 'description', 'agree-terms'];
        
        for (let field of required) {
            if (!data[field] || data[field].trim() === '') {
                showErrorMessage(`Por favor, preencha o campo obrigatório: ${getFieldLabel(field)}`);
                return false;
            }
        }
        
        // Email validation
        if (!isValidEmail(data.email)) {
            showErrorMessage('Por favor, insira um e-mail válido.');
            return false;
        }
        
        // Phone validation
        if (!isValidPhone(data.phone)) {
            showErrorMessage('Por favor, insira um WhatsApp válido no formato (11) 99999-9999.');
            return false;
        }
        
        return true;
    }
    
    function validateContactForm(data) {
        const required = ['name', 'email', 'subject', 'message', 'agree'];
        
        for (let field of required) {
            if (!data[field] || data[field].trim() === '') {
                showErrorMessage(`Por favor, preencha o campo obrigatório: ${getFieldLabel(field)}`);
                return false;
            }
        }
        
        // Email validation
        if (!isValidEmail(data.email)) {
            showErrorMessage('Por favor, insira um e-mail válido.');
            return false;
        }
        
        return true;
    }
    
    function getFieldLabel(field) {
        const labels = {
            'name': 'Nome',
            'email': 'E-mail',
            'phone': 'WhatsApp',
            'product-type': 'Tipo de Produto',
            'description': 'Descrição',
            'agree-terms': 'Concordar com os termos',
            'subject': 'Assunto',
            'message': 'Mensagem',
            'agree': 'Concordar com o contato'
        };
        return labels[field] || field;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return phoneRegex.test(phone);
    }
    
    function showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    function showErrorMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'notification error';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #e74c3c;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-toggle').textContent = '+';
                });
                
                // Toggle current item
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggle.textContent = '−';
                }
            });
        });
    }
    
    function initFormValidation() {
        // Real-time validation for email fields
        document.querySelectorAll('input[type="email"]').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    this.classList.add('error');
                    showFieldError(this, 'E-mail inválido');
                } else {
                    this.classList.remove('error');
                    hideFieldError(this);
                }
            });
        });
        
        // Real-time validation for phone fields
        document.querySelectorAll('input[type="tel"]').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value && !isValidPhone(this.value)) {
                    this.classList.add('error');
                    showFieldError(this, 'Formato: (11) 99999-9999');
                } else {
                    this.classList.remove('error');
                    hideFieldError(this);
                }
            });
        });
        
        // Clear errors on input
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                hideFieldError(this);
            });
        });
    }
    
    function showFieldError(input, message) {
        hideFieldError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.25rem;
        `;
        input.parentNode.appendChild(errorDiv);
    }
    
    function hideFieldError(input) {
        const errorMessage = input.parentNode.querySelector('.field-error');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Add CSS for form styles
    const formStyles = document.createElement('style');
    formStyles.textContent = `
        .form-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: var(--color-white);
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .form-intro {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .form-intro h2 {
            color: var(--color-primary);
            margin-bottom: 1rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--color-dark);
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid var(--color-light-gray);
            border-radius: 5px;
            font-size: 1rem;
            transition: var(--transition);
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--color-primary);
        }
        
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #e74c3c;
        }
        
        .checkbox-group {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .checkbox-label {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            cursor: pointer;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .checkbox-label input[type="checkbox"] {
            width: auto;
            margin: 0;
        }
        
        .submit-btn {
            width: 100%;
            padding: 1rem;
            background-color: var(--color-accent);
            color: var(--color-white);
            border: none;
            border-radius: 5px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .submit-btn:hover:not(:disabled) {
            background-color: #B8541A;
            transform: translateY(-2px);
        }
        
        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .contact-methods {
            padding: 3rem 0;
            background-color: var(--color-light);
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .contact-card {
            background-color: var(--color-white);
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            transition: var(--transition);
        }
        
        .contact-card:hover {
            transform: translateY(-5px);
        }
        
        .contact-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .contact-btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            margin: 1rem 0;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            transition: var(--transition);
        }
        
        .whatsapp-btn {
            background-color: #25D366;
            color: white;
        }
        
        .email-btn {
            background-color: var(--color-accent);
            color: white;
        }
        
        .instagram-btn {
            background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
            color: white;
        }
        
        .contact-info {
            display: block;
            color: var(--color-gray);
            font-size: 0.9rem;
        }
        
        .faq-section {
            padding: 3rem 0;
            background-color: var(--color-white);
        }
        
        .faq-list {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .faq-item {
            border-bottom: 1px solid var(--color-light-gray);
            margin-bottom: 1rem;
        }
        
        .faq-question {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .faq-question:hover {
            color: var(--color-primary);
        }
        
        .faq-toggle {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--color-accent);
        }
        
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .faq-answer p {
            padding-bottom: 1rem;
            color: var(--color-gray);
        }
        
        .business-hours {
            padding: 3rem 0;
            background-color: var(--color-light);
        }
        
        .hours-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        
        .hours-card {
            background-color: var(--color-white);
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        
        .hours-card h3 {
            color: var(--color-primary);
            margin-bottom: 1rem;
        }
        
        .hours-info p {
            margin-bottom: 0.5rem;
            color: var(--color-gray);
        }
        
        @media screen and (max-width: 767px) {
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .contact-grid {
                grid-template-columns: 1fr;
            }
            
            .hours-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(formStyles);
});

// Add page-specific styles
const pageStyles = document.createElement('style');
pageStyles.textContent = `
    .page-header {
        background: linear-gradient(135deg, var(--color-primary) 0%, #3A5A3A 100%);
        color: var(--color-white);
        padding: 6rem 0 3rem;
        margin-top: 80px;
        text-align: center;
    }
    
    .page-title {
        font-family: var(--font-display);
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .page-subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        max-width: 600px;
        margin: 0 auto;
    }
    
    .how-it-works {
        padding: 3rem 0;
        background-color: var(--color-white);
    }
    
    .steps-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
    }
    
    .step-card {
        text-align: center;
        padding: 2rem 1rem;
    }
    
    .step-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .step-card h3 {
        color: var(--color-primary);
        margin-bottom: 1rem;
    }
    
    .order-form-section,
    .contact-form-section {
        padding: 3rem 0;
        background-color: var(--color-light);
    }
    
    .previous-works {
        padding: 3rem 0;
        background-color: var(--color-white);
    }
    
    .section-subtitle {
        text-align: center;
        color: var(--color-gray);
        margin-bottom: 2rem;
    }
    
    .works-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }
    
    .work-item {
        background-color: var(--color-white);
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        transition: var(--transition);
    }
    
    .work-item:hover {
        transform: translateY(-5px);
    }
    
    .work-image {
        height: 200px;
        background: linear-gradient(45deg, var(--color-light-gray), var(--color-gray));
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .work-placeholder {
        color: var(--color-white);
        font-weight: 600;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        padding: 1rem;
        border-radius: 5px;
    }
    
    .work-info {
        padding: 1rem;
    }
    
    .work-info h4 {
        color: var(--color-primary);
        margin-bottom: 0.5rem;
    }
    
    .work-info p {
        color: var(--color-gray);
        font-size: 0.9rem;
    }
    
    .important-info {
        padding: 3rem 0;
        background-color: var(--color-light);
    }
    
    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }
    
    .info-card {
        background-color: var(--color-white);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
    
    .info-card h3 {
        color: var(--color-primary);
        margin-bottom: 1rem;
    }
    
    .values-section {
        padding: 3rem 0;
        background-color: var(--color-light);
    }
    
    .values-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }
    
    .value-card {
        background-color: var(--color-white);
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        transition: var(--transition);
    }
    
    .value-card:hover {
        transform: translateY(-5px);
    }
    
    .value-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .value-card h3 {
        color: var(--color-primary);
        margin-bottom: 1rem;
    }
    
    .about-story {
        padding: 3rem 0;
        background-color: var(--color-white);
    }
    
    .story-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
    }
    
    .story-text h2 {
        color: var(--color-primary);
        margin-bottom: 1.5rem;
    }
    
    .story-image {
        display: flex;
        justify-content: center;
    }
    
    .image-placeholder {
        width: 300px;
        height: 300px;
        background: linear-gradient(45deg, var(--color-turquoise), var(--color-primary));
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-white);
        font-weight: 600;
        text-align: center;
    }
    
    .process-section {
        padding: 3rem 0;
        background-color: var(--color-light);
    }
    
    .process-steps {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }
    
    .process-step {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
    }
    
    .step-number {
        width: 50px;
        height: 50px;
        background-color: var(--color-accent);
        color: var(--color-white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        flex-shrink: 0;
    }
    
    .step-content h3 {
        color: var(--color-primary);
        margin-bottom: 0.5rem;
    }
    
    .mission-section {
        padding: 3rem 0;
        background-color: var(--color-white);
    }
    
    .mission-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .mission-card {
        background: linear-gradient(135deg, var(--color-primary) 0%, #3A5A3A 100%);
        color: var(--color-white);
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
    }
    
    .mission-card h3 {
        color: var(--color-turquoise);
        margin-bottom: 1rem;
    }
    
    .gallery-section {
        padding: 3rem 0;
        background-color: var(--color-light);
    }
    
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .gallery-item {
        height: 200px;
        background: linear-gradient(45deg, var(--color-light-gray), var(--color-gray));
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
    }
    
    .gallery-item:hover {
        transform: scale(1.05);
    }
    
    .gallery-placeholder {
        color: var(--color-white);
        font-weight: 600;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
        padding: 1rem;
        border-radius: 5px;
    }
    
    @media screen and (max-width: 767px) {
        .page-title {
            font-size: 2rem;
        }
        
        .steps-grid {
            grid-template-columns: 1fr;
        }
        
        .story-content {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .process-steps {
            grid-template-columns: 1fr;
        }
        
        .process-step {
            flex-direction: column;
            text-align: center;
        }
        
        .image-placeholder {
            width: 250px;
            height: 250px;
        }
    }
`;
document.head.appendChild(pageStyles);

