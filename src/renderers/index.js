import tapFormat from './renderTap';
import plainFormat from './renderPlainText';
import jsonFormat from './renderJson';

const formatRender = {
  tap: tapFormat,
  plain: plainFormat,
  json: jsonFormat,
};

const render = (format = 'tap') => formatRender[format];

export default data => render(data);
