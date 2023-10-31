/* eslint-disable @typescript-eslint/no-explicit-any */

const toCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const isArray = (a: any) => {
  return Array.isArray(a);
};

const isObject = (o: any) => {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const keysToCamel = (o: any) => {
  if (isObject(o)) {
    const n: any = {};

    Object.keys(o).forEach(k => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToCamel(i);
    });
  }

  return o;
};

export default keysToCamel;
