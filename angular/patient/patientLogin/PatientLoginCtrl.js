angular.module('database')
    .controller('PatientLoginCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'toastService', 'patientUserService',
        function($scope, $rootScope, $routeParams, $location, toastService, patientUserService) {
            console.log('patientLogin');
            this.name = "PatientLoginCtrl";
            this.params = $routeParams;
            $scope.patient = {
                username: '',
                password: ''
            };
            $scope.$on('patientLogin',function(event, flag) {
                console.log('received patientLogin:', flag);
                if (flag) {
                    $location.url('/patient/panel');
                } else {
                    toastService.show('登录失败');
                }
            });
            $scope.register = function() {
                console.log('enterPatientRegister');
                $location.url('/patient/register');
            }
            $scope.login = function() {
                //$location.url('/patient/panel');
                patientUserService.login($scope.patient);
            }
        }
    ]);