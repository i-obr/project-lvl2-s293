import fs from 'fs';
import gendiff from '../src';

const pathMask = '__tests__/__fixtures__/';

describe('Compare flat file', () => {
  const expected = fs.readFileSync(`${pathMask}expected.flat.txt`, 'utf8').trim();

  test('gendiff:json', () => {
    const pathFile1 = `${pathMask}json/before.flat.json`;
    const pathFile2 = `${pathMask}json/after.flat.json`;
    const received = gendiff(pathFile1, pathFile2);
    expect(received).toBe(expected);
  });

  test('gendiff:yaml', () => {
    const pathFile1 = `${pathMask}yaml/before.flat.yml`;
    const pathFile2 = `${pathMask}yaml/after.flat.yml`;
    const received = gendiff(pathFile1, pathFile2);
    expect(received).toBe(expected);
  });

  test('gendiff:ini', () => {
    const pathFile1 = `${pathMask}ini/before.flat.ini`;
    const pathFile2 = `${pathMask}ini/after.flat.ini`;
    const received = gendiff(pathFile1, pathFile2);
    expect(received).toBe(expected);
  });
});

describe('Compare recursive file', () => {
  const expected = fs.readFileSync(`${pathMask}expected.recursive.txt`, 'utf8').trim();

  test('gendiff:json', () => {
    const pathFile1 = `${pathMask}json/before.recursive.json`;
    const pathFile2 = `${pathMask}json/after.recursive.json`;
    const received = gendiff(pathFile1, pathFile2);
    expect(received).toBe(expected);
  });

  test('gendiff:yaml', () => {
    const pathFile1 = `${pathMask}yaml/before.recursive.yml`;
    const pathFile2 = `${pathMask}yaml/after.recursive.yml`;
    const received = gendiff(pathFile1, pathFile2);
    expect(received).toBe(expected);
  });

  test('gendiff:ini', () => {
    const pathFile1 = `${pathMask}ini/before.recursive.ini`;
    const pathFile2 = `${pathMask}ini/after.recursive.ini`;
    const received = gendiff(pathFile1, pathFile2);
    expect(received).toBe(expected);
  });
});
