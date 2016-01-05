angular.module('database')
    .controller('PatientPanelCtrl', ['$scope', '$routeParams', '$location', '$mdDialog', 'bookService',
        function($scope, $routeParams, $location, $mdDialog, bookService) {
            this.name = "PatientPanelCtrl";
            this.params = $routeParams;
            console.log('PatientPanelCtrl');
            $scope.book = function(ev) {
                console.log('trigger book event');
                $mdDialog.show({
                        controller: 'PatientBookDialogCtrl',
                        templateUrl: 'angular/patient/patientPanel/patientBookDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    })
                    .then(function(booking) {
                        booking.statue = 4;
                        booking.place = '000';
                        console.log('send');
                        //ipcRenderer.send('addBook', booking)
                        bookService.addBook(booking);

                    }, function() {
                        console.log('cancel');
                    });
            }
            $scope.bookData = [];
            $scope.$on('bookService.fetch', function(event) {
                $scope.bookData = bookService.book;
                $scope.$apply();
            })
            bookService.fetchBook();
        }
    ]);