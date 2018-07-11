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
	var body = JSON.parse(req.body.text)
	var returnObj = {}
	var items = ['firstName','lastName','county','city','role','sales']
	for(var i = 0; i < items.length; i++){
		returnObj[items[i]] = [];
	}

	var recurObject = function(object){
		for(var i = 0; i < items.length; i++){
			returnObj[items[i]].push(object[items[i]])
		}

		if(object.children.length > 0){
			for(var i = 0; i < object.children.length; i++){
				recurObject(object.children[i])
			}
		}
	}
	recurObject(body);
	returnObj['csv'] = handleCSV(returnObj);

    res.status(201).send(returnObj);
});

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});


var handleCSV = function(body) {
	var csv = [];
	var items = ['firstName','lastName','county','city','role','sales']
		for(var i = 0; i < body.firstName.length; i++){
			var current = [];
				for(var j = 0; j < items.length; j++){
					current.push(body[items[j]][i]);
				}
			csv.push(current);
		}
	csv = csv.join('\n')
	return csv
}

