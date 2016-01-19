/**
 * Created by tremaine on 1/19/16.
 */
(function(){
    angular
        .module('dataservice',[])
        .factory('dataService', dataService);

    dataService.$inject = ['$http'];
    function dataService($http){
        var service = {
            getPosts : getPosts
        };

        return service;

        function getPosts(){
            return $http.get('/api/posts')
                .then(getPostsSuccessful)
                .catch(getPostsFailed);

            function getPostsSuccessful(response){
                return response.data;
            }

            function getPostsFailed(error){
                return error;
            }
        }
    }

})();