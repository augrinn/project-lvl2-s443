import _ from 'lodash';

const lengthIndent = 2;
const lengthPrefix = 2;
const lengthIndentBeforeBracket = 4;

const stringifyValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const indent = ' '.repeat(depth * lengthIndent + depth * lengthPrefix + lengthIndent + lengthPrefix);
  const indentBeforeBracket = ' '.repeat(depth * lengthIndentBeforeBracket);
  const valueString = Object.keys(value).map(key => `${key}: ${value[key]}`).join('\n');
  return `{\n${indent}${valueString}\n${indentBeforeBracket}}`;
};

const renders = {
  removed: (node, indent, depth) => `${indent}- ${node.key}: ${stringifyValue(node.currentValue, depth + 1)}`,
  added: (node, indent, depth) => `${indent}+ ${node.key}: ${stringifyValue(node.currentValue, depth + 1)}`,
  complex: (node, indent, depth, renderMethod) => `${indent}  ${node.key}: ${renderMethod(node.children, depth + 1)}`,
  unchanged: (node, indent, depth) => `${indent}  ${node.key}: ${stringifyValue(node.currentValue, depth + 1)}`,
  updated: (node, indent, depth) => [`${indent}- ${node.key}: ${stringifyValue(node.oldValue, depth + 1)}`,
    `${indent}+ ${node.key}: ${stringifyValue(node.currentValue, depth + 1)}`],
};

const render = (diff, depth = 0) => {
  const indent = ' '.repeat(depth * lengthIndent + depth * lengthPrefix + lengthIndent);
  const indentBeforeBracket = ' '.repeat(depth * lengthIndentBeforeBracket);
  const result = _.flatten(diff.map(node => renders[node.type](node, indent, depth, render)));
  return `{\n${result.join('\n')}\n${indentBeforeBracket}}`;
};

export default render;
