# Quad Tree Playground

A synchronized spatial and tree visualization of quad trees by Kshitij Mishra.

Students can:

- Click or drag to add points.
- Watch regions subdivide as they reach capacity.
- See the corresponding four-child tree update alongside the spatial view.
- Change node capacity.
- Add random points in bulk.
- Pan and zoom the tree representation.

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
