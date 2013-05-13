/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 09:26
 *
 */

var fs = require('fs');
var Proto = require('./_prototype');

var File = function (config) {
  this.mute = [];
  this.format = 0;
  this.file = null;

  // force uncolored
  config.colored = false;

  this.init(config);
};

File.prototype = new Proto();

File.prototype.transmit = function (oMessage) {
  if (this.isMuted(oMessage)) {
    return;
  }

  if (!this.file) {
    throw new Error("Attribute `file` is not configured.");
  }

  fs.appendFile(this.file, this.buildLine(oMessage) + "\n", function () {});
};

module.exports = File;