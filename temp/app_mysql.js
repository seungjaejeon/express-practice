var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');//mysql 참조
var connection = mysql.createConnection({//연결할 테이블
    host    : 'localhost',
    user    : 'root',
    password: 'sj3165415',
    database: 'o2'
});

connection.connect();//database 연결
app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'jade');
app.listen(3000, function(){
    console.log('Connected 3000port');
    console.log(`server running at http://localhost:3000`);
});
app.get('/topic/new', function(req, res){
    // var sql = 'INSERT INTO topic (title, description, author)\
    // VALUES(?,?,?)';
    // var value = []
    // connection.query(sql, function(err, rows, fields){

    // })
    // fs.readdir('data', function(err, files){
    //     if(err){
    //         console.log(err);
    //         res.status(500).send('Internal Server Error');
    //     }
    //     res.render('new', {topics: files});
    // })
});
app.get(['/topic', '/topic/:id'], function(req, res){
    var sql = 'SELECT id, title FROM topic';
    connection.query(sql, function(err, rows, fields){
        var id = req.params.id;
        if(id){//id값이 있을 때
            var sql = 'SELECT * FROM topic WHERE id=?'
            connection.query(sql, [id], function(err, topic, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else{
                    res.render('view', {topics:rows, topic:topic[0]});
                }
            })
        }
        else{//id값이 없을때
            res.render('view', {topics:rows})
        }
    })

    //파일입출력으로 만들때 사용한 코드

    //id값이 없을때 코드
    // fs.readdir('data', function(err, files){
    //     if(err){
    //         console.log(err);
    //         res.status(500).send('Internal Server Error');
    //     }
    //     var id = req.params.id;
    //     //id값이 있을때 코드
    //     if(id){
    //     fs.readFile('data/'+id,'utf8', function(err,data){
    //         if(err){
    //             console.log(err);
    //             res.status(500).send('Internal Server Error');
    //         }
    //         res.render('view', {topics: files, title:id, descriptions:data});
    //     })
    //     }
    //     //id값이 없을때 코드
    //     else{
    //         res.render('view', {topics:files, title:'Welcome', descriptions:'Hello, Server'})
    //     }
    // })
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
