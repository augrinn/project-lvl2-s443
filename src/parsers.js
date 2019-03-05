import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const getParser = (extFile) => {
  if (extFile === '.json') {
    return JSON.parse;
  }
  return yaml.safeLoad;
};

const parse = (pathToFile) => {
  const parser = getParser(path.extname(pathToFile).toLowerCase());
  const dataString = fs.readFileSync(path.resolve(pathToFile)).toString();
  return parser(dataString);
};

export default parse;
