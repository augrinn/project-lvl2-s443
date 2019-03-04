import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getJsonFromFile = (pathToFile) => {
  const data = fs.readFileSync(path.resolve(pathToFile));
  return JSON.parse(data.toString());
};

const getDiffFromObject = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return keys.reduce((acc, key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      acc.push(`- ${key}: ${data1[key]}`);
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      acc.push(`+ ${key}: ${data2[key]}`);
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] !== data2[key]) {
        acc.push(`+ ${key}: ${data2[key]}`);
        acc.push(`- ${key}: ${data1[key]}`);
      } else {
        acc.push(`  ${key}: ${data1[key]}`);
      }
    }
    return acc;
  }, []);
};

export default (pathToFile1, pathToFile2) => {
  if (!pathToFile1 || !pathToFile2) {
    return '';
  }
  const data1 = getJsonFromFile(path.resolve(pathToFile1));
  const data2 = getJsonFromFile(path.resolve(pathToFile2));
  return `{ ${getDiffFromObject(data1, data2).join(' ')} }`;
};
