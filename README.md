# Smash Burger Playwright
End-to-end test automation for the Smash Burger site using Playwright and TypeScript.

## Prerequisites
- Node.js (16+)
- npm

## Install
1. Install dependencies:

```bash
npm ci
```

2. Install Playwright browsers:

```bash
npx playwright install
```

## Run tests
- Run the whole suite:

```bash
npm run test:e2e
```

- Run Playwright directly (same as the script):

```bash
npx playwright test
```

- Run a single spec file:

```bash
npx playwright test tests/login.spec.ts
```

- Run in headed mode (shows browser):

```bash
npx playwright test --headed
```

- Run a single project (e.g., Chromium):

```bash
npx playwright test --project=chromium
```

## Test report
- After tests run, open the HTML report with:

```bash
npx playwright show-report
```

## Project structure
- `pages/` — Page object wrappers (e.g., `burgerbuilder.ts`, `cart.ts`)
- `tests/` — Playwright spec files (e.g., `login.spec.ts`, `pickUpOrderE2E.spec.ts`)
- `utils/` — Helpers, fixtures and test data
- `playwright.config.ts` — Test runner configuration and projects
- `playwright-report/` — Generated HTML report after runs

## CI (GitHub Actions)

Tests run automatically on push and pull requests using:

`.github/workflows/playwright.yml`

Where to see results:
- GitHub repo → Actions
- Open the workflow run
- Check:
	- Logs for test output
	- Artifacts → download `playwright-report` → open `index.html`

