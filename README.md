# Corso Arredi website

Static Italian-language website for Corso Arredi. It uses HTML, CSS, JavaScript and local image assets; no build step or package installation is required.

## Preview locally

Serve this directory with any static HTTP server, then open `index.html` at the local address. For example:

```sh
python -m http.server 8080
```

## Publish

The site files live at the repository root. Configure GitHub Pages to deploy from the `main` branch and `/ (root)`, or connect the repository to another static hosting provider.

The contact configurator prepares an email in the visitor's mail app; it does not submit to a server.
