var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.get('/', function(req, res){
    res.send('<h1>Hello home page</h1>');
});
//이 경로로 들어온 사용자에게 temp라는 페이지 파일을 웹페이지로 랜더링해서 전송한다는뜻
app.get('/template', function(req, res){
    res.render('temp', {time:Date()});
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
