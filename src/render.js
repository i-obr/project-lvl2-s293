import _ from 'lodash';

const INDENTATION = 4;

const nodeActions = [
  {
    type: 'children',
    renderNode: (toStr, node, depth, cb) => [`  ${node.key}: ${cb(node.children, depth)}`],
  },
  {
    type: 'added',
    renderNode: (toStr, node, depth) => `+ ${node.key}: ${toStr(node.afterValue, depth)}`,
  },
  {
    type: 'deleted',
    renderNode: (toStr, node, depth) => `- ${node.key}: ${toStr(node.beforeValue, depth)}`,
  },
  {
    type: 'unchanged',
    renderNode: (toStr, node, depth) => `  ${node.key}: ${toStr(node.beforeValue, depth)}`,
  },
  {
    type: 'changed',
    renderNode: (toStr, node, depth) => [`- ${node.key}: ${toStr(node.beforeValue, depth)}`, `+ ${node.key}: ${toStr(node.afterValue, depth)}`],
  },
];

const getNodeActions = node => nodeActions
  .find(({ type }) => type === node.type);

const format = (arr, depth) => {
  const counter = depth === 0 ? INDENTATION - 2 : (INDENTATION * depth) + 2;
  const formatStr = arr.map(elem => `${' '.repeat(counter)}${elem}`).join('\n');
  return `{\n${formatStr}\n${' '.repeat(counter - 2)}}`;
};

const stringify = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }
  const keys = Object.keys(node);
  const str = keys.map(key => `  ${key}: ${node[key]}`);
  return format(str, depth);
};

const render = (data, depth = 0) => {
  const prerender = data.map((node) => {
    const { renderNode } = getNodeActions(node);
    return renderNode(stringify, node, depth + 1, render);
  });
  return format(_.flatten(prerender), depth);
};

export default render;
