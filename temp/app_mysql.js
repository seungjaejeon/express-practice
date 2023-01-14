var express = require('express');
var app = express();
var bodyParser = require('body-parser');
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
    console.log(`server running at http://localhost:3000/weather`);
});
app.get('/topic/add', function(req, res){
    var sql = 'SELECT id, title FROM topic'
    connection.query(sql, function(err, topics, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else{
            res.render('add', {topics: topics});
        }
    })
});

app.post('/topic/add', function(req, res){
    var sql = 'INSERT INTO topic (title, description, author) VAlUES(?,?,?)';
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    connection.query(sql, [title, description, author], function(err, rows, fields){
        if(err){
            res.status(500).send('Internal Server Error');
            console.log(err);
        }else{
            res.redirect('/topic/'+rows.insertId);
        }
    })
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
app.get('/topic/:id/edit', function(req, res){
    var sql ='SELECT id, title FROM topic';
    connection.query(sql, function(err, topics, fields){
    var id = req.params.id;
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?';
            connection.query(sql,[id], function(err, topic, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else{
                    res.render('edit', {topics:topics, topic:topic[0]});
                }
            })
        }
        else{
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
})
app.post(['/topic/:id/edit'], function(req,res){
    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?'
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;
    connection.query(sql, [title, description, author, id], function(err, result, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }else{
            res.redirect('/topic/'+id);
        }
    })
})

app.get('/topic/:id/delete', function(req, res){
    var id = req.params.id;
    var sql = 'SELECT id, title FROM topic'
    connection.query(sql, function(err, rows,fields){
        var sql = 'SELECT * FROM topic WHERE id=?';
        connection.query(sql, [id], function(err, row){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }else{
                if(row.length === 0){
                    console.log(err);
                    res.status(500).send('There is no record.');
                }
                else{
                res.render('delete',{topics:rows, topic:row[0]});
                }
            }
        })        
    })
})
app.post('/topic/:id/delete', function(req, res){
    var id= req.params.id;
    var sql = 'DELETE FROM topic WHERE id=?';
    connection.query(sql, [id], function(err, result){
        res.redirect('/topic/');
    })
})

app.get('/weather', function(req, res){
   var url = 'http://api.openweathermap.org/data/2.5/weather?lat=37.336912&lon=127.267397&lang=kr&appid=e0b5b3d5d34a8295de9e88f3c32426d2&units=metric';
   fetch(url)
})