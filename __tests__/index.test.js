import getDiff from '../src';
import fs from 'fs';

test("getDiff() should return ''", () => {
  expect(getDiff()).toBe('');
  expect(getDiff('file')).toBe('');
});

test.each([
    ['before.json', 'after.json', 'expected.txt'], 
    ['before.yml', 'after.yml', 'expected.txt'], 
    ['before.ini', 'after.ini', 'expected.txt'],
  ])(
  "getDiff(%s, %s) should return not ''",
  (pathToFileBefore, pathToFileAfter, pathToFileExpected) => {
    const expected = fs.readFileSync(`./__tests__/__fixtures__/${pathToFileExpected}`).toString();
    const fullPathToFileBefore = `./__tests__/__fixtures__/${pathToFileBefore}`;
    const fullPathToFileAfter = `./__tests__/__fixtures__/${pathToFileAfter}`;
    const diff = getDiff(fullPathToFileBefore, fullPathToFileAfter);
    expect(diff).toBe(expected);
  },
);