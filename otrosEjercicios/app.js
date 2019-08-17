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


module.provider('preferences', function () {

    this.$get = function () {
        let preferencesArray = {

            "language" : "EN",
            "theme": "indigo",
            "style" : "Modern"
        };
        
        return {
            userPreferences: preferencesArray
        };
    }
});

module.config(function (preferencesProvider) {
   
});

module.controller("preferencias",function ($scope, preferences) {

    $scope.preferenceOne = preferences.userPreferences.language;
    $scope.preferenceTwo = preferences.userPreferences.theme;
    $scope.preferenceThree = preferences.userPreferences.style;

});