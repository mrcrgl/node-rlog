/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 10.05.13
 * Time: 15:40
 *
 */

var C = {},
  defaultConfiguration,
  userConfiguration,
  finalConfiguration,
  mergeObjects;

defaultConfiguration = {
  app: 'NodeApp',
  mute: [],
  colored: true,
  colors: {
    date: 'grey',
    app: 'grey',
    severity: 'black',
    ns: 'grey'
  },
  severityColors: {
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
    bindAddress: '0.0.0.0',
    bindPort: 6969
  },
  severities: {
    emerg:   0,
    alert:   1,
    crit:    2,
    err:     3,
    warn:    4,
    notice:  5,
    info:    6,
    debug:   7
  },
  facilities: {
    kern:   0,
    user:   1,
    mail:   2,
    daemon: 3,
    auth:   4,
    syslog: 5,
    lpr:    6,
    news:   7,
    uucp:   8,
    local0: 16,
    local1: 17,
    local2: 18,
    local3: 19,
    local4: 20,
    local5: 21,
    local6: 22,
    local7: 23
  }
};


userConfiguration = {};

finalConfiguration = {};

mergeObjects = function (objectSource, objectDestination, excludeKeys) {
  var keys, i;

  if (!excludeKeys) {
    excludeKeys = [];
  }

  keys = Object.keys(objectSource);
  for (i = 0; i < keys.length; i++) {
    if (excludeKeys.indexOf(keys[i]) === -1) {
      objectDestination[keys[i]] = objectSource[keys[i]];
    }
  }

  return objectDestination;
};

C.initialize = function (o) {
  userConfiguration = o;
  var defaults = mergeObjects(defaultConfiguration, {});
  finalConfiguration = mergeObjects(o, defaults);
};

C.final = function () {
  return finalConfiguration;
};

C.transports = function () {
  var i, transport, out = [];

  for (i = 0; i < finalConfiguration.transports.length; i++) {
    transport = {};
    transport = mergeObjects(finalConfiguration, transport, ['transports']);
    transport = mergeObjects(finalConfiguration.transports[i], transport, ['transports']);
    out.push(transport);
  }
  return out;
};



module.exports = C;