angular.module('Speck').factory('DataService', ['$http', '$rootScope', DataService]);

function DataService($http, $rootScope) {
    return {
        updateUserSpecInvites: function(uid) {
            console.log('Params - getUserSpecInvites - uid ', uid);
            $http({
                url: '/api/user-invites',
                method: 'GET',
                params: {
                    'uid': uid
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
                url: '/api/user-specs',
                method: 'GET',
                params: {
                    'email': user
                }
            }).success(function(data, status, headers, config) {
                console.log('Success - getUserSpecs - ', data);
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