angular.module('database')
    .controller('PatientPanelCtrl', ['$scope', '$routeParams', '$location', '$mdDialog', 'bookService', 'patientUserService',
        function($scope, $routeParams, $location, $mdDialog, bookService, patientUserService) {
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
                        booking.patientId = patientUserService.current().patientId;
                        console.log(booking);
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