import _ from 'lodash';

const stringify = node => (!_.isObject(node) ? `value: '${node}'` : '\'complex value\'');

const nodeActions = [
  {
    type: 'children',
    renderNode: (node, path, cb) => `${cb(node.children, path)}`,
  },
  {
    type: 'added',
    renderNode: (node, path) => `Property '${path.join('.')}' was added with ${stringify(node.afterValue)}`,
  },
  {
    type: 'deleted',
    renderNode: (node, path) => `Property '${path.join('.')}' was removed`,
  },
  {
    type: 'changed',
    renderNode: (node, path) => `Property '${path.join('.')}' was updated. From ${stringify(node.beforeValue)} to ${stringify(node.afterValue)}`,
  },
];

const getNodeActions = node => nodeActions
  .find(({ type }) => type === node.type);

const render = (data, path = []) => {
  const filtered = data.filter(node => node.type !== 'unchanged');
  return filtered.map((node) => {
    const { renderNode } = getNodeActions(node);
    return renderNode(node, [...path, node.key], render);
  }).join('\n');
};

export default render;
