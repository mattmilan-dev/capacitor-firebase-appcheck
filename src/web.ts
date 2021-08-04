import { WebPlugin } from '@capacitor/core';

import type { AppCheckPlugin, AppCheckToken } from './definitions';

export class AppCheckWeb extends WebPlugin implements AppCheckPlugin {
  initialize(_options: { debug: boolean; }): Promise<{ success: boolean; }> {
    throw this.unimplemented('Not implemented on the web.');
  }
  getAppCheckToken(): Promise<AppCheckToken> {
    throw this.unimplemented('Not implemented on the web.');
  }
}
