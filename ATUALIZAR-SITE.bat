@echo off
chcp 65001 >nul
title Atualizando Blackline Gear...
color 0E

cd /d "%~dp0"

echo ============================================
echo   ATUALIZANDO SITE BLACKLINE GEAR
echo ============================================
echo.

echo [1/3] Verificando alteracoes...
git add . 2>nul

for /f %%i in ('git status --porcelain ^| find /c /v ""') do set CHANGES=%%i

if "%CHANGES%"=="0" (
    echo.
    echo Nenhuma alteracao para enviar. Site ja esta atualizado!
    echo.
    pause
    exit /b 0
)

echo Encontradas %CHANGES% alteracoes.
echo.

echo [2/3] Fazendo commit...
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set DATA=%%a/%%b/%%c
for /f "tokens=1-2 delims=:" %%a in ('time /t') do set HORA=%%a:%%b
git commit -m "Atualizacao %DATA% %HORA%" 2>nul

echo.
echo [3/3] Enviando para o GitHub...
git push 2>&1

echo.
echo ============================================
echo   SITE ATUALIZADO COM SUCESSO!
echo ============================================
echo.
echo Acesse: https://erickolivera2021.github.io/blackline-gear/
echo.
echo (Pode levar 1-2 minutos para aparecer no ar)
echo.
pause
