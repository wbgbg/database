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
            },
            getDoctorbyDepartment : function(department) {
                ipcRenderer.send('getDoctorbyDepartment', department);
            },
            availableDoctor: function() {
                return that._availableDoctor;
            },
            getPatientList: function(doctorId) {
                ipcRenderer.send('getPatientList', doctorId);
            },
            patientList: function() {
                return that._patientList;
            }
        };
        that._current = {};
        that._availableDoctor = [];
        that._patientList = [];
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
        ipcRenderer.on('getDoctorbyDepartment-reply', function(event, result) {
            console.log('getDoctorbyDepartment-reply');
            if (result) {
                that._availableDoctor = result;
                $timeout(function() {
                    $rootScope.$broadcast('getDoctorbyDepartment',true);
                },1);
            } else {
                $timeout(function() {
                    $rootScope.$broadcast('getDoctorbyDepartment',false);
                },1);
            }
        });
        ipcRenderer.on('getPatientList-reply', function(event, result) {
            console.log('getPatientList-reply');
            if (result) {
                that._patientList = result;
                $timeout(function() {
                    $rootScope.$broadcast('getPatientList',true);
                },1);
            } else {
                $timeout(function() {
                    $rootScope.$broadcast('getPatientList',false);
                },1);
            }
        });
        return service;
    }]);