angular.module('Speck').controller('SpecsCtrl', ['$scope', '$rootScope', '$http', '$stateParams', '$q', '$mdDialog', '$state', SpecsCtrl]);
angular.module('Speck').controller('SendSpecCtrl', ['$scope', '$mdDialog', SendSpecCtrl]);

function SpecsCtrl($scope, $rootScope, $http, $stateParams, $q, $mdDialog, $state) {
    $scope.specs = [];
    $scope.analytics=[]
    $scope.currDraft = 0;
    $scope.currDraftDelta = 0;
    $scope.currLive = 0;
    $scope.currLiveDelta = 0;
    $scope.initSpecs = function() {
        var promise = $scope.getUserSpecs();
        promise.then(function(size) {
            $scope.currDraftDelta = 0;
            $scope.currLiveDelta = 0;
            $scope.currDraft = size;
            $scope.currLive = size;
        }, function() {});
        
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
            $scope.updateUserSpecs();
        });
    }
   
    $scope.updateUserSpecs = function() {
        var promise = $scope.getUserSpecs();
        promise.then(function(size) {
            if($scope.currDraft != size) {
                $scope.currDraftDelta = size - $scope.currDraft;
                $scope.currDraft = size;
            }
        }, function() {
            $scope.currDraftDelta = 0;
            $scope.currLiveDelta = 0;
        });
    }
    $scope.getUserSpecs = function() {
        return $q(function(resolve, reject) {
            var user = $scope.currentUser != null ? $scope.currentUser : $scope.guest;
            console.log(user);
            $http({
                url: '/api/user-specs',
                method: 'GET',
                params: {
                    'email': user
                }
            }).success(function(data, status, headers, config) {
                console.log('Success - getUserSpecs - ', data);
                $scope.specs = data;
                resolve(data.length);
            }).error(function(data, status, headers, config) {
                console.log('Error - getUserSpecs - ', data);
                reject();
            });
        });
    }
  
    $scope.deleteSpec = function(sid) {
        var urlz = '/api/specs/' + sid + '/delete'
        $http({
            url: urlz,
            method: 'POST'
        }).success(function(data, status, headers, config) {
            $scope.updateUserSpecs();
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
    $scope.tabSelected = function(idx) {
        if(idx == 'live') {
            $scope.currLiveDelta = 0;
            $state.go('v2.live');
        } else if(idx == 'dashboard') {
            $state.go('v2.dashboard');
        } 
    }
    $scope.showDocxHelp = function(ev) {
        $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).title('How to convert .doc files to .docx format?').content('Older versions of Microsoft Word used the .doc format. From Microsoft 2007 onwards, the .docx version was introduced. Microsoft 2007 and above can read/write .doc and also .docx formats. The easiest way to convert to .docx format is to Open the file Word and Save As .docx').ariaLabel('How to convert .doc files to .docx format?').ok('Got it!').targetEvent(ev));
    };
    $scope.sendSpec = function(ev, sid) {
        $mdDialog.show({
            controller: SendSpecCtrl,
            templateUrl: '/speck-templates/v2-dash-live-send.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope
        }).then(function(answer) {
            if(answer == 'send') {
                $scope.ddata['uid'] = $rootScope.currentUserUid;
                var urlz = '/api/specs/' + sid + '/send'
                $http({
                    url: urlz,
                    method: 'POST',
                    data: {
                        'details': $scope.ddata
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
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}