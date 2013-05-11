/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 12:30
 *
 */

var Transporter = require('./transport');

var Message = function(o) {

  this.lvl = 'info';
  this.app = '';
  this.ns = '';
  this.message = '';
  this.hostname = '';
  this.date = new Date();

  if ('object' === typeof o) {
    this._import(o);
  }
};



Message.prototype = {

  _import: function(o) {
    var i,
      keys = Object.keys(o);

    for (i = 0; i < keys.length; i++) {
      if ('undefined' !== typeof this[keys[i]]) {
        if (keys[i] === 'date') {
          this[keys[i]] = new Date(o[keys[i]]);
        } else {
          this[keys[i]] = o[keys[i]];
        }
      }
    }
  },

  toString: function(format) {

  },

  toJSON: function() {
    return {
      lvl: this.lvl,
      app: this.app,
      ns: this.ns,
      message: this.message,
      hostname: this.hostname,
      date: this.date.toJSON()
    };
  },

  transport: function() {
    Transporter.transmit(this);
  }
};

module.exports = Message;