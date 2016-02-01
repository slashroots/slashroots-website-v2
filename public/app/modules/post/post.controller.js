/**
 * Created by tremaine on 1/27/16.
 */
(function(){
    'use strict';
    angular
        .module('post')
        .controller('Post', Post);
    /**
     * Module dependency injection
     * @type {string[]}
     */
    Post.$inject = ['$scope','dataService', '$routeParams'];
    /**
     * Controller handling data interaction
     * between the view and the model.
     * @param $scope
     * @param dataService
     * @param $routeParams
     * @constructor
     */
    function Post($scope, dataService, $routeParams){

        activate();
        /**
         * Used to load controller startup logic
         * and other services.
         */
        function activate(){
            dataService
                .getPost()
                .show( {slug: $routeParams.slug }, function(post){
                    $scope.post = post;
            });
        }
    }
})();