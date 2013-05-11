/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 15:40
 *
 */

var C = {},
  defaultConfiguration,
  userConfiguration,
  finalConfiguration;

defaultConfiguration = {
  app: 'NodeApp',
  mute: [],
  colored: true,
  colors: {
    date: 'grey',
    app: 'grey',
    lvl: 'black',
    ns: 'grey'
  },
  lvlColors: {
    info: 'green',
    warn: 'cyan',
    deprecated: 'red',
    debug: 'yellow',
    error: '+red',
    access: 'grey'
  },
  format: 0,
  dateFormat: "%F %T",
  transports: [
    {
      type: 'console',
      colored: true,
      mute: []
    }
  ],
  server: {
    bindAddress: undefined,
    bindPort: 6969
  }
};

userConfiguration = {};

finalConfiguration = {};

mergeObjects = function(objectSource, objectDestination, excludeKeys) {
  if (!excludeKeys) {
    excludeKeys = [];
  }

  var keys = Object.keys(objectSource);
  for (var i = 0;i < keys.length; i++) {
    if (excludeKeys.indexOf(keys[i]) === -1) {
      objectDestination[keys[i]] = objectSource[keys[i]];
    }
  }

  return objectDestination;
};

C.initialize = function(o) {
  userConfiguration = o;
  var defaults = mergeObjects(defaultConfiguration, {});
  finalConfiguration = mergeObjects(o, defaults);
};

C.final = function() {
  return finalConfiguration;
};

C.transports = function() {

  var out = [];
  for (var i = 0; i < finalConfiguration.transports.length; i++) {
    var transport = {};
    transport = mergeObjects(finalConfiguration, transport, ['transports']);
    transport = mergeObjects(finalConfiguration.transports[i], transport, ['transports']);
    out.push(transport);
  }
  return out;
};



module.exports = C;