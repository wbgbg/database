angular.module('database')
    .controller('DoctorLoginCtrl', ['$routeParams',
        function($routeParams) {
            console.log('DoctorLoginCtrl');
            this.name = "DoctorLoginCtrl";
            this.params = $routeParams;
        }
    ]);