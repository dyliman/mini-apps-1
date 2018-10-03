var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var server = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'checkout'
})

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.post('/', function(req, res) {
	server.query(`INSERT INTO purchases (id, name, email, password, phone, address, creditCard) VALUES (null, '${req.body.name}', '${req.body.email}', '${req.body.password}', '${req.body.phone}', '${req.body.address1}' ' ' '${req.body.address2}' ' ' '${req.body.city}' ' ' '${req.body.state}' ' ' '${req.body.zip}', '${req.body.ccNum}' ' ' '${req.body.expiry}' ' ' '${req.body.cvv}' ' ' '${req.body.billingZip}');` , (err) => {
        if(err) {
        	console.log(err)
        }
    })



	res.status(201).send(req.body.toString());
	res.end()
});

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});

