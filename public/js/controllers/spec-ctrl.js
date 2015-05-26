/**
 * Spec Controller
 */
angular.module('RDash').controller('SpecCtrl', ['$scope', '$http', '$stateParams', SpecCtrl]);
angular.module('RDash').controller('SpecSendCtrl', ['$scope', '$http', '$stateParams','$state', SpecSendCtrl]);

function SpecCtrl($scope, $http, $stateParams) {
    $scope.data = {};
    $scope.initSpec = function() {
        $scope.editLadda = Ladda.create(document.querySelector('button[id=spec-edit]'));
        $scope.sendLadda = Ladda.create(document.querySelector('button[id=spec-send]'));
        $scope.saveLadda = Ladda.create(document.querySelector('button[id=spec-save]'));
        Ladda.stopAll();
        $http.get('/spec/' + $scope.specid).success(function(data, status, headers, config) {
            console.log('Success', data.spec);
            $scope.data = data;
        }).
        error(function(data, status, headers, config) {
            console.log('Error', data);
        });
    }
    $scope.specEdit = function() {
        $scope.editLadda.toggle();
        $scope.quill = new Quill('#spec', {
            theme: 'snow'
        });
    }
    $scope.specSend = function() {
        $scope.sendLadda.toggle();
    }
   
    $scope.specSave = function() {
        $scope.editLadda.toggle();
        $scope.saveLadda.toggle();
    }
}

function SpecSendCtrl($scope,$http, $stateParams, $state) {
    $scope.initSpecSend = function() {
        $scope.sendLadda.toggle()
    }
	 $scope.sendSpecEmail = function() {
        var url = '/spec/' + $scope.specid + '/send';
        $http.post(url, {
            'details': $scope.sendSpec
        }).success(function(data, status, headers, config) {
            console.log('Success', data);
			$scope.sendLadda.toggle();
			$state.go('spec');
        }).error(function(data, status, headers, config) {
            console.log('Error', data);
        });
    }
}