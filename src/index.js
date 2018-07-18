// @flow
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const extActions = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

const gendiff = (pathFileBefore: string, pathFileAfter: string) => {
  const fileEntryBefore = fs.readFileSync(pathFileBefore, 'utf8');
  const fileEntryAfter = fs.readFileSync(pathFileAfter, 'utf8');
  const ext = path.extname(pathFileBefore);
  const parseBefore = extActions[ext](fileEntryBefore);
  const parseAfter = extActions[ext](fileEntryAfter);
  const union = _.union(Object.keys(parseBefore), Object.keys(parseAfter));

  const diff = union.map((key) => {
    if (!_.has(parseAfter, key)) {
      return `  - ${key}: ${parseBefore[key]}`;
    }

    if (!_.has(parseBefore, key)) {
      return `  + ${key}: ${parseAfter[key]}`;
    }

    if (parseBefore[key] !== parseAfter[key]) {
      return `  + ${key}: ${parseAfter[key]}\n  - ${key}: ${parseBefore[key]}`;
    }

    return `   ${key}: ${parseBefore[key]}`;
  });

  return `{\n ${diff.join('\n')}\n}`;
};

export default gendiff;
