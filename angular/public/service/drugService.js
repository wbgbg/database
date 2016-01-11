angular.module('database')
    .factory('drugService',['$rootScope', function($rootScope) {
        var that = this;
        var service = {
            addDrug: function(drug) {
                console.log(drug);
                ipcRenderer.send('addDrug', drug);
            },
            deleteDrug: function(drugId) {
                ipcRenderer.send('deleteDrug', drugId);
            },
            fetchDrug: function() {
                ipcRenderer.send('fetchDrug')
            },
            drugList: function() {
                return that._drugList;
            }
        };
        that._drugList = [];
        ipcRenderer.on('addDrug-reply', function(event, flag) {
            if (flag) {
                    $rootScope.$broadcast('addDrug', true);
                } else {
                    $rootScope.$broadcast('addDrug', false);
                }  
        });
        ipcRenderer.on('deleteDrug-reply', function(event, flag) {
            if (flag) {
                    $rootScope.$broadcast('deleteDrug', true);
                } else {
                    $rootScope.$broadcast('deleteDrug', false);
                }  
        });
        ipcRenderer.on('fetchDrug-reply', function(event, result) {
            if (result) {
                    that._drugList = result;
                    $rootScope.$broadcast('fetchDrug', true);
                } else {
                    $rootScope.$broadcast('fetchDrug', false);
                }  
        });

        return service;
    }]);