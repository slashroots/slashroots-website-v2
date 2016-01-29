/**
 * Created by tremaine on 1/28/16.
 */
(function(){
    'use strict';
    angular
        .module('slashroots')
        .filter('sanitize', sanitize);
    /**
     * Filter used to whitelist content.
     * The body of keystone posts contain
     * html tags. This service renders
     * sanitizes said tags for display.
     * @param $sce
     * @returns {Function}
     */
    function sanitize($sce){
        return function(text){
            return $sce.trustAsHtml(text);
        }
    }

})();