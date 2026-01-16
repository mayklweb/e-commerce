type Mods = Record<string, boolean>

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: string[] = [],
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.keys(mods).filter((key) => mods[key]),
  ].join(' ')
}
