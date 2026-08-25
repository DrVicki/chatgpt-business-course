# GitHub Pages Deployment

This repository is configured to publish the course as a **static GitHub Pages site**. The application is built with relative asset paths, so it works whether GitHub serves it from a repository subdirectory or from a custom domain.

## Repository structure

| Path | Purpose |
| --- | --- |
| `client/` | React application source and static files. |
| `client/public/.nojekyll` | Prevents GitHub Pages from applying Jekyll processing to the generated site. |
| `.github/workflows/deploy-pages.yml` | Builds and deploys the static application whenever `main` is updated. |
| `dist/public/` | Generated deployment artifact. This directory is created during the build and should not be edited manually. |

## One-time GitHub setup

Open the repository on GitHub and select **Settings → Pages**. Under **Build and deployment**, select **GitHub Actions** as the source. Once this setting is enabled, each push to `main` runs the deployment workflow and publishes the latest static build.

The course keeps its progress, quiz results, learner name, and notes in the visitor's browser. These details do not synchronize across browsers or devices on static GitHub Pages hosting.

For details about GitHub Pages deployment sources and workflows, see the [GitHub Pages documentation](https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
