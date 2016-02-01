/**
 * Created by tremaine on 1/28/16.
 */
(function(){
    'use strict';
     angular
        .module('page',[])
        .config(config);
    /**
     * Config function defining module
     * routes.
     * @param $routeProvider
     */
    function config($routeProvider){
        $routeProvider
            .when('/:page',{
                templateUrl: 'app/modules/page/page.html',
                controller: 'Page'
            });
    }
})();