import getDiff from '../src';
import fs from 'fs';

test("getDiff() should return ''", () => {
  expect(getDiff()).toBe('');
  expect(getDiff('file')).toBe('');
});

test.each([
    ['before.json', 'after.json', 'executed.txt'], 
    ['before.yml', 'after.yml', 'executed.txt'], 
    ['before.ini', 'after.ini', 'executed.txt']
  ])(
  "getDiff(%s, %s) should return not ''",
  (fileBefore, fileAfter, fileExpected) => {
    const expected = fs.readFileSync(`./__tests__/__fixtures__/${fileExpected}`).toString();
    const before = `./__tests__/__fixtures__/${fileBefore}`;
    const after = `./__tests__/__fixtures__/${fileAfter}`;
    const diff = getDiff(before, after);
    expect(diff).toBe(expected);
  },
);