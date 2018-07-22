import _ from 'lodash';

const propertyActions = [
  {
    type: 'children',
    check: (before, after, key) => (_.isObject(before[key]) && _.isObject(after[key])),
    process: (beforeValue, afterValue, cb) => ({
      children: cb(beforeValue, afterValue),
    }),
  },
  {
    type: 'added',
    check: (before, after, key) => (!_.has(before, key) && _.has(after, key)),
    process: (beforeValue, afterValue) => ({ afterValue }),
  },
  {
    type: 'deleted',
    check: (before, after, key) => (_.has(before, key) && !_.has(after, key)),
    process: beforeValue => ({ beforeValue }),
  },
  {
    type: 'unchanged',
    check: (before, after, key) => (_.has(before, key)
                                 && _.has(after, key)
                                 && before[key] === after[key]),
    process: beforeValue => ({ beforeValue }),
  },
  {
    type: 'changed',
    check: (before, after, key) => (_.has(before, key)
                                 && _.has(after, key)
                                 && before[key] !== after[key]),
    process: (beforeValue, afterValue) => ({ beforeValue, afterValue }),
  },
];

const getPropertyAction = (before, after, key) => propertyActions
  .find(({ check }) => check(before, after, key));

const createDiff = (fileBefore, fileAfter) => {
  const keys = _.union(Object.keys(fileBefore), Object.keys(fileAfter));
  return keys.map((key) => {
    const { type, process } = getPropertyAction(fileBefore, fileAfter, key);
    const rest = process(fileBefore[key], fileAfter[key], createDiff);
    return { type, key, ...rest };
  });
};

export default createDiff;
