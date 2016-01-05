angular.module('database')
    .controller('PatientRegisterCtrl', ['$scope', '$routeParams', '$location', '$mdDateLocale', 'toastService','patientUserService',
        function($scope, $routeParams, $location, $mdDateLocale, toastService, patientUserService) {
            this.name = "PatientRegisterCtrl";
            this.params = $routeParams;
            $scope.myDate = new Date();
            $scope.maxDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth(),
                $scope.myDate.getDate()
            );
            $scope.register = function() {
                $scope.patient.birthday = $mdDateLocale.formatDate($scope.birthday);
                patientUserService.register($scope.patient);
            }
            $scope.quit = function() {
                console.log('enterPatientLogin');
                $location.url('/patient/login');
            }
            $scope.$on('patientRegister', function(event, flag) {
                if (flag) {
                    $location.url('/patient/login');
                } else {
                    toastService.show('注册失败');
                }
            });
        }
    ]);