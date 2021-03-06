#!/usr/bin/env node
import program from 'commander';
import getDiff from '..';

program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'tree')
  .action((firstConfig, secondConfig) => {
    console.log(getDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
