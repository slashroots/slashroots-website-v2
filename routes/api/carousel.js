/**
 * Created by matjames007 on 2/10/16.
 */
(function(){
    var keystone = require('keystone'),
        Slide = keystone.list('Slide'),
        Carousel = keystone.list('Carousel'),
        utils = require('../../util/utils'),
        _ = require('underscore');
    /**
     * Searches slides by query parameters.
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
        Slide.model
            .find(query)
            .populate('carousel')
            .exec(function(err, slides){
                if(err || !slides){
                    utils.handleDBError(err, res)
                }else{
                    res.json(slides);
                }
            });
    };

    exports.byCarouselId = function(req, res) {
        Slide.model.find()
            .populate('carousel')
			.sort('position')
            .exec(function(err, slides) {
                if(err || !slides){
                    utils.handleDBError(err, res)
                }else{
                    var list = [];
                    for(s in slides) {
                        for(c in slides[s].carousel) {
                            if(slides[s].carousel[c]._id == req.params.c_id) {
                                list.push(slides[s]);
                                break;
                            }
                        }
                    }
                    res.json(list);
                }
            });
    };

    exports.getCarouselByName = function(req, res) {
        Carousel.model.findOne({name: req.params.name}, function(err, item) {
            if(err || !item){
                utils.handleDBError(err, res)
            }else{
                res.json(item);
            }
        });
    }
})();
