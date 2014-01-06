var assert = require('assert');
var Pluggo = require('pluggo');
var Response = require('hammock').Response;
var Request = require('hammock').Request;
var JsonPlugin = require('../../index.js');

suite('Test error plugin', function() {
  var app = {
    plugins: new Pluggo()
  };

  var data = { tupac: 'thug life', biggie: 'hyptonize' };
  var gold = JSON.stringify(data);

  // override the default namespace and make sure this still works.
  // typically, you would leave the namespace blank and use json.
  var namespace = 'jsonHandler';

  setup(function(done) {

    app.plugins.use(new JsonPlugin(namespace), {});
    app.plugins.init(done);
  });

  test('Test json', function(done) {
    var res = new Response();

    res.on('close', function() {
      var body = res.buffer.join('');

      assert.equal(res.statusCode, 200, 'Should return 200 status');
      assert.equal(body, gold, 'Response should return correct json content.');
      done();
    });

    app.plugins[namespace](data, res);

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

    app.plugins[namespace](data, res, {}, req);
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

    app.plugins[namespace](data, res, {}, req);
  });
  
});