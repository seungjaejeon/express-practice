var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/', function(req, res){
    res.send('<h1>Hello home page</h1>');
});
app.get('/dynamic', function(req,res){
    var output = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <h1>hello, dynamic!</h1>
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
});
