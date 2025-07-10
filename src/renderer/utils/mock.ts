export const mockRemote = <T>(
  delay: number,
  data: T[] | ((model: any) => T[]),
  model?: any,
): Promise<T[]> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const result = typeof data === 'function' ? data(model) : data
      resolve(result)
    }, delay),
  )
