/**
 * Created by tremaine on 1/19/16.
 */
(function(){
    angular
        .module('dataservice',[
            'ngResource'
        ]).factory('dataService', dataService)
        .constant('ROUTES',{
           baseUrl: '/api/'
        });


    dataService.$inject = ['$resource', 'ROUTES'];

    function dataService($resource, ROUTES){
        var service = {
            getPosts : getPosts,
            getPost: getPost,
            getCarouselItems: getCarouselItems,
            getNewsItems: getNewsItems
        };

        return service;

        function getPosts(){
            return $resource(ROUTES.baseUrl + 'posts',{},{
                query: {method: 'GET', isArray: true}
            });
        }

        function getPost(){
            return $resource(ROUTES.baseUrl + 'posts/:slug',{},{
                show : {method: 'GET', params:{ slug: '@slug'}}
            });
        }

        function getCarouselItems(){
            return $resource(ROUTES.baseUrl + 'search',{},{
                query: {method: 'GET', isArray: true}
            });
        }

        function getNewsItems(){
            return $resource(ROUTES.baseUrl + 'news', {},{
               query: {method: 'GET', isArray: true}
            });
        }
    }

})();