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

// Fecha menu mobile após clique
function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

// Fecha menu ao clicar fora (para mobile)
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// Validação visual do formulário (apenas mostra mensagem de sucesso simulada)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orcamento-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Coleta dados para validação
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const cidade = document.getElementById('cidade').value;
            
            // Valida campos obrigatórios
            if (!email) {
                showMessage('Por favor, informe seu e-mail.', 'erro');
                document.getElementById('email').focus();
                return;
            }
            
            if (!assunto) {
                showMessage('O assunto é obrigatório.', 'erro');
                document.getElementById('assunto').focus();
                return;
            }
            
            if (!cidade) {
                showMessage('Por favor, selecione sua cidade.', 'erro');
                document.getElementById('cidade').focus();
                return;
            }
            
            // Valid formato do email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Por favor, insira um e-mail válido.', 'erro');
                document.getElementById('email').focus();
                return;
            }
            
            // Valida celular se preenchido
            const celular = document.getElementById('celular').value.trim();
            if (celular) {
                const telefoneRegex = /^\([1-9]{2}\) [9]?[0-9]{4}-[0-9]{4}$/;
                if (!telefoneRegex.test(celular) && celular.replace(/\D/g, '').length > 0) {
                    showMessage('Por favor, insira um número de celular válido no formato (99) 99999-9999', 'erro');
                    document.getElementById('celular').focus();
                    return;
                }
            }
            
            showMessage('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
            
            // form.reset();
            // document.getElementById('assunto').value = 'Solicitação de Orçamento';
            
            // Exibir dados no console para debug (apenas visual)
            console.log('=== DADOS DO FORMULÁRIO ===');
            console.log('E-mail:', email);
            console.log('Assunto:', assunto);
            console.log('Cidade:', cidade);
            console.log('Celular:', celular || 'Não informado');
            console.log('Empresa:', document.getElementById('empresa').value.trim() || 'Não informado');
            console.log('M²:', document.getElementById('m2').value || 'Não informado');
            console.log('Cômodos:', document.getElementById('comodos').value || 'Não informado');
            console.log('Mensagem:', document.getElementById('mensagem').value.trim() || 'Não informada');
            console.log('========================');
        });
    }
    
    // Adiciona máscara para celular
    const celularInput = document.getElementById('celular');
    if (celularInput) {
        celularInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length <= 10) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Validação de M² (apenas números positivos)
    const m2Input = document.getElementById('m2');
    if (m2Input) {
        m2Input.addEventListener('input', function(e) {
            if (this.value < 0) this.value = 0;
        });
    }
    
    // Validação de cômodos (apenas números positivos)
    const comodosInput = document.getElementById('comodos');
    if (comodosInput) {
        comodosInput.addEventListener('input', function(e) {
            if (this.value < 0) this.value = 0;
        });
    }
});

