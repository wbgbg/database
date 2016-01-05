angular.module('database')
    .controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location',
        function($scope, $route, $routeParams, $location) {
        	console.log('main');
            this.$route = $route;
            this.$location = $location;
            this.$routeParams = $routeParams;
        }
    ]);