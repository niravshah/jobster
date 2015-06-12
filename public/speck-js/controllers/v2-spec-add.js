angular.module('Speck').controller('AddSpec', ['$scope', '$http', '$location', AddSpec]);

function AddSpec($scope, $http, $location) {
	
	$scope.lineClass='one';
	
    $scope.companyNameChange = function() {
        var cname = this.companyName;
		$http.get('/api/v2/companydetails?q='+cname);	
    }
	
	$scope.twoClicked = function(){
		$scope.lineClass='two';
	}
	
	$scope.oneClicked = function(){
		$scope.lineClass='one';
	}
	
	$scope.threeClicked = function(){
		$scope.lineClass='three';
	}
	
	$scope.fourClicked = function(){
		$scope.lineClass='four';
	}
}