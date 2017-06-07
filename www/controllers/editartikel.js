var myApp = angular.module('myApp');

myApp.controller('editartikelCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', '$timeout', function($scope, $http, $location, $routeParams, $filter, $timeout) {
  
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
        var tmpArt = {};
         tmpArt._id = x._id;
         tmpArt.Id_Artikel = x.Id_Artikel;
         //$scope.artikelId.push(tmpArt);
         $scope.artikelId = x._id; 
        }
      });
      //$scope.artikelId = ids;
      return ($scope.artikelId);
    }, function error(response) {
      console.log("error artikel ", response);
    });
  }

  $scope.getArtikel = function(_id){
    $http({
      method: 'get',
      url: '/rest/artikel/'+ _id
    }).then(function success(response) {
      return (response);
    }, function error(response) {
      console.log("error artikel ", response);
      return(null);
    });
  }

  //function for fylling the Subkategori, Mdelem, Bild proba
  $scope.getHuvudkategori();
  $scope.getSubkategori();
  $scope.getMedlem();
  $scope.getBild();
  
  $scope.changeMyHuvu = function(idh){
    var resp1 = $scope.subkategori.filter(function (respInside) { return (respInside.huvudkategori._id == idh); });
    $scope.subkategorifilter = resp1;
  }

  // Load the data acording to _id_artikel
  if ($location.path() == '/artikel/editArtikel/' + $routeParams.id)  {

    console.log($routeParams.id);
    
    $http({
      method: 'get',
      url: '/rest/har/'+ $routeParams.id
    }).then(function success(response) {
      $scope.har = response.data;
      $scope.har.artikel.DatumPublicerad = new Date($scope.har.artikel.DatumPublicerad);
      //console.log("Inside: ",$scope.har.artikel);

        // find all medlem in skriv
        $http({
        method: 'get',
        url: '/rest/artikel/skriv/'+ $scope.har.artikel._id
        }).then(function success(response) {
          $scope.skriv = response.data;
          
          //console.log($scope.har.artikel.subkategori.huvudkategori.huvudkategori_typ);
          $scope.myhuvudkategori = $scope.har.artikel.subkategori.huvudkategori._id;
          $scope.changeMyHuvu($scope.har.artikel.subkategori.huvudkategori._id);
          $scope.mysubkategori = $scope.har.artikel.subkategori._id;

          //

        }, function error(response) {
          console.log("error medlems ", response);
        

        });

    }, function error(response) {
      console.log("error artikel ", response);
    

    });

    
  } // end $location.path();

  // Add Medlem
  $scope.addArtikelSkriv = function(){
    
    $http({
        method: 'POST',
        url: '/rest/skriv',
        data:  
         {
            artikel: $scope.har.artikel, //
            medlem : $scope.mymedlem //
         } 
    }).then(function successCallback(res) {
        // Insert skriv from array
        $timeout(function(){ 
          var a = {};
          a._id     = res.data._id;
          a.artikel = $scope.har.artikel;
          a.medlem  = $scope.mymedlem;
          $scope.skriv.push(a);
        }); 
        //console.log(res.data);
        
        alertify.success("Medlem success."); 
    }, function errorCallback(err) {
        alertify.error(err);
    });
    
  }

  // Delete Medlem
  $scope.deleteArtikelSkriv = function(skriv){
    //console.log(skriv);
    alertify.confirm("Are you sure that you want to delete medlem: " + skriv.medlem.fName + "?", function (asc) {
      if (asc) {
        // code for deletion
        var index = $scope.skriv.indexOf(skriv._id);
        $http({
            method: 'DELETE',
            url: '/rest/skriv/' + skriv._id
        }).then(function successCallback(res) {
            
            // Remove skrive from array
            $timeout(function(){ 
              $scope.skriv.splice(index, 1);
            });
            alertify.success("Medlem is deleted.");
        }, function errorCallback(err) {
            alertify.error(err);
        });
        
      }
      else {
        //alertify.error("You've clicked cancel");
      } }, "Default Value"); 
  }


  // Update Artikel
  $scope.updateArtikel = function(){

    alertify.confirm("Are you sure you want to update this artikel: " + $scope.har.artikel.Rubrik + "?", function (asc) {
      if (asc) {
        // code for update
        // ARTIKEL
        $http({
            method: 'PUT',
            url: '/rest/artikel/' + $scope.har.artikel._id,
            data:  
           {
              Id_Artikel:      $scope.har.artikel.Id_Artikel, 
              Rubrik:          $scope.har.artikel.Rubrik,
              Ingress:         $scope.har.artikel.Ingress,
              Brodtext:        $scope.har.artikel.Brodtext,
              DatumPublicerad: $scope.har.artikel.DatumPublicerad,
              subkategori:     $scope.mysubkategori 
           }
        }).then(function successCallback(res) {
            alertify.success("Artikel is updated.");
        }, function errorCallback(err) {
            alertify.error(err);
        }); // End of Artikel
        

        // BILD
        $http({
          method: 'PUT',
          url: '/rest/bild/' + $scope.har.bild._id,
          data:
          {
            Id_bild:       $scope.har.bild._id, 
            beskrivning:   $scope.har.bild.beskrivning,
            namn_fotograf: $scope.har.bild.namn_fotograf,
            img_sokvag:    $scope.har.bild.img_sokvag
          }
        }).then(function success(resBild) {
          alertify.success("Bild is updated.");
          //window.location.href='/artikel/';         

        }, function error(errBild) {
          alertify.error(errBild);
        }); // End of Bild

        // HAR
        $http({
          method: 'PUT',
          url: '/rest/har/' + $scope.har._id,
          data:
          {
            bildtext:      $scope.har.bildtext
          }
        }).then(function success(resHar) {
          alertify.success("Har is updated.");
          window.location.href='/artikel/';         

        }, function error(errHar) {
          alertify.error(errHar);
        }); // End of Bild
        
      }
      else {
        //alertify.error("You've clicked cancel");
      } }, "Default Value");

  }


}]);