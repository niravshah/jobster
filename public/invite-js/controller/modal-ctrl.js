angular.module('specky-invite').controller('ModalCtrl', ['$scope', '$http', '$stateParams', '$log', '$modal', ModalCtrl]);
angular.module('specky-invite').controller('ModalInstanceCtrl', ['$scope', '$http', '$stateParams', '$log', '$modalInstance', ModalInstanceCtrl]);


function ModalCtrl($scope, $http, $stateParams, $log, $modal) {
    $scope.initModal = function() {
        var _ouibounce = ouibounce(document.getElementById('specky-modal'), {
           // aggressive: true,
            callback: $scope.openModal
        });
    }
    $scope.openModal = function() {
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
