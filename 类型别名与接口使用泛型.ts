function uniqueArray<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
const arr1 = [1, 2, 3, 4, 5];
const arr2 = ['a', 'b', 'c'];

const arr3 = uniqueArray(arr1);
const arr4 = uniqueArray(arr2);