/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 20:53
 *
 */

var dye = require('dye');
var Proto = require('./_prototype');

var Console = function (config) {
  this.mute = [];
  this.colord = true;
  this.format = 0;



  this.init(config);
};

Console.prototype = new Proto();

Console.prototype.transmit = function (oMessage) {
  if (this.isMuted(oMessage)) {
    return;
  }

  //console.log(oMessage.toString(this.format));
  console.log(this.buildLine(oMessage));
};

module.exports = Console;