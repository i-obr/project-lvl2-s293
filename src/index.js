import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import createDiff from './createDiff';
import getRender from './renderers';

export default (pathFileBefore, pathFileAfter, format) => {
  const fileEntryBefore = fs.readFileSync(pathFileBefore, 'utf8');
  const fileEntryAfter = fs.readFileSync(pathFileAfter, 'utf8');
  const ext = path.extname(pathFileBefore);
  const parseBefore = getParser(ext, fileEntryBefore);
  const parseAfter = getParser(ext, fileEntryAfter);
  const ast = createDiff(parseBefore, parseAfter);
  const render = getRender(format);
  return render(ast);
};
