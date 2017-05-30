 var myApp = angular.module('myApp');

 myApp.controller('kommentarCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
   console.log('kommentarController loaded...');
   console.log($location.path(), $routeParams.id);


  
   if ($location.path() == '/artikel/kommentar/' + $routeParams.id) {
     console.log("prueba", $scope.ids);
     var id = $routeParams.id;
     $http({
       method: 'get',
       url: '/rest/artikel/kommentar/' + id
    }).then(function success(response) {
       console.log("res har routeParams", response);
      $scope.kommentar = response.data;
     }, function error(response) {
       console.log("res", response);
     });
   }


}]);

var myApp = angular.module('myApp');

myApp.controller('AddartikelCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', function($scope, $http, $location, $routeParams, $filter) {
  
  //$scope.subkategori = [];
  $scope.getHuvudkategori = function(){
    $http({
      method: 'get',
      url: '/rest/huvudkategori'
    }).then(function success(response) {
      $scope.huvudkategori = response.data;
    }, function error(response) {
      console.log("error huvudkategori ", response);
    });
  }

  $scope.getSubkategori = function(){
    $http({
      method: 'get',
      url: '/rest/subkategori'
    }).then(function success(response) {
      $scope.subkategori = response.data;
    }, function error(response) {
      console.log("error subkategori ", response);
    });
  }

  $scope.getBild = function(){
    $http({
      method: 'get',
      url: '/rest/bild'
    }).then(function success(response) {
      $scope.bild = response.data;
    }, function error(response) {
      console.log("error bild ", response);
    });
  }

  $scope.getMedlem = function(){
    $http({
      method: 'get',
      url: '/rest/medlem'
    }).then(function success(response) {
      $scope.medlem = response.data;
    }, function error(response) {
      console.log("error subkategori ", response);
    });
  }

  //function for fyll Subkategori, Mdelem,
  $scope.getHuvudkategori();
  $scope.getSubkategori();
  $scope.getMedlem();
  $scope.getBild();
  //Add Artikel
  $scope.changeMyHuvu = function(idh){
    //var resp1 = [];
    var resp1 = $scope.subkategori.filter(function (respInside) { return (respInside.huvudkategori._id == idh); });
    $scope.subkategorifilter = resp1;
  }
  // Add Artikel
  $scope.addArtikel = function(){
    $http({
        method: 'POST',
        url: '/rest/artikel/',
        data: 
        {
           Id_Artikel: $scope.Id_Artikel, 
           Rubrik: $scope.Rubrik, 
           Ingress: $scope.Ingress,
           Brodtext: $scope.Brodtext,
           DatumPublicerad: $scope.DatumPublicerad,
           subkategori: $scope.mysubkategori
         }
       
      }).then(function successCallback(res) {
        console.log('exito');

        window.location.href='/artikel/';

         //if an error occurs the following runs 
        }, function errorCallback(err) {
         console.log(err);
        });

  }


}]);