import { writeFileSync } from 'fs'
import { join } from 'path'

const distPath = join(process.cwd(), 'dist')
const wrapperPath = join(distPath, 'remoteEntry-wrapper.js')

try {
  const wrapperContent = `
(function(window) {
  'use strict';

  // IMPORTANTE: Captura a URL base IMEDIATAMENTE, antes de qualquer código assíncrono
  const currentScript = document.currentScript;

  if (!currentScript) {
    console.error('Could not get current script reference');
  }

  const scriptUrl = currentScript ? currentScript.src : '';
  const BASE_URL = scriptUrl ? scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1) : 'http://localhost:5173/';
  const REMOTE_ENTRY_URL = BASE_URL + 'remoteEntry.js';

  console.log('Current Script:', currentScript);
  console.log('Script URL:', scriptUrl);
  console.log('Vite Remote Base URL:', BASE_URL);
  console.log('Vite Remote Entry URL:', REMOTE_ENTRY_URL);

  let modulePromise = null;
  let moduleCache = null;

  async function loadViteModule() {
    if (moduleCache) return moduleCache;
    if (modulePromise) return modulePromise;

    console.log('Loading Vite remote from:', REMOTE_ENTRY_URL);

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
      console.log('Requesting module:', request);
      const module = await loadViteModule();
      console.log('Loaded Vite module:', module);
      console.log('Module has get?', typeof module.get);

      if (module.get) {
        console.log('Calling module.get for:', request);
        try {
          const factory = await module.get(request);
          console.log('Got factory from module.get:', factory);
          const result = factory();
          console.log('Got result from factory:', result);

          // Se o resultado tem um named export 'BillingInformation', use-o
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

      // Fallback para exports diretos
      console.log('No module.get found, trying direct export');
      const cleanRequest = request.replace('./', '');
      console.log('Clean request:', cleanRequest);
      console.log('Available exports:', Object.keys(module));

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
  console.error('Error creating remoteEntry-wrapper.js:', error)
}
