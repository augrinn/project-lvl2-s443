#!/usr/bin/env node
import program from 'commander';
import parseDiff from '../parseDiff';

program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

parseDiff(program.format, program.args);
