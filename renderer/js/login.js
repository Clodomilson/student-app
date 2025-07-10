// Elementos DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const loginBtn = document.getElementById('loginBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const loadingMessage = document.getElementById('loadingMessage');
const registerLink = document.getElementById('registerLink');

// URL da API (ajuste conforme necessário)
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
    loginBtn.disabled = show;
    loginBtn.textContent = show ? 'Entrando...' : 'Entrar';
}

// Função de login
async function fazerLogin(email, senha) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Login bem-sucedido
            showMessage(successMessage, data.message || 'Login realizado com sucesso!');
            
            // Salvar token no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            
            // Redirecionar para a página principal
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
            
        } else {
            // Erro no login
            showMessage(errorMessage, data.error || 'Erro ao fazer login');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        showMessage(errorMessage, 'Erro de conexão com o servidor');
    }
}

// Event listener para o formulário
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    hideMessages();
    showLoading(true);
    
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    
    // Validações básicas
    if (!email || !senha) {
        showMessage(errorMessage, 'Por favor, preencha todos os campos');
        showLoading(false);
        return;
    }
    
    if (!email.includes('@')) {
        showMessage(errorMessage, 'Por favor, insira um email válido');
        showLoading(false);
        return;
    }
    
    if (senha.length < 6) {
        showMessage(errorMessage, 'A senha deve ter pelo menos 6 caracteres');
        showLoading(false);
        return;
    }
    
    await fazerLogin(email, senha);
    showLoading(false);
});

// Event listener para o link de cadastro
registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'cadastro.html';
});

// Verificar se já está logado
window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        // Verificar se o token ainda é válido
        fetch(`${API_URL}/auth/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'home.html';
            } else {
                // Token inválido, remover do localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
            }
        })
        .catch(error => {
            console.error('Erro ao verificar token:', error);
        });
    }
});

// Limpar campos quando a página carregar
window.addEventListener('load', () => {
    emailInput.value = '';
    senhaInput.value = '';
    hideMessages();
});
