const express = require('express');
const path = require('path');
const morgan = require('morgan');


const bcrypt = require('bcrypt');
const saltRounds = 10;
const port = 1234;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app = express();
const router = express.Router();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/dist')));

// BRANDONS CODE //

const routes = require( './routes.js' );
app.use( '/media', routes );




// BRANDONS CODE //

let database;
MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    let dbo = db.db('budgetFB');
    database = dbo;
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

// ******** BRANDON'S AWS S3 CODE ******** //



app.listen(port, () => { console.log(`Listening in on port ${port}`) })
