const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_crud"
});

db.connect((err) => {
    if(err){
        throw RegExp;
    }
    console.log('Mysql connected...');
});

app.set('views',path.join(__dirname,'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    
    let sql = "SELECT * FROM student";
    db.query(sql, (err, rows, fields) => {
        if(err) throw err;
    res.render('user_index', {
        title: 'CRUD Operation using NodeJS / MySQL',
        user : rows
    });
    });
});

app.get('/add', (req,res) => {
    res.render('user_add', {
        title: 'CRUD Operation using NodeJS / MySQL'
    });    
});

app.post('/save', (req, res) => {
    let data = {course_id: req.body.course_id, course_name: req.body.course_name, department: req.body.department, institute: req.body.institute, university: req.body.university};
    let sql = "INSERT INTO student SET ?";
    let query = db.query(sql, data, (err,results) => {
        if(err) throw err;
        res.redirect('/');
    });

});

app.get('/edit/:userId', (req,res)=> {
    const UserId = req.params.userId;
    let sql = `SELECT * FROM student WHERE id=${UserId}`;
    db.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        res.render('user_edit', {
            title: 'CRUD Operation using NodeJS / MySQL',
            user : rows[0]
        });
    });
});

app.post('/update', (req, res) => {
    const id = req.body.id;
    let sql = "UPDATE student SET course_id='"+req.body.course_id+"', course_name='"+req.body.course_name+"', department='"+req.body.department+"', institute='"+req.body.institute+"', university='"+req.body.university+"' WHERE id ="+id; 
    let query = db.query(sql, (err,results) => {
        if(err) throw err;
        res.redirect('/');
    });

});

app.get('/delete/:userId', (req,res)=> {
    const UserId = req.params.userId;
    let sql = `DELETE FROM student WHERE id=${UserId}`;
    db.query(sql, (err,result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('server is running on port number 3000');
});
