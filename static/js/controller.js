angular.module('database', ['ngRoute', 'ngAnimate', 'ngMaterial', 'ngMessages'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                	templateUrl: 'static/view/welcomePage.html',
                	controller: 'WelcomeCtrl',
                	controllerAs: 'welcome'
                })
                .when('/patient/login', {
                    templateUrl: 'static/view/patientLogin.html',
                    controller: 'PatientLoginCtrl',
                    controllerAs: 'patient'
                })
                .when('/patient/panel', {
                    templateUrl: 'static/view/patientPanel.html',
                    controller: 'PatientPanelCtrl',
                    controllerAs: 'patient'
                })
                .when('/doctor/login', {
                    templateUrl: 'static/view/doctorLogin.html',
                    controller: 'DoctorLoginCtrl',
                    controllerAs: 'doctor'
                })
                .when('/patient/register', {
                    templateUrl: 'static/view/patientRegister.html',
                    controller: 'PatientRegisterCtrl',
                    controllerAs: 'patient'
                });

        }
    ])
    .controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location',
        function($scope, $route, $routeParams, $location) {
        	console.log('main');
            this.$route = $route;
            this.$location = $location;
            this.$routeParams = $routeParams;
            $scope.enterDoctor = function() {
                console.log('enterDoctor');
                $location.url('/doctor/login');
            }
            $scope.enterPatient = function() {
                console.log('enterPatient');
                $location.url('/patient/login');
            }
        }
    ])
    .controller('WelcomeCtrl', ['$routeParams', function($routeParams) {
    	console.log('welcome');
        this.name = "WelcomeCtrl";
        this.params = $routeParams;
    }])
    .controller('PatientLoginCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
        console.log('welcome');
        this.name = "PatientLoginCtrl";
        this.params = $routeParams;
        $scope.patient = {
            username : '',
            password : ''
        };
        $scope.patientRegister = function() {
            console.log('enterPatientRegister');
            $location.url('/patient/register');
        }
        $scope.patientLogin = function() {
            $location.url('/patient/panel')
        }
    }])
    .controller('PatientRegisterCtrl',['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
        this.name = "PatientRegisterCtrl";
        this.params = $routeParams;
        $scope.patient = {

        };
        $scope.myDate = new Date();
        $scope.maxDate = new Date(
          $scope.myDate.getFullYear(),
          $scope.myDate.getMonth(),
          $scope.myDate.getDate()
        );
        $scope.register = function() {
            $location.url('/patient/panel')
        }
        $scope.quit = function() {
            console.log('enterPatientLogin');
            $location.url('/patient/login');  
        }
    }])
    .controller('PatientPanelCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
        this.name = "PatientPanelCtrl";
        this.params = $routeParams;
        $scope.book = [{
            who:'a',
            what:'b',
            notes:'c'
        },{
            who:'a1',
            what:'b1',
            notes:'c1'
        },{
            who:'a2',
            what:'b22',
            notes:'c2'
        }
        ];
    }])
    .controller('DoctorLoginCtrl', ['$routeParams', function($routeParams) {
        console.log('welcome');
        this.name = "DoctorLoginCtrl";
        this.params = $routeParams;
    }]);

    