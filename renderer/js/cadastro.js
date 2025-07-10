// Elementos DOM
const registerForm = document.getElementById('registerForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmarSenha');
const registerBtn = document.getElementById('registerBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const loadingMessage = document.getElementById('loadingMessage');
const loginLink = document.getElementById('loginLink');
const passwordStrength = document.getElementById('passwordStrength');

// Elementos de erro dos campos
const nomeError = document.getElementById('nomeError');
const emailError = document.getElementById('emailError');
const senhaError = document.getElementById('senhaError');
const confirmarSenhaError = document.getElementById('confirmarSenhaError');

// URL da API
const API_URL = 'http://localhost:3000';

// Função para mostrar mensagens
function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function showLoading(show) {
    loadingMessage.style.display = show ? 'block' : 'none';
    registerBtn.disabled = show;
    registerBtn.textContent = show ? 'Criando conta...' : 'Criar conta';
}

// Função para mostrar erro em campo específico
function showFieldError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.parentElement.classList.add('error');
}

function hideFieldError(errorElement) {
    errorElement.style.display = 'none';
    errorElement.parentElement.classList.remove('error');
}

function clearAllFieldErrors() {
    [nomeError, emailError, senhaError, confirmarSenhaError].forEach(hideFieldError);
}

// Função para validar força da senha
function checkPasswordStrength(password) {
    let strength = 0;
    let message = '';
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    if (password.length === 0) {
        passwordStrength.style.display = 'none';
        return;
    }
    
    passwordStrength.style.display = 'block';
    
    if (strength <= 2) {
        passwordStrength.className = 'password-strength weak';
        message = 'Senha fraca - Use mais caracteres, números e símbolos';
    } else if (strength <= 3) {
        passwordStrength.className = 'password-strength medium';
        message = 'Senha média - Adicione mais variedade de caracteres';
    } else {
        passwordStrength.className = 'password-strength strong';
        message = 'Senha forte';
    }
    
    passwordStrength.textContent = message;
}

// Função para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função de cadastro
async function fazerCadastro(nome, email, senha) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Cadastro bem-sucedido
            showMessage(successMessage, data.message || 'Conta criada com sucesso!');
            
            // Limpar formulário
            registerForm.reset();
            passwordStrength.style.display = 'none';
            
            // Redirecionar para login
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        } else {
            // Erro no cadastro
            showMessage(errorMessage, data.error || 'Erro ao criar conta');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        showMessage(errorMessage, 'Erro de conexão com o servidor');
    }
}

// Validação em tempo real
nomeInput.addEventListener('input', () => {
    const nome = nomeInput.value.trim();
    if (nome.length > 0 && nome.length < 2) {
        showFieldError(nomeError, 'Nome deve ter pelo menos 2 caracteres');
    } else {
        hideFieldError(nomeError);
    }
});

emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    if (email.length > 0 && !validateEmail(email)) {
        showFieldError(emailError, 'Formato de email inválido');
    } else {
        hideFieldError(emailError);
    }
});

senhaInput.addEventListener('input', () => {
    const senha = senhaInput.value;
    checkPasswordStrength(senha);
    
    if (senha.length > 0 && senha.length < 6) {
        showFieldError(senhaError, 'Senha deve ter pelo menos 6 caracteres');
    } else {
        hideFieldError(senhaError);
    }
    
    // Verificar confirmação de senha se já foi preenchida
    const confirmarSenha = confirmarSenhaInput.value;
    if (confirmarSenha && senha !== confirmarSenha) {
        showFieldError(confirmarSenhaError, 'Senhas não coincidem');
    } else if (confirmarSenha) {
        hideFieldError(confirmarSenhaError);
    }
});

confirmarSenhaInput.addEventListener('input', () => {
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;
    
    if (confirmarSenha && senha !== confirmarSenha) {
        showFieldError(confirmarSenhaError, 'Senhas não coincidem');
    } else {
        hideFieldError(confirmarSenhaError);
    }
});

// Event listener para o formulário
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    hideMessages();
    clearAllFieldErrors();
    showLoading(true);
    
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;
    
    let hasErrors = false;
    
    // Validações
    if (!nome || nome.length < 2) {
        showFieldError(nomeError, 'Nome deve ter pelo menos 2 caracteres');
        hasErrors = true;
    }
    
    if (!email || !validateEmail(email)) {
        showFieldError(emailError, 'Email inválido');
        hasErrors = true;
    }
    
    if (!senha || senha.length < 6) {
        showFieldError(senhaError, 'Senha deve ter pelo menos 6 caracteres');
        hasErrors = true;
    }
    
    if (senha !== confirmarSenha) {
        showFieldError(confirmarSenhaError, 'Senhas não coincidem');
        hasErrors = true;
    }
    
    if (hasErrors) {
        showLoading(false);
        return;
    }
    
    await fazerCadastro(nome, email, senha);
    showLoading(false);
});

// Event listener para o link de login
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'login.html';
});

// Limpar campos quando a página carregar
window.addEventListener('load', () => {
    registerForm.reset();
    hideMessages();
    clearAllFieldErrors();
    passwordStrength.style.display = 'none';
});
