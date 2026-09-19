import { createContext } from 'svelte';

export interface ThemeHost {
  readonly marker: string;
  readonly dir?: string;
}
const [getHost, setHost, hasHost] = createContext<() => ThemeHost>();
export const provideThemeHost = (read: () => ThemeHost) => setHost(read);
export const captureThemeHost = () => (hasHost() ? getHost() : undefined);
