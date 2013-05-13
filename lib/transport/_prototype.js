/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 11.05.13
 * Time: 09:11
 *
 */

var Format = require('../format');



var Proto = function () {
  this.format = 0;
  this.mute = [];
  this.mutedApp = [];
  this._config = {};
};

Proto.prototype = {
  init: function (config) {
    var i, keys;

    this._config = config;
    keys = Object.keys(config);
    for (i = 0; i < keys.length; i++) {
      this[keys[i]] = config[keys[i]];
    }
  },

  isMuted: function (oMessage) {
    if (Array.isArray(this.mute)) {
      if (this.mute.indexOf(oMessage.lvl) >= 0) {
        return true;
      }
    }
    return false;
  },

  buildLine: function (oMessage) {
    oMessage.app = this.app;

    return Format.toString(oMessage, this._config);
  }
};

module.exports = Proto;