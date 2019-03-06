import yaml from 'js-yaml';
import ini from 'ini';

export const getParser = (extFile) => {
  if (extFile === '.json') {
    return JSON.parse;
  }
  if (extFile === '.yml') {
    return yaml.safeLoad;
  }
  return ini.parse;
};

export default (type, data) => getParser(type)(data);
