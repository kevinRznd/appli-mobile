angular.module('starter.services', [])

.factory('users', function($http){
  return {
    getAll: function(){
      return $http.get("http://carbillet.net/api-digitalGrenoble/users/")
        .then(function(response) {
          return response.data.users;        
        });
    },
    login: function(data){
      return $http.post("http://carbillet.net/api-digitalGrenoble/credentials/",data)
        .then(function(response) {
          return response.data.idUserApi;
        })
    },
    getOne: function(id){
      return $http.get("http://carbillet.net/api-digitalGrenoble/users/")
        .then(function(response) {
          // console.log(response);
          for(var i = 0; 1 < response.data.users.length; i++) {
            if(response.data.users[i].idUser === id){
              return response.data.users[i];
            }
          }          
        });
    },
    update: function(data){
      return $http.put("http://carbillet.net/api-digitalGrenoble/users/",data)
        .then(function(response) {
          return response.data.idUserApi;
        })
    },
  }
});