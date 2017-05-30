var myApp = angular.module('myApp');

myApp.controller('artikelCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', function($scope, $http, $location, $routeParams, $filter) {
  // console.log('artikelController loaded...');
  // console.log($location.path(), $routeParams.id);
    
  if ($location.path() == '/artikel/subkategori') {
    console.log("new ids", $scope.ids);
    var id = 1;
    $http({
      method: 'get',
      url: '/rest/artikel/subkategori/' + id
    }).then(function success(response) {
      //console.log("res subkategori", response);
      $scope.artikel = response.data;
    }, function error(response) {
      console.log("res", response);
    })
  }

  if ($location.path() == '/artikel/limit') {
    //console.log("new ids", $scope.ids);
    var id = 1;
    $http({
      method: 'get',
      url: '/rest/artikel/limit/'
    }).then(function success(response) {
      //console.log("res limit", response);
      $scope.artikel = response.data;
    }, function error(response) {
      console.log("res", response);
    });
  }

  // if Url is  '/' o '/artikel' o '/artikel/har' then load this
  if (($location.path() == '/')||($location.path() == '/artikel')||($location.path() == '/artikel/har')||($location.path() == '/artikel/artiklar')) {
    //console.log("/artikel/har");
    var id = 1;
    $http({
      method: 'get',
      url: '/rest/artikel/har'
    }).then(function success(response) {
      //console.log(response);
      var ids=[];
      response.data.forEach(function(id) {
        if (id.artikel!=null){
          if (ids.indexOf(id.artikel.Id_Artikel) == -1) {
           var tmpArt={};
           tmpArt._id=id._id;
           tmpArt.Id_Artikel=id.artikel.Id_Artikel;
           ids.push(tmpArt);
           //console.log(id._id);
           //console.log(id.artikel_id); 
          //ids.push(id.artikel.Id_Artikel); 
          }
        }
      });
      
      
      //Get all kommentar group by Id_Artikel
      $http({
        method: 'get',
        url: '/rest/kommentar'
      }).then(function success(response) {
        //console.log("idArtikel: ", $scope.artikel);
        var order = ids;
          //var lista = {};
          var responseList = [];
          var responseSort = [];
          //lista.filter(function (lista) { return (lista.artikel.Id_Artikel == "1"); });
          //newresponse = $filter('orderBy')(lista, function(item) { return order.indexOf(item.artikel.Id_Artikel);});
          
          // SORT by artikel.Id_Artikel
          responseSort = $filter('orderBy')(response.data,'artikel.Id_Artikel');
          //console.log(responseSort);

          ids.forEach(function(x) {
            var resp1 = {};
            resp1 = responseSort.filter(function (respInside) { return (respInside.artikel.Id_Artikel == x.Id_Artikel); });
            if (resp1.length){
              var lista = {};
              lista._id = x._id;
              lista.artikel = resp1[0].artikel;
              lista.Count = resp1.length;
              responseList.push(lista);
            }
          })
          $scope.kommentarMore = responseList;
          //console.log($scope.kommentarMore);
 
      }, function error(response) {
          console.log("error: kommentar",response);
      });

     
      if (response.data.length) {
        $scope.artikel = response.data;
      }      
    }, function error(response) {
      console.log("error /artikel/har", response);
    });
  }


  if ($location.path() == '/artikel/har/' + $routeParams.id) {
    //console.log("/artikel/har/id: ", $routeParams.id);
    var id = $routeParams.id;
    var ida;
    //var ida = [];
    $http({
      method: 'get',
      url: '/rest/artikel/har/' + id
    }).then(function success(response) {
      //console.log("antes de har: ",response);
      ida = response.data.artikel._id;
      //console.log("ids: ",ida); 
        
        // Add comment by Artikel
        $http({
            method: 'get',
            url: '/rest/artikel/kommentar/' + id
          }).then(function success(response) {
            $scope.kommentar = response.data;
            //console.log("kommentar: ",response.data)
        }, function error(response) {
            console.log("error No: kommentar",response);
        });

        // Add medlem by artikel
        //console.log("antes de skriv: ",ida);
        $http({
            method: 'get',
            url: '/rest/artikel/skriv/' + ida
          }).then(function success(response) {
            $scope.skriv = response.data;
            //console.log("skriv ",response.data);
        }, function error(response) {
            console.log("error: skriv",response);
        });
//
      $scope.artikel = response.data;
    }, function error(response) {
      //console.log("error /artikel/har/id", response);
      $location.url('/404');


    });
  }

///Add Kommentar: 
  $scope.addArtikelKommentar = function(){

    $http({
        method: 'POST',
        url: '/rest/kommentar',
        data:  
         {
            Id_Kommentar: $scope.artikel._id, //_id artikel
            anvendarnamn: $scope.anvendarnamn,
            text_kommentar: $scope.text_kommentar,
            datum_kommentar: $scope.datum_kommentar,
            artikel: $scope.artikel.artikel // 
         }
       
    }).then(function successCallback(res) {
        //console.log('success');
        window.location.href='/artikel/har';
         //if an error occurs the following runs 
        }, function errorCallback(err) {
         console.log(err);
    });
    
  }

///Delete Kommentar:
  $scope.deleteArtikelKommentar = function(kommentar){
    //console.log(idk);
  
    console.log(kommentar);
    if (confirm("Are you sure to delete this kommentar?: "+kommentar._id)) {

        // code for deletion
        $http({
            method: 'DELETE',
            url: '/rest/kommentar/' + kommentar._id
        }).then(function successCallback(res) {
            //console.log('exito');
            window.location.href='/artikel/har';
        }, function errorCallback(err) {
            console.log(err);
        });
    }    
  }
    
// Delete Artikel
  $scope.deleteArtikel = function(){
    // order for delet artikel
    // Bild ... foreach Skrive.length ... foreach Kommentar.length ... Har ... Artikel
    console.log("artikel   id: ",$scope.artikel.artikel._id);
    console.log("skriv     id: ",$scope.skriv.length);
    console.log("Bild      id: ",$scope.artikel.bild._id);
    console.log("kommentar id: ",$scope.kommentar.length);
    console.log("har       id: ",$scope.artikel._id);

    if (confirm("Are you sure to delete this Artikel?: "+$scope.artikel.artikel._id)) {
        
        // Delete Bild
        $http({
            method: 'DELETE',
            url: '/rest/bild/' + $scope.artikel.bild._id
        }).then(function successCallback(res) {
            console.log('bild deleted');
        }, function errorCallback(err) {
             console.log(err);
        });

        // Delete foreach skrive
        $scope.skriv.forEach(function(x) {
          $http({
              method: 'DELETE',
              url: '/rest/skriv/' + x._id
          }).then(function successCallback(res) {
              console.log('skriv deleted');
          }, function errorCallback(err) {
               console.log(err);
          });
        })

        // Delete foreach kommentar
        $scope.kommentar.forEach(function(x) {
          $http({
              method: 'DELETE',
              url: '/rest/kommentar/' + x._id
          }).then(function successCallback(res) {
              console.log('kommentar deleted');
          }, function errorCallback(err) {
               console.log(err);
          });
        })

        // Delete Har
        $http({
            method: 'DELETE',
            url: '/rest/har/' + $scope.artikel._id
        }).then(function successCallback(res) {
            console.log('har deleted');
        }, function errorCallback(err) {
             console.log(err);
        });
        
        // Delete Artikel
        $http({
            method: 'DELETE',
            url: '/rest/artikel/' + $scope.artikel.artikel._id
        }).then(function successCallback(res) {
            console.log('bild deleted');
        }, function errorCallback(err) {
             console.log(err);
        });

        window.location.href='/artikel/har';

    }
  }


}]);