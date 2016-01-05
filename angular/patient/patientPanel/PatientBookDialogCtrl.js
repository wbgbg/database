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
            $scope.optionalMinute = ['00','10','20','30','40','50'];
            $scope.optionalDepartment = '心血管内科 血液科 妇产科 耳鼻咽喉科 普外科 神经外科 消化内科 小儿内科 呼吸科 内分泌科 泌尿内科 心外科 胸外科 小儿外科 泌尿外科 骨外科 骨创科 烧伤整形科 神经内科 脑血管科 眼科 干部保健科 康复科 针灸科 口腔科 中医科 皮肤病科 放疗科 化疗科 风湿科 肝病科 麻醉科 镇痛科 放射科 药剂科 检验科 超声科 ICU 核医学科 高压氧科 急诊科 感染病科 心理科 病理科 输血科 预防保健科 中西医结合科'.split(' ');
            $scope.optionalDoctor = [];
            $scope.$watch('booking.department',function(newValue) {
                $scope.optionalDoctor = [newValue];
            });
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