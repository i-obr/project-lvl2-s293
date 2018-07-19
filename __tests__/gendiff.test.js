import fs from 'fs';
import gendiff from '../src';

const pathMask = '__tests__/__fixtures__/';

describe('Compare flat file', () => {
  const expected = fs.readFileSync(`${pathMask}expected.txt`, 'utf8');

  test('gendiff:json', () => {
    const pathFile1 = `${pathMask}json/before.json`;
    const pathFile2 = `${pathMask}json/after.json`;
    const received = gendiff(pathFile1, pathFile2);
    expect(received).toBe(expected);
  });

  test('gendiff:yaml', () => {
    const pathFile1 = `${pathMask}yaml/before.yml`;
    const pathFile2 = `${pathMask}yaml/after.yml`;
    const received = gendiff(pathFile1, pathFile2);
    expect(received).toBe(expected);
  });

  test('gendiff:ini', () => {
    const pathFile1 = `${pathMask}ini/before.ini`;
    const pathFile2 = `${pathMask}ini/after.ini`;
    const received = gendiff(pathFile1, pathFile2);
    expect(received).toBe(expected);
  });
})
