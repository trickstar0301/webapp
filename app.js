// app.js
var app = require('koa')();
var route = require('koa-route');
var serve = require('koa-static');
var views = require('koa-views');

// ectをテンプレートエンジンとして指定
app.use(views(__dirname + '/views', {
  map: {
    html: 'ect'
  }
}));

// GET /test
app.use(route.get('/test', function *version(){
  yield this.render('test.ect', {
    title: 'TEST',
    version: '1.0.0'
  });
}));

// GET /test1
app.use(route.get('/test1', function *version(){
  yield this.render('test1.ect', {
    title: 'Login',
  });
}));

// static files
app.use(serve(__dirname + '/public'));

app.listen(3000, function () { console.log('app listening on port 3000!'); });