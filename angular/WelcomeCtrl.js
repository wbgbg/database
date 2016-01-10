angular.module('database')
    .controller('WelcomeCtrl', ['$scope', '$location', '$routeParams',
        function($scope, $location, $routeParams) {
            console.log('welcome');
            this.name = "WelcomeCtrl";
            this.params = $routeParams;
            $scope.enterDoctor = function() {
                console.log('enterDoctor');
                $location.url('/doctor/login');
            }
            $scope.enterPatient = function() {
                console.log('enterPatient');
                $location.url('/patient/login');
            }
            $scope.enterAdmin = function() {
                console.log('enterAdmin');
                $location.url('/admin/login');
            }
        }
    ]);