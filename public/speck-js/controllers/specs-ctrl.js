angular.module('Speck').controller('SpecsCtrl', ['$scope', '$rootScope', '$http', '$stateParams', '$q', '$mdDialog', '$state', SpecsCtrl]);

function SpecsCtrl($scope, $rootScope, $http, $stateParams, $q, $mdDialog, $state) {
    $scope.specs = [];
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
        $http({
            url: '/api/onlineusers',
            method: 'GET',
            params: {
                'email': 'nirav.shah83@gmail.com'
            }
        }).success(function(data, status, headers, config) {
            $rootScope.onlineUsers = data;
            console.log('Online Users: ', data);
        }).error(function(data, status, headers, config) {
            console.log('Error: ', data);
        });
    }
    $scope.initMultiDropzone = function() {
        $scope.multidropzone = new Dropzone("div#multidropzone", {
            url: "/specs/post",
            acceptedFiles: ".docx",
            clickable: ".md-clicker"
        });
        $scope.multidropzone.on("sending", function(file, xhr, formdata) {
            formdata.append("email", "nirav.shah83@gmail.com")
        });
        $scope.multidropzone.on("success", function(xhr, resp) {
            $scope.updateUserSpecs();
        });
    }
    $scope.initMultiDropzone2 = function() {
        $scope.multidropzone = new Dropzone("div#multidropzone-2", {
            url: "/specs/post",
            acceptedFiles: ".docx"
        });
        $scope.multidropzone.on("sending", function(file, xhr, formdata) {
            formdata.append("email", "nirav.shah83@gmail.com")
        });
        $scope.multidropzone.on("success", function(xhr, res) {
            console.log(xhr, res);
            $(xhr.previewElement).remove();
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
            $http({
                url: '/api/user-specs',
                method: 'GET',
                params: {
                    'email': 'nirav.shah83@gmail.com'
                }
            }).success(function(data, status, headers, config) {
                console.log('Success', data);
                $scope.specs = data;
                resolve(data.length);
            }).error(function(data, status, headers, config) {
                console.log('Error', data);
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
            $state.go('v2add',{specId:sid});
        }).error(function(data, status, headers, config) {
            console.log('makedraft Error', sid, data);
        });
    }
    $scope.tabSelected = function(idx) {
        if(idx == 'live') {
            $scope.currLiveDelta = 0;
        } else if(idx == 'draft') {
            $scope.currDraftDelta = 0;
        }
    }
    $scope.showDocxHelp = function(ev) {
        $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).title('How to convert .doc files to .docx format?').content('Older versions of Microsoft Word used the .doc format. From Microsoft 2007 onwards, the .docx version was introduced. Microsoft 2007 and above can read/write .doc and also .docx formats. The easiest way to convert to .docx format is to Open the file Word and Save As .docx').ariaLabel('How to convert .doc files to .docx format?').ok('Got it!').targetEvent(ev));
    };
}