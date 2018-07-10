var express = require('express');
var bodyParser = require('body-parser')
app = express();


app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {

})

app.post('/', function(req, res) {
	console.log(req.body.text)
	var body = JSON.parse(req.body.text)
	var returnObj = {}
	returnObj.firstName = [];
	returnObj.lastName = [];
	returnObj.county = [];
	returnObj.city = [];
	returnObj.role = [];
	returnObj.sales = [];

	var recurObject = function(object){
		returnObj.firstName.push(object.firstName);
		returnObj.lastName.push(object.lastName);
		returnObj.county.push(object.county);
		returnObj.city.push(object.city);
		returnObj.role.push(object.role);
		returnObj.sales.push(object.sales);
		if(object.children.length > 0){
			for(var i = 0; i < object.children.length; i++){
				recurObject(object.children[i])
			}
		}
	}
	recurObject(body);

    res.status(201).send(returnObj);
});

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});
