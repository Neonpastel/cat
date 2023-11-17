# Cat Eleventy Starter
A template with...
- **YAML** & **SASS/SCSS** (including importing from `node_modules`) support
- Directory structure with `src/` and `dist/`
- Base template which has a **skip-link**, allows for custom title & page specific stylesheet imports
- **Favicon** generation
- **OpenGraph** support
- **Normalize.css** imported by default
- Templates extending **base template** into page.md & page.pug, which when used get automatically added in the **nav**
- Classes from the accessibility section in [my helpers repo](https://github.com/Denperidge/helpers) built-in

## How-to

### GitHub Actions deploy
```yaml
# .github/workflows/deploy.yml

name: Deploy Eleventy

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 20
      
      - name: Setup Pages
        uses: actions/configure-pages@v2
        
      - name: Install pre-requirements
        run: yarn install

      - name: Build
        run: yarn build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: 'dist/'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

## License
This project is released in the [public domain](LICENSE), but credit is appreciated!
