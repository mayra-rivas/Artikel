var myApp = angular.module('myApp');

myApp.controller('AddartikelCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', function($scope, $http, $location, $routeParams, $filter) {
  
  $scope.artikelId = "";
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

  $scope.getArtikelId = function(id){
    $http({
      method: 'get',
      url: '/rest/artikel'
    }).then(function success(response) {
      var ids=[];
      response.data.forEach(function(x) {
        //console.log(id.Id_Artikel,id._id);
        if (id == x.Id_Artikel) {
        //if (ids.indexOf(id.Id_Artikel) == -1) {
         var tmpArt = {};
         tmpArt._id = x._id;
         tmpArt.Id_Artikel = x.Id_Artikel;
         //$scope.artikelId.push(tmpArt);
         $scope.artikelId = x._id; 
        }
      });
      //console.log("IDS: ",$scope.artikelId);
      //$scope.artikelId = ids;
      return ($scope.artikelId);
    }, function error(response) {
      console.log("error artikel ", response);
    });
  }

  //function fyllt Subkategori, Mdelem, Bild proba
  $scope.getHuvudkategori();
  $scope.getSubkategori();
  $scope.getMedlem();
  $scope.getBild();
  
  $scope.changeMyHuvu = function(idh){
    var resp1 = $scope.subkategori.filter(function (respInside) { return (respInside.huvudkategori._id == idh); });
    $scope.subkategorifilter = resp1;
  }

  $scope.addArtikel = function(){
    // Add artikel in doc artikel
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
      }).then(function successCallback(resArtikel) {
    
        // Skrive
        $http({
          method: 'POST',
          url: '/rest/skriv/',
          data: 
          {
             artikel: resArtikel.data, 
             medlem: $scope.mymedlem
           }
         
        }).then(function successCallback(res) {
          console.log('exito skriv');
        

        }, function errorCallback(err) {
           console.log('error in skriv: ',err);
            
        
        }); // End of Skriv
        
        
        // BILD
        $http({
          method: 'POST',
          url: '/rest/bild/',
          data:
          {
            Id_bild: resArtikel.data._id, // dinamic artikel._id
            beskrivning: $scope.beskrivning,
            namn_fotograf: $scope.namn_fotograf,
            img_sokvag: $scope.img_sokvag
          }
        }).then(function success(resBild) {
          console.log('success bild');

            // HAR
            $http({
              method: 'POST',
              url: '/rest/har/',
              data: 
              {
                 bildtext: $scope.Bildtext, 
                 artikel: resArtikel.data, 
                 bild: resBild.data
              }
             
            }).then(function successCallback(resHar) {
              console.log('exito har');
              window.location.href='/artikel/';
              
               //if an error occurs the following runs 
            }, function errorCallback(errHar) {
               console.log("Error en HAR: ",errHar);
            }); // End of Har
            

        }, function error(errBild) {
          console.log("error bild ", errBild);
        }); // End of Bild
        
         //if an error occurs the following runs 
    }, function errorCallback(errArtikel) {
        console.log(errArtikel);
    }); // End of Artikel
        

  }

}]);