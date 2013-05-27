/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 17.05.13
 * Time: 10:25
 *
 */

var dgram = require('dgram'),
  Buffer = require('buffer').Buffer;

var socketUsers = 0,
  socket,
  releaseTimeout;

var socketErrorHandler = function (err) {

  if (err) {
    console.error('[Logger::syslog::udp] socket error: ' + err)
  } else {
    console.error('[Logger::syslog::udp] unknown socket error!')
  }

  if (socket !== undefined) {
    socket.close()
    socket = undefined
    socketUsers = 0
  }
};


var getSocket = function () {

  if (undefined === socket) {
    socket = dgram.createSocket('udp4');
    socket.on('error', socketErrorHandler);
  }

  ++socketUsers;

  return socket;
};

var releaseSocket = function () {

  --socketUsers;

  if (0 == socketUsers && undefined === releaseTimeout) {

    releaseTimeout = setTimeout(function () {

      if (0 == socketUsers && socket !== undefined) {

        socket.close();

        socket = undefined;

      }

      releaseTimeout = undefined;

    }, 1000);
  }
};



exports.send = function(host, port, buffer) {
  getSocket().send(buffer, 0, buffer.length, port, host, function(err) {
    if (err) console.error('[Logger::syslog::udp] ' + err);
    releaseSocket();
  });
};