/**
 * Editor Controller
 */
angular.module('RDash').controller('EditorCtrl', ['$scope', '$http', '$location', EditorCtrl]);

function EditorCtrl($scope, $http, $location) {
    $scope.initEditor = function() {
        var configs = {
            theme: 'snow'
        };
        $scope.quill = new Quill('#editor', configs);
        $scope.quill.addModule('toolbar', {
            container: '#toolbar'
        });
    }
    $scope.specLive = function() {
        $scope.ladda = Ladda.create(document.querySelector('button[class=ladda-button]'));
        $scope.ladda.toggle();
        console.log($scope.quill.getHTML());
        $http.post('/new-spec', {'content':$scope.quill.getHTML(),'email':'nirav.shah83@gmail.com','password':'temp'}).
        success(function(data, status, headers, config) {
			console.log('Success: ', status,data);
			$scope.ladda.toggle();
			var url = '/spec/' + data.sid;
			$location.path(url);
        }).
        error(function(data, status, headers, config) {
			console.log('Error: ', status);
			$scope.ladda.toggle();
        });
    }
}