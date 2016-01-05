angular.module('database')
    .controller('PatientLoginCtrl', ['$scope', '$routeParams', '$location',
        function($scope, $routeParams, $location) {
            console.log('patientLogin');
            this.name = "PatientLoginCtrl";
            this.params = $routeParams;
            $scope.patient = {
                username: '',
                password: ''
            };
            $scope.patientRegister = function() {
                console.log('enterPatientRegister');
                $location.url('/patient/register');
            }
            $scope.patientLogin = function() {
                $location.url('/patient/panel')
            }
        }
    ]);