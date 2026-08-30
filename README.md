# flowstatedesign.studio

Marketing site for Flow State — audio engineering, studio design, custom
electronics and repair. Live at **https://flowstatedesign.studio**.

This repository holds the **built site only**. It is the deploy target for
GitHub Pages; the generator scripts and the photo library live outside it.

## How it is served

- GitHub Pages, `main` branch, root directory
- `CNAME` binds the custom domain; HTTPS is enforced with a Let's Encrypt
  certificate that GitHub renews automatically
- `.nojekyll` disables Jekyll processing — the HTML is served exactly as committed
- `404.html` is the custom error page (marked `noindex`)

## What is in here

```
*.html              eight pages plus the 404
assets/css/         one stylesheet, no preprocessor
assets/js/          one script, no framework or build step
assets/fonts/       Orbitron + Saira, self-hosted woff2 (SIL OFL)
assets/img/         site imagery, EXIF stripped
robots.txt          allows everything, points at the sitemap
sitemap.xml         the eight public pages
```

## Notes for anyone reading the code

**No third-party requests.** No CDN, no analytics, no tracking, no external
fonts. Everything the browser loads comes from this origin, which is what makes
the Content-Security-Policy below viable.

**CSP is declared in a meta tag** on every page, because GitHub Pages does not
allow custom response headers. `script-src` is pinned to `'self'` plus the
SHA-256 hash of the single inline bootstrap script (it sets a `js` class before
first paint so the reveal animations do not hide content from users without
JavaScript). `frame-ancestors` cannot be expressed in a meta tag and is
therefore absent; the site is static and has no authenticated state or forms,
so clickjacking has no meaningful impact here.

**Progressive enhancement.** The site is fully readable with JavaScript
disabled. Scroll reveals, the mobile menu and the image carousels are
enhancements layered on working HTML.

**Accessibility.** One `h1` per page with no heading-level skips, a skip link,
alt text on every image, and `prefers-reduced-motion` honoured throughout.

## Rebuilding

The HTML is generated from Python scripts kept with the source photos, then
copied here. Do not hand-edit the generated pages — changes belong in the
generators, or the next build will overwrite them.
