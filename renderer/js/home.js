// Elementos DOM
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');
const errorMessage = document.getElementById('errorMessage');

// URL da API
const API_URL = 'http://localhost:3000';

// Função para mostrar mensagens de erro
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Função para carregar dados do usuário
function loadUserData() {
    try {
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            const dadosUsuario = JSON.parse(usuario);
            userName.textContent = dadosUsuario.nome || 'Usuário';
        } else {
            userName.textContent = 'Usuário';
        }
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        userName.textContent = 'Usuário';
    }
}

// Função para verificar autenticação
async function checkAuthentication() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        // Verificar se o token ainda é válido
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            // Token inválido, redirecionar para login
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        showError('Erro de conexão com o servidor');
    }
}

// Função de logout
function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    }
}

// Event listeners
logoutBtn.addEventListener('click', logout);

// Carregar dados quando a página carregar
window.addEventListener('load', () => {
    checkAuthentication();
    loadUserData();
});

// Verificar autenticação periodicamente (a cada 5 minutos)
setInterval(checkAuthentication, 5 * 60 * 1000);
