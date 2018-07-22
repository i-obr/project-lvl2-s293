#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version('1.3.4')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstArg, secondArg) => {
    console.log(gendiff(firstArg, secondArg, program.format));
  });

program.parse(process.argv);
