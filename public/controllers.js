var myApp = angular.module("ContactListApp",[]);

myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("Controller initialized");

	var refresh = function (){
		$http.get('/contacts').success(function (contacts){
			console.log('Data received successfully');
			$scope.contactlist = contacts;
		});
	}

	refresh();

	$scope.addContact = function(){
		console.log("Inserting contact ...");
		$http.post('/contacts',$scope.contact);
		refresh();
	}

	$scope.deleteContact = function(id){
		console.log("Deleting contact with "+id);
		$http.delete('/contacts/'+id);
		refresh();
	}

}]);