angular.module('Speck').controller('AddSpec', ['$scope', '$http', '$location', '$state', 'AuthService', AddSpec]);

function AddSpec($scope, $http, $location, $state, aS) {
    $scope.data = {
        company: '',
        role: '',
        ct: '',
        comp: '',
        lat: '',
        lng: '',
        speck: {},
        sid: '',
        email: '',
        status: '',
        location: '',
        selectedChars: []
    };
    $scope.data.lat = 51.5073509;
    $scope.data.lng = -0.12775829999998223;
    $scope.lineClass = 'one';
    $scope.initAddSpec = function() {
        $scope.data.sid = $scope.specid;
        $scope.isLinkedInUser = aS.isLinkedInUser();
        var url = '/api/specs/' + $scope.specid;
        $http.get(url).success(function(data, status, headers, config) {
            console.log(data)
            $scope.data.speck = data.spec;
            $scope.data.email = data.email;
            $scope.data.status = data.status;
            if(typeof data.designation != 'undefined') {
                $scope.data.company = data.designation.companyName;
                $scope.data.role = data.designation.role;
                $scope.data.ct = data.designation.ct;
                $scope.data.comp = data.designation.comp;
            }
            if(typeof data.location != 'undefined') {
                $scope.data.lat = data.location.lat;
                $scope.data.lnd = data.location.lat;
                $scope.data.location = data.location.location;
            }
        }).error(function(err) {
            console.log(err)
        });
        if($state.is('v2add')) {
            $state.go('v2add.desg');
        }
    }
    $scope.companyNameChange = function() {
        var cname = this.companyName;
        $http.get('/api/v2/companydetails?q=' + cname);
    }
    $scope.initDesg = function() {
        $scope.lineClass = 'one';
    }
    $scope.initLoc = function() {
        $scope.lineClass = 'two';
        $scope.map = new GMaps({
            el: '#map',
            lat: $scope.data.lat,
            lng: $scope.data.lng
        });
        $scope.map.addMarker({
            lat: $scope.data.lat,
            lng: $scope.data.lng
        });
    }
    $scope.initSpec = function() {
        $scope.lineClass = 'three';
    }
    $scope.initComment = function() {
        $scope.lineClass = 'four';
    }
    $scope.saveSpec = function() {
        var url = '/api/specs/' + $scope.specid + '/save';
        $http.post(url, $scope.data).success(function(data, status, headers, config) {
            console.log('Success - saveSpec - ', data);
            $state.go('v2.specs');
        }).error(function(err) {
            console.log(err)
        });
    }
    $scope.specLive = function() {
        $scope.data.status = 'live';
        $scope.saveSpec();
    }
    $scope.locationChange = function() {
        GMaps.geocode({
            address: $scope.data.location,
            callback: function(results, status) {
                if(status == 'OK') {
                    var latlng = results[0].geometry.location;
                    $scope.map.setCenter(latlng.lat(), latlng.lng());
                    $scope.data.lat = latlng.lat();
                    $scope.data.lng = latlng.lng();
                    $scope.$apply();
                    $scope.map.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    });
                }
            }
        });
    }
    $scope.specChars = ['Compensation', 'Culture', 'Career', 'Training', 'Location', 'Stability'];
    $scope.toggleChars = function(item, list) {
        var idx = list.indexOf(item);
        if(idx > -1) list.splice(idx, 1);
        else if(!(list.length > 3)) {
                list.push(item);
            }
        };
        $scope.existsChars = function(item, list) {
            return list.indexOf(item) > -1;
        };
    }