angular.module('database')
    .controller('DoctorLoginCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'toastService', 'doctorUserService',
        function($scope, $rootScope, $routeParams, $location, toastService, doctorUserService) {
            console.log('doctorLogin');
            this.name = "DoctorLoginCtrl";
            this.params = $routeParams;
            $scope.patient = {
                username: '',
                password: ''
            };
            $scope.$on('doctorLogin',function(event, flag) {
                console.log('received doctorLogin:', flag);
                if (flag) {
                    $location.url('/doctor/panel');
                    //toastService.show('登录成功');
                } else {
                    toastService.show('登录失败');
                }
            });
            $scope.login = function() {
                //$location.url('/patient/panel');
                doctorUserService.login($scope.doctor);
            }
        }
    ]);