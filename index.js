/**
 * Module
 * This is a simple console add on
 * to allow assigning the output to specific colors.
 */
const EventEmitter = require('events');
const _ = require('lodash');

/**
 * Base Ascii Escape.
 * @type {String}
 */
const signal = '\x1b[';

/**
 * Reset Colors
 * @type {String}
 */
const reset = '0m';

/**
 * Forground Colors
 * @type {object}
 */
const _fg = {
  k: '30m', //Black
  y: '33m', //FgYellow
  b: '34m', //FgBlue
  m: '35m', //FgMagenta
  c: '36m', //FgCyan
  w: '37m', //FgWhite
  r: '31m', //FgRed
  g: '32m', //FgGreen
};

/**
 * Background Colors
 * @type {Object}
 */
const _bg = {
  k: '40m', //Black
  y: '43m', //BgYellow
  b: '44m', //BgBlue
  m: '45m', //BgMagenta
  c: '46m', //BgCyan
  w: '47m', //BgWhite
  r: '41m', //BgRed
  g: '42m', //BgGreen
};

/**
 * Extend event emitter.
 * @extends EventEmitter
 */
class consoleEmitter extends EventEmitter {};

class colorsole {

  constructor (args) {

    // Alias this.
    const self = this;

    // The reset string;
    this.resetString = `${signal}${reset}`;

    // Set a localized event emitter
    // to which we attach the console methods.
    this.emitter = new consoleEmitter();
    this.emitter.on('called', () => {
      // Do something here.
      this.reset();
    });
    /**
     * Pre defined sets.
     * @type {Object}
     */
    this.styles = {
      basic: {
        title: `${_bg.w}`,
      },
      info: {
        text: `${_fg.c}`,
        title: `${_bg.c}`
      },
      error: {
        text: `${_fg.r}`,
        title: `${_bg.r}`
      },
      warn: {
        text: `${_fg.y}`,
        title: `${_bg.y}`
      },
      custom: {
        title: _bg,
        text: _fg
      }
    };

    // Create maps of each consol Function
    // and then alias that.
    Object.keys(console).forEach((key) => {
      if (typeof console[key] === 'function') {
        this[key] = function () {
          // Calls the console method.
          console[key].apply(this, arguments);
          // Just incase and for adding other
          // event watchers later.
          self.emitter.emit('called');
        };
      }
    })
  }

  /**
   * [color description]
   * @param  {string} style The style string, info.text or custom.title.b
   * @return {object}       Returns reference to self for chaining.
   */
  color (style) {
    let escapeString = `${reset}`;
    if (style.indexOf('.') > 0) {
      const path = style.split('.');
      escapeString = _.get(this.styles, path, reset);
    }
    process.stdout.write(`${signal}${escapeString}`);
    return this;
  }

  /**
   * Reset the colors.
   */
  reset () {
    process.stdout.write(`${signal}${reset}`);
    return;
  }

}

module.exports = new colorsole();
