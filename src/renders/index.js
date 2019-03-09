import defaultRender from './defaultRender';
import plainRender from './plaintRender';

const renders = {
  default: diff => defaultRender(diff),
  plain: diff => plainRender(diff),
};

export default (outputFormat, diff) => renders[outputFormat](diff);
