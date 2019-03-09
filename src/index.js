import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './renderers';

const getDiffAst = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return keys.reduce((acc, key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return [...acc, { key, type: 'removed', currentValue: data1[key] }];
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return [...acc, { key, type: 'added', currentValue: data2[key] }];
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return [...acc, { key, type: 'complex', children: getDiffAst(data1[key], data2[key]) }];
    }
    if (data1[key] === data2[key]) {
      return [...acc, { key, type: 'unchanged', currentValue: data1[key] }];
    }
    return [...acc, {
      key,
      type: 'updated',
      oldValue: data1[key],
      currentValue: data2[key],
    }];
  }, []);
};

export default (pathToFile1, pathToFile2, outputFormat) => {
  if (!pathToFile1 || !pathToFile2) {
    return '';
  }
  const dataString1 = fs.readFileSync(path.resolve(pathToFile1)).toString();
  const dataString2 = fs.readFileSync(path.resolve(pathToFile2)).toString();
  const dataObj1 = parse(path.extname(pathToFile1).toLowerCase(), dataString1);
  const dataObj2 = parse(path.extname(pathToFile2).toLowerCase(), dataString2);
  const diff = getDiffAst(dataObj1, dataObj2);
  return render(outputFormat, diff);
};
