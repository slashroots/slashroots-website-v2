/**
 * Created by tremaine on 1/15/16.
 */
(function(){
    'use strict';
    /**
     * Main Application module.
     * Modules are developed as standalone units
     * and added below.
     * Routes are defined within each module.
     */
    angular
        .module('slashroots',[
            'ngRoute',
            'ngSanitize',
            'ui.bootstrap',
            'home',
            'post',
            'page',
            'shared-services'
        ]).config(config)
        .run(googleAnalyticsTracking);
    /**
     * Tracks each page view through
     * google analytics.
     * @param $rootScope
     * @param $location
     * @param $window
     */
    function googleAnalyticsTracking($rootScope, $location, $window){
        $rootScope.$on('$routeChangeStart', function(event, current){
            var pageName = $location.path();
            $window.ga('send', 'pageview', {'page': pageName});
        });
    }
    /**
     * Registers an function to handle
     * HTTP events.
     * @param $httpProvider
     */
    function config($httpProvider){
        $httpProvider.interceptors.push('HTTPInterceptor');
    }
})();