import type { TeyaBlocks, TeyaBlocksOptions } from './types';

const CDN_URLS = {
  production: 'https://cdn.teya.com/static/web-sdk/js/teya.js',
  development: 'https://cdn.teya.xyz/static/web-sdk/js/teya.js',
} as const;

let teyaPromise: Promise<TeyaBlocks | null> | null = null;

declare global {
  interface Window {
    TeyaBlocks?: new (sessionToken: string, options?: TeyaBlocksOptions) => TeyaBlocks;
  }
}

const injectScript = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('[Teya Blocks] Cannot load in non-browser environment'));
      return;
    }

    if (window.TeyaBlocks) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () =>
        reject(new Error('[Teya Blocks] Failed to load Teya.js'))
      );
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('[Teya Blocks] Failed to load Teya.js'));

    document.head.appendChild(script);
  });
};

function getCdnUrl(developmentMode?: boolean): string {
  return developmentMode ? CDN_URLS.development : CDN_URLS.production;
}

/**
 * Initializes the Teya Blocks SDK by loading it from CDN using session token authentication.
 *
 * @param sessionToken - Your session token (required)
 * @param options - Optional configuration options (appearance, locale, etc.)
 * @returns Promise resolving to TeyaBlocks instance or null on failure
 *
 * @example
 * ```typescript
 * const teya = await initTeyaBlocks('session_xxx', {
 *   locale: 'en-GB',
 *   appearance: { theme: 'default', fontFamily: 'inter' }
 * });
 *
 * if (teya) {
 *   const card = teya.elements.create('card');
 *   card.mount('#card-element');
 * }
 * ```
 */
export function initTeyaBlocks(
  sessionToken: string,
  options?: TeyaBlocksOptions
): Promise<TeyaBlocks | null> {
  if (teyaPromise) {
    return teyaPromise;
  }

  if (!sessionToken) {
    console.error('[Teya Blocks] sessionToken is required');
    return Promise.resolve(null);
  }

  const cdnUrl = getCdnUrl(options?.developmentMode);

  teyaPromise = injectScript(cdnUrl)
    .then(() => {
      if (!window.TeyaBlocks) {
        throw new Error('[Teya Blocks] TeyaBlocks constructor not found');
      }

      return new window.TeyaBlocks(sessionToken, options);
    })
    .catch((error: Error) => {
      console.error('[Teya Blocks] Failed to load:', error.message);
      teyaPromise = null;
      return null;
    });

  return teyaPromise;
}
