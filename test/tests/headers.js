var assert = require('assert');
var App = require('mixdown-app').App;

var Response = require('hammock').Response;
var Request = require('hammock').Request;
var JsonPlugin = require('../../index.js');

suite('Test error plugin', function() {
  var app = new App();

  var data = {
    tupac: 'thug life',
    biggie: 'hyptonize'
  };
  var gold = JSON.stringify(data);

  // override the default namespace and make sure this still works.
  // typically, you would leave the namespace blank and use json.
  var namespace = 'jsonHandler';

  setup(function(done) {

    //create json plugin
    var json_plugin = new JsonPlugin({

      // ex: no cache headers.
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Expires": 0,
        "Pragma": "no-cache"
      }
    });

    app.use(json_plugin, 'json_plugin');
    app.setup(done);
    app.init();
  });

  test('Test json', function(done) {
    var res = new Response();
    var gold_headers = {
      "cache-control": "no-cache, no-store, must-revalidate",
      "expires": 0,
      "pragma": "no-cache",
      "content-type": "application/json"
    };

    res.on('close', function() {
      assert.deepEqual(res.headers, gold_headers, 'Custom headers should be emitted in response');

      done();
    });

    app.json_plugin.send(data, res);

  });


});