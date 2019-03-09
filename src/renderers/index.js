import treeRender from './treeRender';
import plainRender from './plaintRender';
import jsonRender from './jsonRender';

const renders = {
  tree: treeRender,
  plain: plainRender,
  json: jsonRender,
};

export default (outputFormat, diff) => renders[outputFormat](diff);
