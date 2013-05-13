/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 09:24
 *
 */

var client = require('../index');
client.configure({
  app: 'Test',


  transports: [
    {
      type: 'console',
      colored: true,
      mute: []
    },
    {
      type: 'file',
      file: '/Users/mriegel/Projects/node-logger/logfile-access.log',
      mute: [
        'info', 'warn', 'error', 'debug', 'deprecated'
      ]
    },
    {
      type: 'file',
      file: '/Users/mriegel/Projects/node-logger/logfile-error.log',
      mute: [
        'info', 'warn', 'access', 'debug'
      ]
    },
    {
      type: 'file',
      file: '/Users/mriegel/Projects/node-logger/logfile.log'
    },
    {
      type: 'socket',
      host: 'localhost',
      port: '6969',
      mute: ['info']
    }
  ]
});
var log = client.init(module, "Foo");

log.info("Here is a info message. %j", {some: 'json'});
log.debug("Here is a info message. %j", {some: 'json'});
log.warn("Here is a info message.");
log.deprecated("Here is a info message.");
log.error("Here is a info message.");
log.access("Here is a info message.");

