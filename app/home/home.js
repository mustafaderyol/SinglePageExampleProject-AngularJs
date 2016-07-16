'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', function ($scope, $rootScope,$location) {

        $scope.locationFormData = "";

        $scope.searchAdvertisement = function () {
            var datadata = new Array();
            datadata['locationFormData'] = $scope.locationFormData;
            $scope.formData = datadata;
            $location.path('view1');
        }
    });