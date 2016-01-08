angular.module('database')
    .directive('menuButton', ['$location', '$mdDialog',
        function($location, $mdDialog) {
        return {
            restrict: "E",
            templateUrl: "./angular/public/directive/menuButton.tmpl.html",
            controller: function($scope, $element) {
                console.log('menubuttoncontroller');
                $scope.isOpen = false;
                $scope.selectMode = "md-fling";
                $scope.exit = function() {
                    $location.url('/');
                }
                $scope.openInfo = function(ev) {
                    console.log('showInfo');
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .clickOutsideToClose(true)
                            .title('关于')
                            .textContent('医务管理系统 by wbg')
                            .ariaLabel('医务管理系统 by wbg')
                            .ok('关闭')
                            .targetEvent(ev)
                    );
                }
                $scope.openSetting = function() {

                }
            }
        }
    }]);