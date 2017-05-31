var myApp = angular.module('myApp');

myApp.controller('huvudkategoriCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', function($scope, $http, $location, $routeParams, $filter) {

  // ($location.path() == '/artikel/har/' + $routeParams.id) 
  if ($location.path() == '/artikel/huvudkategori/' + $routeParams.id) { //||($location.path() == '/artikel/subkategori')) {
    console.log("Dentro de huvudkategori");
    var id = 1;
    var responseList = [];
    $http({
      method: 'get',
      url: '/rest/har'
    }).then(function success(response) {
      $scope.artikel = response.data;
      var responseSort = $filter('orderBy')(response.data,'artikel.Id_artikel');
      
      var resp1 = {};
      // $scope.huvudkategori = responseSort.artikel.subkategori.huvudkategori; probalo
      response.data.forEach(function(x){
        
        resp1 = responseSort.filter(function (y) { 
        //  if (y.artikel.subkategori._id == $routeParams.id)
        //  {
            return ((y.artikel.subkategori.huvudkategori.Id_huvudkategori == x.artikel.subkategori.huvudkategori.Id_huvudkategori)&&($routeParams.id == x.artikel.subkategori.huvudkategori._id));
        //  }
        });
        if (resp1.length>0) { 
          responseList.push(resp1);
        } 
      });
      console.log("Bueno: ",responseList[0]);
      $scope.subkategori = responseList[0];
      $scope.artikel = responseList[0];

    }, function error(response) {
      console.log("res", response);
    });
  }

}]); 