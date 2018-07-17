import gendiff from '../src';

test('gendiff:yaml', () => {
  const file1 = '__tests__/__fixtures__/yaml/before.yml';
  const file2 = '__tests__/__fixtures__/yaml/after.yml';
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
