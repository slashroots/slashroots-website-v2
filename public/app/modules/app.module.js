/**
 * Created by tremaine on 1/15/16.
 */
(function(){
    'use strict';
    angular
        .module('slashroots',[
            'ngRoute',
            'ngSanitize',
            'ui.bootstrap',
            'home',
            'post',
            'shared-services'
        ]);
})();