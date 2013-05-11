/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 12:23
 *
 */

var Format = require('./format');
var util = require('util');
var Message = require('./message');

var Logger = function(m, ns) {

  this.module = m;
  this.ns = ns || null;

  this.muted = [
    'debug'
  ];
};

Logger.prototype = {

  info: function() {
    this._message('info', arguments);
  },

  warn: function() {
    this._message('warn', arguments);
  },

  debug: function() {
    this._message('debug', arguments);
  },

  deprecated: function() {
    this._message('deprecated', arguments);
  },

  error: function() {
    this._message('error', arguments);
  },

  access: function() {
    this._message('access', arguments);
  },


  _message: function(lvl, args) {
    if (this.muted.indexOf(lvl) === -1) {
      var msg = new Message({
        message: util.format.apply({}, args),
        ns: this.ns,
        date: new Date(),
        lvl: lvl
      });
      msg.transport();
      delete msg;
    }
  }
};

var _message = function(level, args) {

  var time = (new Date()).toJSON();
  console.log(args);
};

module.exports = Logger;