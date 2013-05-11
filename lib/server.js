/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 07:57
 *
 */

var net = require('net');
var Message = require('./message');
var Configuration = require('./configuration');

Configuration.initialize({});

var Config = Configuration.final().server;

net.createServer(function(sock) {
  sock.on('data', function(data) {

    var msg = new Message(JSON.parse(data));
    msg.transport();
    delete msg;

  });

}).listen(Config.bindPort, Config.bindAddress);
