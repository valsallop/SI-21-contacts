var myApp= angular.module("ContactListApp",[]);

myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("Controller initialized");
	
	var refresh=function(){
		/* /contacts */
		/* http://localhost:57478/Home/Get*/
	$http.get('/contacts').success(function (contacts){
		console.log('Data received');
		$scope.contactlist=contacts;
	});
	};
	refresh();
	$scope.addContact= function(){
		console.log('inserting contact');
		/*$http.post('/contacts').success(function (contacts){
		console.log('Data received');
		$scope.contactlist=contacts;
		});*/
		$http.post('/contacts',$scope.contact);
		refresh();


	}
	$scope.deleteContact= function(id){
		console.log('deleting contact with id',id);
		/*$http.post('/contacts').success(function (contacts){
		console.log('Data received');
		$scope.contactlist=contacts;
		});*/
		$http.delete('/contacts/'+id);
		refresh();

	}

/*
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

	var contactlist=[person1,person2]

	$scope.contactlist=contactlist;
	*/
}]);