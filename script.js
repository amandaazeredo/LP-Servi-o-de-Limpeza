//service_x487z28
//template_bsqim2g
//sbVgtNx51Cbnr3eKM
// Menu mobile toggle

emailjs.init("sbVgtNx51Cbnr3eKM");

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

// Função para enviar email via EmailJS
function enviarEmailSMTP(dados) {
    const templateParams = {
        to_email: 'manddzxz@gmail.com',
        from_email: dados.email,
        subject: `${dados.assunto} - ${dados.tipoServico}`,
        message: `
            NOVA SOLICITAÇÃO DE ORÇAMENTO - LIMPEZA NIT
            
            DADOS DO CLIENTE:
            E-mail: ${dados.email}
            Assunto: ${dados.assunto}
            Celular: ${dados.celular || 'Não informado'}
            Empresa: ${dados.empresa || 'Não informado'}
            
            INFORMAÇÕES DO SERVIÇO:
            Tipo de Serviço: ${dados.tipoServico}
            Cidade: ${dados.cidade}
            M² do local: ${dados.m2 || 'Não informado'}
            Quantidade de cômodos: ${dados.comodos || 'Não informado'}
            
            MENSAGEM:
            ${dados.mensagem || 'Nenhuma mensagem adicional'}
            
            ---
            Data do envio: ${new Date().toLocaleString('pt-BR')}
        `
    };
    
    return emailjs.send('service_x487z28', 'template_bsqim2g', templateParams);
}

// Função para mostrar mensagens
function showMessage(message, type) {
    const mensagemDiv = document.getElementById('form-mensagem');
    if (mensagemDiv) {
        mensagemDiv.textContent = message;
        mensagemDiv.className = `mensagem ${type}`;
        
        mensagemDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        setTimeout(() => {
            mensagemDiv.textContent = '';
            mensagemDiv.className = 'mensagem';
        }, 5000);
    }
}

// Validação do form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orcamento-form');
    
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const tipoServico = document.getElementById('tipo-servico').value;
            const cidade = document.getElementById('cidade').value;
            
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
            
            if (!tipoServico) {
                showMessage('Por favor, selecione o tipo de serviço desejado.', 'erro');
                document.getElementById('tipo-servico').focus();
                return;
            }
            
            if (!cidade) {
                showMessage('Por favor, selecione sua cidade.', 'erro');
                document.getElementById('cidade').focus();
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Por favor, insira um e-mail válido.', 'erro');
                document.getElementById('email').focus();
                return;
            }
            
            const celular = document.getElementById('celular').value.trim();
            if (celular) {
                const telefoneRegex = /^\([1-9]{2}\) [9]?[0-9]{4}-[0-9]{4}$/;
                if (!telefoneRegex.test(celular) && celular.replace(/\D/g, '').length > 0) {
                    showMessage('Por favor, insira um número de celular válido no formato (99) 99999-9999', 'erro');
                    document.getElementById('celular').focus();
                    return;
                }
            }
            
            const tipoServicoText = document.getElementById('tipo-servico').options[document.getElementById('tipo-servico').selectedIndex].text;
            const empresa = document.getElementById('empresa').value.trim();
            const m2 = document.getElementById('m2').value;
            const comodos = document.getElementById('comodos').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            const dadosFormulario = {
                email: email,
                assunto: assunto,
                tipoServico: tipoServicoText,
                cidade: cidade,
                celular: celular,
                empresa: empresa,
                m2: m2,
                comodos: comodos,
                mensagem: mensagem
            };
            
            console.log('=== DADOS DO FORMULÁRIO ===');
            console.log('E-mail:', email);
            console.log('Assunto:', assunto);
            console.log('Tipo de Serviço:', tipoServicoText);
            console.log('Cidade:', cidade);
            console.log('Celular:', celular || 'Não informado');
            console.log('Empresa:', empresa || 'Não informado');
            console.log('M²:', m2 || 'Não informado');
            console.log('Cômodos:', comodos || 'Não informado');
            console.log('Mensagem:', mensagem || 'Não informada');
            console.log('========================');
            
            const btnSubmit = document.querySelector('.btn-submit');
            const btnOriginalText = btnSubmit.textContent;
            btnSubmit.textContent = 'Enviando...';
            btnSubmit.disabled = true;
            
            try {
                await enviarEmailSMTP(dadosFormulario);
                showMessage('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
                
                console.log('=== EMAIL ENVIADO COM SUCESSO ===');
                
            } catch (error) {
                console.error('Erro ao enviar email:', error);
                showMessage('Erro ao enviar solicitação. Tente novamente ou entre em contato pelo WhatsApp.', 'erro');
            } finally {
                btnSubmit.textContent = btnOriginalText;
                btnSubmit.disabled = false;
            }
        });
    }
    
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
    
    const m2Input = document.getElementById('m2');
    if (m2Input) {
        m2Input.addEventListener('input', function(e) {
            if (this.value < 0) this.value = 0;
        });
    }
    
    const comodosInput = document.getElementById('comodos');
    if (comodosInput) {
        comodosInput.addEventListener('input', function(e) {
            if (this.value < 0) this.value = 0;
        });
    }
});

window.addEventListener('load', function() {
    const parallaxImage = document.getElementById('parallaxImage');
    if (parallaxImage) {
        parallaxImage.style.opacity = '0';
        parallaxImage.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            parallaxImage.style.opacity = '1';
        }, 100);
    }
});