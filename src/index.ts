import { registerPlugin } from '@capacitor/core';

import type { AppCheckPlugin } from './definitions';

const AppCheck = registerPlugin<AppCheckPlugin>(
  'AppCheck', 
  {
    web: () => import('./web').then(m => new m.AppCheckWeb()),
  }
);

export * from './definitions';
export { AppCheck };
