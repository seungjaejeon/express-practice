var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');
app.listen(3000, function(){
    console.log('Connected 3000port');
    console.log(`server running at http://localhost:3000`);
})
app.get('/topic/new', function(req, res){
    res.render('new');
})
app.get('/topic', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files});
    })
})
app.post('/topic', function(req, res){
    var title = req.body.title;;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log('error 발생\n' + err);
            res.status(500).send('Internal Server Error')
        }
        res.send('Success!');
    });
})
