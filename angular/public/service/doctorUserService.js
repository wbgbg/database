angular.module('database')
    .factory('doctorUserService',['$rootScope', '$timeout', function($rootScope, $timeout) {
        var that = this;
        var service = {
            current: function() {
                return that._current;
            },
            login : function(user) {
                ipcRenderer.send('doctorLogin', user);
            },
            logout : function() {
                that._current = {};
            }
        };
        that._current = {};
        ipcRenderer.on('doctorLogin-reply', function(event, result) {
            console.log('login');
            if (result) {
                that._current = result;
                $timeout(function() {
                    $rootScope.$broadcast('doctorLogin',true);
                },1);
            } else {
                $timeout(function() {
                    $rootScope.$broadcast('doctorLogin',false);
                },1);
            }
        });
        return service;
    }]);