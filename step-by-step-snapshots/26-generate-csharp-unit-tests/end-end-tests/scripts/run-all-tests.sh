!#/bin/bash

# Run all tests
behave --tags=@e2e -f html-pretty -o test-results/reports/html/index.html -f allure -o test-results/allure