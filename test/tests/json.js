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
    var json_plugin = new JsonPlugin({});

    app.use(json_plugin, 'json_plugin');
    app.setup(done);
    app.init();
  });

  test('Test json', function(done) {
    var res = new Response();

    res.on('close', function() {
      var body = res.buffer.join('');

      assert.equal(res.statusCode, 200, 'Should return 200 status');
      assert.equal(body, gold, 'Response should return correct json content.');
      done();
    });

    app.json_plugin.render(data, res);

  });

  test('Test jsonp', function(done) {
    var res = new Response();
    var req = new Request({
      url: '/?jsonp=omgdogs'
    });

    res.on('close', function() {
      var body = res.buffer.join('');

      assert.equal(res.statusCode, 200, 'Should return 200 status');
      assert.equal(body, gold, 'Response should return correct json content.');
      done();
    });

    app.json_plugin.render(data, res, {}, req);
  });

  test('Test callback', function(done) {
    var res = new Response();
    var req = new Request({
      url: '/?callback=catz'
    });

    res.on('close', function() {
      var body = res.buffer.join('');

      assert.equal(res.statusCode, 200, 'Should return 200 status');
      assert.equal(body, gold, 'Response should return correct json content.');
      done();
    });

    app.json_plugin.render(data, res, {}, req);
  });

});