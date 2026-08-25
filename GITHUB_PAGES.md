# GitHub Pages Deployment

This repository is configured to publish the course as a **static GitHub Pages site**. The application is built with relative asset paths, so it works whether GitHub serves it from a repository subdirectory or from a custom domain.

## Repository structure

| Path | Purpose |
| --- | --- |
| `client/` | React application source and static files. |
| `client/public/` | Static files copied into the publishing package, including the certificate signature and `.nojekyll` marker. |
| `docs/` | Generated GitHub Pages package. This directory contains the static `index.html`, application assets, and certificate signature that GitHub publishes. |
| `dist/public/` | Intermediate Vite build output created before the package is copied to `docs/`. |

## One-time GitHub setup

Open the repository on GitHub and select **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose the `main` branch, select the `/docs` folder, and save. GitHub then publishes the built course application from the correct static entry point rather than the repository README.

After course changes, run `pnpm run build:pages`, commit the refreshed `docs/` directory, and push to `main`. GitHub Pages will publish the updated course automatically.

The course keeps its progress, quiz results, learner name, and notes in the visitor's browser. These details do not synchronize across browsers or devices on static GitHub Pages hosting.

For details about GitHub Pages deployment sources and workflows, see the [GitHub Pages documentation](https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
