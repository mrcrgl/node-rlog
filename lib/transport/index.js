/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 20:09
 *
 */

var transports = {};

var Configuration = require('../configuration'),
  configuration = null;
var Transport = {};

Transport.transmit = function (oMessage) {

  if (null === configuration) {
    configuration = Configuration.transports();
  }

  configuration.forEach(function (transportConfig, id) {
    var Transporter = Transport.getTransporter(transportConfig, id);
    Transporter.transmit(oMessage);
  });

};

Transport.getTransporter = function (transportConfig, id) {

  if (!transports.hasOwnProperty(id)) {
    try {
      var Trans = require('./' + transportConfig.type);
      transports[id] = new Trans(transportConfig);
    } catch (e) {
      throw new Error("Cannot load transporter: " + transportConfig.type + " - " + e);
    }
  }

  return transports[id];
};

module.exports = Transport;