angular.module('Speck').controller('AddSpec', ['$scope', '$http', '$location', '$state', AddSpec]);

function AddSpec($scope, $http, $location, $state) {
    $scope.lineClass = 'one';
    $scope.initAddSpec = function() {
        $state.go('v2add.desg');
    }
    $scope.companyNameChange = function() {
        var cname = this.companyName;
        $http.get('/api/v2/companydetails?q=' + cname);
    }
    $scope.twoClicked = function() {
        $scope.lineClass = 'two';
    }
    $scope.oneClicked = function() {
        $scope.lineClass = 'one';
    }
    $scope.threeClicked = function() {
        $scope.lineClass = 'three';
    }
    $scope.fourClicked = function() {
        $scope.lineClass = 'four';
    }
    $scope.initAddSpecDropzone = function() {
        $scope.myDropzone = new Dropzone("div#dropzone", {
            url: "/specs/post",
            acceptedFiles: ".docx",
            dictDefaultMessage: "Drop Specs here or click to Upload! Specky currently works only with Docx Files",
			maxFiles:1
        });				
    }
}