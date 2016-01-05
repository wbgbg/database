angular.module('database')
    .directive('quitButton', ['$location', function($location) {
        return {
            restrict: "E",
            templateUrl: "./angular/public/directive/quitButton.tmpl.html",
            controller: function($scope, $element) {
                $scope.quit = function() {
                    console.log('quit');
                    $location.url('/');
                };
            }
        }
    }]);