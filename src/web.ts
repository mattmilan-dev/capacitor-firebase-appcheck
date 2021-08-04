import { WebPlugin } from '@capacitor/core';

import type { AppCheckPlugin } from './definitions';

export class AppCheckWeb extends WebPlugin implements AppCheckPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
