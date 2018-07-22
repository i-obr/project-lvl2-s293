import jsonFormat from './renderJson';
import plainFormat from './renderPlainText';

const formatRender = {
  json: jsonFormat,
  plain: plainFormat,
};

const render = (format = 'json') => formatRender[format];

export default data => render(data);
