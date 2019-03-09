import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const renders = {
  removed: (node, keys) => `Property '${keys.join('.')}' was removed`,
  added: (node, keys) => `Property '${keys.join('.')}' was added with value: ${stringifyValue(node.currentValue)}`,
  complex: (node, keys, renderMethod) => renderMethod(node.children, keys),
  updated: (node, keys) => `Property '${keys.join('.')}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.currentValue)}`,
};

const render = (diff, keys = []) => {
  const result = diff
    .filter(node => node.type !== 'unchanged')
    .map(node => renders[node.type](node, [...keys, node.key], render));
  return result.join('\n');
};

export default render;
