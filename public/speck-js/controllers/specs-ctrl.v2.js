angular.module('Speck').controller('SpecsCtrl', ['$scope', '$rootScope', '$http', '$stateParams', '$q', '$mdDialog', '$state', 'DataService',SpecsCtrl]);
angular.module('Speck').controller('SendSpecCtrl', ['$scope', '$mdDialog', SendSpecCtrl]);

function SpecsCtrl($scope, $rootScope, $http, $stateParams, $q, $mdDialog, $state, dS) {
    $scope.initSpecs = function() {
        console.log('SpecsCtrl Ctrl', $scope.userSpecInvites);
    }
    $scope.initMultiDropzone = function() {
        $scope.multidropzone = new Dropzone("div#multidropzone", {
            url: "/specs/post",
            acceptedFiles: ".docx",
            clickable: ".md-clicker"
        });
        $scope.multidropzone.on("sending", function(file, xhr, formdata) {
            if($scope.currentUser) {
                formdata.append("email", $scope.currentUser)
            } else {
                formdata.append("email", $scope.guest)
            }
        });
        $scope.multidropzone.on("success", function(xhr, resp) {
            dS.updateUserSpecs();
        });
    }
    $scope.deleteSpec = function(sid) {
        var urlz = '/api/specs/' + sid + '/delete'
        $http({
            url: urlz,
            method: 'POST'
        }).success(function(data, status, headers, config) {
            dS.updateUserSpecs();
        }).error(function(data, status, headers, config) {
            console.log('deleteSpec Error', sid, data);
        });
    }
    $scope.makeDraft = function(sid) {
        var urlz = '/api/specs/' + sid + '/makedraft'
        $http({
            url: urlz,
            method: 'POST'
        }).success(function(data, status, headers, config) {
            $state.go('v2add', {
                specId: sid
            });
        }).error(function(data, status, headers, config) {
            console.log('makedraft Error', sid, data);
        });
    }
    $scope.showDocxHelp = function(ev) {
        $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).title('How to convert .doc files to .docx format?').content('Older versions of Microsoft Word used the .doc format. From Microsoft 2007 onwards, the .docx version was introduced. Microsoft 2007 and above can read/write .doc and also .docx formats. The easiest way to convert to .docx format is to Open the file Word and Save As .docx').ariaLabel('How to convert .doc files to .docx format?').ok('Got it!').targetEvent(ev));
    };
    $scope.sendSpec = function(ev, sid) {
        $mdDialog.show({
            controller: SendSpecCtrl,
            templateUrl: '/speck-templates/v2-dash-specs-send.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                ddata: []
            }
        }).then(function(ans) {
            if(ans.answer == 'send') {
                ans.ddata['uid'] = $rootScope.currentUserUid;
                var urlz = '/api/specs/' + sid + '/send'
                $http({
                    url: urlz,
                    method: 'POST',
                    data: {
                        'details': ans.ddata
                    }
                }).success(function(data, status, headers, config) {
                    console.log('Success', data);
                }).error(function(data, status, headers, config) {
                    console.log('Error', data);
                });
            }
        }, function() {
            console.log('You cancelled the dialog.');
        });
    }
}

function SendSpecCtrl($scope, $mdDialog) {
    $scope.answer = function(answer, ddata) {
        var ans = [];
        ans.answer = answer;
        ans.ddata = ddata;
        $mdDialog.hide(ans);
    };
    $scope.cancelDialog = function() {
        $mdDialog.cancel();
    }
}