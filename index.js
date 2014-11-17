var _ = require('lodash');
var BasePlugin = require('mixdown-app').Plugin;

var JsonPlugin = BasePlugin.extend({

  init: function(options) {

    // ensure boolean.
    options.jsonpEnabled = options.jsonpEnabled === true || options.jsonpEnabled === 'true' ? true : false;

    this._super(options);
  },

  /**
   * Takes the given model and generated the main object that will be passed to the rendering engine.
   * This will include the utils, underscore, siteConfig, and other basic rendering constructs.
   **/
  /**
   * Takes the given model and generated the main object that will be passed to the rendering engine.
   * This will include the utils, underscore, siteConfig, and other basic rendering constructs.
   * @param res {HttpServerResponse} the res to write the output.
   * @param data {Object} Data to pass to the rendering view
   * @param data {Object} Keys/values for headers (This action will set the Content_Type: 'application/json' automatically)
   **/
  send: function(data, res, headers, req) {
    var str = JSON.stringify(data || {});

    if (!res.headersSent) {

      var h = _.extend({
        'Content-Type': 'application/json'
      }, this._options.headers || {});

      res.writeHead(200, _.extend(h, headers));
    }

    if (this._options.jsonpEnabled && req && req.query) {
      var cb = req.query.callback ? req.query.callback : req.query.jsonp;

      if (cb) {
        str = cb + '(' + str + ')';
      }
    }

    res.end(str);
  }
});

module.exports = JsonPlugin;