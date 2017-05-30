//Declaring angular to our "myApp" with the following modules
var app = angular.module("myApp", [
  'ngRoute',
  'ngResource',
  'ngTouch',
  'ui.bootstrap',
  'moment-picker',
  'htmlToPdfSave',
  'googlechart'
  

]);

//Routes to all our views and controllers
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

	$routeProvider.when("/",{
		templateUrl: "views/har.html",
		controller: "artikelCtrl"
	})
	.when("/artikel",{
		templateUrl: "views/har.html",
		controller: "artikelCtrl"
	})
	.when("/artikel/har",{
		templateUrl: "views/har.html",
		controller: "artikelCtrl"
	})

	.when('/artikel/har/:id',{
		templateUrl: 'views/artikel_details.html',
		controller: 'artikelCtrl'		
	})
	.when('/artikel/artiklar',{
		templateUrl: 'views/artiklar.html',
		controller: 'artikelCtrl'		
	})
	
	.when('/addArtikel',{
		templateUrl: "views/addArtikel.html",
		controller:  "AddartikelCtrl"
	})
	.when('/artikel/editArtikel/:id',{
		templateUrl: 'views/editArtikel.html',
		controller:'editartikelCtrl'
	})

	.when("/artikel/subkategori/:id",{
		templateUrl: "views/subkategori.html",
		controller: "subkategoriCtrl"
	})
	.when("/about/",{
		templateUrl: "views/about.html",
		//controller: "about"
	})
	
	.when("/artikel/huvudkategori/:id",{
		templateUrl: "views/huvudkategori.html",
		controller: "huvudkategoriCtrl"
	})

	.otherwise({
		templateUrl: "views/har.html"
	});
	//Setting our app to run html5Mode
	$locationProvider.html5Mode(true);
}]);
