/**
 * Created by tremaine on 1/28/16.
 */
(function(){
    'use strict';
    /**
     * Helper factory created to expose
     * functions within the Underscorejs
     * library.
     */
    angular
        .module('underscore',[])
        .factory('_', _);

    function _(){
        return window._;
    }

})();