// @flow
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import createDiff from './createDiff';
import render from './render';

const gendiff = (pathFileBefore: string, pathFileAfter: string) => {
  const fileEntryBefore = fs.readFileSync(pathFileBefore, 'utf8');
  const fileEntryAfter = fs.readFileSync(pathFileAfter, 'utf8');
  const ext = path.extname(pathFileBefore);
  const parseBefore = getParser(ext, fileEntryBefore);
  const parseAfter = getParser(ext, fileEntryAfter);
  const ast = createDiff(parseBefore, parseAfter);
  return render(ast);
};

export default gendiff;
