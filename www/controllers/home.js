//Controller file for our home page
app.controller('home', ['$scope', function($scope){
	//update year for the copyright
    $scope.date = new Date();

}]);