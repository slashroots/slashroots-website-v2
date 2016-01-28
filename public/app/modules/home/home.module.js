/**
 * Created by tremaine on 1/15/16.
 */
(function(){
    'use strict';
    angular
        .module('home',[])
        .config(config);
    /**
     *
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