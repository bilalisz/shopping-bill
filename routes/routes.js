const express = require("express");
const router = express.Router();
const conn = require("../dbconn");
const session = require("express-session");


const checkSession = req => req.session.name;

function createSess(req) {
  req.session.loggedin = true;
  req.session.name = req.body.name;
}

// get API start
router.get("/login", (req, res) => {
    req.session.destroy();
  res.render("login.ejs");
});

router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
router.get("/home", (req, res) => {

   if(checkSession(req)){
    var selectQuery="select * from products";
    conn.query(selectQuery,function(err,data){
        console.log(data);
        var obj={users:data}
        if(err){ 
            res.send(err);
        }else{
            res.render('home',obj);
        }
   });
}else{
       res.redirect('/login');
   }
});


router.get('/products',(req,res)=>{
    if(checkSession(req)){
        res.render('products.ejs');
    }else{
        res.redirect('login');
    }
})


// get API End


// post API start
router.post("/login", (req, res) => {
  let user = {
    name: req.body.name,
    password: req.body.password
  };
  conn.query(
    "select * from users where name= ? AND password= ?",
    [user.name, user.password],
    (err, data) => {
      if (data[0]) {
        if (data[0].name === user.name && data[0].password === user.password) {
          createSess(req);
          res.redirect("/home");
        } else {
          res.redirect("/login");
        }
      } else {
        res.send("invaild !");
      }
      res.end();
    }
  );
});

router.post("/signup", (req, res) => {
  let user = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  };
  conn.query("insert into users SET ?", user, function(err) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.redirect("/login");
    }
  });
});

router.post('/products',(req,res)=>{
    let product={
        name:req.body.Pname,
        unitprice:req.body.price,
        brand:req.body.brand
    }
    conn.query('insert into products SET ?',product,(err,pdata)=>{
        console.log(err);
        if(err){
            console.log(err);
        }else{
            res.redirect('/home')
        }
    });

});


router.post('/home',(req,res)=>{
    
})



module.exports =  router;