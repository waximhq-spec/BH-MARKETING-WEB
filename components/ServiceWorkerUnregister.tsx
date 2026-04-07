'use client';

import { useEffect } from 'react';

/**
 * This component handles the unregistration of any old Service Workers
 * that might be stuck in the user's browser, which can cause caching issues
 * (like the "old version" of the site loading on refresh).
 */
export default function ServiceWorkerUnregister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then((success) => {
            if (success) {
              console.log('Successfully unregistered old Service Worker');
              // Optional: reload the page to get the fresh content if a SW was actually removed
              window.location.reload();
            }
          });
        }
      });
    }
  }, []);

  return null;
}
