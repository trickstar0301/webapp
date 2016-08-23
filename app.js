// node-modules
var app = require('koa')();
var route = require('koa-route');
var serve = require('koa-static');
var views = require('koa-views');
var request = require('request');

// import settings
//var settings = require('./common/settings.js')

// ectをテンプレートエンジンとして指定
app.use(views(__dirname + '/views', {
  map: {
    html: 'ect'
  }
}));

// GET /login
app.use(route.get('/login', function *version(){
  yield this.render('login.ect', {
    title: 'Login',
  });
}));

// GET /menu
app.use(route.get('/menu', function *version(){
	//ヘッダーを定義
var headers = {
//  'Accept': 'application/json'
  'Content-Type':'application/json'
}
	//オプションを定義
var method = "query"
var options = {
  url: 'http://localhost:5000/chaincode',
  method: 'POST',
  headers: headers,
  json: true,
  body: {
	  "jsonrpc": "2.0",
	  "method": method,
	  "params": {"type": 1,
	  "chaincodeID":{"name": "mycc"},
	  "ctorMsg": {"function":"query","args":["a"]},
	  "secureContext": "jim"},
	  "id": 1 
	  }
}
	//リクエスト送信
request(options, function (error, response, body) {
	//callback処理
 console.log(body);
 var attribute = body.result.message;
if(attribute == 100){
    console.log('login successful!');
  }else{
    console.log('mismach!');
	console.log(attribute);
  }
 });
  
	//menu画面を表示
  yield this.render('menu.ect', {
    title: 'Menu',
    version: 'login successful!'
  });
}));


// static files
app.use(serve(__dirname + '/public'));

app.listen(3000, function () { console.log('app listening on port 3000!'); });