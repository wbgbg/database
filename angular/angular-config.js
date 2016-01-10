const ipcRenderer = require('electron').ipcRenderer;

angular.module('database', ['ngRoute', 'ngAnimate', 'ngMaterial', 'ngMessages'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                	templateUrl: 'angular/welcomePage.html',
                	controller: 'WelcomeCtrl',
                	controllerAs: 'welcome'
                })
                .when('/patient/login', {
                    templateUrl: 'angular/patient/patientLogin/patientLogin.html',
                    controller: 'PatientLoginCtrl',
                    controllerAs: 'patient'
                })
                .when('/patient/panel', {
                    templateUrl: 'angular/patient/patientPanel/patientPanel.html',
                    controller: 'PatientPanelCtrl',
                    controllerAs: 'patient'
                })
                .when('/patient/register', {
                    templateUrl: 'angular/patient/patientRegister/PatientRegister.html',
                    controller: 'PatientRegisterCtrl',
                    controllerAs: 'patient'
                })
                .when('/doctor/login', {
                    templateUrl: 'angular/doctor/doctorLogin/doctorLogin.html',
                    controller: 'DoctorLoginCtrl',
                    controllerAs: 'doctor'
                })
                .when('/doctor/panel', {
                    templateUrl: 'angular/doctor/doctorPanel/doctorPanel.html',
                    controller: 'DoctorPanelCtrl',
                    controllerAs: 'doctor'
                })
                .when('/admin/login', {
                    templateUrl: 'angular/admin/adminLogin/adminLogin.html',
                    controller: 'AdminLoginCtrl',
                    controllerAs: 'admin'
                });

        }
    ]);