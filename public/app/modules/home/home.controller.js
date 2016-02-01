/**
 * Created by tremaine on 1/15/16.
 */
//(function(){
    'use strict';
    angular
        .module('home')
        .controller('Home', Home)
    /**
     * Constant provider used to create constants
     * for the dataservice module.
     */
        .constant('CAROUSEL',{
           interval : 5000,
            noWrapSlides : false
        });
    /**
     * Module dependency injection
     * @type {string[]}
     */
    Home.$inject = ['$scope', 'dataService', 'CAROUSEL'];
    /**
     * Controller handling data interaction
     * between the view and the model.
     * @param $scope
     * @param dataService
     * @param CAROUSEL
     * @constructor
     */
    function Home($scope, dataService, CAROUSEL){
        $scope.interval = CAROUSEL.interval;
        $scope.noWrapSlides = CAROUSEL.noWrapSlides;
        $scope.grp_one_small = {};
        $scope.grp_two_small ={};
        $scope.grp_one_lg = {};
        $scope.grp_two_lg = {};

        activate();
        /**
         * Used to load controller startup logic
         * and other services.
         */
        function activate(){
            /**
             * Retrieve all published posts which should be
             * displayed on the home page.
             */
            dataService
                .getHomePageContent()
                .query({state: 'published', homePage: 'yes', sortResultBy: 'positionOnPage'},
                    function(content){
                        var grp_one_lg = sliceContentList(content, 2, 3),
                            grp_two_lg = sliceContentList(content, 5, 6);
                        $scope.grp_one_small = sliceContentList(content, 0, 2);
                        $scope.grp_two_small = sliceContentList(content, 4, 6);
                        $scope.grp_one_lg = grp_one_lg[0];
                        $scope.grp_tw_lg = grp_two_lg[0];
            });
            /**
             * Retrieve all resources (pages and posts) which are flagged
             * for display within the carousel.
             */
            dataService.getCarouselItems().query({carousel: 'yes'}, function(carousel_items){
                $scope.slides = carousel_items;
            });
            /**
             * Retrieve all published news items.
             */
            dataService.getNewsItems().query({state: 'published'}, function(news){
                $scope.news = news;
            });
        }
        /**
         * Returns a shallow copy of a portion
         * of an array.
         * @param content
         * @param start
         * @param end
         * @returns {*|Array.<T>}
         */
        function sliceContentList(content, start, end){
            return content.slice(start, end)
        }
    }
//})();