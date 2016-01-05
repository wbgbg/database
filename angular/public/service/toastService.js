angular.module('database')
    .factory('toastService',['$mdToast', function($mdToast) {
        return {
            show : function(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .position("top right")
                        .capsule(true)
                        .hideDelay(3000)
                );
            }
        }   
    }]);