@echo off
echo.
echo ============================================
echo    STUDENT APP - SCRIPT DE INSTALACAO
echo ============================================
echo.

echo Verificando se o Node.js esta instalado...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o Node.js antes de continuar.
    echo Download: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js encontrado!
node --version

echo.
echo Verificando se o npm esta instalado...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] npm nao encontrado!
    pause
    exit /b 1
)

echo [OK] npm encontrado!
npm --version

echo.
echo Instalando dependencias...
npm install

if %errorlevel% neq 0 (
    echo [ERRO] Falha na instalacao das dependencias!
    pause
    exit /b 1
)

echo.
echo [OK] Dependencias instaladas com sucesso!

echo.
echo Verificando arquivo .env...
if not exist ".env" (
    echo [AVISO] Arquivo .env nao encontrado!
    echo Criando arquivo .env padrao...
    echo MONGO_URI=mongodb://localhost:27017/student_app > .env
    echo JWT_SECRET=seu_jwt_secret_super_seguro_aqui_123 >> .env
    echo PORT=3000 >> .env
    echo [OK] Arquivo .env criado!
    echo.
    echo [IMPORTANTE] Configure suas variaveis de ambiente no arquivo .env
)

echo.
echo ============================================
echo          INSTALACAO CONCLUIDA!
echo ============================================
echo.
echo Para iniciar a aplicacao:
echo   npm start
echo.
echo Para iniciar apenas a API:
echo   npm run api
echo.
echo Certifique-se de que o MongoDB esta rodando!
echo.
pause
