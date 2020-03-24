const express=require('express');
const conn=require('./dbconn');
const ejs =require('ejs');
const bodyParser = require('body-parser');

const session =require('express-session');
const router=require('./routes/routes');
const app = express();
// JSON encode here
//app.use(bodyParser)
app.use(session({secret:'test'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');




app.get('/login',router);
app.get('/home',router);
app.get('/signup',router);
app.post('/signup',router);
app.post('/login',router);
app.get('/products',router);
app.post('/products',router);



















app.listen(4500,()=>{console.log('server is runnng !')})