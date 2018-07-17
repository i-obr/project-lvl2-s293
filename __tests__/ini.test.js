import gendiff from '../src';

test('gendiff:ini', () => {
  const file1 = '__tests__/__fixtures__/ini/before.ini';
  const file2 = '__tests__/__fixtures__/ini/after.ini';
  const received = gendiff(file1, file2);

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(received).toBe(expected);
});
