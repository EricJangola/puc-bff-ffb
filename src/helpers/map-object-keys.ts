import get from 'lodash.get';
import set from 'lodash.set';

type TSchema = Record<string, string | ((data: object) => unknown)>;

export default function mapObjectKeys<R extends object>(schema: TSchema, data: Record<string, any>): R {
  return Object.entries(schema).reduce((result, [newKey, currentKey]) => {
    let val;
    if (typeof currentKey === 'function') {
      val = currentKey(data);
    } else {
      val = get(data, currentKey) as object;
    }

    if (val !== undefined) {
      return set(result, newKey, val);
    }

    return result;
  }, {} as R);
}
