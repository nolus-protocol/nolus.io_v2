# Nolus Website

The official marketing website for [Nolus Protocol](https://nolus.io), built with Vue 3, TypeScript, and Vite. Uses Static Site Generation (SSG) for optimal performance and SEO.

## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Build Tool:** Vite + vite-ssg
- **Styling:** Tailwind CSS
- **i18n:** vue-i18n (10 languages)
- **Animation:** @vueuse/motion, Lottie

## Prerequisites

- Node.js 22+
- npm 9+

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (SSG)
npm run build

# Preview production build
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot-reload |
| `npm run build` | Build SSG (30 routes across 10 languages) |
| `npm run preview` | Preview production build on port 8080 |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |

## Project Structure

```
src/
├── views/           # Page components
├── components/      # Reusable UI components
├── router/          # Vue Router configuration
├── i18n/            # Internationalization setup
├── locales/         # Translation JSON files
├── composables/     # Vue composables
├── utils/           # Utility functions
├── config/          # API endpoints and constants
├── assets/          # Images, Lottie animations
└── types/           # TypeScript interfaces

server/              # Express backend (RSS, Intercom)
scripts/             # Build scripts
public/              # Static assets
```

## IDE Setup

**VSCode** with the following extensions:

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Deployment

- **Development:** Push to `main` branch
- **Production:** Create a tag matching `v*.*.*`

Both environments use GitHub Actions with self-hosted runners.

## Configuration

See [Vite Configuration Reference](https://vitejs.dev/config/) for build customization.
