angular.module('Speck').factory('DataService', ['$http', '$rootScope', 'AuthService', DataService]);

function DataService($http, $rootScope, aS) {
    return {
        updateUserSpecInvites: function() {
            $http({
                url: '/api/user-invites',
                method: 'GET',
                params: {
                    'uid': aS.userUid()
                }
            }).success(function(data, status) {
                console.log('DataService - Success - updateUserSpecInvites - ', data);
                $rootScope.userSpecInvites = data;
            }).error(function(data, status) {
                console.log('DataService - Error - updateUserSpecInvites - ', data);
            });
        },
        updateUserSpecs : function(user) {
            $http({
                url: '/api/user-specs?ts=' + new Date().getTime(),
                method: 'GET',
                params: {
                    'email': aS.userEmail()
                },
            }).success(function(data, status, headers, config) {
                console.log('DataService - Success - updateUserSpecs - ', data);
                $rootScope.specs = data;
                $rootScope.currDraftDelta = 0;
                $rootScope.currLiveDelta = 0;
                $rootScope.currDraft = data.length;
                $rootScope.currLive = data.length;
            }).error(function(data, status, headers, config) {
                console.log('Error - getUserSpecs - ', data);                
            });
        }
    }
}