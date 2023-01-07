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
});
app.get('/topic/new', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics: files});
    })
});
app.get(['/topic', '/topic/:id'], function(req, res){
    //id값이 없을때 코드
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        //id값이 있을때 코드
        if(id){
        fs.readFile('data/'+id,'utf8', function(err,data){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics: files, title:id, descriptions:data});
        })
        }
        //id값이 없을때 코드
        else{
            res.render('view', {topics:files, title:'Welcome', descriptions:'Hello, Server'})
        }
    })
});

app.post('/topic', function(req, res){
    var title = req.body.title;;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log('error 발생\n' + err);
            res.status(500).send('Internal Server Error')
        }
        res.redirect('/topic/'+title);
    });
});
