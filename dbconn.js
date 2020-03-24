const sql =require('mysql');
const bodyParser=require('body-parser');

var conn =sql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'webapp_db'

});
conn.connect(()=>{console.log('database is connected !')})



module.exports=conn;