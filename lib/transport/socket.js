/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 09:26
 *
 */

var net = require('net');
var Proto = require('./_prototype');

var Socket = function (config) {

  this.host = '127.0.0.1';
  this.port = 6969;
  this.mute = [];

  //console.dir(config);
  this.init(config);
};

Socket.prototype = new Proto();

Socket.prototype.transmit = function (oMessage) {
  if (this.isMuted(oMessage)) {
    return;
  }

  var client = new net.Socket();
  client.connect(this.port, this.host, function () {
    client.write(JSON.stringify(oMessage.toJSON()));
    client.end();
  });

  client.on('data', function (data) {
    client.destroy();
  });

  client.on('error', function (err) {
    throw new Error(err);
  });

};

module.exports = Socket;