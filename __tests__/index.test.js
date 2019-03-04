import getDiff from '../src';

test('getDiff(undefined, undefined) should return \'\'', () => {
  expect(getDiff(undefined, undefined)).toBe('');
});
test('getDiff(undefined, \'\\path\\to\\file.js\') should return \'\'', () => {
  expect(getDiff(undefined, '\\path\\to\\file.js')).toBe('');
});
test('getDiff(\'\\path\\to\\file.js\', undefined) should return \'\'', () => {
  expect(getDiff('\\path\\to\\file.js', undefined)).toBe('');
});

test('getDiff(\'\\path\\to\\file1.js\', \'\\path\\to\\file2.js\') should return \'\'', () => {
  const pathToFile1 = './__tests__/__fixtures__/before.json';
  const pathToFile2 = './__tests__/__fixtures__/after.json';
  expect(getDiff(`${pathToFile1}`, `${`${pathToFile2}`}`)).toBe('{ - follow: false   host: hexlet.io - proxy: 123.234.53.22 + timeout: 20 - timeout: 50 + verbose: true }');
});
