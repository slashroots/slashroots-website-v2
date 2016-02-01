(function(){
    var keystone = require('keystone'),
        Page = keystone.list('Page'),
        utils = require('../../util/utils'),
        _ = require('underscore');
    /**
     * Get a single page given a slug.
     * @param req
     * @param res
     */
    exports.show = function(req, res){

        Page
            .model
            .findOne({slug : req.params.slug})
            .exec(function(err, page){
                if(err){
                    utils.handleDBError(err, res);
                }else if(!page){
                    utils.handleResourceError(page, res);
                }else{
                    res.json(page);
                }
            });
    };

})();
