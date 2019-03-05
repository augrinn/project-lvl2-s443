import getDiff from '../src';
import fs from 'fs';

test('getDiff(undefined, undefined) should return \'\'', () => {
  expect(getDiff(undefined, undefined)).toBe('');
});
test('getDiff(file) should return \'\'', () => {
  expect(getDiff('file')).toBe('');
});

const executed = fs.readFileSync('./__tests__/__fixtures__/executed.txt').toString();
test('getDiff(file1.json, file2.json) should return not \'\'', () => {
  const pathToFile1 = './__tests__/__fixtures__/before.json';
  const pathToFile2 = './__tests__/__fixtures__/after.json';
  expect(getDiff(`${pathToFile1}`, `${`${pathToFile2}`}`)).toBe(executed);
});

test('getDiff(file1.yml, file2.yml) should return not \'\'', () => {
  const pathToFile1 = './__tests__/__fixtures__/before.yml';
  const pathToFile2 = './__tests__/__fixtures__/after.yml';
  expect(getDiff(`${pathToFile1}`, `${`${pathToFile2}`}`)).toBe(executed);
});
