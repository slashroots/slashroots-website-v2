/**
 * Created by tremaine on 1/15/16.
 */
(function(){
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
    Home.$inject = ['$scope', 'dataService', 'CAROUSEL', '$window', '$location'];
    /**
     * Controller handling data interaction
     * between the view and the model.
     * @param $scope
     * @param dataService
     * @param CAROUSEL
     * @constructor
     */
    function Home($scope, dataService, CAROUSEL, $window, $location){
        $scope.interval = CAROUSEL.interval;
        $scope.noWrapSlides = CAROUSEL.noWrapSlides;
        $scope.goTo = goTo;

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
                        $scope.page_content = content;
            }, function(error){
                    $scope.page_content = {};
                });

            /**
             * Retrieve the carousel based on name
             */
            dataService.getCarousel()
                .show({name:'HomePage'}, function(carousel) {
                    dataService.getSlides()
                        .query({id: carousel._id}, function(slides) {
                            $scope.slides = slides;
                        }, function(error) {

                        })
                }, function(error) {
                    //TODO: Need to tie up these lose ends
                });

            /**
             * Retrieve all published news items.
             */
            dataService.getNewsItems().query({state: 'published'}, function(news){
                $scope.news = news;
            }, function(error){
                $scope.news = {};
            });
        }
        /**
         * Handles internal and external links
         * within the application.
         * @param url
         * @param isExternal
         */
        function goTo(url, isExternal){
            if(isExternal === 'yes'){
                $window.open(url, '_blank');
            }else{
                $location.path(url);
            }
        }
    }
})();