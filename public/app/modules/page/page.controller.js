/**
 * Created by tremaine on 1/28/16.
 */
(function(){
    'use strict';
    angular
        .module('page')
        .controller('Page', Page);
    /**
     * Module dependency injection
     * @type {string[]}
     */
    Page.$inject = ['$scope','$routeParams', 'dataService'];
    /**
     * Controller handling data interaction
     * between the view and the model.
     * @param $scope
     * @param $routeParams
     * @param dataService
     * @constructor
     */
    function Page($scope, $routeParams, dataService){

        activate();
        /**
         * Used to load controller startup logic
         * and other services.
         */
        function activate(){
            dataService.getPage().show({slug: $routeParams.page}, function(page){
                $scope.page = page;
            });
        }
    }
})();