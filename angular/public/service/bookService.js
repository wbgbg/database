const ipcRenderer = require('electron').ipcRenderer;
angular.module('database')
    .factory('bookService',['$rootScope', function($rootScope) {
        var service = {
            book: [],
            addBook : function(booking) {
                ipcRenderer.send('addBook', booking);
            },
            fetchBook : function() {
                ipcRenderer.send('fetchBook');
            }
        };
        ipcRenderer.on('addBook-reply', function(event, result) {
            console.log('added');
            ipcRenderer.send('fetchBook');
        });
        ipcRenderer.on('fetchBook-reply', function(event, booked) {
            console.log('fetched');
            service.book = booked;
            $rootScope.$broadcast('bookService.fetch')
            //$scope.bookData = booked;
            //$scope.$apply();
        });
        return service;
    }]);