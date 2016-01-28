/**
 * Created by tremaine on 1/27/16.
 */
(function(){
    var keystone = require('keystone'),
        Post = keystone.list('Post'),
        utils = require('../../util/utils'),
        _ = require('underscore');
    /**
     * Conducts a search on the following resources:
     * posts.
     * @param req
     * @param res
     */
    exports.index = function(req, res){
        var query = {};
        if(!_.isEmpty(req.query)){
            query = utils.buildQuery(req.query);
        }
        Post.model.search(query, function(err, result){
           res.json(result);
        });
    };


})();
