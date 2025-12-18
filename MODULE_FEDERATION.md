# Module Federation - Implementation

This project has been configured to work as a **Micro Frontend** using **Module Federation** with Vite.

## 📦 What is Module Federation?

Module Federation is a Webpack 5 feature (now also available for Vite) that allows:

- Share code between different JavaScript applications at runtime
- Create micro frontend architectures
- Load remote modules dynamically
- Share dependencies between applications

## 🏗️ Architecture

This project acts as a **Remote** that exposes components, pages, hooks, and services that can be consumed by other micro frontends (Hosts).

### File Structure

```
├── federation.config.ts      # Centralized Module Federation configuration
├── vite.config.ts            # Vite configuration with federation plugin
└── src/
    └── types/
        └── federation.d.ts   # TypeScript type definitions
```

## ⚙️ Configuration

### 1. Installed Dependencies

```bash
yarn add -D @originjs/vite-plugin-federation
```

### 2. Configuration File (federation.config.ts)

The `federation.config.ts` file centralizes all configurations:

- **name**: Micro frontend name (`billing_information`)
- **exposes**: Modules exposed for consumption
- **remotes**: Other micro frontends this app consumes (empty by default)
- **shared**: Shared dependencies between apps

### 3. Exposed Modules

The following module is available for consumption:

> **Important**: Only complete, self-contained features are exposed. This micro frontend exposes the BillingInformation page as a complete feature. All internal components, hooks, providers, and services are implementation details and are bundled within the feature itself.

#### Feature

- `./BillingInformation` - Complete billing information page with all its dependencies bundled

## 🚀 How to Use

### As Remote (This Project)

1. **Build the application**:

```bash
yarn build
```

2. **Serve the application**:

```bash
yarn preview
```

The `remoteEntry.js` file will be generated at `dist/assets/remoteEntry.js`

### As Host (Consuming this project)

In another project that wants to consume this micro frontend:

#### 1. Configure the Host's vite.config.ts:

```typescript
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'host_app',
      remotes: {
        billing_information: 'http://localhost:4173/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
})
```

#### 2. Consume the modules:

```typescript
// Import a component
import PageHeader from 'billing_information/PageHeader'

// Import a page
import BillingInformation from 'billing_information/BillingInformation'

// Import a hook
import { useTracking } from 'billing_information/useTracking'

// Use in component
function App() {
  const { trackEvent } = useTracking()

  return (
    <div>
      <PageHeader title="Minha App" />
      <BillingInformation />
    </div>
  )
}
```

#### 3. Dynamic Import (Recommended):

```typescript
import { lazy, Suspense } from 'react'

const BillingInformation = lazy(() => import('billing_information/BillingInformation'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingInformation />
    </Suspense>
  )
}
```

## 🔧 Commands

```bash
# Development
yarn dev

# Build for production
yarn build

# Preview build
yarn preview

# Test
yarn test
```

## 📝 Shared Dependencies

The following dependencies are shared between micro frontends (singleton):

- React 19.2.0
- React DOM 19.2.0
- React Router DOM 7.10.1
- @tanstack/react-query
- @mui/material
- @emotion/react
- @emotion/styled
- @gympass/tai-chi
- styled-components
- And others (see `federation.config.ts`)

## 🔒 Security Considerations

- Always use HTTPS in production
- Validate remote URLs
- Implement appropriate authentication
- Use CORS properly

## 🌐 Deploy

### Production

1. **Build**:

```bash
yarn build
```

2. **Deploy files from `dist/` folder**

3. **Update remote URLs** in host projects with production URL:

```typescript
remotes: {
  billing_information: 'https://your-domain.com/assets/remoteEntry.js',
}
```

## 🎯 Best Practices

1. **Versioning**: Keep compatible versions of shared dependencies
2. **TypeScript**: Use types defined in `src/types/federation.d.ts`
3. **Lazy Loading**: Always use lazy loading to import remote modules
4. **Error Boundaries**: Implement error boundaries to handle loading failures
5. **Fallbacks**: Always provide fallback components

## 🐛 Troubleshooting

### Error: "Shared module is not available"

- Check if shared dependency versions are compatible
- Confirm that `singleton: true` is configured for critical dependencies

### Error: "Failed to fetch remote"

- Check if the remote URL is correct
- Confirm that the remote server is running
- Check CORS configurations

### TypeScript types not working

- Add `federation.d.ts` to your `tsconfig.json`
- Run `yarn build` in the remote project

## 📚 Additional Resources

- [Module Federation Docs](https://module-federation.github.io/)
- [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)

## 🔄 Next Steps

1. **Add more remotes**: Edit `remoteModules` in `federation.config.ts`
2. **Expose more modules**: Add to `exposedModules` in `federation.config.ts`
3. **Configure CI/CD**: Automate build and deploy
4. **Monitoring**: Add error tracking and performance monitoring
5. **Documentation**: Keep exposed modules documentation up to date

## 🤝 Integration with Other Micro Frontends

### Example: Consuming Another Remote

In `federation.config.ts`, add:

```typescript
export const remoteModules: Record<string, string> = {
  shared_components: 'http://localhost:3001/assets/remoteEntry.js',
  user_service: 'http://localhost:3002/assets/remoteEntry.js',
}
```

And use:

```typescript
import UserProfile from 'user_service/UserProfile'
import Button from 'shared_components/Button'
```

---

**Status**: ✅ Implemented and ready to use

**Last updated**: December 2025
