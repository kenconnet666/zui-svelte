import { releaseGate } from '../../gates.js';

export function GET({ url }: { url: URL }) {
  releaseGate(url.searchParams.get('gate') ?? '');
  return new Response(null, { status: 204 });
}
