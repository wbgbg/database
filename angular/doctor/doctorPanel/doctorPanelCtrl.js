angular.module('database')
    .controller('DoctorPanelCtrl', ['$scope', '$routeParams', 'doctorUserService', 'bookService', 'toastService',
        function($scope, $routeParams, doctorUserService, bookService, toastService) {
            this.name = "doctorPanelCtrl";
            this.params = $routeParams;
            console.log('doctorPanelCtrl');
            //$scope.patientList = [{patientName:'常神',clock:'13:15'},{patientName:'常神2',clock:'13:45'}];
            $scope.patientList = [];
            $scope.currentPatient = {};
            $scope.imagePath = "./static/image/head.png";
            $scope.currentPatient = {patientName: '未选择', date: 'N/A'};
            doctorUserService.getPatientList(doctorUserService.current().doctorId);
            $scope.choosePatient = function(patient) {
            	$scope.currentPatient = patient;
            	$scope.currentPatient.drugs = [];
            	console.log($scope.currentPatient);
            }
            $scope.removeDrug = function(drug) {
            	console.log($scope.currentPatient.drugs);
            	_.remove($scope.currentPatient.drugs, drug);
            	console.log($scope.currentPatient.drugs);
            }
            drugs=['泰诺','康泰克','阿司匹林','头孢克诺','头孢克肟'];
            $scope.queryDrugs = function(drug) {
            	return _.filter(drugs,function(n) {
            		return !!~n.indexOf(drug);
            	});
            }
            $scope.addDrug = function(drug) {
            	console.log(drug);
            	$scope.currentPatient.drugs.push({name:drug.selectedItem,quantity:drug.quantity});
            }
            $scope.submitTreatment = function() {
                bookService.addTreatment({
                    patientId:$scope.currentPatient.patientId,
                    doctorId:$scope.currentPatient.doctorId,
                    bookId:$scope.currentPatient.bookId,
                    description:$scope.currentPatient.treatment,
                    drugs:$scope.currentPatient.drugs
                });
            }
            $scope.$on('getPatientList', function(event) {
                console.log('getPatientList');
                console.log(doctorUserService.patientList());
                $scope.patientList = doctorUserService.patientList();
            })
            $scope.$on('addTreatment', function(event, flag) {
                console.log('addTreatment:', flag);
                if (flag) {
                    toastService.show('提交成功');
                    $scope.currentPatient = {};
                    $scope.drug = {};
                    doctorUserService.getPatientList(doctorUserService.current().doctorId);
                } else {
                    toastService.show('提交失败');
                }
            })
        }    
    ]);;