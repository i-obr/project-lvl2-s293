import gendiff from '../src';

test('gendiff:json', () => {
  const file1 = '__tests__/__fixtures__/json/before.json';
  const file2 = '__tests__/__fixtures__/json/after.json';
  const received = gendiff(file1, file2);

  const expected =
`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(received).toBe(expected);
});
