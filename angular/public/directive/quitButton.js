angular.module('database')
    .directive('quitButton', ['$location', 'patientUserService',
        function($location, patientUserService) {
        return {
            restrict: "E",
            templateUrl: "./angular/public/directive/quitButton.tmpl.html",
            controller: function($scope, $element) {
                $scope.quit = function() {
                    console.log('quit');
                    patientUserService.logout();
                    $location.url('/');
                };
            }
        }
    }]);