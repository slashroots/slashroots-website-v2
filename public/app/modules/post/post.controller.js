/**
 * Created by tremaine on 1/27/16.
 */
(function(){

    'use strict';
    angular
        .module('post')
        .controller('Post', Post)
        .filter('sanitize', sanitize);

    Post.$inject = ['$scope','dataService', '$routeParams'];

    function Post($scope, dataService, $routeParams){
        activate();

        function activate(){
            dataService
                .getPost()
                .show( {slug: $routeParams.slug }, function(post){
                    $scope.post = post;
            });
        }
    }

    function sanitize($sce){
        return function(text){
            return $sce.trustAsHtml(text);
        }
    }

})();