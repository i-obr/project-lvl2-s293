import _ from 'lodash';

const nodeActions = [
  {
    type: 'children',
    renderNode: (displayStr, node, depth, cb) => [`  ${node.key}: ${cb(node.children, depth)}`],
  },
  {
    type: 'added',
    renderNode: (displayStr, node, depth) => `+ ${node.key}: ${displayStr(node.afterValue, depth)}`,
  },
  {
    type: 'deleted',
    renderNode: (displayStr, node, depth) => `- ${node.key}: ${displayStr(node.beforeValue, depth)}`,
  },
  {
    type: 'unchanged',
    renderNode: (displayStr, node, depth) => `  ${node.key}: ${displayStr(node.beforeValue, depth)}`,
  },
  {
    type: 'changed',
    renderNode: (displayStr, node, depth) => [`- ${node.key}: ${displayStr(node.beforeValue, depth)}`, `+ ${node.key}: ${displayStr(node.afterValue, depth)}`],
  },
];

const getNodeActions = node => nodeActions
  .find(({ type }) => type === node.type);

const formatter = (arr, depth) => {
  const indentation = 4;
  const counter = depth === 0 ? indentation - 2 : (indentation * depth) + 2;
  const str = arr.map(elem => `${' '.repeat(counter)}${elem}`).join('\n');
  return `{\n${str}\n${' '.repeat(counter - 2)}}`;
};

const stringify = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }
  const keys = Object.keys(node);
  const str = keys.map(key => `  ${key}: ${node[key]}`);
  return formatter(str, depth);
};

const render = (data, depth = 0) => {
  const prerender = data.map((node) => {
    const { renderNode } = getNodeActions(node);
    return renderNode(stringify, node, depth + 1, render);
  });
  return formatter(_.flatten(prerender), depth);
};

export default render;
