#!/bin/bash

# Exit immediately if a command fails
set -e

# --- Check Java installation ---
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java (JDK) first."
    exit 1
fi

# --- Check JAVA_HOME ---
if [ -z "$JAVA_HOME" ]; then
    echo "❌ JAVA_HOME is not set. Please set JAVA_HOME to your JDK path."
    exit 1
fi

# --- Verify JAVA_HOME path ---
if [ ! -x "$JAVA_HOME/bin/java" ]; then
    echo "❌ JAVA_HOME does not point to a valid JDK. Check your JAVA_HOME setting."
    exit 1
fi

# --- Check Allure CLI installation ---
if ! command -v allure &> /dev/null; then
    echo "❌ Allure is not installed or not in PATH."
    echo "   👉 Install via: brew install allure  (Mac)"
    echo "   👉 or:  scoop install allure  (Windows, via Scoop)"
    echo "   👉 or download from: https://github.com/allure-framework/allure2"
    exit 1
fi

echo "✅ All dependencies satisfied. Running Allure..."

# --- Run Allure Report generation ---
allure serve reports/allure