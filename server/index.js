const express = require('express');
const path = require('path');
const morgan = require('morgan');


const bcrypt = require('bcrypt');
const saltRounds = 10;
const port = 1234;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/budgetFB";
const app = express();
const router = express.Router();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/dist')));

// BRANDONS CODE //

// const routes = require( './routes.js' );
// app.use( '/media', routes );




// BRANDONS CODE //

let database;
MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    let dbo = db.db('budgetFB');
    database = dbo;
    dbo.createCollection("users",(err,res)=>{
        if(err) throw err;
    })
});

app.get('/search/user/:user', (req, res)=>{
    console.log(req.params.user);
    database.collection('users').find({username: `${req.params.user}`}).toArray((err, result)=>{
        if(err) throw err;
        console.log('result: ', result)
        res.status(200).send(result);

    })
})

app.post('/authenticate/password', (req, res) => {
    console.log(req.body);
    database.collection('users').find({ username: `${req.body.username}` }).toArray((err, result) => {
        if (err) throw err;
        // console.log(result[0]);
        if(result[0] !== undefined){
            bcrypt.compare(req.body.password, result[0].password, function (err, bool) {
                if (err) {
                    console.log(err);
                }
                res.status(200).send({username: result[0].username, isValidPW: bool});
                // console.log(bool)
            });
        }else{
            res.status(200).send(result)
        }
    })
})

app.post('/search/user/:user', (req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err)
        }
        database.collection('users').insertOne({ username: req.body.username, password: hash })
            .catch(err => console.log(err))
    });
})


// ******** BRANDON'S CODE ******** //
app.post("/media/profileImage", (req, res) => {
    console.log(req.body)
    database.collection('users').updateOne({username: req.body.username}, {$set: {profPic: req.body.profPic}}, (err, result)=> {
      if(err) {
          console.log(err)
      }
      res.status(200).send("SUCCESS")
  })

});
app.post('/media/images', (req, res) => {
    console.log(req.body)
    database.collection('users').updateOne({username: req.body.username}, {$push: {images: req.body.images}}, (err, result)=> {
    if(err) {
        console.log(err)
    }
    res.status(200).send("SUCCESS")
})
 
app.put('/search/user/:user', (req, res)=>{
    console.log(req.params.user)
    database.collection('users').update({username: `${req.params.user}`},
    {
    username: `${req.params.user}`,
    first: req.body.first,
    last: req.body.last,
    birthday: req.body.birthday,
    email: req.body.email,
    phone: req.body.phone,
    about: req.body.about
})
    .catch(err=>console.log(err))
})
});

app.get('/media/images/:username', (req, res) => {
    console.log("HELLLLLLLOOOOO", req.params)
    database.collection('users').find(req.params).toArray((err, result)=> {
    if(err) {
        console.log(err)
    }
    console.log(result)
    res.status(200).send(result[0])
})
});

// ******** BRANDON'S CODE ******** //



app.listen(port, () => { console.log(`Listening in on port ${port}`) })
