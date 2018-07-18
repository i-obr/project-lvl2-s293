import yaml from 'js-yaml';
import ini from 'ini';

const parse = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (ext, file) => parse[ext](file);
