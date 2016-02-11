/**
 * Created by tremaine on 1/19/16.
 */
(function(){
    /**
     * This services handles all api endpoint
     * interactions.
     */
    angular
        .module('dataservice',[
            'ngResource'
        ]).factory('dataService', dataService)
        .factory('HTTPInterceptor', HTTPInterceptor)
    /**
     * Constant provider used to create constants
     * for the dataservice module.
     */
        .constant('ROUTES',{
           baseUrl: '/api/'
        });
    /**
     * Module dependency injection
     * @type {string[]}
     */
    dataService.$inject = ['$resource', 'ROUTES'];
    /**
     * This factory lists defines all functions which
     * handle data calls to the backend.
     * @param $resource
     * @param ROUTES
     * @returns {{getPosts: getPosts, getPost: getPost, getCarouselItems: getCarouselItems, getNewsItems: getNewsItems, getPage: getPage}}
     */
    function dataService($resource, ROUTES){
        var service = {
            getPosts : getPosts,
            getPost: getPost,
            getCarouselItems: getCarouselItems,
            getNewsItems: getNewsItems,
            getHomePageContent: getHomePageContent,
            getPage: getPage,
            getCarousel: getCarousel,
            getSlides: getSlides
        };

        return service;
        /**
         * Queries post resource based on query parameters.
         * @returns {*}
         */
        function getPosts(){
            return $resource(ROUTES.baseUrl + 'posts',{},{
                query: {method: 'GET', isArray: true}
            });
        }
        /**
         * Retrieves a post based on a post's slug.
         * @returns {*}
         */
        function getPost(){
            return $resource(ROUTES.baseUrl + 'posts/:slug',{},{
                show : {method: 'GET', params:{ slug: '@slug'}}
            });
        }
        /**
         * Retrieves carousel based on name.
         * @returns {*}
         */
        function getCarousel(){
            return $resource(ROUTES.baseUrl + 'carousel/:name',{},{
                show: {method: 'GET', params: {name: '@name'} }
            });
        }
        /**
         * Retrieves all slides based on carousel id.
         * @returns {*}
         */
        function getSlides(){
            return $resource(ROUTES.baseUrl + ':id/slides',{},{
                query: {method: 'GET', params: {id: '@id'}, isArray: true}
            });
        }
        /**
         * Queries news resource based on query parameters.
         * @returns {*}
         */
        function getNewsItems(){
            return $resource(ROUTES.baseUrl + 'news', {},{
               query: {method: 'GET', isArray: true}
            });
        }
        /**
         * Retrieves a page based on its slug.
         * @returns {*}
         */
        function getHomePageContent(){
            return $resource(ROUTES.baseUrl + 'search',{},{
                query : {method: 'GET', isArray : true}
            });
        }
        /**
         * Retrieves a page based on its slug.
         * @returns {*}
         */
        function getPage(){
            return $resource(ROUTES.baseUrl + 'pages/:slug',{},{
                show : {method: 'GET', params:{ slug: '@slug'}}
            });
        }
    }
    /**
     * Facotory used to intercept and handle http
     * errors thrown by the api.
     * @param $q
     * @param $location
     * @returns {{responseError: responseError}}
     * @constructor
     */
    function HTTPInterceptor($q, $location){
        var service = {
            responseError: responseError
        };
        return service;
        /**
         * Intercepts and handles HTTP errors thrown by the api.
         * TODO - 404 page needs to be implemented.
         * @param response
         * @returns {Promise}
         */
        function responseError(response){
            if(response.status == 404 || response.status == 500){
                $location.path('/');
            }
            return $q.reject(response);
        }
    }
})();