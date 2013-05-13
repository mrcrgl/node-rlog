/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 11.05.13
 * Time: 12:32
 *
 */

var strftime = require('strftime');
var dye = require('dye');

var formats = [
  "[:date] [:app] [:lvl] [:ns] - :message",
  "[:date] [:lvl] [:ns]: :message",
  "[:date] [:lvl] :app.:ns - :message"
];

var formatArgsRegExp = /:([\w]+)/g;

var Format = {

  toString: function (oMessage, c) {
    var formatString, string;

    formatString = Format.getFormat(c.format || 0);

    string = String(formatString).replace(formatArgsRegExp, function (x) {
      x = x.substr(1);

      var value;

      if (x === 'date') {

        value = strftime(c.dateFormat);

      } else if (oMessage.hasOwnProperty(x)) {

        value = oMessage[x];

      } else {

        value = x;

      }

      return Format.colorize(value, x, c);
    });

    return string;
  },

  colorize: function (string, type, c) {
    var color = null,
      bold = null,
      coloredString;

    if (!c.colored) {
      // coloration is disabled
      return string;
    }

    if (type === 'lvl' && c.lvlColors.hasOwnProperty(string)) {
      color = c.lvlColors[string];
    }

    if (!color && !c.colors.hasOwnProperty(type)) {
      // No color configured for type
      return string;
    }

    if (!color) {
      color = c.colors[type];
    }

    if (color.charAt(0) === '+') {
      color = color.substr(1);
      bold = true;
    }

    if (!dye.hasOwnProperty(color)) {
      // Color not defined by dye
      return string;
    }

    coloredString = dye[color](string);

    if (bold) {
      coloredString = dye.bold(coloredString);
    }

    return coloredString;
  },

  getFormat: function (id) {
    if ('string' !== typeof formats[id]) {
      return id;
    }
    return formats[id];
  }

};

module.exports = Format;