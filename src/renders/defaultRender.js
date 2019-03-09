/* eslint-disable no-use-before-define */
import _ from 'lodash';

const renders = {
  removed: (node, indent = 2) => `${' '.repeat(indent)}- ${node.key}: ${stringifyValue(node.currentValue, indent + 2)}`,
  added: (node, indent = 2) => `${' '.repeat(indent)}+ ${node.key}: ${stringifyValue(node.currentValue, indent + 2)}`,
  complex: (node, indent = 2) => `${' '.repeat(indent)}  ${node.key}: ${stringifyChildren(node.children, indent)}`,
  unchanged: (node, indent = 2) => `${' '.repeat(indent)}  ${node.key}: ${stringifyValue(node.currentValue, indent + 2)}`,
  updated: (node, indent = 2) => [`${' '.repeat(indent)}- ${node.key}: ${stringifyValue(node.oldValue, indent + 2)}`,
    `${' '.repeat(indent)}+ ${node.key}: ${stringifyValue(node.currentValue, indent + 2)}`].join('\n'),
};

const stringifyValue = (value, indent) => {
  if (!_.isObject(value)) {
    return value;
  }
  const stringIndentBefore = ' '.repeat(indent + 4);
  const stringIndentAfter = ' '.repeat(indent);
  const valueString = Object.keys(value).map(key => `${key}: ${value[key]}`).join('\n');
  return `{\n${stringIndentBefore}${valueString}\n${stringIndentAfter}}`;
};

const stringifyChildren = (children, indent) => `{\n${children.map(node => renders[node.type](node, indent + 4)).join('\n')}\n${' '.repeat(indent + 2)}}`;

const render = diff => `{\n${diff.map(node => renders[node.type](node)).join('\n')}\n}`;

export default render;
