angular.module('Speck').controller('SpecsCtrl', ['$scope', '$rootScope', '$http', '$stateParams', SpecsCtrl]);

function SpecsCtrl($scope, $rootScope, $http, $stateParams) {
    $scope.specs = [];
    $scope.currDraft = 0;
    $scope.currDraftDelta = 0;
    $scope.currLive = 0;
    $scope.currLiveDelta = 0;
    
    $scope.initSpecs = function() {
        $scope.updateUserSpecs();
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
            acceptedFiles: ".docx"
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
        $scope.multidropzone.on("success", function(xhr, resp) {
            $scope.updateUserSpecs();
        });
    }
    $scope.updateUserSpecs = function() {
        $http({
            url: '/api/user-specs',
            method: 'GET',
            params: {
                'email': 'nirav.shah83@gmail.com'
            }
        }).success(function(data, status, headers, config) {
            console.log('Success', data);
            $scope.specs = data;
            if($scope.currDraft != data.length) {
                $scope.currDraftDelta = data.length - $scope.currDraft;
                $scope.currDraft = data.length;
            }
        }).error(function(data, status, headers, config) {
            console.log('Error', data);
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
    
    $scope.tabSelected = function(idx){
        if(idx == 'live'){
            $scope.currLiveDelta = 0;
        }else if(idx == 'draft'){
            $scope.currDraftDelta = 0;
        }
    }
}