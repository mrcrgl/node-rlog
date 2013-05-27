/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 27.05.13
 * Time: 13:40
 *
 */

var Proto = require('../_prototype'),
  Buffer = require('buffer').Buffer,
  Configuration = require('../../configuration'),
  Transport = {
    udp: require('./udp'),
    tcp: require('./tcp')
  };

var Syslog = function (config) {

  this.host  = null;
  this.port  = 514;
  this.proto = 'udp';
  this.mute  = [];
  this.facility = 'local0';

  this.init(config);
};

Syslog.prototype = new Proto();

Syslog.prototype.transmit = function (oMessage) {
  if (this.isMuted(oMessage)) {
    return;
  }

  if (!this.host) {
    throw new Error("Attribute `host` is not configured.");
  }

  if (['udp', 'tcp'].indexOf(this.proto) === -1) {
    throw new Error("Attribute `proto` is not valid, must be 'udp' or 'tcp'.");
  }

  var buff = new Buffer('<' + (Configuration.final().facilities[this.facility] * 8 + oMessage.severity) + '>' +
    this.buildLine(oMessage));

  Transport[this.proto].send(this.host, this.port, buff);
};

module.exports = Syslog;