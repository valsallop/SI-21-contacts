var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var DataStore = require('nedb');


var app = express();

var dbFileName  = path.join(__dirname,'contacts.json');
var db = new DataStore({
		filename : dbFileName,
		autoload: true
	});

console.log('DB initialized');

db.find({},function (err,contacts){

	if(contacts.length == 0){
		console.log('Empty DB, loading initial data');

		person1 = {
			name : 'Pablo',
			email : 'pafmon@gmail.com',
			number: '682 123 123'
		};

		person2 = {
			name : 'Pedro',
			email : 'pedro@gmail.com',
			number: '682 122 126'
		};

		db.insert([person1, person2]);

	}else{
		console.log('DB has '+contacts.length+' contacts ');
	}

});

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/contacts',function(req,res){
	console.log('New GET request');

	db.find({},function (err,contacts){
		res.json(contacts);
	});
});

app.post('/contacts',function(req,res){
	console.log('New POST request');
	console.log(req.body);
	db.insert(req.body);
});

app.delete('/contacts/:id',function(req,res){
	var id = req.params.id;
	console.log('New DELETE request for contact with id '+id);
	
	db.remove({ _id: id},{}, function(err,numRemoved){
		console.log("Contacts removed: "+numRemoved);
		if(numRemoved  == 1)
			res.sendStatus(200);
		else
			res.sendStatus(404);
	});
});

app.listen(5000);
console.log('Magic is happening on port 5000');

