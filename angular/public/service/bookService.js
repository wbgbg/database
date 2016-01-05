angular.module('database')
    .factory('bookService',['$rootScope', 'patientUserService', function($rootScope, patientUserService) {
        var service = {
            book: [],
            addBook : function(booking) {
                console.log(booking);
                ipcRenderer.send('addBook', booking);
            },
            fetchBook : function() {
                ipcRenderer.send('fetchBook', patientUserService.current().patientId);
            }
        };
        ipcRenderer.on('addBook-reply', function(event, result) {
            console.log('added');
            ipcRenderer.send('fetchBook', patientUserService.current().patientId);
        });
        ipcRenderer.on('fetchBook-reply', function(event, booked) {        
            console.log('fetched');
            service.book = booked;
            $rootScope.$broadcast('bookService.fetch');
            //$scope.bookData = booked;
            //$scope.$apply();
        });
        return service;
    }]);