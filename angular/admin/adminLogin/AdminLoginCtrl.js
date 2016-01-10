angular.module('database')
    .controller('AdminLoginCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'toastService', 'adminUserService',
        function($scope, $rootScope, $routeParams, $location, toastService, adminUserService) {
            console.log('adminLogin');
            this.name = "AdminLoginCtrl";
            this.params = $routeParams;
            $scope.patient = {
                username: '',
                password: ''
            };
            $scope.$on('adminLogin',function(event, flag) {
                console.log('received adminLogin:', flag);
                if (flag) {
                    $location.url('/admin/panel');
                    //toastService.show('登录成功');
                } else {
                    toastService.show('登录失败');
                }
            });
            $scope.login = function() {
                //$location.url('/patient/panel');
                adminUserService.login($scope.admin);
            }
        }
    ]);