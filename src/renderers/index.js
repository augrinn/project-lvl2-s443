import treeRender from './treeRender';
import plainRender from './plaintRender';

const renders = {
  tree: treeRender,
  plain: plainRender,
};

export default (outputFormat, diff) => renders[outputFormat](diff);
