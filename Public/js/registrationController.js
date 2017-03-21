var app = angular.module("medMod");

app.controller("registrationController", function($scope, userFactory, $location) {
  $scope.addUser= function(object){
    userFactory.addUser(object).then(function(){
      $scope.userlist = userFactory.updateUser();
      $location.path('/login');
    });
  };
});
