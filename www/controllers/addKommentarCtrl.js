// var myApp = angular.module('myApp');

// myApp.controller('kommentarCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
//   console.log('kommentarController loaded...');
//   console.log($location.path(), $routeParams.id);


  
//   if ($location.path() == '/artikel/kommentar/' + $routeParams.id) {
//     console.log("prueba", $scope.ids);
//     var id = $routeParams.id;
//     $http({
//       method: 'get',
//       url: '/rest/artikel/kommentar/' + id
//     }).then(function success(response) {
//       console.log("res har routeParams", response);
//       $scope.kommentar = response.data;
//     }, function error(response) {
//       console.log("res", response);
//     });
//   }


// }]);