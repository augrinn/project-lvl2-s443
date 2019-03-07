import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const getDiffAst = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return keys.reduce((acc, key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return [...acc, { key, action: 'deleted', children: [], value: data1[key] }];
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return [...acc, { key, action: 'added', children: [], value: data2[key] }];
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return [...acc, { key, action: 'noChange', children: getDiffAst(data1[key], data2[key]), value: '' }];
    }
    if (data1[key] === data2[key]) {
      return [...acc, { key, action: 'noChange', children: [], value: data1[key] }];
    }
    return [...acc, 
        { key, action: 'deleted', children: [], value: data1[key] }, 
        { key, action: 'added', children: [], value: data2[key] }];
  }, []);
};

const prefixes = {
  'added': '+ ',
  'deleted': '- ',
  'noChange': '  ',
}

const stringifyObj = (obj, indent)  => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const stringIndentBefore = ' '.repeat(indent + 4);
  const stringIndentAfter = ' '.repeat(indent);
  const objString = Object.keys(obj).map(key => `${key}: ${obj[key]}`).join('\n');
  return `{\n${stringIndentBefore}${objString}\n${stringIndentAfter}}`;
}

const stringify = (node, indent=2) => {
  const stringIndent = ' '.repeat(indent);
  const prefix = prefixes[node.action];
  const value = 
     node.children.length 
     ? `{\n${node.children.map(el => stringify(el, indent + 4)).join('\n')}\n${' '.repeat(indent + 2)}}`
     : stringifyObj(node.value, indent + 2);

  return `${stringIndent}${prefix}${node.key}: ${value}`;
}

const render = diff => `{\n${diff.map(node => stringify(node)).join('\n')}\n}`;

export default (pathToFile1, pathToFile2) => {
  if (!pathToFile1 || !pathToFile2) {
    return '';
  }
  const dataString1 = fs.readFileSync(path.resolve(pathToFile1)).toString();
  const dataString2 = fs.readFileSync(path.resolve(pathToFile2)).toString();
  const dataObj1 = parse(path.extname(pathToFile1).toLowerCase(), dataString1);
  const dataObj2 = parse(path.extname(pathToFile2).toLowerCase(), dataString2);
  const diff = getDiffAst(dataObj1, dataObj2);
  return render(diff);
};
