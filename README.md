# Interactive Quad Trees

An interactive visual introduction to quad trees by Kshitij Mishra.

Students can:

- Click or drag to add points.
- Watch regions subdivide as they reach capacity.
- Change node capacity.
- Add random points or run the animated scatter.
- Read the accompanying explanation and TypeScript pseudocode.

## Run locally

Open `index.html` directly in a browser.

The project also includes a Cloudflare Worker-compatible build:

```sh
npm run build
npm run validate
```

## Deployment

Pushes to `main` are automatically deployed through GitHub Pages using
`.github/workflows/deploy-pages.yml`.
