export interface InitializationOptions {
  /**
   * If debug is enabled, the native environment will log debug creds and use debug mode. Intended
   * to be used with staging or development environmnets only. Do not set this to TRUE in production.
   * 
   * @since 1.0.0
   */
  debug: boolean;
}

export type AppCheckToken = {
  /**
   * The token provided by the native environment to be sent to firebase.
   *
   * @since 1.0.0
   */
  token: string;

  /**
   * The expiration date of the token in milliseconds since epoch [Unix time]
   * 
   * @since 1.0.0
   */
  exp: number;
}

export interface AppCheckPlugin {
  /**
   * A method to initialise the AppCheck plugin. This must be called once and once only before
   * calling any other method. Returns true on success or false on failure. Check native logs to
   * see the actual problem.
   * @usage
   * ```typescript
   * const success = await AppCheck.initialize({
   *   debug: false
   * });
   * ```
   * 
   * @since 1.0.0
   */
  initialize(options?: InitializationOptions): Promise<{ success: boolean }>;

  /**
   * Get's the native AppCheck token from AppAttest/DeviceCheck on iOS[>=14/<14] or SafetyNet on Android.
   * @usage
   * ```typescript
   * const { token } = await AppCheck.getAppCheckToken();
   * ```
   * 
   * @since 1.0.0
   */
  getAppCheckToken(): Promise<AppCheckToken>;
}
