/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 12:23
 *
 */

var Format = require('./format');
var util = require('util');
var Message = require('./message');

var Logger = function (m, ns) {

  this.module = m;
  this.ns = ns || null;

  this.muted = [];
};

Logger.prototype = {

  emerg: function () {
    this._message('emerg', arguments);
  },

  alert: function () {
    this._message('alert', arguments);
  },

  crit: function () {
    this._message('crit', arguments);
  },

  error: function () {
    this._message('err', arguments);
  },

  warn: function () {
    this._message('warn', arguments);
  },

  notice: function () {
    this._message('notice', arguments);
  },

  info: function () {
    this._message('info', arguments);
  },

  debug: function () {
    this._message('debug', arguments);
  },

  access: function () {
    this._message('info', arguments);
  },

  deprecated: function () {
    this._message('warn', arguments);
  },


  _message: function (severity, args) {
    if (this.muted.indexOf(severity) === -1) {
      var msg = new Message({
        message: util.format.apply({}, args),
        ns: this.ns,
        date: new Date(),
        severity: severity
      });
      msg.transport();
    }
  }
};

module.exports = Logger;