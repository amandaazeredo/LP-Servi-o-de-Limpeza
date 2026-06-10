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

// Configuração SMTP (usando o meu pessoal por enquanto)
const SMTP_CONFIG = {
    host: "smtp.gmail.com",
    username: "manddzxz@gmail.com",
    password: "osxw wpbz ebgc ffel",
    to_email: "manddzxz@gmail.com"
};

// Função para enviar email via SMTP
function enviarEmailSMTP(dados) {
    return new Promise((resolve, reject) => {
        // corpo do email em HTML
        const corpoEmail = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #0a4352;">📋 Nova Solicitação de Orçamento</h2>
                    <p style="color: #666;">Limpeza NIT</p>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: #0a4352; margin-top: 0;">Dados do Cliente:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0;"><strong>📧 E-mail:</strong></td>
                            <td style="padding: 8px 0;">${dados.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;"><strong>📝 Assunto:</strong></td>
                            <td style="padding: 8px 0;">${dados.assunto}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;"><strong>📱 Celular:</strong></td>
                            <td style="padding: 8px 0;">${dados.celular || 'Não informado'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;"><strong>🏢 Empresa:</strong></td>
                            <td style="padding: 8px 0;">${dados.empresa || 'Não informado'}</td>
                        </tr>
                    </table>
                </div>

                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: #0a4352; margin-top: 0;">Informações do Serviço:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0;"><strong>🔧 Tipo de Serviço:</strong></td>
                            <td style="padding: 8px 0;">${dados.tipoServico}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;"><strong>📍 Cidade:</strong></td>
                            <td style="padding: 8px 0;">${dados.cidade}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;"><strong>📐 M² do local:</strong></td>
                            <td style="padding: 8px 0;">${dados.m2 || 'Não informado'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;"><strong>🚪 Quantidade de cômodos:</strong></td>
                            <td style="padding: 8px 0;">${dados.comodos || 'Não informado'}</td>
                        </tr>
                    </table>
                </div>

                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: #0a4352; margin-top: 0;">💬 Mensagem:</h3>
                    <p style="margin: 0; line-height: 1.5;">${dados.mensagem || 'Nenhuma mensagem adicional'}</p>
                </div>

                <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
                    <p>Mensagem enviada através do formulário de orçamento do site Limpeza NIT</p>
                    <p>Data do envio: ${new Date().toLocaleString('pt-BR')}</p>
                </div>
            </div>
        `;

        Email.send({
            Host: SMTP_CONFIG.host,
            Username: SMTP_CONFIG.username,
            Password: SMTP_CONFIG.password,
            To: SMTP_CONFIG.to_email,
            From: dados.email,
            Subject: `${dados.assunto} - ${dados.tipoServico}`,
            Body: corpoEmail
        }).then(
            message => {
                if (message === 'OK') {
                    resolve(true);
                } else {
                    reject(new Error(message));
                }
            }
        ).catch(error => {
            reject(error);
        });
    });
}

// Função para mostrar mensagens
function showMessage(message, type) {
    const mensagemDiv = document.getElementById('form-mensagem');
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

// Validação do form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orcamento-form');
    
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Coletar dados para validação
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const tipoServico = document.getElementById('tipo-servico').value;
            const cidade = document.getElementById('cidade').value;
            
            // Validar campos obrigatórios
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
            
            // Validar formato do email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Por favor, insira um e-mail válido.', 'erro');
                document.getElementById('email').focus();
                return;
            }
            
            // Validar celular se preenchido
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
            
            // Log no console 
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
            
            // carregamento
            const btnSubmit = document.querySelector('.btn-submit');
            const btnOriginalText = btnSubmit.textContent;
            btnSubmit.textContent = 'Enviando...';
            btnSubmit.disabled = true;
            
            try {
                // Enviar email via SMTP
                await enviarEmailSMTP(dadosFormulario);
                showMessage('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
                
                form.reset();
                
                console.log('=== EMAIL ENVIADO COM SUCESSO ===');
                console.log('Destinatário:', SMTP_CONFIG.to_email);
                console.log('Assunto:', `${assunto} - ${tipoServicoText}`);
                console.log('===============================');
                
            } catch (error) {
                console.error('Erro ao enviar email:', error);
                showMessage('Erro ao enviar solicitação. Tente novamente ou entre em contato pelo WhatsApp.', 'erro');
            } finally {
                // Restaurar botão
                btnSubmit.textContent = btnOriginalText;
                btnSubmit.disabled = false;
            }
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
    
    // Validação de m2 (apenas números positivos)
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


// Efeito ao carregar a página
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