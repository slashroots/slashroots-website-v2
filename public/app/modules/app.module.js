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
        ]).config(config);

    function config($httpProvider){
        $httpProvider.interceptors.push('HTTPInterceptor');
    }
})();