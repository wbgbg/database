angular.module('database')
    .controller('PatientRegisterCtrl',['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
        this.name = "PatientRegisterCtrl";
        this.params = $routeParams;
        $scope.patient = {

        };
        $scope.myDate = new Date();
        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth(),
            $scope.myDate.getDate()
        );
        $scope.register = function() {
            $location.url('/patient/panel')
        }
        $scope.quit = function() {
            console.log('enterPatientLogin');
            $location.url('/patient/login');  
        }
    }]);