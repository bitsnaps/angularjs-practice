
var app = angular.module('app', ['ui.router', 'ngResource', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state({
        name: 'home',
        url: '/home',
        template: '<h1>Home page</h1>'
    })
    .state({
        name: 'color',
        url: '/color',
        templateUrl: 'color.html',
        controller: 'ColorController'
    })
    .state({
        name: 'about',
        url: '/about',
        template: '<h1>About page</h1>'
    });

    $urlRouterProvider.otherwise('/color');
});



app.controller('HomeController', function($scope){
    $scope.username = "Mohamed";
});

app.controller('ColorController', function($scope, $resource, $cookies){

    var Color = $resource('./colors');
    $scope.colors = [];
    //$scope.colors = ['Red', 'Blue', 'Green'];
    $scope.colorName = '';
    $scope.saveMode = false;
    $scope.currentId = -1;
    $scope.nbrColors = 0;

    var colors = $cookies.get('colors');
    if (typeof(colors)!=="undefined"){
      JSON.parse(colors).forEach(function(c){
          $scope.colors.push(c);
      });
    } else {
      Color.query({}, function(colors){
          colors.forEach(function(c){
              $scope.colors.push(c);
          });

      }, function(err){
          console.log('Error:', err);
      });
    }


    $scope.addColor = function(){
      if ($scope.colorName != ''){
        $scope.colors.push($scope.colorName);
        $scope.colorName = '';
        saveJson();
      }
    }

    $scope.removeColor = function(color){
        var i = find(color);
        $scope.colors.splice(i, 1);
        saveJson();
    }

    $scope.editColor = function(color){
        var i = find(color);
        $scope.currentId = i;
        $scope.colorName= $scope.colors[i];
        $scope.saveMode = true;
        saveJson();
    }

    $scope.removeAll = function(){
        $scope.colors.splice(0, $scope.colors.length);
        $cookies.remove('colors');
    }

    $scope.saveColor = function(){
      if ($scope.colorName == '')
        return;

        if ($scope.currentId > 0){
            $scope.colors[$scope.currentId] = $scope.colorName;
        }
        $scope.cancelSave();
        saveJson();
    }

    $scope.cancelSave = function() {
      $scope.currentId = -1;
      $scope.colorName = '';
      $scope.saveMode = false;
    }

    function saveJson() {
      $cookies.put('colors', JSON.stringify( $scope.colors) );
    }

    function find(color){
        for (var i = 0; i<$scope.colors.length; i++){
            if ($scope.colors[i] === color){
                return i;
            }
        }
    }

});

/*
var app = angular.module('app', []);

app.controller('HomeController', HomeController);

var HomeController = function($scope){

}*/
