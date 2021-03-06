/**
 * Created by tremaine on 1/27/16.
 */
(function(){
    var keystone = require('keystone'),
        Post = keystone.list('Post'),
        Page = keystone.list('Page'),
        utils = require('../../util/utils'),
        _ = require('underscore');
    /**
     * Conducts a search on the following resources:
     * posts and pages.
     * @param req
     * @param res
     * TODO - Implement handleResourceError
     */
    exports.index = function(req, res){
        var query = {};
        if(!_.isEmpty(req.query)){
            query = utils.buildQuery(req.query);
        }
        Post.model.search(query, function(err, posts){
           if(err || !posts){
               utils.handleDBError(err, res);
           }else{
               Page.model.search(query, function(err, pages){
                   if(err || !pages){
                       utils.handleDBError(err, res);
                   }else{
                       var result = [];
                       result = utils.mergeObjects(result, posts);
                       result = utils.mergeObjects(result, pages);
                       /**
                        * TODO - Define the below into a function
                        */
                        if(req.query.sortResultBy){
                           if(req.query.sortResultBy === 'positionOnPage'){
                              result = utils.sortObject(result, req.query.sortResultBy);
                           }else if(req.query.sortResultBy === 'positionInCarousel'){
                               result = utils.sortObject(result, req.query.sortResultBy);
                           }
                       }
                       res.json(result);
                   }
               });
           }
        });
    };

})();
