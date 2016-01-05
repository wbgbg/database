angular.module('database')
    .directive('backButton', ['$window', function($window) {
        return {
            restrict: "E",
            templateUrl: "./angular/public/directive/backButton.tmpl.html",
            controller: function($scope, $element) {
                $scope.back = function() {
                    console.log('back');
                    $window.history.back();
                };
            }
        }
    }]);