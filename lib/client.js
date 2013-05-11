/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 07:57
 *
 */

var config = require('./configuration');
var Logger = require('./logger');
var instances = {};

exports.init = function(m, ns) {
  if ('object' !== typeof m) {
    throw new Error(".init() requires the `module` object.");
  }

  if ('string' !== typeof ns) {
    ns = undefined;
  }

  var id = m.id;

  if (!instances[id]) {
    instances[id] = new Logger(m, ns);
  }

  return instances[id];
};

exports.configure = function(conf) {
  config.initialize(conf);
};