const express = require('express');
const path = require('path');
const morgan = require('morgan');


const port = 1234;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app = express();
const router = express.Router();

app.use(morgan('dev'));
app.use(express.json());
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


app.get('/search/user/:user', (req, res) => {
    // console.log(req.params.user);
    database.collection('users').find({ username: `${req.params.user}` }).toArray((err, result) => {
        // database.collection('shoes').find({id:10000000}).limit(1).toArray((err, result)=>{
        if (err) throw err;
        res.status(200).send(result)
    })
})

app.post('/search/user/:user', (req, res) => {
    // console.log(req.body);
    database.collection('users').insertOne(req.body)
        .catch(err => console.log(err))
})

// ******** BRANDON'S AWS S3 CODE ******** //



app.listen(port, () => { console.log(`Listening in on port ${port}`) });
