/**
 * Created by tremaine on 1/15/16.
 */
(function(){
    'use strict';
    angular
        .module('home',[])
        .config(config);
    /**
     * Config function defining module
     * routes.
     * @param $routeProvider
     */
    function config($routeProvider){
        $routeProvider
            .when('/', {
               templateUrl: 'app/modules/home/home.html',
                controller: 'Home'
            }).otherwise({redirectTo : '/'});
    }
})();