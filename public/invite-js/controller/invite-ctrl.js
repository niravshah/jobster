angular.module('Invite').controller('InviteCtrl', ['$scope', '$http', '$stateParams', '$log', '$window', InviteCtrl]);

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
                data: {
                    time: timeSpentOnPage,
                    percentScrolled: windowBottom * 100 / docHeight
                }
            }));
        });
    }
    $scope.getInvite = function() {
        $http.get('/api/invite/' + $scope.code).success(function(data, status, headers, config) {
            $log.debug(data.spec)
            console.log(data);
            $scope.mainSpec = data;
        }).
        error(function(data, status, headers, config) {
            console.log('Error', data);
        });
    }
}