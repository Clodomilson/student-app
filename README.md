# Student App

Sistema de gerenciamento de estudantes desenvolvido com Electron, Node.js e MongoDB.

## 🚀 Funcionalidades

- ✅ Sistema de autenticação (login/cadastro)
- ✅ Criptografia de senhas com bcrypt
- ✅ Autenticação JWT
- ✅ Interface moderna e responsiva
- ✅ Validação de formulários em tempo real
- ✅ Verificação de força de senha
- 🔄 Gerenciamento de alunos (em desenvolvimento)
- 🔄 Relatórios e dashboard (em desenvolvimento)

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd student-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Configure as seguintes variáveis:
```env
MONGO_URI=mongodb://localhost:27017/student_app
JWT_SECRET=seu_jwt_secret_super_seguro_aqui_123
PORT=3000
```

4. Inicie o MongoDB (se estiver usando local):
```bash
mongod
```

## 🚀 Como usar

### Modo de desenvolvimento:

1. Para iniciar apenas a API:
```bash
npm run api
```

2. Para iniciar o Electron com a API:
```bash
npm start
```

3. Para modo de desenvolvimento com DevTools:
```bash
npm run dev
```

### Primeiro uso:

1. A aplicação abrirá na tela de login
2. Clique em "Cadastre-se aqui" para criar uma conta
3. Preencha os dados e crie sua conta
4. Faça login com as credenciais criadas
5. Você será redirecionado para o dashboard

## 📁 Estrutura do Projeto

```
student-app/
├── main.js                 # Processo principal do Electron
├── preload.js             # Script de preload seguro
├── package.json           # Dependências e scripts
├── .env                   # Variáveis de ambiente
├── .gitignore            # Arquivos ignorados pelo Git
├── api/                  # Backend API
│   ├── server.js         # Servidor Express
│   ├── controllers/      # Controladores
│   │   ├── authController.js
│   │   └── alunoController.js
│   ├── middleware/       # Middlewares
│   │   └── authMiddleware.js
│   ├── models/          # Modelos do MongoDB
│   │   ├── Usuario.js
│   │   └── Aluno.js
│   └── routes/          # Rotas da API
│       ├── auth.js
│       └── alunos.js
└── renderer/            # Frontend (interface)
    ├── login.html
    ├── cadastro.html
    ├── home.html
    └── js/
        ├── login.js
        ├── cadastro.js
        └── home.js
```

## 🔐 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação:
- Tokens expiram em 24 horas
- Senhas são criptografadas com bcrypt
- Validação de email e força de senha
- Verificação automática de token válido

## 🗃️ Banco de Dados

### Modelo Usuario:
```javascript
{
  nome: String (obrigatório, min: 2 caracteres),
  email: String (obrigatório, único, formato válido),
  senha: String (obrigatório, min: 6 caracteres, criptografada),
  timestamps: true
}
```

### Modelo Aluno:
```javascript
{
  nome: String (obrigatório),
  email: String (único, formato válido),
  telefone: String,
  curso: String,
  periodo: String,
  status: String (ativo/inativo),
  timestamps: true
}
```

## 📝 Scripts Disponíveis

- `npm start` - Inicia a aplicação Electron
- `npm run dev` - Inicia em modo desenvolvimento
- `npm run api` - Inicia apenas o servidor da API
- `npm test` - Executa os testes (ainda não implementado)

## 🛠️ Tecnologias Utilizadas

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt.js
- CORS
- dotenv

### Frontend:
- HTML5/CSS3
- JavaScript (ES6+)
- Electron
- Design responsivo

### Ferramentas:
- Git
- npm
- VS Code

## 🐛 Solução de Problemas

### Erro de conexão com MongoDB:
- Verifique se o MongoDB está rodando
- Confirme a string de conexão no `.env`
- Para MongoDB local: `mongodb://localhost:27017/student_app`

### Erro "Token inválido":
- Faça logout e login novamente
- Verifique se o JWT_SECRET está correto no `.env`

### Aplicação não inicia:
- Verifique se todas as dependências foram instaladas
- Confirme se o arquivo `.env` está configurado
- Verifique as permissões de arquivo

## 📈 Próximas Funcionalidades

- [ ] CRUD completo de alunos
- [ ] Sistema de relatórios
- [ ] Dashboard com gráficos
- [ ] Exportação de dados
- [ ] Sistema de backup
- [ ] Modo escuro
- [ ] Configurações de usuário
- [ ] Logs de auditoria

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a seção de solução de problemas
2. Procure em issues existentes
3. Crie uma nova issue com detalhes do problema

---

**Desenvolvido com ❤️ usando Electron e Node.js**
