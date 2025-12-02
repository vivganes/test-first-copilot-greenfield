@echo off
SETLOCAL ENABLEEXTENSIONS

REM --- Check Java installation ---
where java >nul 2>nul
IF ERRORLEVEL 1 (
    echo "❌ Java is not installed. Please install Java (JDK) first."
    exit /b 1
)

REM --- Check JAVA_HOME ---
IF "%JAVA_HOME%"=="" (
    echo ❌ JAVA_HOME is not set. Please set JAVA_HOME to your JDK path.
    exit /b 1
)

REM --- Verify JAVA_HOME path ---
IF NOT EXIST "%JAVA_HOME%\bin\java.exe" (
    echo ❌ JAVA_HOME does not point to a valid JDK. Check your JAVA_HOME setting.
    echo Current JAVA_HOME: "%JAVA_HOME%"
    exit /b 1
)


REM --- Check Allure CLI installation ---
where allure
IF ERRORLEVEL 1 (
    echo ❌ Allure is not installed or not in PATH.
    echo    "👉 Install via: scoop install allure   (Windows with Scoop)"
    echo    👉 Or download from: https://github.com/allure-framework/allure2
    exit /b 1
)

echo "✅ All dependencies satisfied. Running Allure..."

REM --- Run Allure Report generation ---
allure serve "test-results\allure"

ENDLOCAL
