angular.module('Speck').controller('AddSpecLoc', ['$scope', '$http', '$location', '$state', AddSpecLoc]);

function AddSpecLoc($scope, $http, $location, $state) {
    $scope.initAddSpecLoc = function() {
        $(document).ready(function() {
            $scope.map = new GMaps({
                el: '#map',
                lat: -12.043333,
                lng: -77.028333
            });
        });
    }
    $scope.locationChange = function() {
        GMaps.geocode({
            address: $scope.location,
            callback: function(results, status) {
                if(status == 'OK') {
                    var latlng = results[0].geometry.location;
                    $scope.map.setCenter(latlng.lat(), latlng.lng());
                    $scope.map.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    });
                }
            }
        });
    }
}