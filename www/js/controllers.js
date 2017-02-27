angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, users) {
  users.getOne(localStorage.getItem('id'))
    .then(function(response){
      $scope.user = response;      
    });
})

.controller('AccountCtrl', function($scope, $location) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.logout = function(){
    localStorage.clear();
    $location.path('/login')
  }
})

.controller('ProfilCtrl', function($scope, $http, users) {
    users.getOne(localStorage.getItem('id'))
    .then(function(response){
      $scope.user = response;      
    });
})

.controller('LocalisationCtrl', function($cordovaGeolocation, $scope, $http, users) {
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat  = position.coords.latitude
      $scope.long = position.coords.longitude
      $scope.marker = {
        position: [$scope.lat, $scope.long],
        decimals: 4,
      }
      $scope.map = {
        center: [$scope.lat, $scope.long],
      }
    },
    function(err) {      
      alert('Nous n\'avons pas réussi à vous localiser');
    });
  
    users.getAll()
      .then(function(response){
        $scope.users = response;      
      }); 
    

    $scope.posUser = function($toto) {     
      $scope.points = {
        coords: [
          [$toto] 
        ]     
      }
      $scope.map = {
        center: [$toto],
      }
    }   
})

.controller('LoginCtrl', function($scope, $http, $location, users) { 
  if (localStorage.getItem('id') === "undefined" || localStorage.getItem('id') <= 0 || localStorage.getItem('id') == null){ 
    $scope.data = {}; 
    $scope.login = function() {
      $scope.data = {
        json: {
          username: $scope.data.username, 
          password: $scope.data.password
        }
      };
      users.login($scope.data)
        .then(function(response){
          localStorage.setItem("id",response)
          if (localStorage.getItem("id") > 0) {$location.path('tab/dash');}
        })
    }
  }
  else if (localStorage.getItem('id') > 0) {
    $location.path('tab/dash');
  }
})

.controller('editProfilCtrl', function($scope, $http, $location, users) {
  users.getOne(localStorage.getItem('id')) //
  .then(function(response){
      $scope.users = response;          
    });
    $scope.users = {};
    $scope.updateData = function() {     
      $scope.data = {
        json: {
          idUser: localStorage.getItem('id'),  
          adress: $scope.users.adress,
          age: $scope.users.age,
          phone: $scope.users.phone,          
        }
      }
      console.log($scope.data);
      users.update($scope.data)
        .then(function(response){
          $location.path('tab/profil');
        })
    };
})

.controller('ProfilFriendCtrl', function($scope, users, $stateParams){
  users.getOne($stateParams.userId)
  .then(function(response){
    $scope.user = response;
  })
});