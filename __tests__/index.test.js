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
  (fileBefore, fileAfter, fileExpected) => {
    const expected = fs.readFileSync(`./__tests__/__fixtures__/${fileExpected}`).toString();
    const pathToFileBeforeChange = `./__tests__/__fixtures__/${fileBefore}`;
    const pathToFileAfterChange = `./__tests__/__fixtures__/${fileAfter}`;
    const diff = getDiff(pathToFileBeforeChange, pathToFileAfterChange);
    expect(diff).toBe(expected);
  },
);