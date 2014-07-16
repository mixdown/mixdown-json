var _ = require('lodash');
var BasePlugin = require('mixdown-app').Plugin;

var JsonPlugin = BasePlugin.extend({
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
  render: function(data, res, headers, req) {
    var self = this;
    var str = JSON.stringify(data || {});

    if (!res.headersSent) {
      res.writeHead(200, _.extend({
        'Content-Type': 'application/json'
      }, headers));
    }

    if (self.jsonpEnabled && req && req.query) {
      var cb = req.query.callback ? req.query.callback : req.query.jsonp;

      if (cb) {
        str = cb + '(' + str + ')';
      }
    }

    res.end(str);
  },

  _setup: function(done) {
    this.jsonpEnabled = this._options.jsonpEnabled === true || this._options.jsonpEnabled === 'true' ? true : false;
    done();
  }
});

module.exports = JsonPlugin;