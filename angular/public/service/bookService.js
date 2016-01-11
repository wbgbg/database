angular.module('database')
    .factory('bookService',['$rootScope', 'patientUserService', function($rootScope, patientUserService) {
        var service = {
            book: [],
            addBook: function(booking) {
                console.log(booking);
                ipcRenderer.send('addBook', booking);
            },
            fetchBook: function() {
                ipcRenderer.send('fetchBook', patientUserService.current().patientId);
            },
            addTreatment: function(treatment) {
                console.log('addTreatment');
                ipcRenderer.send('addTreatment', treatment);
            },
            updateBook: function(setting) {
                console.log('update:', setting);
                ipcRenderer.send('updateBook', setting);
            }
        };
        ipcRenderer.on('addBook-reply', function(event, result) {
            console.log('added');
            ipcRenderer.send('fetchBook', patientUserService.current().patientId);
        });
        ipcRenderer.on('fetchBook-reply', function(event, booked) {        
            console.log('fetched');
            service.book = booked;
            console.dir(booked, {depth:null});
            $rootScope.$broadcast('bookService.fetch');
            //$scope.bookData = booked;
            //$scope.$apply();
        });
        ipcRenderer.on('addTreatment-reply', function(event, flag) {
            if (flag) {
                $rootScope.$broadcast('addTreatment', true);
            } else {
                $rootScope.$broadcast('addTreatment', false);
            }
        })
        ipcRenderer.on('updateBook-reply', function(event, flag) {
            if (flag) {
                $rootScope.$broadcast('bookService.update', true);
            } else {
                $rootScope.$broadcast('bookService.update', false);
            }
        })

        return service;
    }]);