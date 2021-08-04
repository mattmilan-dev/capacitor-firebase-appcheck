export interface AppCheckPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
