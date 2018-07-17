// @flow
import fs from 'fs';
import _ from 'lodash';

const gendiff = (pathFileBefore: string, pathFileAfter: string) => {
  const fileEntryBefore = fs.readFileSync(pathFileBefore, 'utf8');
  const fileEntryAfter = fs.readFileSync(pathFileAfter, 'utf8');
  const parseBefore = JSON.parse(fileEntryBefore);
  const parseAfter = JSON.parse(fileEntryAfter);
  const union = _.union(Object.keys(parseBefore), Object.keys(parseAfter));

  const result = union.map((key) => {
    if (!parseAfter[key]) {
      return `  - ${key}: ${parseBefore[key]}`;
    } else if (!parseBefore[key]) {
      return `  + ${key}: ${parseAfter[key]}`;
    } else if (parseBefore[key] !== parseAfter[key]) {
      return `  + ${key}: ${parseAfter[key]}\n  - ${key}: ${parseBefore[key]}`;
    }
    return `   ${key}: ${parseBefore[key]}`;
  });

  return `{\n ${result.join('\n')}\n}`;
};

export default gendiff;
