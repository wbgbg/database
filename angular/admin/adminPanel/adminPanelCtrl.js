angular.module('database')
    .controller('AdminPanelCtrl', ['$scope', '$routeParams', '$mdDialog', 'adminUserService', 'bookService', 'drugService', 'toastService',
        function($scope, $routeParams, $mdDialog, adminUserService, bookService, drugService, toastService) {
            this.name = "AdminPanelCtrl";
            this.params = $routeParams;
            console.log('adminPanelCtrl');
            //$scope.doctorList = [{doctorName:"常医生",department:"妇产科"},{doctorName:"王医生",department:"普外科"}];
            $scope.doctorList = [];
            $scope.bookList = [];
            $scope.medicineData = [];
            adminUserService.fetchDoctorList();
            bookService.fetchBook();
            drugService.fetchDrug();
            //$scope.bookData = [{department:"普外科",doctorName:"王医生",date:"2016-1-10 13:15:00",statue:"预约中",patientName:"王博格"}];
            //$scope.medicineData = [{drugName:"金疮药",drugQuantity:15}];
            $scope.addDoctor = function(ev) {
                console.log('add book panel');
                $mdDialog.show({
                        controller: 'addDoctorDialogCtrl',
                        templateUrl: 'angular/admin/adminPanel/addDoctorDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    })
                    .then(function(doctor) {
                        console.log(doctor);
                        console.log('send');
                        adminUserService.addDoctor(doctor);
                    }, function() {
                        console.log('cancel');
                    });
            }
            $scope.deleteDoctor = function(item) {
                adminUserService.deleteDoctor(item.doctorId);
            }
            $scope.checkBook = function(item,value) {
                console.log(item);
                bookService.updateBook({bookId:item.bookId, key:"statue", value:value});
            }
            $scope.addDrug = function(drug) {
                drugService.addDrug(drug);
            }
            $scope.deleteDrug = function(drug) {
                console.log(drug);
                drugService.deleteDrug(drug.drugId);
            }
            $scope.$on("fetchDoctorList",function(event, result) {
                if (result) {
                    $scope.doctorList = adminUserService.doctorList();
                } else {
                    toastService.show('获取医生列表失败');
                }
            });
            $scope.$on("addDoctor",function(event, flag) {
                if (flag) {
                    adminUserService.fetchDoctorList();
                } else {
                    toastService.show('新增医生失败');
                }
            });
            $scope.$on("deleteDoctor",function(event, flag) {
                if (flag) {
                    adminUserService.fetchDoctorList();
                } else {
                    toastService.show('删除医生失败');
                }
            });
            $scope.$on('bookService.fetch', function(event) {
                $scope.bookList = bookService.book;
            })
            $scope.$on("bookService.update", function(event,flag) {
                if (flag) {
                    bookService.fetchBook();
                } else {
                    toastService.show('更新预约失败');
                }
            })
            $scope.$on('addDrug', function(event, flag) {
                if (flag) {
                    drugService.fetchDrug();
                } else {
                    toastService.show('增加药品失败');
                }
            });
            $scope.$on('deleteDrug', function(event, flag) {
                if (flag) {
                    drugService.fetchDrug();
                } else {
                    toastService.show('删除药品失败')
                }
            });
            $scope.$on('fetchDrug', function(event,flag) {
                if (flag) {
                    $scope.medicineData = drugService.drugList();
                } else {
                    toastService.show('获取药品失败');
                }
            });

        }    
    ]);;