mixdown-json
============

Plugin for json response for mixdown.js.


## Usage

### Mixdown Router handler

```javascript

module.exports = function(httpContext) {
  var req = httpContext.request;
  var res = httpContext.response;
  var app = httpContext.app;

  app.plugins.json.send({ hip: 'hop '}, res, {}, req);
};

```

### Express

```javascript
var app = mixdown.apps['foo'];

expressApp.get('/foo/bar', function(req, res) {
  app.plugins.json.send({ hip: 'hop '}, res, {}, req);
});

```