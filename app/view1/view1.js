'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', function ($scope, $http, $sce, $rootScope) {
        $rootScope.advertisements = [];

        $scope.to_trusted = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };

        $http({
            method: 'GET',
            url: "http://searchadvrest.dev/api/advertisement/getAll/20/0"
        }).then(function successCallback(response) {
            $rootScope.advertisements = response.data.results;
        }, function errorCallback(response) {
        });

        $http({
            method: 'GET',
            url: "http://searchadvrest.dev/api/advertisement/getAllCount"
        }).then(function successCallback(response) {
            $rootScope.bigTotalItems = response.data.count;
        }, function errorCallback(response) {
        });
    })


    //Pagination Controller
    .controller('PaginationCtrl', function ($scope, $rootScope, $http) {

        $scope.pageChanged = function () {

            var offset = 20 * $scope.bigCurrentPage;
            offset = offset - 20;

            $http({
                method: 'GET',
                url: "http://searchadvrest.dev/api/advertisement/getAll/20/" + offset
            }).then(function successCallback(response) {
                $rootScope.advertisements = response.data.results;
            }, function errorCallback(response) {
            });
        };

        $scope.numPages = 20;
        $scope.maxSize = 5;
        $rootScope.bigTotalItems = 20;
        $scope.bigCurrentPage = 1;
    })

    //Carousel Controller
    .controller('CarouselDemoCtrl', function ($scope) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

    });
;

/*
 *
 *
 var images = document.getElementsByClassName('adrImage');

 function loadImage(src) {
 var image = new Image;
 image.onload = function() {
 if ('naturalHeight' in this) {
 if (this.naturalHeight + this.naturalWidth === 0) {
 this.onerror();
 return false;
 }
 } else if (this.width + this.height == 0) {
 this.onerror();
 return false;
 }
 };
 image.onerror = function() {
 return true;
 };
 image.src = src;
 }

 for(var img in images)
 {
 if(loadImage(images[img].onerror))
 {
 console.log('olmadı');
 }
 }
 *
 * */