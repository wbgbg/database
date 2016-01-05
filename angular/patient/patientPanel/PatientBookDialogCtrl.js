angular.module('database')
    .controller('PatientBookDialogCtrl', ['$scope', '$routeParams', '$mdDialog', '$mdDateLocale',
        function($scope, $routeParams, $mdDialog, $mdDateLocale) {
            console.log('PatientBookDialogCtrl');
            this.name = "PatientBookDialogCtrl";
            this.params = $routeParams;
            $scope.booking = {
                department: '',
                doctorName: '',
                date: '',
                clock: '',
            };
            $scope.date = new Date();
            $scope.minDate = new Date(
                $scope.date.getFullYear(),
                $scope.date.getMonth(),
                $scope.date.getDate());
            $scope.maxDate = new Date(
                $scope.date.getFullYear(),
                $scope.date.getMonth() + 2,
                $scope.date.getDate());
            $scope.onlyWeekdaysPredicate = function(date) {
                var day = date.getDay();
                return day >=1 && day <=5;
            };
            $scope.optionalClock = ['8','9','10','11','13','14','15','16'];
            $scope.optionalMinute = ['00','10','20','30','40','50']
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $scope.booking.date = $mdDateLocale.formatDate($scope.date);
                $scope.booking.clock = $scope.booking.clock + ':' + $scope.booking.minute;
                $mdDialog.hide($scope.booking);
            };
        }
    ]);