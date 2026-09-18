export function load({ url }: { url: URL }) {
  const width = Number(url.searchParams.get('width') ?? 120);
  return {
    width,
    delayed: delayedValue(url.searchParams.get('gate')),
  };
}
import { delayedValue } from '../gates.js';
