var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.get('/', function(req, res){
    res.send('<h1>Hello home page</h1>');
})
app.get('/topic/:id', function(req, res){
    //파일 또는 데이터베이스로 교체
    var topics = [
        'javascript is ..',
        'node.js is ..',
        'express is ..'
    ];
    //자동적으로 생성되도록 프로그래밍
    var links = `
        <a href="/topic/0">JavaScript</a><br>
        <a href="/topic/1">node.js</a><br>
        <a href="/topic/2">express</a><br>
        ${topics[req.params.id]}
    `
    //params는 12번째줄의 /topic/:id의 id를 가져옴
    //req.query는 쿼리스트링값을 받음 ?id=1
    res.send(links);
})
app.get('/topic/:id/:mode', function(req, res){
    res.send(req.params.id+','+req.params.mode);
})
//이 경로로 들어온 사용자에게 temp라는 페이지 파일을 웹페이지로 랜더링해서 전송한다는뜻
app.get('/template', function(req, res){
    res.render('temp', {time:Date()});//jade 파일, 파일내의 변수설정
})
app.get('/form', function(req, res){
    res.render('form');
})
//form 입력 받기 get방식일경우
app.get('/form_receiver', function(req, res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
})
//form 입력받기 POST방식일 경우
app.post('/form_receiver', function(req, res){
    var correct_id = 'hi';
    var correct_password = '123';
    var user_id = req.body.title;
    var user_password = req.body.description;
    if (user_id===correct_id&& user_password === correct_password){
        res.send('login');
    }
    else{
        res.send('wrong id or password');
    }
})
app.get('/dynamic', function(req,res){
    var lis = '';
    for(var i=0; i<5; i++){
        lis = lis + '<li>coding</li>'
    }
    var time = Date();
    var output = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <h1>hello, dynamic!</h1>
    <ul>
    ${lis}
    </ul>
    ${time}
</body>
</html>
    `;
    res.send(output);
})
app.get('/route', function(req,res){
    res.send('Hello Router, <a href="https://naver.com">네이버</a>');
})
app.get('/login', function(req, res){ //router
    res.send('please login');
})
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
    console.log(`server running at http://localhost:3000/`)
});
//GET방식과 POST방식
// GET방식 - 사용자가 서버로부터 정보를 get하는 방식
// POST방식 - 사용자가 정보를 서버로 전송하는 방식
// 언제 get을쓰고 언제 post를 써야할까
// 로그인같은 경우 post를 사용해야함 url에 데이터가 뜨지 않기 때문에
// url에는 길이 제한이 있기 때문에 긴문자를 보내야할때는 post를 사용하여 url이 손상되지 않도록함