# React Frontend Boilerplate

A production-ready React boilerplate with authentication, routing, API utilities, and responsive layout components.

## Features

- 🛠️ **Modern Tooling**: Built with Vite + React + TypeScript
- 🔐 **Authentication**: Context-based auth system with JWT support
- 🚦 **Routing**: Protected & public routes with React Router
- 📡 **API Client**: Axios-based request utility with interceptors
- 🎨 **Styling**: CSS Modules support with utility class helpers
- 🔄 **State Management**: React Query for server state
- 🧹 **Code Quality**: ESLint for linting
- ⚡ **Performance**: Code splitting, lazy loading, and top progress bar

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/react-boilerplate.git
   cd react-boilerplate
   ```

2. Install dependencies using pnpm
   ```bash
   pnpm install
   ```

3. Create a `.env` file based on `.env.example`
   ```bash
   cp .env.example .env
   ```

4. Start the development server
   ```bash
   pnpm dev
   ```

## Project Structure

```
src/
├── components/       # Reusable components
├── contexts/         # React contexts
├── hooks/            # Custom hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── routes/           # Route configuration
├── styles/           # Global styles
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## Key Implementation Details

### Authentication System
- JWT token storage in localStorage
- Auth context with login/logout methods
- Protected route wrapper
- Automatic profile fetching on app load

### API Client
- Axios-based `baseRequest` utility
- Automatic auth header injection
- Error handling
- AbortController support

### Layout System
- Responsive max-width wrapper
- Persistent layout with header/footer
- Scroll restoration
- Loading indicators

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) includes:

1. **Linting**: Runs ESLint on every push
2. **Testing**: (Configure your test commands)
3. **Build**: Production build verification
4. **Deployment**: (Configure your deployment steps)

## Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Create production build
- `pnpm lint`: Run ESLint
- `pnpm preview`: Preview production build locally

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_APP_SERVER_URL` | Base API URL |
| `VITE_APP_ENVIRONMENT` | `development` or `production` |

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

MIT

---

### Additional Recommendations:

1. Add a `CONTRIBUTING.md` for contribution guidelines
2. Include a `CHANGELOG.md` for version history
3. Add a `SECURITY.md` for vulnerability reporting
4. Consider adding a code coverage badge if you implement tests
5. Add visual examples (screenshots/GIFs) of key features