
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'db';
const app = require('express')();
const fs = require('fs');
var morgan = require('morgan');
var logFile = fs.createWriteStream('./api.log', {flags: 'a'});
app.use(morgan('combined', { stream: logFile }));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const client = new MongoClient(url, { useNewUrlParser: true});


client.connect()
	.then(connectedClient => {
	    console.log('Connection établie')
	})
	.catch(err => {
		console.error("Failed to connect to server");
		throw err
	});

app.post('/ajoutUser', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    const db = client.db(dbName);
    db.collection('users').insertOne(
        {
    name: name,
    password: password
        }
    ).then(result => {
        console.log(result);
        res.send(result)
    })
        .catch(err => {
            console.error(err);
            res.status(500).send(err)});
}
);

app.listen(9999, () => {
    console.log('App listening on port 9999')
})
