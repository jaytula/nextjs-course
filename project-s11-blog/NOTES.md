# Section 11 Notes

## Lesson 174. Setting Up The Core Pages

- The starting page that shows featured blog posts and welcome screen. - `pages/index.tsx`
- The contact page that shows a form that users can fill out - `pages/contact.tsx`
- Page for all blog posts - `pages/posts/index.tsx`
- Individual blog post page - `pages/posts/[slug].tsx`

# Section 12

## Lesson 202. Building NextJS Apps: Your Options

- Standard Build: `next build` - Produces optimized production bundles and a server-side app:
  - Requires NodeJS server.
  - Pages are pre-rendered (if possible) but NodeJS server is requried for API routes, server-side
    pages and page revalidations
  - Re-deploy needed if code changes or you don't use revalidations and need page updates
- Full Static Build: `next export`
  - Produces 100% static app (HTML, CSS, JS): No NodeJS server required
  - Doesn't work if your app uses API routes, server-side pages or wants to use page
    revalidation
  - Re-deploy needd for all code and content changes
  