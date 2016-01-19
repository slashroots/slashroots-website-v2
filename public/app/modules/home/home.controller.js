/**
 * Created by tremaine on 1/15/16.
 */
(function(){
    'use strict';
    angular
        .module('home')
        .controller('Home', Home);

    Home.$inject = ['$scope', 'dataService'];
    /**
     *
     * @constructor
     */
    function Home($scope, dataService){
        $scope.interval = 5000;
        $scope.noWrapSlides = false;

        activate();

        function activate(){
            dataService.getPosts().then(function(data){
                console.log(data);
            });
        }

        $scope.slides = [{
            "link": "www.yahoo.com",
            "title": "A Caribbean Open Data Public Service",
            "subtitle": "Access to information is a key pillar of growing a better agriculture sector. Our tools are breaking down data silos government and helping farmers get better access to information and markets",
            "image" : "images/caribbean_tide_hero.jpg"
        },
            {
                "link": "www.yahoo.com",
                "title": "Second",
                "subtitle": "Access to information is a key pillar of growing a better agriculture sector. Our tools are breaking down data silos government and helping farmers get better access to information and markets",
                "image" : "images/do-not-thief.jpg"
            },
            {
                "link": "www.yahoo.com",
                "title": "Third",
                "subtitle": "Access to information is a key pillar of growing a better agriculture sector. Our tools are breaking down data silos government and helping farmers get better access to information and markets",
                "image" : "images/post_its-large.jpg"
            }];
    }
})();