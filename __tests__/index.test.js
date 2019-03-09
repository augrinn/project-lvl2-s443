import getDiff from '../src';
import fs from 'fs';

test("getDiff() should return ''", () => {
  expect(getDiff()).toBe('');
  expect(getDiff('file')).toBe('');
});

test.each([
    ['before.json', 'after.json', 'default', 'expected.txt'], 
    ['before.yml', 'after.yml', 'default', 'expected.txt'], 
    ['before.ini', 'after.ini', 'default', 'expected.txt'],
    ['before.json', 'after.json', 'plain', 'expectedPlain.txt'], 
    ['before.yml', 'after.yml', 'plain', 'expectedPlain.txt'], 
    ['before.ini', 'after.ini', 'plain', 'expectedPlain.txt'],
  ])(
  "getDiff(%s, %s, %s) should return not ''",
  (pathToFileBefore, pathToFileAfter, outputFormat, pathToFileExpected) => {
    const expected = fs.readFileSync(`./__tests__/__fixtures__/${pathToFileExpected}`).toString();
    const fullPathToFileBefore = `./__tests__/__fixtures__/${pathToFileBefore}`;
    const fullPathToFileAfter = `./__tests__/__fixtures__/${pathToFileAfter}`;
    const diff = getDiff(fullPathToFileBefore, fullPathToFileAfter, outputFormat);
    expect(diff).toBe(expected);
  },
);