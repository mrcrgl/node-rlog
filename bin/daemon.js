#!/usr/bin/env node
/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 11.05.13
 * Time: 18:34
 *
 */

var packageJson = require('../package.json');

var argv = require('optimist')
  .usage(packageJson.name + ' Version: ' + packageJson.version + '\nUsage: $0')
  .alias('config', 'c')
  .describe('config', 'Path to configuration file')
  .argv;


var remotelogd = require('./../lib/rlogd');

remotelogd.start(argv.c, function (msg) {
  console.log(msg);
});
