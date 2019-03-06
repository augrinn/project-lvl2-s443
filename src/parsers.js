import yaml from 'js-yaml';

export const getParser = (extFile) => {
  if (extFile === '.json') {
    return JSON.parse;
  }
  return yaml.safeLoad;
};

export default (type, data) => getParser(type)(data);
