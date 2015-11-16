var express = require('express');
var path = require('path');
var fs= require('fs');
var bodyParser= require('body-parser');
var DataStore= require('nedb');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '173.194.80.204',
  user     : 'root',
  password : 'root',
  database : 'contacts'
});

connection.connect();

var app= express();

var dbFileName = path.join(__dirname,'contacts.json');
var db= new DataStore({
filename: dbFileName,
autoload:true

});

console.log('DB initialized');
db.find({},function (err, contacts){
	if(contacts.length == 0){
		console.log('Empty db,loading initial data');
		person1={
			name:'Paco',
			email:'Paco@gmail.com',
			number:'654 321 302'
		};
		person2={
			name:'Luisa',
			email:'Luisa@gmail.com',
			number:'642 124 402'
		};

		db.insert([person1,person2]);
	}else{
		console.log('DB has '+contacts.length+' contacts');
	}
});

/*
app.get("/",function(req,res){

	res.send("Hello world,i'm here!");

});
*/
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/*
app.get('/contacts',function(req,res){
	console.log("new GET request");

	db.find({},function (err,contacts){

		res.json(contacts);
	});
});*/
app.get("/contacts",function(req,res){
connection.query('SELECT * from contacts', function(err, rows, fields) {

  if (!err){
    console.log('The solution is: ', rows);
	res.json(rows);
  }
  else
    console.log('Error while performing Query.');
  });
});

app.post('/contacts',function(req,res){
	console.log("new POST request");
	console.log(req.body)

	connection.query("insert into contacts (name,email,number) values ('"+req.body.name+"','"+req.body.email+"','"+req.body.number+"')", function(err, rows, fields) {

  	if (!err){
    	console.log("Insert OK");
    	console.log(JSON.stringify(req.body.name));
  	}
  	else
    	console.log('Error while performing Query.');
  	});


});
app.delete('/contacts/:id',function(req,res){
	console.log("new DELETE request");
	var id= req.params.id;
	console.log(id)
	connection.query("delete from contacts where id = "+id, function(err, rows, fields) {

  	if (!err){
    	console.log("Insert OK");
    	console.log(JSON.stringify(req.body.name));
  	}
  	else
    	console.log('Error while performing Query.');
  	});
	

});



app.listen(8080);
console.log('Server is on fire');