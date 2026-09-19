export type FieldPath = readonly (string | number)[];
export type FieldName = string | FieldPath;

export function fieldPath(name: FieldName): FieldPath {
  const path =
    typeof name === 'string'
      ? name.split('.').map((part) => (/^(0|[1-9]\d*)$/u.test(part) ? Number(part) : part))
      : [...name];
  if (
    !path.length ||
    path.some(
      (part) =>
        part === '' || (typeof part === 'number' && (!Number.isSafeInteger(part) || part < 0)),
    )
  )
    throw new TypeError('Field names use non-empty paths with non-negative safe array indices.');
  return Object.freeze(path);
}

export const pathKey = (path: FieldPath) => JSON.stringify(path);
export const samePath = (left: FieldPath, right: FieldPath) => pathKey(left) === pathKey(right);
export const withinPath = (child: FieldPath, parent: FieldPath) =>
  parent.length <= child.length && parent.every((part, index) => part === child[index]);

export function valueAt(value: unknown, path: FieldPath): unknown {
  for (const part of path) {
    if (value === null || typeof value !== 'object' || !Object.hasOwn(value, part))
      return undefined;
    value = Reflect.get(value, part);
  }
  return value;
}
