angular.module('database')
    .controller('addDoctorDialogCtrl', ['$scope', '$routeParams', '$mdDialog', '$mdDateLocale', 'adminUserService',
        function($scope, $routeParams, $mdDialog, $mdDateLocale, adminUserService) {
            console.log('addDoctorDialogCtrl');
            this.name = "addDoctorDialogCtrl";
            this.params = $routeParams;
            $scope.doctor = {
                username: '',
                password: '',
                doctorName: '',
                department: '',
            };
            $scope.optionalDepartment = '心血管内科 血液科 妇产科 耳鼻咽喉科 普外科 神经外科 消化内科 小儿内科 呼吸科 内分泌科 泌尿内科 心外科 胸外科 小儿外科 泌尿外科 骨外科 骨创科 烧伤整形科 神经内科 脑血管科 眼科 干部保健科 康复科 针灸科 口腔科 中医科 皮肤病科 放疗科 化疗科 风湿科 肝病科 麻醉科 镇痛科 放射科 药剂科 检验科 超声科 ICU 核医学科 高压氧科 急诊科 感染病科 心理科 病理科 输血科 预防保健科 中西医结合科'.split(' ');
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide($scope.doctor);
            };
        }
    ]);