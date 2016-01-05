angular.module('database')
    .factory('patientUserService',['$rootScope', '$timeout', function($rootScope, $timeout) {
        var that = this;
        var service = {
            current: function() {
                return that._current;
            },
            login : function(user) {
                ipcRenderer.send('patientLogin', user);
            },
            logout : function() {
                that._current = {};
            },
            register : function(user) {
                ipcRenderer.send('patientRegister', user);
            }
        };
        that._current = {};
        ipcRenderer.on('patientLogin-reply', function(event, result) {
            console.log('login');
            if (result) {
                that._current = result;
                $timeout(function() {
                    $rootScope.$broadcast('patientLogin',true);
                },1);
            } else {
                $timeout(function() {
                    $rootScope.$broadcast('patientLogin',false);
                },1);
            }
        });
        ipcRenderer.on('patientRegister-reply', function(event, result) {
            console.log('register');
            console.log(result);
            if (result) {
                $timeout(function() {
                    $rootScope.$broadcast('patientRegister',true);
                },1);
            } else {
                $timeout(function() {
                    $rootScope.$broadcast('patientRegister',false);
                },1);
            }
        });
        return service;
    }]);