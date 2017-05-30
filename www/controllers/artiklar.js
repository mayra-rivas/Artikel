var myApp = angular.module('myApp');

myApp.controller('artiklarCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', function($scope, $http, $location, $routeParams, $filter) {

//
  $scope.getAllSkrive = function(){
    // Find info in skrive
    $http({
      method: 'get',
      url: '/rest/skriv'
    }).then(function success(responseSkrive) {
      //Exist skriv in mongo
      $scope.skrive = responseSkrive.data;
    }, function error(responseSkrive) {
        console.log("error: Har",responseSkrive);
    });
  }
  
  $scope.getAllHar = function(){
    // Find info in har
    $http({
      method: 'get',
      url: '/rest/har'
    }).then(function success(responseHar) {
      //Exist har in mongo
      $scope.har = responseHar.data;
      console.log("dentro Har: ",$scope.list1);
    }, function error(responseHar) {
        console.log("error: Har",responseHar);
    });
  }

  $scope.getAllArtikler = function(){
    // Find info in artikler
    $http({
        method: 'get',
        url: '/rest/artikel'
      }).then(function success(responseArtikel) {
        $scope.artikel = responseArtikel.data;
        console.log("Dentro artikel: ",$scope.Artikel);
      }, function error(responseArtikel) {
          console.log("error: artikel",responseArtikel);
      });
  }


  if (($location.path() == '/artikel/artiklar1/')){

    var responseList = [];
    var responseSort = [];
    var responseTmp = [];
          // Find info in artikler
    $http({
        method: 'get',
        url: '/rest/artikel'
      }).then(function success(responseArtikel) {
        $scope.artikel = responseArtikel.data;
        console.log("Dentro artikel: ",$scope.artikel);
      
          //Exist artikel in mongo
          if ($scope.artikel)
          {

              // Find info in skrive
              $http({
                method: 'get',
                url: '/rest/skriv'
              }).then(function success(responseSkrive) {
                //Exist skriv in mongo
                //$scope.skrive = responseSkrive.data;

                var list1 = [];
                var list2 = [];
                var list2 = $filter('orderBy')(responseSkrive.data,'artikel.Id_Artikel');
                var item = {};

                responseArtikel.data.forEach(function(a) {
                  item = {};
                  item.artikel = a;
                  //Info Skrive
                  responseSort = list2.filter(function (b) { 
                    //console.log(b);
                    if (a.Id_Artikel !== null) {
                      return (b.artikel.Id_Artikel == a.Id_Artikel);
                    }
                  });
                  if (responseSort.length){
                    console.log("Filter: ",responseSort);
                    item.skrive = responseSort;
                  }
                  else {
                    item.skrive = [];
                  }                  
                  responseList.push(item);
                });

              }, function error(responseSkrive) {
                  console.log("error: Har",responseSkrive);
              });

              // Find info in har
              $http({
                method: 'get',
                url: '/rest/har'
              }).then(function success(responseHar) {
                //Exist har in mongo
                $scope.har = responseHar.data;
                console.log("dentro Har: ",$scope.list1);
              
                var list1 = $filter('orderBy')(responseHar.data,'artikel.Id_Artikel');
               
                responseList.forEach(function(a) {
                  item = {};
                  item.artikel = a.artikel;
                  item.skrive = a.skrive;
                  // Info Har
                  responseSort = list1.filter(function (b) { return (b.artikel.Id_Artikel == a.Id_Artikel); });
                  //item.har = [];
                  if (responseSort.length){
                    //console.log("Filter: ",responseSort);
                    item.har = responseSort;
                    
                  }
                  else {
                    item.har = [];
                  }
                  responseTmp.push(item);

                })
                console.log(responseTmp);
              }, function error(responseHar) {
                  console.log("error: Har",responseHar);
              });

                $scope.artikel = responseTmp;

          }
          
    }, function error(responseArtikel) {
          console.log("error: artikel",responseArtikel);
    });

  }

  
}]);