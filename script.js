// Menu mobile toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Funções de navegação
function handleSobreNos() {
    document.getElementById('sobre-nos').scrollIntoView({ behavior: 'smooth' });
    closeMobileMenu();
}

function handleServicos() {
    document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' });
    closeMobileMenu();
}

function handleAgendamentos() {
    document.getElementById('agendamentos').scrollIntoView({ behavior: 'smooth' });
    closeMobileMenu();
}

function handleContatos() {
    document.getElementById('contatos').scrollIntoView({ behavior: 'smooth' });
    closeMobileMenu();
}

function handlePhoneClick() {
    window.location.href = 'tel:+5521993180404';
}

function handleOrcamento() {
    document.getElementById('agendamentos').scrollIntoView({ behavior: 'smooth' });
}

// Fechar menu mobile após clique
function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

// Fechar menu ao clicar fora (para mobile)
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// Validação do formulário de agendamento
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('agendamento-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validar campos
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const servico = document.getElementById('servico').value;
            const data = document.getElementById('data').value;
            
            if (!nome || !email || !telefone || !servico || !data) {
                showMessage('Por favor, preencha todos os campos obrigatórios.', 'erro');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Por favor, insira um e-mail válido.', 'erro');
                return;
            }
            
            // Validar telefone (formato brasileiro básico)
            const telefoneRegex = /^[\d\s\-()+]{10,}$/;
            if (!telefoneRegex.test(telefone)) {
                showMessage('Por favor, insira um telefone válido.', 'erro');
                return;
            }
            
            // Simular envio do formulário
            showMessage('Agendamento solicitado com sucesso! Entraremos em contato em breve.', 'sucesso');
            
            // Limpar formulário (opcional)
            // form.reset();
            
            // Aqui você poderia enviar os dados para um servidor via AJAX
            console.log('Dados do agendamento:', {
                nome,
                email,
                telefone,
                servico,
                data,
                mensagem: document.getElementById('mensagem').value
            });
        });
    }
    
    // Adicionar máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            if (value.length > 10) {
                value = `${value.slice(0, 10)}-${value.slice(10)}`;
            } else if (value.length > 7) {
                value = `${value.slice(0, 7)}-${value.slice(7)}`;
            }
            
            e.target.value = value;
        });
    }
    
    // Adicionar formatação de data atual
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.min = hoje;
    }
});

// Função para mostrar mensagens
function showMessage(message, type) {
    const mensagemDiv = document.getElementById('agendamento-mensagem');
    if (mensagemDiv) {
        mensagemDiv.textContent = message;
        mensagemDiv.className = `mensagem ${type}`;
        
        // Scroll suave até a mensagem
        mensagemDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Limpar mensagem após 5 segundos
        setTimeout(() => {
            mensagemDiv.textContent = '';
            mensagemDiv.className = 'mensagem';
        }, 5000);
    }
}

// Adicionar efeito de scroll suave para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os links que começam com #
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
});

// Verificar se as imagens existem (para desenvolvimento)
window.addEventListener('load', function() {
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.addEventListener('error', function() {
            console.warn('Logo image not found. Please check the image path.');
            this.style.backgroundColor = '#3498db';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = 'Logo Placeholder';
        });
    }
    
    const phoneIcon = document.querySelector('.phone-icon');
    if (phoneIcon) {
        phoneIcon.addEventListener('error', function() {
            console.warn('Phone icon image not found. Please check the image path.');
            this.style.display = 'none';
        });
    }
});