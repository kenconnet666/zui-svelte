export function load({ url }: { url: URL }) {
  return { initial: url.searchParams.has('open') };
}
