angular.module('database')
    .controller('PatientPanelCtrl', ['$scope', '$routeParams', '$location', '$mdDialog', 'bookService', 'patientUserService', 'toastService',
        function($scope, $routeParams, $location, $mdDialog, bookService, patientUserService, toastService) {
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
                        console.log(booking);
                        booking.statue = 4;
                        booking.patientId = patientUserService.current().patientId;
                        booking.doctor = JSON.parse(booking.doctor);
                        booking.doctorId = booking.doctor.doctorId;
                        booking.date = booking.date.replace(/\//g,'-') + ' ' + booking.clock +':00';
                        console.log(booking);
                        console.log('send');
                        //ipcRenderer.send('addBook', booking)
                        bookService.addBook(booking);

                    }, function() {
                        console.log('cancel');
                    });
            }
            $scope.guahao = function(item) {
                bookService.updateBook({key:'statue',value:'2',bookId:item.bookId});
            }
            $scope.bookData = [];
            $scope.$on('bookService.fetch', function(event) {
                $scope.bookData = bookService.book;
                $scope.$apply();
            })
            $scope.$on('bookService.update', function(event, flag) {
                if (flag) {
                    toastService.show('申请挂号成功');
                } else {
                    toastService.show('申请挂号失败');
                }
                bookService.fetchBook();
            })
            bookService.fetchBook();
        }
    ]);