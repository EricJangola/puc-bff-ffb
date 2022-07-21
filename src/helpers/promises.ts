export function each<T, R>(
  values: T[],
  callback: (value: T, index: number) => Promise<R>,
): Promise<PromiseSettledResult<R>[]> {
  if (!values?.length) {
    return Promise.resolve([]);
  }

  return values.reduce<Promise<PromiseSettledResult<R>[]>>(async (promise, currentValue, index) => {
    const results = await promise;

    try {
      const response = await callback(currentValue, index);
      return [
        ...results,
        {
          status: 'fulfilled',
          value: response,
        },
      ];
    } catch (error) {
      return [
        ...results,
        {
          status: 'rejected',
          reason: error,
        },
      ];
    }
  }, Promise.resolve([]));
}
