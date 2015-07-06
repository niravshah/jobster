angular.module('Speck').factory('AuthService', ['$rootScope', '$http', 'jwtHelper', AuthService]);

function AuthService($rootScope, $http, jwtHelper) {
    return {
        userEmail: function() {
            return $rootScope.currentUser != null ? $rootScope.currentUser : $rootScope.guest
        },
        userUid: function() {
            return $rootScope.currentUserUid != null ? $rootScope.currentUserUid : $rootScope.guest
        },
        isLinkedInUser: function() {
            return $rootScope.currentUserLinkedIn != null;
        },
        linkedInProfile: function() {
            return $rootScope.currentUserLinkedIn;
        },
        isLoggedInUser: function() {
            return localStorage.getItem('id_token') != null;
        },
        isNewGuest: function() {
            return localStorage.getItem('guest_token') == null
        },
        createGuestToken: function() {
            $http.get('/guest-token').success(function(data, status, headers, config) {
                localStorage.setItem('guest_token', data.token)
                var decoded = jwtHelper.decodeToken(localStorage.getItem('guest_token'));
                $rootScope.guest = decoded.user;
                console.log('AuthService - createGuestToken - success', decoded);
            });
        },
        setGuestToScope: function() {
            var decoded = jwtHelper.decodeToken(localStorage.getItem('guest_token'));
            $rootScope.guest = decoded.user;
            console.log('AuthService - setGuestToScope - success', decoded);
        },
        loginUser: function(token) {
            localStorage.setItem('id_token', token);
            var decoded = jwtHelper.decodeToken(token);
            $rootScope.currentUser = decoded.user;
            $rootScope.currentUserUid = decoded.uid;
            if(typeof decoded.linkedin != 'undefined') {
                $rootScope.currentUserLinkedIn = decoded.linkedin;
            }
        },
        setUserToScope: function() {
            var decoded = jwtHelper.decodeToken(localStorage.getItem('id_token'));
            $rootScope.currentUser = decoded.user;
            $rootScope.currentUserUid = decoded.uid;
            if(typeof decoded.linkedin != 'undefined') {
                $rootScope.currentUserLinkedIn = decoded.linkedin;
            }
        },
        updateLinkedInUser: function(json) {
            $http.post('/update-linkedin', {
                uid: $rootScope.currentUserUid,
                linkedin: json
            }).success(function(data, status) {
                localStorage.setItem('id_token', data.token)
                var decoded = jwtHelper.decodeToken(data.token);
                $rootScope.currentUser = decoded.user;
                $rootScope.currentUserUid = decoded.uid;
                $rootScope.currentUserLinkedIn = decoded.linkedin;
            });
        }
    }
}