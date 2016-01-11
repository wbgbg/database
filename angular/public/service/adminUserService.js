angular.module('database')
    .factory('adminUserService',['$rootScope', '$timeout', function($rootScope, $timeout) {
        var that = this;
        var service = {
        	current: function() {
        		return that._current;
        	},
        	doctorList: function() {
        		return that._doctorList;
        	},
	      	login : function(user) {
	            ipcRenderer.send('adminLogin', user);
	        },
	        fetchDoctorList: function() {
	        	ipcRenderer.send('fetchDoctorList');
	        },
	        addDoctor: function(doctor) {
	        	ipcRenderer.send('addDoctor', doctor);
	        },
	        deleteDoctor: function(doctorId) {
	        	ipcRenderer.send('deleteDoctor', doctorId);
	        }
        };
        that._current = {};
        that._doctorList = [];
        ipcRenderer.on('adminLogin-reply', function(event, result) {
            console.log('login');
            if (result) {
                that._current = result;
                $timeout(function() {
                    $rootScope.$broadcast('adminLogin',true);
                },1);
            } else {
                $timeout(function() {
                    $rootScope.$broadcast('adminLogin',false);
                },1);
            }
        });
        ipcRenderer.on('fetchDoctorList-reply', function(event, result) {
            console.log('fetchDoctor');
            if (result) {
                that._doctorList = result;
                $timeout(function() {
                    $rootScope.$broadcast('fetchDoctorList',result);
                },1);
            } else {
                $timeout(function() {
                    $rootScope.$broadcast('fetchDoctorList',false);
                },1);
            }
        });
        ipcRenderer.on('addDoctor-reply', function(event, result) {
            console.log('addDoctor');
            if (result) {
                $timeout(function() {
                    $rootScope.$broadcast('addDoctor',true);
                },1);
            } else {
                $timeout(function() {
                    $rootScope.$broadcast('addDoctor',false);
                },1);
            }
        });
        ipcRenderer.on('deleteDoctor-reply', function(event, result) {
            console.log('deleteDoctor');
            if (result) {
                $timeout(function() {
                    $rootScope.$broadcast('deleteDoctor',true);
                },1);
            } else {
                $timeout(function() {
                    $rootScope.$broadcast('deleteDoctor',false);
                },1);
            }
        });
        return service;
    }]);