const express = require('express')
const port = 8080
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

const connection = mysql.createConnection({
  host : 'localhost',
  port : '3306',
  user     : 'root',
  password : '0000',
  database:'cpu'
});

connection.connect();

app.get('/', function(req, res){
  res.send('Hello World')
  connection.query('SELECT * from users', function(err, rows, fields) {
    if (err) throw err;
    console.log('User info is: ', rows);
  });
})

app.post('/users/signup', function(req, res){
  var sql = `INSERT INTO users (user_id, password, name, nickname, email, register_date) values ('${req.body.user_id}', '${req.body.password}', '${req.body.name}', '${req.body.nickname}', '${req.body.email}', '2023-01-01')`
  console.log(req.body)
  connection.query(sql, function(err, rows, fields){
    if(err) throw err
    console.log('Complete')
    res.send('완료')
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})