#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version('1.0.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstArg, secondArg) => {
    gendiff(firstArg, secondArg);
  });

program.parse(process.argv);
