angular.module('specky-invite').controller('SidebarCtrl', ['$scope', '$http', '$stateParams', '$log', '$window', SidebarCtrl]);
angular.module('specky-invite').controller('ResumeUploadCtrl', ['$scope', '$http', '$stateParams', '$log', '$window', 'Upload', ResumeUploadCtrl]);
angular.module('specky-invite').controller('MeetingCtrl', ['$scope', '$http', '$stateParams', '$log', '$window', MeetingCtrl]);

function SidebarCtrl($scope, $http, $stateParams, $log, $window) {
    var isClosed = true;
    angular.element($window).bind("scroll", function() {
        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body,
            html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        windowBottom = windowHeight + window.pageYOffset;
        if(windowBottom >= docHeight - 1000) {
            $log.debug('bottom reached');
            if(isClosed) {
                $('#wrapper').toggleClass('toggled');
                isClosed = false;
            }
        }
    });
    $scope.toggleSideBar = function() {
        $('#wrapper').toggleClass('toggled');
        isClosed = !isClosed;
    }
}


function ResumeUploadCtrl($scope, $http, $stateParams, $log, $window, Upload) {
    $scope.showpass = true;
    $scope.alerts = [];
    $scope.progress = 0;
    $scope.showPassword = function() {
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
    $scope.quickreg = function() {
        var url = '/api/invite/' + $scope.code + '/quickreg';
        var invites = $scope.mainSpec.invites;
        var email = '';
        for(var i in invites) {
            if(invites[i].code == $scope.code) {
                email = invites[i].email;
            }
        }
        var eventData = {
            password: $scope.password,
            email: email
        }
        $http.post(url, {
            data: eventData
        }).success(function(data, status, headers, config) {
            $scope.alerts.push({
                type: 'success',
                msg: 'Registration Successful!'
            });
        }).error(function(data, status, headers, config) {});
    }
}

function MeetingCtrl($scope, $http, $stateParams, $log, $window) {
    $scope.alerts = [];
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
    $scope.sendMeetingEvent = function() {
        var url = '/api/invite/' + $scope.code + '/meeting';
        var eventData = {
            meetingTime: $scope.data.dateDropDownInput.toJSON()
        }
        $http.post(url, {
            data: eventData
        }).success(function(data, status, headers, config) {
            $scope.alerts.push({
                type: 'success',
                msg: 'Meeting Requested!'
            });
        }).error(function(data, status, headers, config) {});
    }
}