import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => ({ customTheme: url.pathname === '/custom' });
