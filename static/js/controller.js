const ipcRenderer = require('electron').ipcRenderer;

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
        console.log('patientLogin');
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
    .controller('PatientPanelCtrl', ['$scope', '$routeParams', '$location', '$mdDialog', function($scope, $routeParams, $location, $mdDialog) {
        this.name = "PatientPanelCtrl";
        this.params = $routeParams;
        console.log('PatientPanelCtrl');
        ipcRenderer.on('addBook-reply', function(event, result) {
            console.log('added');
            ipcRenderer.send('fetchBook');
        });
        ipcRenderer.on('fetchBook-reply', function(event, booked) {
            console.log('fetched');
            $scope.bookData = booked;
            $scope.$apply();
        })
        $scope.quit = function() {
            console.log('enterWelcomePage')
            $location.url('/');
        }
        $scope.book = function(ev) {
            console.log('trigger book event');
            $mdDialog.show({
              controller: 'PatientBookDialogCtrl',
              templateUrl: 'static/view/patientBookDialog.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true
            })
            .then(function(booking) {
                booking.statue = 4;
                booking.place = '000';
                console.log('send');
                ipcRenderer.send('addBook', booking)

            }, function() {
              console.log('cancel');
            });
        }
        $scope.bookData = [];
        ipcRenderer.send('fetchBook');
        /* mock data
        $scope.bookData = [{
            department:'内科',
            doctorName:'常医生',
            date:'2016.1.13',
            clock:'14:20',
            place:'210',
            statue:'1'
        },{
            department:'五官科',
            doctorName:'赵医生',
            date:'2016.1.14',
            clock:'14:20',
            place:'311',
            statue:'2'
        },{
            department:'外科',
            doctorName:'于医生',
            date:'2016.1.16',
            clock:'10:30',
            place:'110',
            statue:'2'
        },{
            department:'外科',
            doctorName:'王医生',
            date:'2016.1.21',
            clock:'13:30',
            place:'110',
            statue:'3'
        },{
            department:'影像科',
            doctorName:'于医生',
            date:'2016.2.11',
            clock:'15:30',
            place:'310',
            statue:'4'
        }
        ];
        */
    }])
    .controller('PatientBookDialogCtrl', ['$scope', '$routeParams', '$mdDialog', function($scope, $routeParams, $mdDialog) {
        console.log('PatientBookDialogCtrl');
        this.name = "PatientBookDialogCtrl";
        this.params = $routeParams;
        $scope.booking = {
            department: '',
            doctorName: '',
            date: '',
            clock: ''
        }
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide($scope.booking);
        };
    }])
    .controller('DoctorLoginCtrl', ['$routeParams', function($routeParams) {
        console.log('DoctorLoginCtrl');
        this.name = "DoctorLoginCtrl";
        this.params = $routeParams;
    }]);

    