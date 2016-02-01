/**
 * Created by tremaine on 1/27/16.
 */
(function(){
    var keystone = require('keystone'),
        News = keystone.list('News'),
        utils = require('../../util/utils'),
        _ = require('underscore');
    /**
     * Searches news by query parameters.
     * @param req
     * @param res
     */
    exports.index = function(req, res){
        var query = {};
        //Build a query based on query parameters list.
        //If no query parameters are present,
        //return all posts from the database.
        if(!_.isEmpty(req.query)){
            query = utils.buildQuery(req.query);
        }
        News.model
            .find(query)
            .exec(function(err, news){
                if(err || !news){
                    utils.handleDBError(err, res)
                }else{
                    res.json(news);
                }
            });
    };

})();