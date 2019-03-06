import getDiff from '../src';
import fs from 'fs';

test("getDiff() should return ''", () => {
  expect(getDiff()).toBe('');
  expect(getDiff('file')).toBe('');
});

test("getDiff(file1.json, file2.json) should return not ''", () => {
  const executed = fs.readFileSync('./__tests__/__fixtures__/executed.txt').toString();  
  expect(getDiff('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json')).toBe(executed);
  expect(getDiff('./__tests__/__fixtures__/before.yml', './__tests__/__fixtures__/after.yml')).toBe(executed);
});
