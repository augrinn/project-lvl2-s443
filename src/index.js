import _ from 'lodash';
import parse from './parsers';

const getDiffBetweenObject = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return keys.reduce((acc, key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return [...acc, `- ${key}: ${data1[key]}`];
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return [...acc, `+ ${key}: ${data2[key]}`];
    }
    if (data1[key] !== data2[key]) {
      return [...acc, `+ ${key}: ${data2[key]}`, `- ${key}: ${data1[key]}`];
    }
    return [...acc, `  ${key}: ${data1[key]}`];
  }, []);
};

const getDiffAsString = diff => `{ ${diff.join(' ')} }`;

export default (pathToFile1, pathToFile2) => {
  if (!pathToFile1 || !pathToFile2) {
    return '';
  }
  const dataObj1 = parse(pathToFile1);
  const dataObj2 = parse(pathToFile2);
  const diff = getDiffBetweenObject(dataObj1, dataObj2);
  return getDiffAsString(diff);
};
