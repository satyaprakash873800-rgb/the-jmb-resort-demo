# The JMB Resort Website

A premium, responsive hotel website built with React, TypeScript, Vite, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
npm run start
```

The production files are generated in `dist/`.

## Customise the site

- Business details are centralized near the top of `src/App.tsx` for easy updates.
- Replace the image URLs in `src/App.tsx` with the hotel's own approved photography.
- Update the SEO title and description in `index.html` if the business positioning changes.
- The enquiry form is a frontend request flow only; connect it to a booking or email service before treating it as a live reservation system.
