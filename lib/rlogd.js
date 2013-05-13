/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 07:57
 *
 */

var net = require('net');
var fs = require('fs');
var Message = require('./message');
var Configuration = require('./configuration');

var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var serverConfig = homeDir + '/.rlogd.json';



exports.start = function (userConfig, callback) {

  var config = {}, Config;

  if (userConfig) {
    serverConfig = userConfig;
  }

  if (!fs.existsSync(serverConfig)) {
    throw new Error("No configuration file found. Please create: " + serverConfig);
  }

  try {
    config = fs.readFileSync(serverConfig);
    config = JSON.parse(config);
  } catch (e) {
    console.log(e);
    throw new Error("You have syntax errors in your config.");
  }

  Configuration.initialize(config);

  Config = Configuration.final().server;

  net.createServer(function (sock) {
    sock.on('data', function (data) {

      var msg = new Message(JSON.parse(data));
      msg.transport();

    });

  }).listen(Config.bindPort, Config.bindAddress || '0.0.0.0', function () {
    callback(
      "Server started. Port: " +
        Config.bindPort +
        ((Config.bindAddress) ? "Address: " + Config.bindAddress : '')
    );
  });
};