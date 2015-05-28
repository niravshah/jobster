/**
 * Spec Controller
 */
angular.module('specky-invite').controller('InviteCtrl', ['$scope', '$http', '$stateParams', '$log', '$window', InviteCtrl]);
angular.module('specky-invite').controller('SideBarCtrl', ['$scope', '$http', '$stateParams', '$window', '$document', '$log', SideBarCtrl]);
angular.module('specky-invite').controller('ModalCtrl', ['$scope', '$http', '$stateParams', '$log', '$modal', ModalCtrl]);
angular.module('specky-invite').controller('ModalInstanceCtrl', ['$scope', '$http', '$stateParams', '$log', '$modalInstance', ModalInstanceCtrl]);
angular.module('specky-invite').controller('ResumeUploadCtrl', ['$scope', '$http', '$stateParams', '$log', '$window', 'Upload', ResumeUploadCtrl]);
angular.module('specky-invite').controller('MeetingCtrl', ['$scope', '$http', '$stateParams', '$log', '$window', MeetingCtrl]);

function InviteCtrl($scope, $http, $stateParams, $log, $window) {
    $scope.initInviteCtrl = function() {
        $scope.data = {};
        $scope.getInvite();
        TimeMe.setIdleDurationInSeconds(30);
        TimeMe.setCurrentPageName($scope.code);
        TimeMe.initialize();
        angular.element($window).on('beforeunload', function() {
            xmlhttp = new XMLHttpRequest();
            var url = '/api/invite/' + $scope.code + '/destroy';
            xmlhttp.open("POST", url, false);
            xmlhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
            var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            var body = document.body,
                html = document.documentElement;
            var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            windowBottom = windowHeight + window.pageYOffset;
            xmlhttp.send(JSON.stringify({
                time: timeSpentOnPage,
                percentScrolled: windowBottom * 100 / docHeight
            }));
        });
    }
    $scope.getInvite = function() {
        $http.get('/api/invite/' + $scope.code).success(function(data, status, headers, config) {
            $log.debug(data.spec)
            $scope.data = data;
        }).
        error(function(data, status, headers, config) {
            console.log('Error', data);
        });
    }
}

function ModalCtrl($scope, $http, $stateParams, $log, $modal) {
    $scope.initModal = function() {
        var _ouibounce = ouibounce(document.getElementById('specky-modal'), {
            aggressive: true,
            callback: $scope.openModal
        });
    }
    $scope.openModal = function() {
        console.log(TimeMe.getTimeOnCurrentPageInSeconds());
        $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../../invite-templates/exit-modal.html',
            controller: 'ModalInstanceCtrl'
        })
    }
}

function ModalInstanceCtrl($scope, $http, $stateParams, $log, $modalInstance) {
    $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}

function SideBarCtrl($scope, $http, $stateParams, $window, $document, $log) {
    $scope.checked = false;
    $scope.toggle = function() {
        $scope.checked = false;
    }
    angular.element($window).bind("scroll", function() {
        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body,
            html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        windowBottom = windowHeight + window.pageYOffset;
        if(windowBottom >= docHeight - 1000) {
            $log.debug('bottom reached');
            $scope.checked = true;
            $scope.$apply();
        }
    });
}

function ResumeUploadCtrl($scope, $http, $stateParams, $log, $window, Upload) {
    
	$scope.showpass=true;
	
	$scope.alerts = [];
	$scope.progress=0;
	
	$scope.showPassword = function(){
		$scope.showpass = !$scope.showpass;
	}
	
    $scope.$watch('files', function() {
        $scope.upload($scope.files);
    });
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.upload = function(files) {
        if(files && files.length) {
            for(var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/invite/' + $scope.code + '/resume',
                    fields: {
                        'username': $scope.username
                    },
                    file: file
                }).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
					$scope.progress = progressPercentage;
                }).success(function(data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    $scope.alerts.push({
                        type: 'success',
                        msg: 'File Uploaded!'
                    });
                });
            }
        }
    };
}

function MeetingCtrl($scope, $http, $stateParams, $log, $window) {
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.hstep = 1;
    $scope.mstep = 15;
	$scope.ismeridian = true;
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
}