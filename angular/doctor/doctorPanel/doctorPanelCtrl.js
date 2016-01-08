angular.module('database')
    .controller('DoctorPanelCtrl', ['$scope', '$routeParams',
        function($scope, $routeParams) {
            this.name = "doctorPanelCtrl";
            this.params = $routeParams;
            console.log('doctorPanelCtrl');
            $scope.patientList = [{patientName:'常神',clock:'13:15'},{patientName:'常神2',clock:'13:45'}];
            $scope.currentPatient = {};
            $scope.imagePath = "./static/image/head.png";
            $scope.currentPatient = {patientName: '未选择', clock: 'N/A'};
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
            	$scope.currentPatient.drugs.push({name:drug.selectedItem,quentity:drug.quantity});
            }
        }    
    ]);;