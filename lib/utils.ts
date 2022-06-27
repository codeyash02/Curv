export const get = (obj: Record<string, any>, path: string, def?: any): any => {
  const fullPath = path
    .replace(/\[/g, '.')
    .replace(/]/g, '')
    .split('.')
    .filter(Boolean);

  if (obj == null) {
    return def || null;
  }

  function everyFunc(step: string): boolean | null {
    if (obj[step] !== null) {
      const resultEveryFunc = !(step && (obj = obj[step]) === undefined);
      return resultEveryFunc;
    }
    return null;
  }

  return fullPath.every(everyFunc) ? obj : def;
};
