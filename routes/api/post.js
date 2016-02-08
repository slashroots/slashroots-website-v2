(function(){
	var keystone = require('keystone'),
		Post = keystone.list('Post'),
		utils = require('../../util/utils'),
		_ = require('underscore');
	/**
	 * Searches posts by query parameters.
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
		Post.model
			.find(query)
			.populate('author', 'name image email')
			.exec(function(err, posts){
				if(err || !posts){
					utils.handleDBError(err, res)
				}else{
					res.json(posts);
				}
			});
	};
	/**
	 * Get a single post given a slug.
	 * @param req
	 * @param res
	 */
	exports.show = function(req, res){
		Post
			.model
			.findOne({slug : req.params.slug})
			.populate('author', 'name image email')
			.exec(function(err, post){
				if(err || !post){
					utils.handleDBError(err, res);
				}else{
					res.json(post);
				}
			});
	};
})();
