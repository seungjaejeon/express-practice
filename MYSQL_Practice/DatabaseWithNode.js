var mysql = require('mysql');//mysql 참조
var connection = mysql.createConnection({//연결할 테이블
    host    : 'localhost',
    user    : 'root',
    password: 'sj3165415',
    database: 'o2'
});

connection.connect();//database 연결
//데이터 읽기
// var sql = 'SELECT * FROM topic'; //mysql 코드
// connection.query(sql, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     }else {
//         for(var i=0; i<rows.length; i++){
//             console.log(rows[i]);
//         }
//     }
// });

//데이터 생성
// var sql = 'INSERT INTO topic (title, description, author) \
// VALUES(?, ?, ?)';
// var params = ['Supervisor', 'Watcher', 'graphittie'];
// connection.query(sql,params, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(rows);
//     }
// })

//데이터 업데이트
// var sql = 'UPDATE topic SET title=?, description=? WHERE id=?';
// var params = ['NPM', 'leezche', 4];
// connection.query(sql,params, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(rows);
//     }
// })

//데이터 삭제하기
// var sql = 'DELETE FROM topic WHERE id=?';
// var params = ['8'];
// connection.query(sql,params, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(rows);
//     }
// })
connection.end();//database 연결 끊기 