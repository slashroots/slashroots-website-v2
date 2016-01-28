/**
 * Created by tremaine on 1/15/16.
 */
(function(){
    'use strict';
    angular
        .module('home')
        .controller('Home', Home)
        .constant('CAROUSEL',{
           interval : 5000,
            noWrapSlides : false
        });

    Home.$inject = ['$scope', 'dataService', 'CAROUSEL'];

    /**
     *
     * @constructor
     */
    function Home($scope, dataService, CAROUSEL){
        $scope.interval = CAROUSEL.interval;
        $scope.noWrapSlides = CAROUSEL.noWrapSlides;
        activate();

        function activate(){
            dataService.getPosts().query({state: 'published'},function(posts){
                console.log(posts);
            });

            dataService.getCarouselItems().query({carousel: 'yes'}, function(carousel_items){
                $scope.slides = carousel_items;
                console.log(carousel_items);
            });

            dataService.getNewsItems().query({state: 'published'}, function(news){
                $scope.news = news;
            })
        }
    }
})();