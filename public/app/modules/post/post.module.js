/**
 * Created by tremaine on 1/27/16.
 */
(function(){
    'use strict';
    angular
        .module('post',[])
        .config(config);

    function config($routeProvider){
        $routeProvider
            .when('/posts/:slug',{
                templateUrl: 'app/modules/post/post.html',
                controller: 'Post'
            });
    }
})();