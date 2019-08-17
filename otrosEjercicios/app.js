let module = angular.module("examen",[]);
  
module.constant("redes",[
    {"red": "facebook" , "url" : "https://facebook.com/mycompany"},
    {"red": "twitter" , "url" : "https://twitter.com/mycompany"},
    {"red": "instagram" , "url" : "https://instagram.com/mycompany"},
]);
 
module.controller("redesController",["$scope","redes",function($scope,redes) {
  $scope.primeraRed = redes[0].red + " : " + redes[0].url;  
  $scope.segundaRed = redes[1].red + " : " + redes[1].url;  
  $scope.terceraRed = redes[2].red + " : " + redes[2].url;  
}]);