## Steps to run the test suite
Open a new terminal to run end-end tests

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
playwright install
```

After this, anytime you want to run tests, you can use this command:

### In Windows

```bash
.\scripts\run-all-tests.bat
```

### In Mac/Linux

```bash
./scripts/run-all-tests.sh
```

Open the `end-end-tests/html-test-report/index.html` in your browser to see the test report


## Allure Reports

To see allure reports (more beautiful reports), you need to first install [allure](https://github.com/allure-framework/allure2/releases) and keep it in the path. 

Then you can run the following commands to view the report.

### In Windows

```bash
.\scripts\view-allure-report.bat
```

### In Mac/Linux

```bash
./scripts/view-allure-report.sh
```