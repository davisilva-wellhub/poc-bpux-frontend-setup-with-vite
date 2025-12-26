import { writeFileSync } from 'fs'
import { join } from 'path'

// eslint-disable-next-line no-undef
const distPath = join(process.cwd(), 'dist')
const wrapperPath = join(distPath, 'remoteEntry-wrapper.js')

try {
  const wrapperContent = `
(function(window) {
  'use strict';

  const currentScript = document.currentScript;
  const scriptUrl = currentScript ? currentScript.src : '';
  const BASE_URL = scriptUrl ? scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1) : 'http://localhost:5173/';
  const REMOTE_ENTRY_URL = BASE_URL + 'remoteEntry.js';

  let modulePromise = null;
  let moduleCache = null;

  async function loadViteModule() {
    if (moduleCache) return moduleCache;
    if (modulePromise) return modulePromise;

    modulePromise = import(REMOTE_ENTRY_URL)
      .then(module => {
        moduleCache = module;
        return module;
      })
      .catch(error => {
        console.error('Failed to load Vite remoteEntry:', error);
        throw error;
      });

    return modulePromise;
  }

  const container = {
    init: async function(shareScope) {
      const module = await loadViteModule();
      if (module.init) {
        return module.init(shareScope);
      }
      return Promise.resolve();
    },

    get: async function(request) {
      const module = await loadViteModule();

      if (module.get) {
        try {
          const factory = await module.get(request);
          const result = factory();

          if (result.BillingInformation) {
            return () => ({
              __esModule: true,
              default: result.BillingInformation
            });
          }

          return () => result;
        } catch (error) {
          console.error('Error calling module.get:', error);
          throw error;
        }
      }

      const cleanRequest = request.replace('./', '');

      if (module[cleanRequest]) {
        return () => ({
          __esModule: true,
          default: module[cleanRequest]
        });
      }

      console.error('Module not found. Available exports:', Object.keys(module));
      throw new Error(\`Module "\${request}" not found in remote\`);
    }
  };

  window.billingInformationMFE = container;
})(window);
`

  writeFileSync(wrapperPath, wrapperContent, 'utf-8')
} catch (error) {
  // eslint-disable-next-line no-undef
  console.error('Error creating remoteEntry-wrapper.js:', error)
}
